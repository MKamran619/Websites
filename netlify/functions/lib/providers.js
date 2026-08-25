// Answer providers for the chat assistant.
//
// Two implementations behind one interface:
//
//   retrieval  - no API key, no cost, no external call. Scores the visitor's
//                message against the knowledge base and returns the best
//                matching answer. Cannot hallucinate a price because every
//                answer is a verbatim string from Supabase or brief.js.
//
//   claude     - real conversation via the Anthropic Messages API, grounded in
//                the same knowledge base plus the written brief.
//
// Which one runs is decided by environment variables alone (see resolve()), so
// switching the live site from free to AI is a Netlify setting, not a deploy.

const { getKnowledge, getKnowledgeText } = require("./knowledge");
const { SYSTEM_BRIEF, HANDOFF } = require("./brief");

// ---------------------------------------------------------------------------
// Retrieval provider
// ---------------------------------------------------------------------------

const STOP_WORDS = new Set(
  ("a an and are as at be by can could do does for from have how i in is it me my of on or "
    + "our so that the their there they this to want was we what when where which who why will "
    + "with would you your").split(" "),
);

function tokenise(text) {
  const lower = String(text).toLowerCase();
  const words = new Set();
  // Second pass with separators stripped, so "e-commerce" also yields
  // "ecommerce" - visitors type it both ways, the content only one way.
  for (const variant of [lower, lower.replace(/[-_/]/g, "")]) {
    variant
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
      .forEach((w) => words.add(w));
  }
  return [...words];
}

/** True when `needle` appears in `haystack` as whole words, not mid-word. */
function containsPhrase(haystack, needle) {
  // Escape with a callback rather than a replacement string: a literal
  // "$&" in a replacement is itself a substitution pattern.
  const escaped = needle.replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\]/g, (ch) => "\\" + ch);
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(haystack);
}

/**
 * Overlap score between the visitor's words and one knowledge entry.
 * Deliberately simple: exact phrase containment scores highest, then the
 * share of the visitor's meaningful words that appear in the entry.
 */
function score(messageWords, message, entry) {
  const lower = message.toLowerCase();
  let best = 0;

  for (const phrase of entry.q) {
    if (!phrase) continue;
    // Whole-word containment only. Plain substring matching let a two-letter
    // message like "hi" score against "fasHIon e-commerce" and beat the
    // greeting, so the boundary check here is load-bearing, not cosmetic.
    if (containsPhrase(lower, phrase)) {
      best = Math.max(best, 1 + phrase.length / 100);
      continue;
    }
    const phraseWords = tokenise(phrase);
    if (!phraseWords.length) continue;
    const hits = phraseWords.filter((w) => messageWords.includes(w)).length;
    if (hits) best = Math.max(best, hits / phraseWords.length);
  }

  // A little credit for words that appear in the answer body itself, so a
  // question phrased in the site's own vocabulary still lands.
  const bodyWords = tokenise(entry.a);
  const bodyHits = messageWords.filter((w) => bodyWords.includes(w)).length;
  if (messageWords.length) best += (bodyHits / messageWords.length) * 0.35;

  return best;
}

// Below this, the match is noise - hand off rather than answer confidently
// with something unrelated.
const MATCH_THRESHOLD = 0.55;

async function retrievalReply(messages) {
  const last = [...messages].reverse().find((m) => m.role === "user");
  const message = last ? last.content : "";
  const entries = await getKnowledge();
  const words = tokenise(message);

  const ranked = entries
    .map((e) => ({ entry: e, s: score(words, message, e) }))
    .sort((a, b) => b.s - a.s);

  const top = ranked[0];
  if (!top || top.s < MATCH_THRESHOLD) {
    return {
      text: HANDOFF.text,
      cta: HANDOFF.cta,
      source: "handoff",
      suggestions: ranked
        .slice(0, 3)
        .filter((r) => r.s > 0.2)
        .map((r) => r.entry.q[0])
        .filter(Boolean),
    };
  }

  // Offer the runners-up as follow-up buttons - it makes a keyword matcher
  // feel like it is guiding the visitor rather than guessing at them.
  const suggestions = ranked
    .slice(1, 4)
    .filter((r) => r.s > MATCH_THRESHOLD * 0.7)
    .map((r) => r.entry.q[0])
    .filter(Boolean);

  return {
    text: top.entry.a,
    cta: top.entry.cta || null,
    intent: top.entry.intent || null,
    source: top.entry.id,
    suggestions,
  };
}

// ---------------------------------------------------------------------------
// Claude provider
// ---------------------------------------------------------------------------

const CLAUDE_MODEL = process.env.CHAT_MODEL || "claude-opus-5";

async function claudeReply(messages) {
  // Required lazily so the dependency is only needed once AI mode is switched on.
  const Anthropic = require("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const knowledge = await getKnowledgeText();

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 1024,
    // The brief and the knowledge are identical on every request, so they are
    // worth caching: repeat calls bill the cached prefix at ~10%.
    system: [
      { type: "text", text: SYSTEM_BRIEF },
      { type: "text", text: knowledge, cache_control: { type: "ephemeral" } },
    ],
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  if (response.stop_reason === "refusal") {
    return { text: HANDOFF.text, cta: HANDOFF.cta, source: `${CLAUDE_MODEL}:refusal` };
  }

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  return {
    text: text || HANDOFF.text,
    cta: null,
    source: CLAUDE_MODEL,
    usage: {
      input: response.usage.input_tokens,
      output: response.usage.output_tokens,
      cached: response.usage.cache_read_input_tokens,
    },
  };
}

// ---------------------------------------------------------------------------

/**
 * Pick the provider from the environment.
 * Set ANTHROPIC_API_KEY (and optionally CHAT_MODE=claude) to switch to AI.
 * Anything else stays on the free retrieval provider.
 */
function resolve() {
  const mode = (process.env.CHAT_MODE || "").toLowerCase();
  if (mode === "retrieval") return { name: "retrieval", reply: retrievalReply };
  if (process.env.ANTHROPIC_API_KEY) return { name: "claude", reply: claudeReply };
  return { name: "retrieval", reply: retrievalReply };
}

module.exports = { resolve };
