// Chat assistant endpoint.
//
// POST /.netlify/functions/chat
//   { action: "message", conversationId?, message, page? }
//   { action: "lead",    conversationId?, name, email, phone?, interest?, consent }
//
// The provider (free retrieval vs Claude) is chosen by environment variable in
// lib/providers.js - this handler is the same either way.
//
// Environment:
//   SUPABASE_URL                 required - same project the site reads
//   SUPABASE_ANON_KEY            required - publishable key, reads content
//   SUPABASE_SERVICE_ROLE_KEY    required - writes transcripts/leads (secret)
//   CHAT_HASH_SALT               recommended - salts the stored client hash
//   ANTHROPIC_API_KEY            optional  - set to switch on AI mode
//   CHAT_MODE                    optional  - "retrieval" forces the free mode

const crypto = require("crypto");
const { resolve } = require("./lib/providers");
const { GREETING } = require("./lib/brief");

const CONTACT_EMAIL = "contact@nexawebservice.com";
const MAX_MESSAGE_CHARS = 1000;
const MAX_TURNS = 40;

// Per-IP rate limit. In-memory, so it is per warm instance rather than global -
// enough to stop a single tab hammering the endpoint, and cheap. A determined
// abuser across many instances needs a shared store; revisit if that happens.
const RATE_LIMIT = { windowMs: 60_000, max: 15 };
const hits = new Map();

function rateLimited(key) {
  const now = Date.now();
  const win = hits.get(key);
  if (!win || now > win.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }
  win.count += 1;
  if (hits.size > 5000) hits.clear(); // crude bound on memory
  return win.count > RATE_LIMIT.max;
}

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(body),
});

function clientIp(event) {
  const h = event.headers || {};
  return (h["x-nf-client-connection-ip"] || h["x-forwarded-for"] || "unknown")
    .split(",")[0]
    .trim();
}

function clientHash(ip) {
  const salt = process.env.CHAT_HASH_SALT || "";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

// --- Supabase writes (service role - bypasses RLS, never sent to the browser)

async function db(path, { method = "POST", body, prefer } = {}) {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) throw new Error("supabase service credentials not configured");

  const res = await fetch(`${base}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`supabase ${path} ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

/** Logging must never break the chat, so every write is best-effort. */
async function tryDb(label, fn) {
  try {
    return await fn();
  } catch (err) {
    console.error(`chat: ${label} failed -`, err.message);
    return null;
  }
}

async function startConversation(page, hash) {
  const rows = await db("chat_conversations", {
    body: { entry_page: page || null, client_hash: hash },
    prefer: "return=representation",
  });
  return rows && rows[0] ? rows[0].id : null;
}

async function logTurns(conversationId, turns, messageCount) {
  if (!conversationId) return;
  await db("chat_messages", {
    body: turns.map((t) => ({
      conversation_id: conversationId,
      role: t.role,
      content: t.content,
      answer_source: t.source || null,
    })),
  });
  await db(`chat_conversations?id=eq.${conversationId}`, {
    method: "PATCH",
    body: {
      last_message_at: new Date().toISOString(),
      message_count: messageCount,
    },
  });
}

// --- history -----------------------------------------------------------------

/** Read the stored turns back so the provider sees the conversation so far. */
async function loadHistory(conversationId) {
  if (!conversationId) return [];
  const rows = await tryDb("history", () =>
    db(
      `chat_messages?conversation_id=eq.${conversationId}&select=role,content&order=created_at.asc&limit=${MAX_TURNS}`,
      { method: "GET" },
    ),
  );
  return Array.isArray(rows) ? rows : [];
}

// --- handlers ----------------------------------------------------------------

async function handleMessage(payload, hash) {
  const message = String(payload.message || "").trim();
  if (!message) return json(400, { error: "empty message" });
  if (message.length > MAX_MESSAGE_CHARS) {
    return json(400, { error: `message too long (max ${MAX_MESSAGE_CHARS} characters)` });
  }

  let conversationId = payload.conversationId || null;
  if (!conversationId) {
    conversationId = await tryDb("start conversation", () =>
      startConversation(payload.page, hash),
    );
  }

  const history = await loadHistory(conversationId);
  if (history.length >= MAX_TURNS) {
    return json(200, {
      conversationId,
      reply: "This conversation has got long. Start a new one, or contact the team directly at contact@nexawebservice.com.",
      cta: { label: "Contact the team", path: "/contact" },
      suggestions: [],
    });
  }

  const provider = resolve();
  let answer;
  try {
    answer = await provider.reply([...history, { role: "user", content: message }]);
  } catch (err) {
    console.error("chat: provider failed -", err.message);
    return json(200, {
      conversationId,
      reply: "Something went wrong on my end. You can reach the team at contact@nexawebservice.com.",
      cta: { label: "Contact the team", path: "/contact" },
      suggestions: [],
    });
  }

  await tryDb("log turns", () =>
    logTurns(
      conversationId,
      [
        { role: "user", content: message },
        { role: "assistant", content: answer.text, source: answer.source },
      ],
      history.length + 2,
    ),
  );

  return json(200, {
    conversationId,
    reply: answer.text,
    cta: answer.cta || null,
    intent: answer.intent || null,
    suggestions: answer.suggestions || [],
    mode: provider.name,
  });
}

async function handleLead(payload, hash) {
  const email = String(payload.email || "").trim().toLowerCase();
  const name = String(payload.name || "").trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json(400, { error: "a valid email is required" });
  }
  if (!payload.consent) {
    return json(400, { error: "consent is required" });
  }

  let conversationId = payload.conversationId || null;
  if (!conversationId) {
    conversationId = await tryDb("start conversation", () =>
      startConversation(payload.page, hash),
    );
  }

  // A lead is the one write that must NOT be best-effort. If it fails - the
  // chat tables are missing, the service key is wrong, Supabase is down - the
  // visitor has to be told, not thanked for details that went nowhere.
  // `return=representation` makes success detectable: a bare insert answers
  // 201 with an empty body, which is indistinguishable from a failure.
  let saved = false;
  try {
    const rows = await db("chat_leads", {
      prefer: "return=representation",
      body: {
        conversation_id: conversationId,
        name: name || null,
        email,
        phone: String(payload.phone || "").trim() || null,
        interest: String(payload.interest || "").trim() || null,
        consent: true,
        entry_page: payload.page || null,
      },
    });
    saved = Array.isArray(rows) && rows.length > 0;
  } catch (err) {
    console.error("chat: save lead failed -", err.message);
  }

  if (!saved) {
    return json(200, {
      conversationId,
      saved: false,
      reply: `Sorry - I could not record that. Please email ${CONTACT_EMAIL} or use the contact form so your message actually reaches the team.`,
      cta: { label: "Open the contact form", path: "/contact" },
    });
  }

  if (conversationId) {
    await tryDb("flag lead", () =>
      db(`chat_conversations?id=eq.${conversationId}`, {
        method: "PATCH",
        body: { lead_captured: true },
      }),
    );
  }

  return json(200, {
    conversationId,
    saved: true,
    reply: `Thanks${name ? `, ${name}` : ""}. The team will get back to you at ${email}, usually within one working day.`,
  });
}

exports.handler = async function (event) {
  if (event.httpMethod === "GET") {
    // Lets the widget render its opening state without a round trip to the DB.
    return json(200, { greeting: GREETING, mode: resolve().name });
  }
  if (event.httpMethod !== "POST") {
    return json(405, { error: "method not allowed" });
  }

  const ip = clientIp(event);
  if (rateLimited(ip)) {
    return json(429, { error: "Too many messages. Give it a minute." });
  }

  let payload;
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch {
    return json(400, { error: "invalid JSON" });
  }

  const hash = clientHash(ip);
  try {
    if (payload.action === "lead") return await handleLead(payload, hash);
    return await handleMessage(payload, hash);
  } catch (err) {
    console.error("chat: unhandled -", err);
    return json(500, { error: "chat unavailable" });
  }
};
