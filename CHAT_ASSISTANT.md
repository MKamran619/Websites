# Chat assistant

A chat widget on every page, backed by a Netlify function. It answers from the
site's own Supabase content, captures leads, and logs transcripts.

It runs in one of two modes, chosen by environment variable:

| Mode | Cost | What it does |
|---|---|---|
| `retrieval` (default) | Free | Scores the visitor's message against the knowledge base and returns the best matching answer verbatim. No external API call. Cannot invent a price. |
| `claude` | Pay per message | Real conversation via the Anthropic Messages API, grounded in the same knowledge base plus the written brief. |

Switching between them is configuration, not a code change or a redeploy of the
frontend.

## Files

| Path | Purpose |
|---|---|
| `netlify/functions/chat.js` | The endpoint. Rate limiting, validation, transcript logging, lead capture. |
| `netlify/functions/lib/brief.js` | **Edit this.** Tone, scope, what to refuse, business facts, canned answers. Plain text, no code. |
| `netlify/functions/lib/knowledge.js` | Builds the knowledge base from Supabase (`services`, `pricing_plans`, `faq_items`, `case_studies`, `courses`, `blog_articles`). Cached 10 minutes. |
| `netlify/functions/lib/providers.js` | The two answer providers and the switch between them. |
| `src/app/components/chat-widget/` | The Angular widget. Themed from the CSS custom properties, so it follows whichever theme is active. |
| `supabase/schema.sql` | The `chat_conversations`, `chat_messages` and `chat_leads` tables (at the end of the file). |

## Setup

**1. Create the tables.** Re-run `supabase/schema.sql` in the Supabase SQL
Editor. Everything in it is `create table if not exists`, so it is safe to run
over an existing project — only the three new chat tables get created.

Those tables have RLS enabled with **no policies**, which denies the publishable
key everything. Only the service-role key can read or write them. View the data
in the Supabase Table Editor.

**2. Get the service-role key.** Supabase dashboard → Project Settings → API →
`service_role` key.

> This key bypasses every RLS policy in the project. It belongs only in Netlify
> environment variables and your local `.env`. Never put it in
> `src/environments/`, never commit it, never let it reach the browser bundle.

**3. Set the environment variables** in Netlify (Site configuration →
Environment variables):

| Variable | Required | Value |
|---|---|---|
| `SUPABASE_URL` | yes | `https://enijmkzmranhirwajvms.supabase.co` |
| `SUPABASE_ANON_KEY` | yes | The publishable key already in `src/environments/environment.ts` |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | The service-role key from step 2 — secret |
| `CHAT_HASH_SALT` | recommended | Any random string. Salts the stored client hash. |
| `ANTHROPIC_API_KEY` | no | Set this to switch on AI mode (see below) |
| `CHAT_MODE` | no | `retrieval` forces the free mode even if a key is present |

**4. Local testing.** Copy `.env.example` to `.env` and fill in the blanks.
Then run **two terminals**:

```bash
npm run dev
```

```bash
npm start
```

`npm run dev` starts the Netlify functions server on port 9999; `npm start` is
the usual Angular dev server on 4200, now configured (via `proxy.conf.json`) to
forward `/.netlify/functions/*` to it. The widget uses the same relative URL in
dev and in production, so nothing is environment-specific in the code.

Running `ng serve` on its own does not serve functions — the widget will show
"I could not reach the server". If you already had it running, restart it so it
picks up the proxy config.

> `netlify dev` (which would run both in one process) is not usable here: its
> Angular plugin requires Node >= 22 and this project is on Node 20. The
> two-terminal setup above avoids that. If you upgrade Node later, `netlify dev`
> becomes an option.

**5. Privacy policy.** The assistant stores chat transcripts and the contact
details visitors type into it. Add a line to `/privacy` saying so before this
goes live — that is a legal requirement in most of the markets the site
targets, not a nicety.

## Editing what it says

- **Services, pricing, FAQs, case studies, courses** — edit in the Supabase
  Table Editor exactly as you do now. The assistant picks the changes up within
  ten minutes; a redeploy makes it immediate.
- **Tone, refusals, hours, greeting, canned answers** — edit
  `netlify/functions/lib/brief.js`.

## Switching on AI mode

1. `npm install @anthropic-ai/sdk`
2. Create an API key at `console.anthropic.com`.
3. Add `ANTHROPIC_API_KEY` to the Netlify environment variables.
4. Redeploy.

Optionally set `CHAT_MODE=retrieval` at any time to fall back to the free mode
without removing the key.

**There is no free tier** — the Anthropic API bills per token from the first
call. The model defaults to `claude-opus-5`; set `CHAT_MODEL` to
`claude-haiku-4-5` for roughly a fifth of the cost, which is usually enough for
answering questions about services and pricing. Current rates are on
`anthropic.com/pricing`.

The brief and the knowledge base are identical on every request, so they are
sent with prompt caching enabled — repeat messages bill that prefix at about a
tenth of the normal input rate.

## Abuse protection

The endpoint is public and, in AI mode, costs money per call. Built in:

- 15 messages per minute per IP
- 1,000 characters per message
- 40 turns per conversation, then it hands off to the contact form
- The system brief keeps answers on NexaWeb topics

The rate limit is per warm function instance, not global. That stops one tab
hammering the endpoint; it will not stop a distributed attack. If that ever
becomes a real problem, move the counter to a shared store.
