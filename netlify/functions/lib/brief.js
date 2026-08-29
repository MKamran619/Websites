// The hand-written half of the chat assistant's knowledge.
//
// Everything the assistant knows about services, pricing, courses, case
// studies and FAQs is pulled live from Supabase (see knowledge.js) so it can
// never go stale. This file holds only what is NOT in the database: tone,
// scope, what to refuse, and how to handle a visitor who shows buying intent.
//
// Edit this file freely - it is plain text, no code. It is used two ways:
//   * retrieval mode reads CANNED_ANSWERS and HANDOFF
//   * LLM mode (when an API key is configured) sends SYSTEM_BRIEF as part of
//     the system prompt
//
// Keep it factual. Anything asserted here will be repeated to real visitors.

const BUSINESS = {
  name: "NexaWeb Services",
  tagline: "Build · Launch · Grow",
  site: "https://nexawebservice.com",
  email: "contact@nexawebservice.com",
  whatsapp: "https://wa.me/923447510711",
  hours: "Mon - Fri, 9AM - 6PM EST",
  location: "Serving clients worldwide",
  contactPath: "/contact",
};

/**
 * Sent to the model in LLM mode. Ignored in retrieval mode.
 * Written as instructions to the assistant, not as marketing copy.
 */
const SYSTEM_BRIEF = `You are the assistant on the ${BUSINESS.name} website (${BUSINESS.site}).
${BUSINESS.name} builds custom websites and web applications, modernises legacy
systems, and does SEO and website optimisation. Tagline: "${BUSINESS.tagline}".

How to answer:
- Be brief. Two or three sentences is usually right. This is a chat bubble, not a page.
- Answer only from the SITE KNOWLEDGE section below. It is generated from the
  live site content, so it is the source of truth.
- If the knowledge does not cover the question, say so plainly and point the
  visitor at ${BUSINESS.contactPath} or ${BUSINESS.email}. Do not guess.
- Never invent or estimate a price, a timeline, a discount, or a past client.
  If someone asks "how much would my project cost", explain that it depends on
  scope and offer to put them in touch - do not produce a number that is not in
  the knowledge section.
- Never promise anything on the business's behalf: no delivery dates, no
  guarantees, no contractual terms.
- Do not give legal, financial, tax or immigration advice.
- Stay on the subject of ${BUSINESS.name} and its services. If asked something
  unrelated, say that is outside what you can help with here and offer the
  contact route.
- Write plainly. No emoji, no exclamation marks, no "Great question!".

Business facts you may state:
- Hours: ${BUSINESS.hours}
- Location: ${BUSINESS.location}
- Contact: ${BUSINESS.email}, or the contact form at ${BUSINESS.contactPath}

When someone shows buying intent - they describe a project, ask about starting,
ask for a quote, or ask to speak to someone - offer to take their name and
email so the team can follow up. Ask once. If they decline, carry on answering
and do not ask again.`;

/**
 * Answers for questions the database has no row for. Retrieval mode matches
 * these alongside the Supabase content; LLM mode gets them as extra knowledge.
 * `q` is a list of phrasings to match on, `a` is the answer text.
 */
const CANNED_ANSWERS = [
  {
    id: "brief:greeting",
    q: ["hi", "hello", "hey", "good morning", "good afternoon", "are you there"],
    a: `Hello. I can answer questions about ${BUSINESS.name} - our services, pricing, courses and past work. What are you looking for?`,
  },
  {
    id: "brief:what-you-do",
    q: [
      "what do you do",
      "what does nexaweb do",
      "who are you",
      "about the company",
      "tell me about your business",
    ],
    a: `${BUSINESS.name} builds custom websites and web applications, modernises older systems, and does SEO and site optimisation. ${BUSINESS.tagline}.`,
  },
  {
    id: "brief:contact",
    q: [
      "contact",
      "get in touch",
      "talk to someone",
      "speak to a human",
      "email address",
      "phone number",
      "how do i reach you",
    ],
    a: `You can reach the team at ${BUSINESS.email} or through the contact form. Hours are ${BUSINESS.hours}.`,
    cta: { label: "Open contact form", path: BUSINESS.contactPath },
  },
  {
    id: "brief:hours",
    q: ["hours", "when are you open", "what time", "timezone", "availability"],
    a: `${BUSINESS.hours}. ${BUSINESS.location}. Messages outside those hours are answered the next working day.`,
  },
  {
    id: "brief:quote",
    q: [
      "how much would it cost",
      "quote",
      "estimate",
      "budget for my project",
      "price for my website",
      "custom quote",
    ],
    a: "Cost depends on scope, so I would not want to guess at a number. If you tell the team what you are building they will come back with a real figure. Published package pricing is on the pricing page.",
    cta: { label: "Request a quote", path: BUSINESS.contactPath },
    intent: "lead",
  },
  {
    id: "brief:timeline",
    q: ["how long", "timeline", "how soon", "delivery time", "turnaround"],
    a: "Timelines depend on scope and how quickly content and feedback come back. The team can give you a realistic schedule once they know what you need.",
    cta: { label: "Ask about timing", path: BUSINESS.contactPath },
    intent: "lead",
  },
  {
    id: "brief:start",
    q: [
      "how do we start",
      "get started",
      "next step",
      "i want to hire you",
      "work with you",
      "start a project",
    ],
    a: "The first step is a short conversation about what you are trying to build. Leave your name and email and the team will get back to you, or use the contact form directly.",
    cta: { label: "Start a project", path: BUSINESS.contactPath },
    intent: "lead",
  },
];

/** Shown when nothing in the knowledge base is a good enough match. */
const HANDOFF = {
  text: `I do not have a good answer for that one. The team can help directly - you can reach them at ${BUSINESS.email} or through the contact form.`,
  cta: { label: "Contact the team", path: BUSINESS.contactPath },
};

/** Opening message and the buttons offered before the visitor types anything. */
const GREETING = {
  text: `Hi. I can answer questions about ${BUSINESS.name} - services, pricing, courses and past work. What would you like to know?`,
  suggestions: [
    "What services do you offer?",
    "How much do you charge?",
    "Show me your past work",
    "I want to start a project",
  ],
};

module.exports = {
  BUSINESS,
  SYSTEM_BRIEF,
  CANNED_ANSWERS,
  HANDOFF,
  GREETING,
};
