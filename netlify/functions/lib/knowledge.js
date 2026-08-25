// Builds the chat assistant's knowledge base from the live Supabase content.
//
// The same entries feed both modes: retrieval mode scores them directly, LLM
// mode renders them into the system prompt. Because it reads the same tables
// the site renders from, editing content in the Supabase Table Editor updates
// what the assistant says - there is no second copy to keep in sync.
//
// Cached in module scope. Netlify keeps a warm function instance alive between
// invocations, so this usually costs one round of queries per cold start
// rather than one per message.

const { CANNED_ANSWERS, BUSINESS } = require("./brief");

const CACHE_TTL_MS = 10 * 60 * 1000;
let cache = null;
let cachedAt = 0;

/** Reads a table through the Supabase REST API with the publishable key. */
async function selectAll(table, columns, order) {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!base || !key) throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY not set");

  const params = new URLSearchParams({ select: columns });
  if (order) params.set("order", order);

  const res = await fetch(`${base}/rest/v1/${table}?${params}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok) {
    throw new Error(`supabase ${table} ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

/** A table read that degrades to [] rather than taking the whole build down. */
async function safeSelect(table, columns, order) {
  try {
    return await selectAll(table, columns, order);
  } catch (err) {
    console.error(`knowledge: skipping ${table} -`, err.message);
    return [];
  }
}

const clean = (v) => (typeof v === "string" ? v.trim() : "");
const list = (v) => (Array.isArray(v) ? v.filter(Boolean) : []);

/**
 * One knowledge entry.
 * @param {string} id      stable identifier, also logged as the answer source
 * @param {string[]} q     phrasings and keywords this entry should match
 * @param {string} a       the answer text shown to the visitor
 * @param {object} [extra] optional { cta, intent }
 */
const entry = (id, q, a, extra = {}) => ({
  id,
  q: q.filter(Boolean).map((s) => String(s).toLowerCase()),
  a,
  ...extra,
});

async function build() {
  const [services, pricing, faqs, cases, courses, tiers, articles] =
    await Promise.all([
      safeSelect("services", "title,short_description,features,benefit_tags,page", "sort_order"),
      safeSelect("pricing_plans", "*", "sort_order"),
      safeSelect("faq_items", "question,answer", "sort_order"),
      safeSelect("case_studies", "*", "sort_order"),
      safeSelect("courses", "*", "sort_order"),
      safeSelect("course_pricing_tiers", "*", "sort_order"),
      safeSelect("blog_articles", "id,title,excerpt", "sort_order"),
    ]);

  const entries = [...CANNED_ANSWERS.map((c) => entry(c.id, c.q, c.a, c))];

  // ---- Services -----------------------------------------------------------
  const serviceNames = [];
  const seenService = new Set();
  for (const s of services) {
    const title = clean(s.title);
    if (!title || seenService.has(title.toLowerCase())) continue;
    seenService.add(title.toLowerCase());
    serviceNames.push(title);
    const features = list(s.features);
    const body = [clean(s.short_description), features.length ? `Includes: ${features.join(", ")}.` : ""]
      .filter(Boolean)
      .join(" ");
    entries.push(
      entry(
        `service:${title}`,
        [title, ...list(s.benefit_tags), ...features, `do you do ${title}`, `${title} service`],
        body || title,
        { cta: { label: "See all services", path: "/services" } },
      ),
    );
  }
  if (serviceNames.length) {
    entries.push(
      entry(
        "services:overview",
        ["services", "what services", "what do you offer", "list of services", "capabilities"],
        `Main services: ${serviceNames.join(", ")}.`,
        { cta: { label: "See all services", path: "/services" } },
      ),
    );
  }

  // ---- Pricing ------------------------------------------------------------
  // Column names vary between deployments, so pick the first plausible field
  // rather than assuming a shape.
  const pick = (row, names) => {
    for (const n of names) if (clean(row[n])) return clean(row[n]);
    return "";
  };
  for (const p of pricing) {
    const name = pick(p, ["name", "title", "plan_name", "tier"]);
    if (!name) continue;
    const price = pick(p, ["price", "price_label", "amount", "monthly_price"]);
    const desc = pick(p, ["description", "short_description", "tagline", "subtitle"]);
    const body = [
      price ? `${name}: ${price}.` : `${name}.`,
      desc,
      "Exact scope varies - the pricing page has the full breakdown.",
    ]
      .filter(Boolean)
      .join(" ");
    entries.push(
      entry(`pricing:${name}`, [name, `${name} plan`, `${name} price`, `cost of ${name}`], body, {
        cta: { label: "See pricing", path: "/pricing" },
      }),
    );
  }
  if (pricing.length) {
    const names = pricing.map((p) => pick(p, ["name", "title", "plan_name", "tier"])).filter(Boolean);
    entries.push(
      entry(
        "pricing:overview",
        ["pricing", "price", "cost", "how much", "packages", "plans", "rates", "fees"],
        `Packages available: ${names.join(", ")}. Anything custom is quoted after a scoping conversation.`,
        { cta: { label: "See pricing", path: "/pricing" }, intent: "lead" },
      ),
    );
  }

  // ---- FAQs (already question/answer shaped) ------------------------------
  for (const f of faqs) {
    const q = clean(f.question);
    const a = clean(f.answer);
    if (q && a) entries.push(entry(`faq:${q.slice(0, 60)}`, [q], a, { cta: { label: "More FAQs", path: "/faq" } }));
  }

  // ---- Case studies -------------------------------------------------------
  const seenCase = new Set();
  for (const c of cases) {
    const title = pick(c, ["title", "name", "client", "project"]);
    if (!title || seenCase.has(title.toLowerCase())) continue;
    seenCase.add(title.toLowerCase());
    const summary = pick(c, ["summary", "description", "short_description", "excerpt", "result"]);
    entries.push(
      entry(
        `case:${title}`,
        [title, `${title} project`, `${title} case study`],
        [title, summary].filter(Boolean).join(" - "),
        { cta: { label: "See the portfolio", path: "/portfolio" } },
      ),
    );
  }
  if (cases.length) {
    entries.push(
      entry(
        "portfolio:overview",
        ["portfolio", "past work", "case studies", "examples", "previous projects", "who have you worked with"],
        `Recent work includes: ${cases.map((c) => pick(c, ["title", "name", "client", "project"])).filter(Boolean).slice(0, 6).join(", ")}.`,
        { cta: { label: "See the portfolio", path: "/portfolio" } },
      ),
    );
  }

  // ---- Courses ------------------------------------------------------------
  for (const c of courses) {
    const title = pick(c, ["title", "name"]);
    if (!title) continue;
    const desc = pick(c, ["description", "short_description", "summary", "excerpt"]);
    entries.push(
      entry(`course:${title}`, [title, `${title} course`, `learn ${title}`], [title, desc].filter(Boolean).join(" - "), {
        cta: { label: "See courses", path: "/courses" },
      }),
    );
  }
  if (courses.length || tiers.length) {
    entries.push(
      entry(
        "courses:overview",
        ["courses", "training", "learn", "teaching", "classes", "do you teach", "academy"],
        `Training is available: ${courses.map((c) => pick(c, ["title", "name"])).filter(Boolean).slice(0, 6).join(", ") || "see the courses page for the current list"}.`,
        { cta: { label: "See courses", path: "/courses" } },
      ),
    );
  }

  // ---- Blog ---------------------------------------------------------------
  for (const a of articles.slice(0, 25)) {
    const title = clean(a.title);
    const slug = clean(a.id);
    if (!title || !slug) continue;
    entries.push(
      entry(`blog:${slug}`, [title], [title, clean(a.excerpt)].filter(Boolean).join(" - "), {
        cta: { label: "Read the article", path: `/blog/${slug}` },
      }),
    );
  }

  return entries;
}

/** Knowledge entries, rebuilt at most once per TTL. */
async function getKnowledge() {
  const now = Date.now();
  if (cache && now - cachedAt < CACHE_TTL_MS) return cache;
  try {
    cache = await build();
    cachedAt = now;
  } catch (err) {
    console.error("knowledge: build failed -", err.message);
    // Fall back to the hand-written answers so the widget still works.
    if (!cache) cache = CANNED_ANSWERS.map((c) => ({ ...c, q: c.q.map((s) => s.toLowerCase()) }));
  }
  return cache;
}

/** Same knowledge rendered as text, for the LLM system prompt. */
async function getKnowledgeText() {
  const entries = await getKnowledge();
  const lines = entries.map((e) => `- [${e.id}] ${e.a}`);
  return `SITE KNOWLEDGE for ${BUSINESS.name} (generated from live site content):\n${lines.join("\n")}`;
}

module.exports = { getKnowledge, getKnowledgeText };
