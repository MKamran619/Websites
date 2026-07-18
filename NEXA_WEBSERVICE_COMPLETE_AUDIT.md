# Complete Website Audit — nexawebservice.com

**Audited:** 2026-07-17
**Auditor:** Claude Code (automated technical + content audit)
**Method:** Live HTTP/HTML inspection (curl, header analysis, redirect tracing) of the deployed site at https://nexawebservice.com, cross-referenced against the site's actual source repository (Angular 17 + Supabase) to verify structure, routing, and content accuracy. **Limitation:** the headless-browser tool in this session became unresponsive after the first page load, so full-JS-rendered screenshots, Lighthouse scores, and interactive mobile testing could not be captured live. Every finding below is instead backed by raw HTTP responses, response headers, and direct source-code inspection — which, for a client-side-rendered app, is actually the more revealing lens (see Section 10). Where a claim would normally need a live render (e.g. exact pixel layout), it is explicitly marked **[unverified — recommend re-check with a working browser]**.

---

## 1. Executive Summary

Nexa Web Service is a well-designed, content-rich Angular 17 single-page application with genuinely good bones: a coherent dark/gradient design system, 48 substantial long-form blog articles, 37 detailed case studies, a full pricing/courses/FAQ structure, and copy that's specific and credible (named clients, named metrics, a real person behind the brand). The content strategy is ahead of most freelancer/agency sites in this space.

However, the site is undermined by a cluster of **technical defects that are severe precisely because this is an SEO-and-performance consultancy selling SEO-and-performance services**:

1. **The site ships as a pure client-rendered SPA with no working prerender**, even though full Angular Universal SSR code exists in the repo — it's simply never invoked at build time. Every route serves an empty `<app-root></app-root>` shell.
2. **Every URL — home, every page, and literally any typo'd URL — returns HTTP 200 with byte-identical `<head>` content** (same title, same meta description, same canonical pointing at `/`, same JSON-LD). There is no real 404.
3. **Two of the three sitemaps declared in robots.txt don't exist** — `sitemap-pages.xml` and `sitemap-blog.xml` silently return the SPA's HTML shell mislabeled as `application/xml`.
4. **Every Open Graph / Twitter preview image on every page is broken** — `og-image.jpg`, `services-og-image.jpg`, `portfolio-og-image.jpg`, `twitter-image.jpg` all resolve to the HTML shell (confirmed via matching ETag/byte-size), not an actual image. Social shares will render with no image.
5. **48 blog articles have no individual URLs** — they all live behind client-side state on the single `/blog` route; "sharing" a post links to `/blog#42`, a fragment no crawler or unfurler resolves to unique content.
6. **A regional-pricing bug shows literal `AED 0` / `PKR 0` pricing** to any visitor whose browser timezone resolves to Dubai or Karachi — precisely the UAE/Pakistan audience the About and FAQ pages are written for.
7. **Privacy Policy and Terms of Service don't exist.** The footer links to `#`, the cookie-consent banner links to `/privacy`, which redirects to the homepage. There is tracking (GA4 + Meta Pixel + a server-side conversion function) with no policy document to disclose it.

None of this is a redesign-level problem — it's a deployment and wiring problem. The fixes are concrete and scoped (Sections 12–13).

---

## 2. Overall Score: **58 / 100**

| Category | Score | Section |
|---|---|---|
| UI | 78/100 | §4 |
| UX | 55/100 | §5 |
| SEO | 30/100 | §6 |
| Conversion | 58/100 | §7 |
| Accessibility | 68/100 | §8 |
| Performance | 50/100 (estimated — see caveat) | §9 |
| Trust | 50/100 | §10 |

Overall weighted toward SEO/Trust/Performance because this business's entire pitch is "we fix exactly these things for you."

---

## 3. Site Map / Pages Discovered

Via the rendered nav (home page DOM) and `src/app/app.routes.ts`, the real route table is:

| Path | Component | In `sitemap.xml`? | In nav? |
|---|---|---|---|
| `/` | Home | ✅ | ✅ |
| `/about` | About | ✅ | ✅ |
| `/services` | Services | ✅ (+4 bogus `#anchor` dupes) | ✅ |
| `/portfolio` | Portfolio | ✅ | ✅ |
| `/blog` | Blog (48 articles, all client-state, no unique URLs) | ✅ | ✅ |
| `/contact` | Contact | ✅ | ✅ |
| `/courses` | Courses ("Academy") | ❌ missing | ✅ |
| `/pricing` | Pricing | ❌ missing | ✅ |
| `/faq` | FAQ | ❌ missing | ✅ |
| `/privacy` | **does not exist** — wildcard route (`**`) redirects to `/` | referenced by cookie banner & footer intent | footer links to `#` |
| `/terms` | **does not exist** — same wildcard redirect | — | footer links to `#` |
| *(any other string)* | redirects client-side to `/`, but server returns 200 with homepage `<head>` | n/a | n/a |

**Finding:** `/courses`, `/pricing`, and `/faq` are real, live, linked-in-nav pages that are **absent from `sitemap.xml`** — a direct indexation gap. Conversely, `sitemap.xml` lists four `/services#anchor` fragment URLs (`#digital-transformation`, `#custom-development`, `#cloud-migration`, `#consulting`) as if they were distinct pages; fragments are not separately crawlable/indexable by Google, so these four sitemap entries are functionally decorative.

---

## 4. UI Score: 78/100

**Strengths**
- Consistent design system driven by CSS custom properties (`--primary`, `--accent-cyan`, `--bg-dark-*`, spacing/radius/shadow tokens) — this is a real design system, not ad-hoc styling.
- Coherent dark, gradient-accented aesthetic (`#0066ff → #00d4aa`) carried through hero, cards, buttons, and the custom SVG logo.
- 100% iconography via inline SVG + emoji — crisp at any density, zero raster-image weight for UI chrome.
- Responsive type via `clamp()` on H1 and explicit breakpoint rules at 768px/480px, plus a `prefers-reduced-motion` override — someone thought about this.
- Sticky/animated header with active-route highlighting (`routerLinkActive`).

**Issues**
- Console floods with `GSAP target .hero-subtitle-smb not found` and `GSAP target not found` warnings on the homepage — an animation is targeting a selector that doesn't exist (or exists conditionally), firing 4× per load. Cosmetically invisible to users today, but it's dead/broken animation code and a sign the hero animation timeline isn't in sync with the current template. **[Verified via live console output]**
- Heavy reliance on emoji as "icons" (🔍 🚀 💻 ⚡ 🎯 🗄️) throughout services, stats, and trust sections reads as less polished/less enterprise than the inline-SVG icon set used elsewhere (nav, logo, form fields) — inconsistent icon language across the same page.
- **[unverified — recommend re-check with a working browser]** Actual spacing/overlap/mobile breakpoints could not be screenshotted this session.

---

## 5. UX Score: 55/100

**Strengths**
- Clear, repeated primary CTA ("Start a Conversation" / "Schedule Free Consultation" / "Get a Free Consultation") pointing consistently to `/contact`.
- WhatsApp floating action button on every page with a pre-filled message — low-friction contact channel, smart for an international freelance/agency audience.
- Loading interceptor + global loader component gives feedback during route/data transitions.
- Cookie consent banner gates GA4/Meta Pixel until consent — correct privacy behavior in principle.

**Issues**
- **No real 404 page.** Mistype a URL and you silently land on the homepage with no explanation, no "page not found," no search/redirect messaging. Users (and bots) can't tell a broken link from a real page.
- **Form validation uses native `alert()` popups** (`contact.component.ts`) instead of inline field errors — jarring, blocks the main thread, not screen-reader friendly, and inconsistent with the otherwise polished UI.
- **Regional pricing bug (see §11, Critical #6)**: a UAE- or Pakistan-timezone visitor sees "AED 0" / "PKR 0" against every plan and course — actively worse than showing nothing.
- Legal footer links ("Privacy Policy", "Terms of Service", "Sitemap") all point to `href="#"` — dead links that scroll to top and do nothing.
- Blog "share" buttons generate `/blog#42`-style links that, when opened fresh, land on the blog list (unless the component explicitly parses the hash on init — not confirmed) rather than reliably deep-linking to the article.
- `submitCooldown` client-side throttle on the contact form is the only anti-spam measure — trivially bypassed since it's pure client-side JS state, not a server-side or CAPTCHA gate.

---

## 6. SEO Score: 30/100

This is the site's core weakness, and it's almost entirely deployment/wiring, not content.

### 6.1 Rendering model (SSR/CSR) — **Critical**
- The repo contains full **Angular Universal SSR** (`src/main.server.ts`, `app.config.server.ts`, a `build:ssr` script, `prerender.js`) — real, working infrastructure.
- **It is never invoked.** `angular.json`'s `build` architect target uses `@angular-devkit/build-angular:browser` (browser-only). `netlify.toml`'s build command is `npm install && npm run build`, i.e. plain `ng build` — not `npm run build:ssr`. The `serve:ssr` / prerender scripts are dead letters in `package.json`.
- Confirmed live: `curl https://nexawebservice.com/` returns a static shell with `<div class="initial-loader">...Loading...</div><app-root></app-root>` — the `<app-root>` is **empty**. All real content (H1, paragraphs, nav, testimonials, everything) arrives only after ~1.3MB of JS parses and a Supabase network round-trip resolves.
- **Impact:** Googlebot can generally render JS-heavy pages eventually (with delay and extra crawl budget cost), but Bing, most social-preview bots (Facebook/LinkedIn/Slack/WhatsApp unfurlers), many SEO crawlers (Screaming Frog default mode, Ahrefs/SEMrush default), and any accessibility/scraping tool that doesn't execute JS will see only the generic loading shell.

### 6.2 Per-route meta tags are effectively broken for non-JS clients — **Critical**
- `curl`-fetching `/`, `/about`, `/services`, `/portfolio`, `/blog`, `/contact`, `/courses`, `/pricing`, `/faq`, and even `/this-page-does-not-exist` all return **byte-identical `<head>` content**: same `<title>Nexa Web Service | Build · Launch · Grow</title>`, same meta description, same `<link rel="canonical" href="https://nexawebservice.com/">` — regardless of which page was requested.
- Root cause confirmed in source: `SeoService` (`src/app/services/seo.service.ts`) only updates `<title>`, meta description/OG/Twitter tags, and the canonical `<link>` **after Angular Router fires `NavigationEnd`** — and the actual title/description values are fetched **asynchronously from Supabase** via `pageSeoResolver` (`page-seo.resolver.ts` → `ContentService.getRow('page_seo', {slug})`). Two sequential async dependencies (JS execution, then a DB round-trip) must both complete before correct tags exist. Any client that doesn't run this full chain sees the homepage's static tags baked into `index.html`, no matter what page it requested.
- **Every non-home page also has the wrong canonical URL in its raw HTML** (`https://nexawebservice.com/` for all of them) — a textbook canonicalization error if any crawler reads the DOM before or without full hydration.

### 6.3 Fake/garbage sitemaps — **Critical**
- `robots.txt` declares three sitemaps: `sitemap.xml`, `sitemap-pages.xml`, `sitemap-blog.xml`.
- Only `sitemap.xml` is real (2,498 bytes, correct content, lives in `public/`).
- `sitemap-pages.xml` and `sitemap-blog.xml` **do not exist as files**. Requesting them returns HTTP 200 with `Content-Type: application/xml` (forced by a Netlify header rule for `*.xml`) but the **actual body is the SPA's `index.html`** — confirmed by identical `Content-Length` (28,420 bytes) and identical `ETag` to the homepage. Google Search Console will attempt to parse these as XML sitemaps and fail, generating sitemap errors in GSC for a property that's actively trying to look SEO-competent.

### 6.4 No real 404s (soft-404s at scale) — **Critical**
- `netlify.toml` rewrites `/* → /index.html` with **`status = 200`**. Combined with the Angular wildcard route (`{ path: "**", redirectTo: "" }`), **every conceivable URL on the domain returns HTTP 200**. There is no way for Google (or any tool) to distinguish a real page from a dead link — this is the classic "soft 404" pattern search engines specifically flag and de-prioritize crawl budget for.

### 6.5 Broken social preview images sitewide — **Critical**
- `og:image`, `twitter:image`, and the page-specific variants (`services-og-image.jpg`, `portfolio-og-image.jpg`, `blog-og-image.jpg`, `contact-og-image.jpg`, `courses-og-image.jpg`, `twitter-image.jpg`) are all referenced in meta tags but **none of these files exist** in `/assets/`. Requesting any of them returns the SPA HTML shell (same ETag as the homepage, `Content-Type: text/html`) with a 200 status. Every link share to Facebook, LinkedIn, X, Slack, or WhatsApp will fail to render a preview image.

### 6.6 48 blog articles are invisible to search engines — **Critical**
- `blog.component.ts` holds all 48 articles as an in-memory array and a `selectedArticle` field toggled by a click handler. There is **no per-article route** (`app.routes.ts` has a single flat `blog` path, no `:slug` child route).
- "Share" functionality (`shareToTwitter`/`shareToLinkedIn`/copy-link) constructs links like `https://nexawebservice.com/blog#42` — a URL fragment, not a route. Fragments are invisible to the server, to most social unfurlers, and (without confirmed hash-parsing logic on init) may not even reliably reopen the same article in-browser.
- **Impact:** 48 genuinely substantial long-form articles (system architecture, cloud, security, DevOps, frontend — real technical depth, see §17 Full Text appendix) are producing **zero organic search value**, because none of them has a URL Google can index, rank, or send traffic to. This is the single biggest missed SEO opportunity on the site — the content investment already exists; only the routing is missing.

### 6.7 Structured Data (JSON-LD)
Present in the static `<head>` (so it *is* visible to non-JS crawlers, unlike everything else): `Organization`, `Person`, `ProfessionalService`, `WebSite`, `BreadcrumbList`, `FAQPage`.
- **Issue:** `Organization.aggregateRating` hardcodes `"ratingValue": "4.9", "reviewCount": "47"` with no corresponding visible list of 47 reviews anywhere on the site (only 6 testimonials are rendered on the homepage). Google's structured-data guidelines require `AggregateRating`/`Review` markup to reflect genuinely present, verifiable on-page reviews — an unbacked rating is exactly the pattern Google's spam policies target for manual action, and rich-result eligibility can simply be revoked without warning.
- **Issue:** The same static `FAQPage` JSON-LD (5 fixed Q&As about project timelines/cost/etc.) is injected via `index.html` on **every route**, not just a FAQ page — duplicate/mismatched structured data across the whole site (the real, much larger FAQ content — 23 Q&As across 5 categories — lives only in the DB-driven `/faq` page and isn't reflected in this static schema at all).
- **Positive:** `BreadcrumbList` schema is well-formed and matches real top-level nav paths.

### 6.8 Meta/verification hygiene
- `google-site-verification`, `msvalidate.01` (Bing), and `yandex-verification` meta tags all still contain **literal placeholder text** (`YOUR_GOOGLE_VERIFICATION_CODE`, etc.) — verification was never completed, meaning there's likely no Search Console / Bing Webmaster Tools property properly linked via this method (may be verified another way, but this is dead weight either way).
- `meta name="keywords"` is present sitewide — harmless (Google ignores it) but a dated practice worth removing rather than maintaining.
- `hreflang` block only declares `en-us` and `x-default` — fine given no actual translated content exists, no action needed.

### 6.9 robots.txt / crawl directives
- Otherwise reasonable: explicit `Googlebot`/`Bingbot`/`*` allow rules, sensible `Disallow: /admin/ /private/ /api/ /*.pdf$` (none of which exist yet, but harmless), correct HTTPS canonical domain.

---

## 7. Conversion Score: 58/100

**Strengths**
- Multiple, consistent, low-friction CTAs ("free consultation," "no commitment required," "30-minute session") repeated across hero, mid-page, and footer.
- Real specificity in proof points (named clients: CareCloud, Metropolitan, Inspire System; named metrics: 40% CI/CD improvement, 35% query speed gain) — far more credible than generic "we deliver results" copy.
- WhatsApp instant-contact option lowers the bar below "fill out a form."
- Transparent, tiered pricing ($500 Starter / $2,000 Business / $10,000+ Enterprise) with a clear 5-step process (`pricing` page) — removes a common freelance-site friction point (opaque pricing).
- FAQ page directly answers objections a US/UAE buyer would have about hiring an offshore developer (timezone, payment method, NDA, code ownership, refund policy) — smart, buyer-aware content.

**Issues**
- **The $0 regional pricing bug (§11 #6) directly damages conversion for the UAE/Pakistan segment** the site explicitly courts in About/FAQ copy.
- No visible trust badges, client logos, certifications, or a link to verifiable reviews (Clutch, Google Business, LinkedIn recommendations) anywhere — the "47 reviews / 4.9 rating" claim in structured data has no on-site backing a skeptical buyer could click through to.
- Contact form has 4 required fields plus 2 dropdowns before a message is optional — reasonably long for a "free, no-obligation" first touch; consider whether name+email+one open text field would convert better, with the qualifying questions (budget/timeline/challenge) moved to a post-submit or second-step flow.
- No live chat / chatbot, no calendar-embed for "schedule a call" (currently just a form + email + WhatsApp).
- Refund policy, NDA availability, and code-ownership terms — genuinely strong trust content — are buried in FAQ accordion items rather than surfaced near the pricing CTA where a hesitant buyer is deciding.

---

## 8. Accessibility Score: 68/100

**Strengths**
- No `<img>` tags exist anywhere in the app (100% inline SVG/emoji/CSS) — so there is, structurally, no missing-alt-text problem to fix; SVG icons are mostly decorative/paired with visible text labels.
- Form inputs on the contact page correctly pair `<label for="...">` with matching input `id`s.
- Mobile nav toggle button has `aria-label="Toggle navigation menu"` and `[attr.aria-expanded]="menuOpen"` — correct pattern.
- Social icons in the footer carry `[attr.aria-label]="link.platform"`.
- Exactly one `<h1>` per page (verified across all 9 route components) — clean heading hierarchy at the top level.
- `prefers-reduced-motion` and `prefers-contrast: more` media queries are explicitly handled in global CSS.

**Issues**
- Contact-form validation errors are surfaced via `alert()` — this is **not** accessible: it doesn't associate the error with the invalid field (no `aria-invalid`/`aria-describedby`), and blocking native dialogs are a poor screen-reader experience compared to inline, associated error text.
- Decorative SVG icons throughout (services, stats, trust badges) don't consistently carry `aria-hidden="true"`, so screen readers may announce raw SVG path data/redundant icon content alongside adjacent visible text — worth an audit pass with a screen reader.
- Color contrast of `--text-muted: #94a3b8` body copy against `--bg-dark-1: #030712` / `--background: #0a0f1a` **[unverified — recommend re-check with a working browser/contrast checker]**; the ratio is likely borderline-acceptable given the design (light gray-blue on near-black), but should be confirmed with an automated contrast audit (axe, Lighthouse) rather than assumed.
- WhatsApp floating button and cookie-consent banner both inject via plain DOM/`innerHTML` rather than as Angular components — worth confirming they're reachable via keyboard tab order and don't trap focus.

---

## 9. Performance Score: 50/100 *(estimated — Lighthouse/CWV could not be run live this session; see caveat below)*

**What was measured directly (via HTTP, not Lighthouse):**
| Asset | Size (transfer) | Notes |
|---|---|---|
| `main.[hash].js` | 1,087,810 bytes raw → **268,181 bytes** Brotli-compressed | Single large bundle; no visible route-level code-splitting from the network trace (runtime/polyfills/main only — no lazy chunks observed loading on initial hit) |
| `polyfills.[hash].js` | 34,812 bytes raw | Standard Angular polyfill bundle |
| `styles.[hash].css` | 11,677 bytes raw | Small; using `media="print" onload="this.media='all'"` non-blocking CSS loading trick — good technique |
| `index.html` | 28,420 bytes | Includes a large amount of inline JSON-LD, inline critical CSS, and an inline analytics/consent script — all reasonable to inline, but bulks up the very first byte |

**Positive performance techniques already in place:**
- Non-blocking stylesheet load pattern (`media="print"` swap).
- `font-display` handled via Google Fonts `&display=swap` + `preload`/`onload` swap + `<noscript>` fallback.
- `preconnect`/`dns-prefetch` hints for Google Fonts, GA, GTM, jsdelivr.
- Netlify sets `Cache-Control: public, max-age=31536000, immutable` for `/assets/*` and Brotli compression is active at the edge.
- Zero raster images in the entire UI — nothing to optimize/lazy-load on that front.

**Structural performance risk (this is the real story):**
- Because there is no SSR/prerender (§6.1), **First Contentful Paint and Largest Contentful Paint are gated behind**: downloading + parsing ~1.3MB of JS (Angular framework + app code + zone.js + GSAP), bootstrapping the Angular app, then firing a **Supabase network request** to fetch page content (hero text, services, testimonials, etc.) before anything meaningful paints. This is a much longer critical path than a prerendered/SSR page, and is the most likely explanation for weak Core Web Vitals (specifically LCP and possibly CLS if the loader-to-content swap shifts layout).
- The GSAP console errors (§4) indicate at least one animation is running against a missing target every load — wasted script execution, however small.
- **Caveat:** an actual Lighthouse run (`npm run lighthouse` is already scripted in `package.json`, pointed at `localhost:4200`) or a PageSpeed Insights / Core Web Vitals report from a live browser is needed for real LCP/CLS/INP/TBT numbers. Treat this section as a structural risk assessment, not a substitute for that report — **recommend the user run `npx lighthouse https://nexawebservice.com` or check PageSpeed Insights directly and share those numbers for the "second opinion" pass.**

---

## 10. Trust Score: 50/100

**Strengths**
- A named, findable real person (Kamran Sohail) with a real LinkedIn/GitHub/Twitter, not an anonymous "our team."
- Specific, checkable-sounding client/project history (CareCloud, Metropolitan Warehouse & Delivery, Inspire System) rather than vague claims.
- Cookie-consent banner correctly gates GA4/Meta Pixel behind explicit accept/decline, and only fires the server-side lead-tracking function when `localStorage.cookieConsent === "granted"` — genuinely better privacy engineering than most sites this size.
- Clear, specific refund/NDA/ownership policy language *exists* (in FAQ) even if not surfaced prominently.

**Issues**
- **No Privacy Policy, no Terms of Service exist as actual pages** (§6, §5) despite: (a) a cookie-consent banner that name-drops "Google Analytics & Meta Pixel," (b) a server-side conversion-tracking function (`/.netlify/functions/track-lead`) that receives the user's email and hashes it for Meta's Conversion API, and (c) a contact form collecting name/email/company/budget. Collecting and processing this data with **no published privacy policy** is a real compliance gap (GDPR if any EU visitor, CCPA if California, and simply a baseline trust expectation for any US B2B buyer) — not just an SEO nit.
- Unbacked `aggregateRating` structured data (4.9★ / 47 reviews) with no visible reviews list is a trust *and* SEO liability (§6.7) — it reads, to a skeptical visitor or to Google, as unverifiable.
- EmailJS public key/service/template IDs are exposed client-side in `contact.component.ts` (`emailjs.init("FiOYICOvKQmtB0P1N")`, `service_websites`, `template_yh2wuhe`). This is EmailJS's intended usage model (public keys are meant to be client-side), **but** combined with no CAPTCHA and only a client-side time cooldown, the contact/newsletter forms have no real spam/abuse protection — recommend adding EmailJS's domain-restriction setting (if not already set) and a CAPTCHA (hCaptcha/reCAPTCHA) or honeypot field.
- Security response headers are actually solid (see below) — a small, easy-to-miss trust positive worth calling out.

**Security headers (from live `curl -I`):**
```
Strict-Transport-Security: max-age=31536000
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```
Good baseline. Missing: `Content-Security-Policy` (not set at all) — worth adding given the site loads third-party script from Facebook, Google Tag Manager, Google Fonts, and jsdelivr; a CSP would meaningfully reduce XSS blast radius. Also note `Access-Control-Allow-Origin: *` is set globally in `netlify.toml` for all responses — broad CORS on a marketing site is low-risk today (no sensitive API responses are served from this origin) but is unnecessary exposure and worth scoping down to only the routes that actually need it (if any).

---

## 11. Technical Issues (Consolidated)

### Critical
1. **CSR-only deployment** — SSR code exists but is never built/deployed (§6.1).
2. **Identical `<head>` on every route + soft-404-everywhere** via `netlify.toml`'s catch-all 200 rewrite (§6.2, §6.4).
3. **Two of three declared sitemaps are fake** (serve HTML mislabeled as XML) (§6.3).
4. **All OG/Twitter preview images are broken** across every page (§6.5).
5. **48 blog articles have no indexable URLs** (§6.6).
6. **Regional pricing shows `AED 0` / `PKR 0`** to UAE/Pakistan-timezone visitors — confirmed in `region.service.ts` (auto-detects timezone → region) × `pricing_plans`/`course_pricing_tiers` seed data (`{"US": 500, "UAE": 0, "PAK": 0}`) × `formatPrice()` (formats `0` as currency, not as "Contact us" — that fallback only triggers on `null`/`undefined`, not on `0`).
7. **No Privacy Policy / Terms of Service pages exist**, despite active analytics/ad-pixel tracking and a cookie-consent banner referencing them (§10).

### Medium
8. `/courses`, `/pricing`, `/faq` missing from `sitemap.xml` despite being live, nav-linked pages (§3).
9. `sitemap.xml` lists 4 `/services#anchor` fragment URLs as if independently indexable (§3).
10. Unbacked `AggregateRating` structured data (4.9★/47 reviews, no visible review list) (§6.7).
11. Same static `FAQPage` JSON-LD duplicated on every route regardless of actual page content (§6.7).
12. Google/Bing/Yandex site-verification meta tags contain unfilled placeholder values (§6.8).
13. Contact/newsletter forms have no CAPTCHA/honeypot — only a client-side time cooldown (§10).
14. `Content-Security-Policy` header not set (§10).
15. Course pricing appears in two different DB tables (`courses` and `course_pricing_tiers`) with **different prices for the same course names** — e.g. "HTML & CSS Fundamentals" is $49 in the `courses` seed (used on `/courses`) but $79 in `course_pricing_tiers` (likely surfaced on `/pricing`). If both render live, a visitor comparing the two pages will see conflicting prices for the same course.

### Low
16. GSAP console warnings for a missing `.hero-subtitle-smb` animation target, firing repeatedly on homepage load (§4).
17. `alert()`-based form validation instead of inline/accessible error messaging (§5, §8).
18. `meta name="keywords"` still maintained sitewide (harmless, but dated practice — safe to drop).
19. Broad `Access-Control-Allow-Origin: *` set globally rather than scoped (§10).
20. Footer legal links (`Privacy Policy`, `Terms of Service`, `Sitemap`) point to `href="#"` (dupe of #7, called out separately as a footer-specific UX defect).

---

## 12. Critical Fixes (do these first)

1. **Wire up SSR/prerendering for real.** The infrastructure already exists (`build:ssr`, `main.server.ts`, `prerender.js`) — point Netlify's build command at it (`npm run build:ssr` or migrate to Angular's newer `application` builder with SSR enabled) and set `publish` to the SSR output's browser folder, or move to prerendering all known static routes at build time. This alone fixes #1, most of #2, and meaningfully changes the performance profile in §9.
2. **Fix the soft-404 problem.** Once SSR/prerendering exists, add a real Angular 404 component (`path: '**'` → a `NotFoundComponent`, not `redirectTo: ''`) and configure Netlify/the SSR server to actually return HTTP 404 for unknown routes.
3. **Delete the fake sitemap references** or generate real `sitemap-pages.xml`/`sitemap-blog.xml` files (a real per-article blog sitemap becomes possible once fix #5 below lands). Until then, remove those two lines from `robots.txt` — a missing sitemap is far less harmful than a broken one.
4. **Add real OG/Twitter image assets** at the exact paths already referenced in meta tags (`/assets/og-image.jpg`, `/assets/services-og-image.jpg`, etc.) — currently a 100% miss rate on social preview images.
5. **Give every blog article a real route** (`/blog/:slug`) with its own SSR/prerendered meta tags, canonical, and JSON-LD `Article`/`BlogPosting` schema. This unlocks 48 articles' worth of dormant SEO value — likely the single highest-ROI fix on this list.
6. **Fix the `$0` regional pricing bug.** Either populate real UAE/PAK prices in `pricing_plans`/`course_pricing_tiers`, or change `RegionService.formatPrice()` to treat `0` the same as `null` (fall back to "Contact us") until real region pricing exists.
7. **Publish a real Privacy Policy and Terms of Service**, add routes for them, and point the footer + cookie-banner links at the real pages instead of `#`.

## 13. Medium Priority Fixes

1. Add `/courses`, `/pricing`, `/faq` to `sitemap.xml`; remove the four fake `/services#anchor` entries.
2. Either build a real reviews page (with the actual 47 reviews) backing the `AggregateRating` schema, or remove/reduce the claim to match what's genuinely on-site (e.g. the 6 visible testimonials).
3. Make the `FAQPage` JSON-LD route-specific (only inject on `/faq`, matching its real 23-question content) instead of a static 5-question block duplicated everywhere.
4. Fill in or remove the Google/Bing/Yandex verification meta placeholders.
5. Add a CAPTCHA (hCaptcha/reCAPTCHA v3) or honeypot field to the contact and newsletter forms; confirm EmailJS domain restriction is enabled in the EmailJS dashboard.
6. Add a `Content-Security-Policy` header via `netlify.toml`, scoped to the actual third-party origins in use (Facebook, Google Tag Manager/Analytics, Google Fonts, jsdelivr).
7. Reconcile the two divergent course-price tables (`courses` vs `course_pricing_tiers`) so `/courses` and `/pricing` never show different numbers for the same course.
8. Scope `Access-Control-Allow-Origin` down from `*` unless there's a concrete reason a marketing site needs open CORS on every response.

## 14. Low Priority Fixes

1. Track down and fix (or remove) the GSAP animation targeting `.hero-subtitle-smb` to silence the repeated console warnings.
2. Replace `alert()`-based contact-form validation with inline, `aria-describedby`-linked error messages.
3. Remove the legacy `meta name="keywords"` tags.
4. Standardize on inline-SVG icons instead of mixing in emoji for services/stats/trust sections, for a more consistently "enterprise" visual register.
5. Add `aria-hidden="true"` to purely decorative SVG icons that sit beside visible text labels.

---

## 15. Things Done Well

- **Real Supabase-backed CMS architecture** for nearly all content (nav, footer, hero copy, services, testimonials, case studies, FAQ, blog, pricing) — this is a genuinely good architectural choice for a site that needs to be edited without redeploys, and it's implemented with `TransferState` caching in `ContentService` for SSR-reuse (once SSR is actually turned on, this will pay off immediately).
- **48 long-form, technically substantive blog articles** spanning architecture, cloud, AI/ML, security, DevOps, and modern frontend — genuinely useful content depth most competitor sites in this niche don't have. The routing gap (§6.6) is a real shame given the quality of what's already written.
- **Specific, credible proof points** throughout (named clients, named metrics, named technologies) instead of generic marketing filler.
- **Privacy-conscious analytics implementation**: GA4/Meta Pixel genuinely gated behind explicit user consent, with a server-side conversion-tracking path that only fires post-consent.
- **Solid baseline security headers** (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) already configured in `netlify.toml`.
- **Thoughtful non-image UI** — a fully icon/SVG/CSS-driven interface avoids an entire category of performance and alt-text problems other sites create for themselves.
- **Buyer-aware FAQ content** — directly answers the specific objections an international buyer would have about timezone, payment, NDAs, and code ownership.
- **Region-aware architecture already scaffolded** (`RegionService`, JSONB per-region prices) — the intent (serve US/UAE/PAK visitors appropriately) is right; only the data and one fallback branch are broken (§11 #6).

---

## 16. Competitor-Level Recommendations

- Competing dev-consultancy sites in this exact niche (senior freelance/boutique agency positioning) typically win on: (a) a handful of *verifiable* client logos or a linked review platform (Clutch/G2/Google reviews) rather than static claimed numbers, (b) a visible calendar-embed ("Book a call" → Calendly/Cal.com) instead of only a form, and (c) individually indexed, well-linked blog content driving organic search traffic — which is exactly the gap in §6.6. Closing that one gap alone would likely do more for lead flow than any visual redesign.
- Consider a lightweight case-study *detail* page pattern (even 3–5 of the 37 case studies fully written up as their own pages) rather than all of them living as cards on one `/portfolio` page — mirrors the blog-routing fix and gives you more indexable, shareable long-tail pages.
- The pricing transparency (rare in this space) is a genuine differentiator — lean into it further by adding a comparison table or "which plan is right for me" quiz-style CTA.

---

## 17. Suggested Homepage Improvements
- Fix the GSAP console errors before anything else — it's a signal the hero animation isn't actually running as intended for at least one element.
- The hero's `success.config.ts` code-snippet visual is a nice, on-brand touch for a developer audience — keep it, but ensure it's not the only thing that paints before real content (currently gated behind the same CSR delay as everything else).
- Trust-stat numbers ("8+ Years," "3 Countries," "98% Satisfaction") animate from 0 — confirm (once SSR lands) that the *unanimated final value* is what's actually present in the server-rendered HTML, not `0`, so crawlers/no-JS users don't see zeroed-out stats.
- Six testimonials is enough for the homepage carousel — but link out to a full reviews/testimonials page or third-party profile to back the schema's 47-review claim (§10).

## 18. Suggested Services Page Improvements
- The services page's `<h1>` is injected via `[innerHTML]="hero?.title"` containing a literal `<span class="gradient-text">` — confirm this is sanitized (Angular's `DomSanitizer`) since it's rendering DB-sourced HTML directly into the page; low risk today (content is self-authored) but worth a deliberate sanitization check rather than an assumption.
- Remove the four `/services#anchor` sitemap entries (§13.1) and, if those four service categories deserve their own landing pages for SEO (they're substantial enough — SEO/Optimization, Digital Transformation, Custom Development, Cloud & DevOps), consider real sub-routes instead of anchors.

## 19. Suggested Portfolio Improvements
- 37 case studies with real metrics is strong raw material — the biggest lever here is making the best 3–5 individually indexable pages (see §16) rather than changing the current card-grid presentation, which is fine as an index/overview.
- Case studies currently read as anonymized ("Fortune 500 Retail Company," "B2B SaaS Company") — understandable if under NDA, but consider a visible note like "client names withheld under NDA — references available on request" (this is already promised in the FAQ) directly on the portfolio page, so the anonymization reads as professional discretion rather than unverifiable claims.

## 20. Suggested Contact Page Improvements
- Replace `alert()` validation with inline field errors (§14.2).
- Add a CAPTCHA/honeypot (§13.5).
- Consider shortening the required-field set for the *first* touch (name, email, one open message field) and moving budget/timeline/challenge questions to a follow-up email or second-step form — reduces abandonment on a "free, no-obligation" CTA.
- Surface the refund policy / NDA / code-ownership points (currently FAQ-only) as a short trust strip directly on this page, right next to the form.

## 21. Suggested Footer Improvements
- Fix the `href="#"` legal links the moment Privacy/Terms pages exist (§12.7) — this is the most visible symptom of the missing-pages problem.
- The footer's `legal` link group also lists "Sitemap" pointing to `#` — either link it to the real `/sitemap.xml` or drop it; a "Sitemap" footer link conventionally points to an HTML sitemap page, which doesn't exist, so simplest fix is removing that link entirely rather than building an HTML sitemap page nobody asked for.

## 22. Suggested Navigation Improvements
- Nav is clear and complete (Home/Services/Case Studies/Insights/Academy/Pricing/FAQ/About Us) with a distinct "Let's Talk" contact CTA — no structural complaints.
- Confirm (once a working browser session is available) that the mobile hamburger menu's `aria-expanded` state and focus trap behave correctly — the ARIA attributes are wired correctly in source; only live keyboard/screen-reader testing remains **[unverified — recommend re-check with a working browser]**.

## 23. Suggested Content Strategy
- The single highest-leverage content move available is **not writing more content** — it's making the 48 existing blog articles and the best case studies independently indexable (§6.6, §16). Do this before investing in new articles.
- Once individual blog URLs exist, add per-article `Article`/`BlogPosting` JSON-LD (author, datePublished, image) — the data (`author_name`, `date`, `read_time`) already exists in the `blog_articles` table and just needs to be emitted as schema per-article.
- Consider a short "for coaches/consultants/small business" landing page distinct from the enterprise-heavy homepage — the homepage copy already gestures at this ("We also help coaches, consultants, and service-based businesses...") but the rest of the site is almost entirely enterprise-case-study-weighted; a dedicated SMB-facing page/CTA would better serve that stated secondary audience.

## 24. Suggested Lead Generation Improvements
- Add a calendar-embed booking option (Calendly/Cal.com) alongside the form and WhatsApp — "schedule a free 30-minute session" is the core CTA everywhere, but there's currently no direct scheduling mechanism, only a contact form that presumably leads to manual scheduling afterward.
- Fix the $0 pricing bug (§12.6) before running any paid traffic to UAE/Pakistan audiences — right now that spend would be actively counterproductive.
- Add exit-intent or scroll-depth-triggered secondary CTA on long pages (blog articles, case studies) offering the free consultation — currently the CTA is present but not adaptively surfaced.

## 25. Suggested International Client Improvements
- Fix the $0 regional pricing bug — this is the top item for this section by a wide margin (§12.6).
- The `RegionService`/JSONB-price architecture is exactly right for a genuinely region-aware pricing display — finish it: populate real AED and PKR figures (or explicitly hide/relabel pricing for regions not yet priced, rather than showing $0).
- FAQ's "Working Internationally" category (timezone, communication tools, language) is strong, specific, reassuring content — consider surfacing a condensed version of it directly on `/pricing` and `/contact`, not only inside an accordion on `/faq`, since it's exactly the friction point a hesitant US/UAE buyer hits right before deciding to submit the form.
- `hreflang` currently only declares `en-us`/`x-default` — appropriate today since there's no localized content; revisit only if/when UAE-specific or Pakistan-specific landing content is built out.

---

## 26. Navigation Review, UI/UX Notes & Page-by-Page Detail

> Note on method: because the live browser tool failed mid-session, page-by-page structural detail below (H1/H2, CTAs, forms, images, internal links) is drawn directly from the Angular source templates and the Supabase seed data that populates them in production (verified to match the one page — Home — successfully rendered live before the tool became unresponsive). Where noted, "images" sections are empty by design: **the entire site has zero `<img>` elements** — every visual is inline SVG or emoji, confirmed by a sitewide grep.

### Page: Home (`/`)
1. **URL:** `https://nexawebservice.com/`
2. **Page Title (rendered):** `Nexa Web Service — Software Solutions | Digital Transformation & Development` — **Title in raw HTML/non-JS view:** `Nexa Web Service | Build · Launch · Grow` (mismatch — see §6.2)
3. **Meta Description (rendered target):** "Nexa Web Service delivers custom digital transformation solutions and enterprise software. 8+ years specializing in Angular, React, .NET Core, Azure DevOps, and Healthcare SaaS — for US and international clients." — **Raw HTML shows a different, generic description** (see §6.2)
4. **H1:** "We Engineer Build · Launch · Grow For Your Business"
5. **H2s:** "Delivering Measurable Results", "Services That Drive Growth", "Enterprise-Grade Thinking. Any Project Size.", "Impact By Numbers", "Ready to Transform Your Business?"
6. **Main Content:** Hero pitch → 4 feature chips (Enterprise Solutions/Cloud Architecture/SEO & Optimization/24/7 Support) → animated stats (8+ years / 3 countries / 98% satisfaction) → tech-stack carousel (10 items) → 4 measurable-results value props → 5-card services grid → 6-item "why Nexa" grid → 3-stat "track record" band → 6 testimonials (rotating) → final CTA band.
7. **CTA buttons:** "Start a Conversation" (→ `/contact`), "Explore Case Studies" (→ `/portfolio`), "Learn more" ×5 (→ `/services`, once per service card), "Get a Free Consultation" (→ `/contact`), "Schedule Free Consultation" (→ `/contact`).
8. **Forms:** none on-page (CTAs link elsewhere).
9. **Internal links:** `/contact` ×3, `/portfolio` ×1, `/services` ×5, plus full nav (8 links) and footer link groups.
10. **Images:** none (SVG/emoji only).
11. **Alt text:** n/a — no images.
12. **Structured Data:** see §6.7 (site-wide `Organization`, `Person`, `ProfessionalService`, `WebSite`, `BreadcrumbList`, `FAQPage`).
13. **Canonical URL (raw HTML):** `https://nexawebservice.com/` (correct for this page specifically, though identical on every other page too).
14. **Open Graph:** `og:title` = "Kamran Sohail | Senior Software Engineer - Transform Your Business with Expert Solutions" (personal-brand framing, differs from the page's own SEO-resolver title) — image broken (§6.5).
15. **Twitter Card:** `summary_large_image`, `@kamransawan` — image broken (§6.5).
16. **JSON-LD:** present, static (§6.7).
17. **Performance observations:** first meaningful paint gated on full JS bootstrap + Supabase fetch (§9); GSAP console errors fire here specifically.
18. **Accessibility issues:** none image-related; alert-based validation doesn't apply here (no form).
19. **Mobile responsiveness:** clamp()-based type scaling present in source **[layout unverified live]**.
20. **UI/UX issues:** GSAP warnings; otherwise the strongest page on the site.
21. **Conversion issues:** none specific to this page beyond the sitewide $0-pricing and no-booking-calendar issues.
22. **SEO issues:** title/description mismatch between raw HTML and rendered state (shared sitewide issue, but this is the page it's "supposed" to be correct on).
23. **Security observations:** none page-specific.
24. **Trust signals:** 6 named testimonials with title/company; "8+ years," "3 countries," "98% satisfaction" stats.
25. **Copywriting:** strong — specific, benefit-led, avoids generic filler; the SMB/coach aside is a good secondary-audience nod (see §23).
26. **Navigation:** full 8-item nav + WhatsApp float; no breadcrumb shown (breadcrumb schema exists but isn't visually rendered on this single-level page, which is fine).

### Page: About (`/about`)
- **H1:** "Building Digital Excellence With Real Expertise"
- **Sections:** hero (badge "8+ Years of Enterprise Development Experience", 4 stats) → founder story (2 paragraphs + 3 highlight chips + pull-quote from Kamran Sohail) → 6-item career milestone timeline (2017–2024) → 6 "expertise area" cards with tech-stack tags → 4 "core values" (numbered 01–04) → 6 "why choose us" advantage cards.
- **CTAs:** none distinctly called out beyond global nav/WhatsApp — consider adding a consultation CTA at the end of the story section.
- **Forms:** none.
- **Notable content:** explicitly names real employers/clients (Eposelive, TakDevs, Metropolitan, Inspire System, CareCloud) — strong specificity; explicitly states remote base (Islamabad, Pakistan, UTC+5) — relevant to the international-client trust story.
- **SEO title/description target:** "About Nexa Web Service — Software Solutions Team" / mentions Kamran Sohail by name and role.
- **Issue:** no direct CTA at the end of a page that's clearly building trust/rapport — a missed conversion opportunity.

### Page: Services (`/services`)
- **H1 (raw, contains inline HTML span):** "Services That **Transform** Your Business"
- **Sections:** hero (3 stats: 50+ projects / 98% satisfaction / 8+ years) → 6 detailed service cards (SEO & Website Optimization, Digital Transformation, Custom Development, Performance Optimization, Strategic Consulting, Cloud & DevOps), each with a feature checklist and 3 benefit-tag chips.
- **CTAs:** implicit via each card; recommend an explicit "Get a quote for this service" per card rather than relying on global nav CTA.
- **SEO title target:** "Services - Digital Transformation, Cloud Migration & Custom Development | USA".
- **Issue:** sitemap lists 4 anchor-fragment "sub-pages" of this route that aren't real, separately-crawlable pages (§3, §13.1).

### Page: Portfolio (`/portfolio`)
- **H1:** "Case Studies & Representative Work"
- **Sections:** hero (badge "🏆 8+ Years of Enterprise Development Experience") → 4 impact stats (50+ projects / 3x performance gain / 40% cost reduction / 4.9/5 rating) → 6 industry chips (E-Commerce, Financial Services, Healthcare, Manufacturing, Logistics, Education) → **37 detailed case studies**, each with company/industry/duration/team-size, challenge/solution narrative, 4 quantified results, and a technology tag list.
- **SEO title target:** "Portfolio - Case Studies & Completed Projects | Software Solutions".
- **Issue:** all 37 case studies live on one URL — same indexability problem as the blog (§6.6), at smaller scale; see §16/§19 for the recommended fix.

### Page: Blog (`/blog`)
- **H1 (list view):** hero heading (marketing copy) / **H1 (article view):** the selected article's own title — confirmed both exist in source but are mutually exclusive via `*ngIf`, so only one `<h1>` renders at a time (not a duplicate-H1 bug).
- **Content:** 48 full articles across 8 categories (System Architecture, Cloud Computing, Performance, AI & Machine Learning, Security, Modern Frontend, DevOps, Digital Transformation) — full title list in §17 (Full Text appendix) below. Articles are genuinely long-form (multiple `<h2>`/`<h3>` sections, code blocks, lists) — not thin content.
- **Critical issue:** no individual article URLs (§6.6) — this is the page where the fix in §12.5 matters most.

### Page: Contact (`/contact`)
- **H1:** "Start Your Transformation Journey"
- **Sections:** hero (badge "Let's Connect") → 3 "why book a call" benefit cards → two-column layout (contact info + methods on the left, form on the right) → FAQ accordion → stats band.
- **Form fields:** Name*, Email*, Company*, Main Challenge* (select, 7 options), Budget Range* (select, 7 options), Project Timeline* (select, 4 options), Project Details (optional textarea). Submits via EmailJS; fires GA4/Meta Pixel conversion events + a server-side Netlify function on success.
- **Issues:** `alert()` validation (§5, §8), no CAPTCHA (§10, §13.5), fairly long required-field list for a "no-obligation" first touch (§20).

### Page: Courses / "Academy" (`/courses`)
- **H1 (raw, inline HTML):** "Master **Modern Development** — Build Your Tech Career"
- **Sections:** hero (4 stats: 500+ graduates / 95% job placement / 4.9/5 rating / $85K avg. starting salary) → 4 value props → 6 courses (HTML & CSS, Bootstrap, JavaScript, React, Angular, Full Stack) each with level, duration, topic list, and price.
- **Issue:** missing from `sitemap.xml` (§13.1); course prices here diverge from the `course_pricing_tiers` figures possibly shown on `/pricing` for the same course names (§11 #15).
- **Issue:** "$85K Avg. Starting Salary" and "95% Job Placement" are strong, specific-sounding claims for a brand-new academy (site launched 2024 per About) — worth confirming these are substantiated, since unsubstantiated outcome claims in education marketing carry real reputational/regulatory risk in some jurisdictions.

### Page: Pricing (`/pricing`)
- **H1:** "Simple, Honest Pricing"
- **Sections:** 3 service plans (Starter $500 / Business $2,000 / Enterprise $10,000+) → course pricing tiers (6 items, $39–$249) → 5-step engagement process.
- **Critical issue:** the $0 regional-pricing bug (§12.6) lives here and on `/courses` — this is the page most damaged by it, since it's the one place a comparing buyer expects numbers to just work.
- **Issue:** missing from `sitemap.xml` (§13.1).

### Page: FAQ (`/faq`)
- **H1:** "Frequently Asked Questions"
- **Content:** 23 Q&As across 5 categories (Working Internationally — 5, Payments & Pricing — 5, Projects & Process — 5, Academy/Courses — 5, Support & Maintenance — 3). Full text in §17 appendix.
- **Issue:** missing from `sitemap.xml` (§13.1); the static sitewide `FAQPage` JSON-LD (§6.7) covers only 5 generic questions, none of which match this page's real 23 — a missed rich-result opportunity specifically on the one page schema should be describing.

### Page: Privacy Policy / Terms of Service
- **Do not exist.** See §12.7. This is listed as its own "page" entry deliberately, because a buyer or crawler looking for it will find a silent redirect to the homepage — worth treating as a missing page in its own right, not a footnote.

---

## 27. Full Text Content of Every Page

*(Reconstructed from the live-rendered homepage plus the site's Supabase seed source, which is the verified production content source — see method note at top of §26. Presentational markup/emoji retained where it's part of the actual on-page label.)*

### Home — Full Text
```
We Engineer
Build · Launch · Grow
For Your Business

From concept to deployment, we deliver enterprise-grade software solutions that drive growth.
Backed by 8+ years of hands-on Angular, React, .NET Core, and Azure DevOps experience —
including US Healthcare SaaS and UAE enterprise ERP — Nexa Web Service brings senior-level
expertise at competitive rates.

We also help coaches, consultants, and service-based businesses optimize their websites for
search, speed, and conversions.

Enterprise Solutions · Cloud Architecture · SEO & Optimization · 24/7 Support
[Start a Conversation] [Explore Case Studies]

success.config.ts
export const nexaWebService = {
  name: "Nexa Web Service Technologies",
  services: ["Custom Software", "Cloud Solutions", "SEO & Optimization"],
  commitment: "Excellence",
  readyToHelp: true
};

Angular 17+ · React · .NET Core · SEO & CWV
8+ Years Experience · 3 Countries Served · 98% Client Satisfaction
Scroll to explore

TRUSTED TECHNOLOGIES
Angular 17+ · React · TypeScript · .NET Core / C# · Node.js · Azure DevOps · SQL Server · GraphQL · MongoDB · GitHub Copilot

WHY CHOOSE US
Delivering Measurable Results
Every project is approached with a focus on business impact and technical excellence
40% Faster CI/CD — Reduced deployment cycles by 40% at CareCloud via Azure DevOps pipeline architecture
35% Query Speed Gain — Optimised SQL Server stored procedures cutting critical response times by 35% at Metropolitan
30% Faster Development — Led end-to-end feature cycles at Inspire System, cutting development turnaround by 30%
AI Accelerated Delivery — Daily use of GitHub Copilot, Claude, and GPT-4 — faster code, better quality, cleaner docs

WHAT WE DO
Services That Drive Growth
End-to-end solutions tailored to your unique business challenges

SEO & Website Optimization — Full technical SEO audits, on-page optimization, Core Web Vitals
improvements, and structured data implementation. We help Wix, WordPress, Webflow, and
custom-built sites rank higher and load faster.
  Technical SEO Audit · Core Web Vitals · Schema Markup · Page Speed Boost [Learn more]

Digital Transformation — Modernize legacy systems and embrace cloud-native architectures for the future
  Cloud Migration · API Development · Microservices [Learn more]

Custom Development — Full-stack enterprise applications built with scalability in mind
  Web Applications · Mobile Apps · Enterprise Software [Learn more]

Performance Optimization — Unlock speed and efficiency in your existing systems
  Code Optimization · Database Tuning · Caching Strategies [Learn more]

Strategic Consulting — Expert guidance on technology roadmaps and architecture decisions
  Tech Assessment · Team Mentoring · Architecture Review [Learn more]

WHY NEXA
Enterprise-Grade Thinking. Any Project Size.
Whether you're a Fortune 500 scaling infrastructure or a service-based brand optimizing your
digital presence — we bring senior-level expertise to every engagement.

Senior-Level Expertise — 8+ years of hands-on Angular, React, .NET Core, and Azure — not junior
talent with your work outsourced.
Proven Results — 40% faster CI/CD at CareCloud, 35% query speed gain at Metropolitan,
zero-downtime deployments across 3 countries.
SEO & Performance First — We don't just build sites — we optimize them. Technical SEO, Core Web
Vitals, and speed improvements built into every project.
Direct Communication — You work directly with the senior developer. No project manager chain,
no offshore handoffs — real accountability.
AI-Accelerated Delivery — Daily use of GitHub Copilot, Claude, and GPT-4 means faster delivery,
fewer bugs, and more focus on what matters.
Global Track Record — Enterprise solutions delivered across the US, UAE, and UK — including
HIPAA-compliant healthcare and Fortune-level ERP systems.
Enterprise & Mid-Market — SaaS platforms, cloud migration, legacy modernization, DevOps
pipelines, US Healthcare EHR, UAE enterprise ERP systems
Small Business & Coaches — Website redesigns, SEO & speed audits, landing pages,
Wix/WordPress/Webflow optimization, digital presence for service brands
[Get a Free Consultation]

TRACK RECORD
Impact By Numbers
8+ Years Experience · 3 Countries Served (US / UAE / UK) · 40% CI/CD Cycle Improvement (CareCloud) · 98% Client Satisfaction

Free Consultation
Ready to Transform Your Business?
Let's discuss how we can help you achieve your technical and business goals with a
no-obligation strategy session.
[Schedule Free Consultation]
✓ No commitment required ✓ 30-minute session ✓ Actionable insights

TESTIMONIALS (rotating carousel):
"Exceptional work. The modernization of our legacy system exceeded expectations. They delivered
on time and under budget while maintaining zero downtime during the transition."
— John Smith, Chief Technology Officer, Fortune 500 Tech Company

"A rare combination of technical expertise and business acumen. They understood our challenges
and delivered solutions that drove real revenue growth of 40% in the first quarter."
— Sarah Johnson, Founder & CEO, SaaS Startup

"Professional, responsive, and brilliant. They took our vague ideas and turned them into a
scalable, high-performing system that handles 10x our previous traffic with ease."
— Michael Chen, VP of Engineering, E-Commerce Leader

"The technical leadership and mentoring they provided transformed our entire engineering team.
The knowledge transfer was exceptional and continues to benefit us."
— Emily Rodriguez, Engineering Manager, Financial Services Corp

"Outstanding ROI on the investment. Not just good code, but strategic solutions that aligned
perfectly with our business objectives and reduced operational costs by 60%."
— David Park, Chief Strategy Officer, Insurance Corporation

"Rare to find someone with this depth of expertise across so many technologies and the wisdom to
choose exactly the right tool for each problem we faced."
— Lisa Martinez, Product Director, Healthcare Tech

Trust stats: 50+ Happy Clients · 4.9 Avg. Rating · 98% Satisfaction · 24h Response Time
```

### About — Full Text
```
8+ Years of Enterprise Development Experience
Building Digital Excellence With Real Expertise
Nexa Web Service is a freshly launched agency backed by 8+ years of hands-on enterprise
development — Angular, React, .NET Core, Azure DevOps, and Healthcare SaaS. Senior-level work,
delivered directly to you.

Stats: 8+ Years Experience · 5 Companies Served · 3 Countries (US / UAE / PK) · 2024 Agency Founded

OUR STORY
Our journey reflects 8+ years of building real enterprise software for US and international
clients — fully remote. From launching an Angular SSR application for a US logistics company
(Metropolitan), to delivering HIPAA-compliant healthcare modules at CareCloud (US), to building
complex ERP systems for UAE enterprise clients — we have navigated demanding requirements across
industries and timezones.

In 2024, we launched Nexa Web Service to bring that same senior-level expertise directly to
businesses like yours — without agency overhead. You work with an experienced senior developer,
not a junior who escalates everything. Every project gets clean architecture, real performance,
and code built to last.

Highlights: 🎯 Mission-Driven — Solutions that align with your business goals
            🤝 Partnership Approach — Your success is our success
            🚀 Results-Focused — Delivering measurable business value

"Every line of code I write carries 8 years of production experience — from HIPAA-compliant
healthcare platforms to enterprise ERP systems across three countries. My clients get that
senior-level thinking on every task, not just the big ones."
— Kamran Sohail, Founder, Nexa Web Service · Senior Full Stack Developer

TIMELINE
2017 — Started — Frontend Developer (Eposelive)
2019 — Full Stack — Angular + Node.js (TakDevs)
2021 — Remote US Client — Full Stack (Metropolitan)
2022 — Enterprise ERP — UAE (Inspire System)
2024 — US Healthcare SaaS — Angular 17 (CareCloud)
2024 — Nexa Web Service — Launched

EXPERTISE AREAS
Frontend — Angular & React — 8+ years building enterprise Angular and React UIs — from
  healthcare SaaS dashboards to ERP workflows handling thousands of daily users
  (Angular 2–17+, React, TypeScript, RxJS, NgRx/Redux, HTML5/CSS3)
UI Frameworks & Design Systems — Hands-on experience with major enterprise UI component
  libraries, building consistent and accessible design systems
  (Telerik Kendo UI, Angular Material, CoreUI, Bootstrap, Material UI, DevExtreme)
Backend — .NET Core & Node.js — Production REST APIs and business logic in .NET Core/C# and
  Node.js, with SQL-optimised data layers for high-volume applications
  (.NET Core/C#, Node.js, Strapi, REST APIs, GraphQL, Microservices)
Databases — Relational and NoSQL databases — stored procedure optimisation that reduced query
  response times by 35% in production (SQL Server, MySQL, PostgreSQL, MongoDB)
DevOps & Cloud — Azure DevOps CI/CD pipelines that reduced deployment cycles by 40% at
  CareCloud. Experienced with cloud-native deployments and infrastructure automation
  (Azure DevOps, CI/CD Pipelines, Git/GitHub, Netlify, Railway, FileZilla)
AI-Powered Development — Daily use of AI tools to accelerate development velocity, improve
  code quality, and deliver better-documented code faster
  (GitHub Copilot, ChatGPT (GPT-4), Claude (Anthropic), OpenAI Codex)

CORE VALUES
01 Clean Architecture First — Reusable components, consistent patterns, and code built to be
   maintained — not just to ship. Standards enforced through peer review and clean architecture
   principles.
02 Transparent & Async-Ready — Daily updates, clear timelines, and zero surprises — the same
   async discipline built across 8 years of remote work for US and UAE clients.
03 Performance is Non-Negotiable — Lighthouse scores, query response times, CI/CD speed —
   measurable performance matters in production, not just in demos.
04 AI-Augmented Quality — Using GitHub Copilot, Claude, and GPT-4 daily means faster delivery
   and higher quality — not shortcuts. AI handles the boilerplate; judgment handles the
   architecture.

WHY CHOOSE US
🇺🇸 Real US Client Experience — Worked directly with US companies — CareCloud (Healthcare SaaS,
   Hybrid US) and Metropolitan Warehouse & Delivery (Remote, US). We understand American
   delivery standards, communication norms, and business expectations.
⏰ Async-Friendly & Remote-First — Based in Islamabad, Pakistan (UTC+5). 8+ years of async remote
   collaboration across US, UAE, and UK — you receive morning updates every day and replies
   within hours, not days.
💬 Senior Developer Directly — You work with an 8+ year senior developer, not a project manager
   or junior who escalates everything. Your vision stays intact from kickoff to launch.
🏥 Healthcare & Enterprise Grade — HIPAA-aware development experience from CareCloud. Enterprise
   ERP and complex workflow experience from Inspire System. We know what production-grade means.
💰 Competitive Pricing — Senior-level quality at offshore rates. You get the expertise of a US
   agency without the US agency price tag — fully transparent, no hidden costs.
🤖 AI-Accelerated Delivery — Daily use of GitHub Copilot, ChatGPT, Claude, and OpenAI Codex means
   faster delivery, higher code quality, and better documentation — without cutting corners.
```

### Services — Full Text
```
Expert Solutions
Services That Transform Your Business
From digital transformation to custom development, we deliver end-to-end solutions that drive
real business results

Stats: 50+ Projects Delivered · 98% Client Satisfaction · 8+ Years Experience

SEO & Website Optimization
Full technical SEO audits, on-page optimization, Core Web Vitals improvements, and structured
data implementation. We help Wix, WordPress, Webflow, Squarespace, and custom-built sites rank
higher and load faster — with a clear audit report and fix list you can act on immediately.
Features: Technical SEO audit & report · On-page optimization (titles, H tags, meta) · Core Web
  Vitals & page speed fixes · Schema markup & structured data · Wix/WordPress/Webflow
  optimization · Free Website Audit CTA
Tags: Higher Rankings · Faster Load · More Leads

Digital Transformation
Transform legacy systems into modern, scalable platforms with zero-downtime migrations and
strategic cloud adoption.
Features: Legacy system modernization · Cloud migration (Azure/AWS) · API-first architecture ·
  Microservices design · Zero-downtime deployments · Data migration strategies
Tags: 40% Cost Reduction · 3x Faster · 99.9% Uptime

Custom Development
Full-stack enterprise applications built for your specific needs with focus on performance,
scalability, and maintainability.
Features: Enterprise app architecture · Angular/React frontends · .NET/Node.js backends ·
  Real-time dashboards · E-commerce platforms · High-performance systems
Tags: Custom Built · Scalable · Production-Ready

Performance Optimization
Unlock hidden potential in existing systems through strategic optimization achieving 3x average
performance improvement.
Features: Performance audits · Code optimization · Database tuning · Caching strategies · CDN
  optimization · Monitoring setup
Tags: 3x Faster · Lower Costs · Better SEO

Strategic Consulting
Expert guidance on technology decisions with comprehensive roadmaps aligned with your business
objectives.
Features: Technology roadmaps · Architecture reviews · Team mentoring · Tech selection
  guidance · Risk assessment · Cost-benefit analysis
Tags: Expert Guidance · Risk Mitigation · ROI Focus

Cloud & DevOps
Automate deployments, scale infrastructure, and ensure reliability with modern cloud and DevOps
practices.
Features: CI/CD pipelines · Containerization (Docker/Kubernetes) · Cloud scaling (AWS/Azure) ·
  Monitoring & logging · Disaster recovery · Infrastructure as Code
Tags: 99.99% Uptime · Automated · Scalable
```

### Portfolio — Full Text (hero, stats, industries + representative case studies)
```
🏆 8+ Years of Enterprise Development Experience
Case Studies & Representative Work
The following case studies illustrate the types of solutions, challenges, and results our
expertise can deliver. They represent the scope and quality of work we bring to every
engagement.

Impact stats: 50+ Projects Delivered · 3x Performance Gain (avg. system performance improvement)
· 40% Cost Reduction (avg. savings in operational costs) · 4.9/5 Client Rating (avg. satisfaction
score)

Industries served: E-Commerce & Retail · Financial Services · Healthcare · Manufacturing ·
Logistics · Education

--- Representative case studies (of 37 total; full set in supabase/seed/05_portfolio.sql) ---

E-Commerce Platform Modernization — Fortune 500 Retail Company (Retail & E-Commerce)
  Type: Platform Modernization · Duration: 8 months · Team: 4 developers
  Challenge: Legacy monolithic e-commerce platform causing slow deployments, scaling issues
    during peak seasons, and poor mobile experience leading to 35% cart abandonment.
  Solution: Implemented microservices architecture with Angular PWA frontend, Node.js backend,
    and Azure cloud infrastructure. Introduced CI/CD pipelines, containerization with
    Kubernetes, and implemented a headless commerce approach.
  Results: 300% faster page load times · 10x peak traffic capacity · 50% reduced cart
    abandonment · $2M annual savings
  Tech: Angular, Node.js, Docker, Kubernetes, Azure, PostgreSQL, Redis

Enterprise CRM System Integration — B2B SaaS Company (Technology)
  Type: System Integration · Duration: 6 months · Team: 3 developers
  Challenge: Multiple disconnected systems causing data silos, hours of manual data entry, and
    limited real-time reporting capabilities affecting sales team productivity.
  Solution: Built unified API layer with .NET Core, created real-time Power BI dashboards, and
    implemented automated workflows with Azure Logic Apps to integrate 5 disparate systems.
  Results: 75% less manual data entry · Real-time cross-system sync · 60% faster reporting ·
    $1.5M revenue increase
  Tech: .NET Core, Angular, SQL Server, Azure Service Bus, Power BI, Azure Logic Apps

Legacy System Modernization — Insurance Industry Leader (Insurance & Finance)
  Type: Digital Transformation · Duration: 18 months · Team: 6 developers
  Challenge: 20-year-old mainframe system with $500K annual licensing costs, difficulty hiring
    specialized talent, and 6-month feature deployment cycles limiting market competitiveness.
  Solution: Systematically migrated monolithic COBOL application to .NET microservices with
    Angular frontend using strangler fig pattern, maintaining zero downtime throughout migration.
  Results: $5M 3-year savings · 40x faster deployments · 200+ dev talent pool access · 99.99%
    system uptime
  Tech: .NET Core, Angular, Azure, Docker, PostgreSQL, Event Sourcing, Kafka

Real-Time Analytics Platform — Financial Services Company (Financial Services)
  Type: Data Platform · Duration: 10 months · Team: 5 developers
  Challenge: Batch-based analytics system with 24-hour data lag causing delayed business
    insights, missed trading opportunities, and inability to detect fraud in real-time.
  Solution: Built real-time streaming data pipeline with Apache Kafka, created interactive
    Angular dashboards, implemented ML-powered anomaly detection, and deployed on AWS for global
    scale.
  Results: 100x faster data processing · Real-time fraud detection · $800K infrastructure
    savings · 30% revenue increase
  Tech: Node.js, Angular, Apache Kafka, Elasticsearch, AWS, Python, TensorFlow

Healthcare Patient Portal — Regional Hospital Network (Healthcare)
  Type: Patient Experience · Duration: 12 months · Team: 5 developers
  Challenge: Fragmented patient experience with separate portals for appointments, records, and
    billing. Low patient engagement and high call center volumes for routine inquiries.
  Solution: Built unified HIPAA-compliant patient portal with Angular frontend, secure .NET
    backend, integrated with Epic EHR via FHIR APIs, and added telehealth capabilities.
  Results: 85% patient adoption rate · 60% fewer call center calls · 4.8/5 patient satisfaction
    · 50% faster appointment booking
  Tech: Angular, .NET Core, Azure, FHIR APIs, Epic Integration, SQL Server, WebRTC

[... 32 additional case studies covering Manufacturing/IoT, EdTech, Fintech Payments,
Restaurant POS, Insurance Claims Automation, Smart City Traffic Management, and more — full
verbatim text available in supabase/seed/05_portfolio.sql for the complete set of 37]
```

### Blog — Full Text (hero + complete article index; full article bodies omitted for length)
```
Hero: marketing copy introducing "Insights" (technical articles on architecture, cloud,
performance, AI, security, frontend, DevOps, and digital transformation)

8 Categories: System Architecture · Cloud Computing · Performance · AI & Machine Learning ·
Security · Modern Frontend · DevOps · Digital Transformation

All 48 articles (title — category), each a genuine multi-section long-form piece with H2/H3
structure, code samples, and lists — full HTML bodies live in supabase/seed/07_blog.sql:

 1. The Complete Guide to Digital Transformation in 2024
 2. Why Angular SSR Beats React for SEO in 2024
 3. Microservices: When to Use and When to Avoid
 4. Essential Design Patterns for Enterprise Systems
 5. Domain-Driven Design: A Practical Guide
 6. Event-Driven Architecture: Complete Implementation Guide
 7. RESTful API Design: Best Practices and Patterns
 8. CQRS Pattern: Separating Reads from Writes
 9. Hexagonal Architecture: Ports and Adapters Pattern
10. The Modular Monolith: Best of Both Worlds
11. Saga Pattern for Distributed Transactions
12. The 12-Factor App: Cloud-Native Design Principles
13. Cost Optimization in Cloud Architectures
14. AWS Well-Architected Framework: Building Reliable Systems
15. Azure Landing Zones: Enterprise-Scale Foundation
16. Running Kubernetes in Production: Lessons Learned
17. Serverless Architecture Patterns and Best Practices
18. Terraform Best Practices for Team Collaboration
19. Multi-Cloud Strategy: When and How to Implement
20. Building High-Performance APIs with .NET Core
21. Core Web Vitals: Optimizing for User Experience
22. Database Performance Tuning: From Queries to Indexes
23. Caching Strategies: From Browser to Database
24. Frontend Performance: Bundle Size and Load Time
25. Load Testing: Finding Breaking Points Before Users Do
26. AI Integration in Enterprise Applications
27. Integrating Large Language Models into Enterprise Applications
28. Building Production ML Pipelines with MLflow
29. Computer Vision in Enterprise: Practical Applications
30. Building Recommendation Systems That Actually Work
31. NLP and Text Analytics for Business Intelligence
32. Implementing Zero Trust Architecture
33. API Security Best Practices for Modern Applications
34. DevSecOps: Integrating Security into CI/CD Pipelines
35. Cloud Security Architecture: AWS, Azure, and GCP
36. Modern Authentication Patterns: OAuth, OIDC, and Beyond
37. Secure Coding Practices Every Developer Must Know
38. Security Incident Response for Development Teams
39. Angular Signals: The Future of Reactivity
40. React Server Components: A Complete Guide
41. Advanced TypeScript Patterns for Large-Scale Applications
42. Modern State Management: Zustand, Jotai, and Beyond
43. Frontend Testing Strategies: Unit, Integration, and E2E
44. Building Design Systems with Modern CSS
45. Building Accessible Web Applications: A Developer's Guide
46. Micro Frontends: Scaling Frontend Development
47. Progressive Web Apps: From Zero to Production
48. Next.js App Router: The Complete Guide
49. DevOps Best Practices for Fast Deployment
```
*(Note: list shows 49 numbered lines because of one duplicated sort_order pair in the seed data around "AI Integration in Enterprise Applications" / "Integrating Large Language Models..." — worth a quick dedupe check against the live `/blog` page, but does not change the overall finding that this is a large, substantive article library.)*

### Contact — Full Text
```
Let's Connect
Start Your Transformation Journey
Schedule a free 30-minute strategy session to discuss your project goals and discover how we
can work together

Benefits:
Free 30-Min Strategy Session — No obligation consultation to understand your unique needs and
  challenges
Actionable Recommendations — Walk away with concrete next steps and ROI projections for your
  project
8+ Years of Enterprise Experience — US Healthcare SaaS (CareCloud), UAE Enterprise ERP
  (Inspire), US Logistics (Metropolitan) — industry-tested solutions tailored to your situation

Send a Message
Fill out the form below and we'll get back to you shortly
Form fields: Your Name* · Email Address* · Company Name* · Main Challenge* (Legacy System
  Modernization / Cloud Migration / Performance Optimization / Scalability Issues / Custom
  Development / Building Dev Team / Other) · Budget Range* (<$5K / $5K–10K / $10K–25K /
  $25K–50K / $50K–100K / $100K+ / Not sure yet) · Project Timeline* (Immediate–30 days / within
  3 months / within 6 months / exploring options) · Project Details (optional)
[Send Message] — "Your information is secure and will never be shared."

WhatsApp: https://wa.me/923447510711 ("Hi Kamran, I found your website and I'm interested in
  your services.")
Email: contact@nexawebservice.com
Hours: Mon–Fri, 9AM–6PM EST
Location: Serving Clients Worldwide
```

### Courses / Academy — Full Text
```
Nexa Web Service Academy
Master Modern Development
Build Your Tech Career
Industry-leading training programs designed by Silicon Valley experts. Learn in-demand skills,
build real-world projects, and accelerate your career in tech.

Stats: 500+ Graduates · 95% Job Placement · 4.9/5 Student Rating · $85K Avg. Starting Salary

Value props:
Structured Learning — Carefully designed curriculum that takes you from zero to job-ready in
  weeks
Hands-On Projects — Build 10+ real-world projects for your portfolio that impress employers
1-on-1 Mentoring — Personalized guidance from a senior developer with 8+ years of real
  enterprise experience
Career Support — Resume review, interview prep, and direct job placement assistance

Courses:
HTML & CSS Fundamentals (Beginner, 4 weeks, $49) — Master the building blocks of the web. Learn
  semantic HTML5, modern CSS3, Flexbox, Grid, and responsive design principles.
  Topics: HTML5 Semantics, CSS3 Styling, Flexbox & Grid, Responsive Design, Accessibility, Best
  Practices
Bootstrap Framework (Beginner, 3 weeks, $39) — Build beautiful, responsive websites quickly.
  Master Bootstrap's grid system, components, and customization techniques.
  Topics: Bootstrap Grid, UI Components, Responsive Utilities, Custom Themes, SASS Integration,
  Real Projects
JavaScript Essentials (Intermediate, 6 weeks, $79) — Master the programming language of the web.
  Learn ES6+, async programming, DOM manipulation, and API integration.
  Topics: ES6+ Features, DOM Manipulation, Event Handling, Async/Await, Fetch API, Error
  Handling
React Development (Advanced, 8 weeks, $99) — Build modern, interactive UIs with React. Master
  components, hooks, state management, and production-ready patterns.
  Topics: React Fundamentals, Hooks & State, Context API, React Router, Performance, Testing
Angular Framework (Advanced, 8 weeks, $99) — Build enterprise-grade applications with Angular.
  Master TypeScript, components, services, and advanced patterns.
  Topics: TypeScript, Components, Services & DI, Routing, Forms, RxJS, NgRx
Full Stack Development (Professional, 12 weeks, $149) — Become a complete developer. Master
  frontend, backend, databases, and deployment to build full applications.
  Topics: Frontend Mastery, Node.js/Express, MongoDB/SQL, Authentication, REST APIs, Cloud
  Deployment
```

### Pricing — Full Text
```
Simple, Honest Pricing

Service Plans:
Starter — $500/project — Perfect for small businesses needing a professional web presence
  Features: Landing page or portfolio site · Responsive mobile design · Contact form
  integration · Basic SEO setup · 2 rounds of revisions · Delivery in 1–2 weeks · 1 month
  post-launch support

Business (Featured/Popular) — $2,000/project — For growing businesses needing a full multi-page
  website or web app
  Features: 5–10 page website or web app · Custom design & branding · CMS or admin dashboard ·
  API/backend integration · Full SEO optimization · Performance optimization · 3 months
  post-launch support · Google Analytics setup

Enterprise — $10,000+/project — Complex platforms, digital transformation, and legacy
  modernization
  Features: Full-stack enterprise application · Cloud architecture (AWS/Azure) ·
  Microservices/API design · Legacy system modernization · CI/CD pipeline setup · Security &
  compliance review · Team training & documentation · 6+ months ongoing support · Dedicated
  project manager

Academy Course Pricing Tiers:
HTML & CSS Fundamentals (Beginner, 4 weeks) — $79
Bootstrap Framework (Beginner, 3 weeks) — $59
JavaScript Essentials (Intermediate, 6 weeks) — $119
React Development (Advanced, 8 weeks) — $169
Angular Framework (Advanced, 8 weeks) — $169
Full Stack Development (Professional, 12 weeks) — $249
[NOTE: these figures differ from the same course names/durations on the /courses page — see
Technical Issue #15]

How It Works:
01 Free Consultation — 30-minute call to understand your goals, scope, and budget — zero
   obligation.
02 Detailed Proposal — You receive a written proposal with timeline, deliverables, and fixed
   price within 24 hours.
03 Agreement & Kickoff — Sign a simple contract, pay 50% upfront via PayPal or Wise, and we
   start work.
04 Build & Review — Regular updates and demos. You review and give feedback at each milestone.
05 Launch & Support — Final payment on delivery. We stay available for post-launch support and
   changes.

[CRITICAL: for any visitor whose browser timezone resolves to Asia/Dubai or Asia/Karachi, every
price above renders as "AED 0" or "PKR 0" instead of the USD figures shown — see Critical Fix #6]
```

### FAQ — Full Text
```
Frequently Asked Questions

WORKING INTERNATIONALLY
Do you work with US clients remotely?
  Yes — absolutely. We work with US clients every day. Our team delivers US-level expertise at
  a competitive rate, with timezone flexibility to overlap with US business hours. We've
  successfully delivered projects for clients in New York, Texas, California, and across the US.
How do you handle the timezone difference?
  We operate on UTC+5, which overlaps with US Eastern mornings and US West Coast late evenings.
  We schedule all calls and standups to suit your timezone, typically at a time that works for
  you between 8am–12pm EST. Async communication via Slack/email handles the rest seamlessly.
How do we communicate during the project?
  We use whichever tools you prefer: Slack for daily communication, Zoom/Google Meet for calls,
  Notion or Linear for project tracking, and GitHub for code reviews. You'll always know the
  project status without needing to chase us.
Have you worked with US clients before?
  Yes. We have completed 50+ projects for international clients including US-based businesses
  across e-commerce, SaaS, healthcare, and finance. References are available upon request.
Do I need to worry about language barriers?
  Not at all. Kamran and the team are fully fluent in English — both written and spoken. All
  documentation, code comments, and communication are in English.

PAYMENTS & PRICING
How do I pay in USD from the US?
  We accept payments via PayPal, Wise (TransferWise), and direct bank wire transfer. All are
  safe, standard methods used by US clients daily. You'll receive a proper invoice in USD before
  any payment is due.
What is the payment structure?
  Standard structure: 50% upfront to begin work, 50% on delivery. For larger projects (over
  $5K), we use milestone-based payments — you pay per completed phase. We never ask for 100%
  upfront.
Are your prices negotiable?
  We price projects based on scope, not arbitrary numbers. During the free consultation, we'll
  understand exactly what you need and give you a fixed quote. If the scope changes, we discuss
  it openly — no surprise invoices.
Do you charge by the hour or per project?
  We prefer fixed-price projects — it protects you from runaway costs. For ongoing maintenance
  or consulting retainers, we offer hourly rates starting at $25/hr. Rates are clearly agreed
  before any work begins.
Is there a refund policy?
  Yes. If we fail to deliver what was agreed in the contract, you are entitled to a partial or
  full refund for undelivered work. We've never had to issue a refund — but the protection is
  there in writing.

PROJECTS & PROCESS
What types of projects do you take?
  We specialize in web applications, business websites, e-commerce platforms, SaaS products, API
  development, and legacy system modernization. We also offer technical consulting and code
  reviews.
How long does a project take?
  A landing page: 1–2 weeks. A full business website: 3–6 weeks. A web application or SaaS: 2–4
  months. Enterprise projects: 6–12 months. We give you a realistic timeline upfront — not one
  we can't keep.
What do you need from me to start?
  Just your goals, any existing brand assets (logo, colors), and examples of sites you like. We
  handle everything else — design, development, deployment. A 30-minute call is usually enough
  to get started.
Do you sign NDAs?
  Yes, without hesitation. We take confidentiality seriously. We're happy to sign your NDA before
  discussing any proprietary details of your project.
Who owns the code after the project?
  You do — 100%. On final payment, full ownership of all code, design assets, and intellectual
  property transfers to you. This is written into every contract.

ACADEMY / COURSES
Are the courses self-paced or live?
  Courses are taught with a mix of recorded content and live mentorship sessions. You can follow
  at your own pace, and weekly 1-on-1 mentor calls keep you on track.
Do I get a certificate?
  Yes. Every course includes a certificate of completion that you can add to your LinkedIn
  profile and resume.
Is the academy only for beginners?
  No. We offer courses from complete beginner (HTML & CSS) to professional full-stack
  development. There's a path for every level.
What if I fall behind or need more help?
  No problem. You get lifetime access to course materials. If you need extra help, just message
  your mentor on WhatsApp — we're responsive and want to see you succeed.
Can international students enroll?
  Yes — students from any country can enroll. Courses are taught in English and available
  online. Payment can be made via PayPal or Wise.

SUPPORT & MAINTENANCE
What happens after the project launches?
  All projects include a post-launch support period (1 month for Starter, 3 months for
  Business, 6+ months for Enterprise). During this time, we fix any bugs at no extra charge and
  answer questions.
Do you offer ongoing maintenance?
  Yes. We offer monthly maintenance retainers starting at $150/month, which includes updates,
  security patches, performance monitoring, and up to 5 hours of changes per month.
What if I find a bug after support ends?
  Bug fixes after the support period are billed at our hourly rate ($25/hr). Most fixes are
  quick and inexpensive. We never leave a client stranded.
```

### Privacy Policy / Terms of Service
```
[No content — these pages do not exist on the live site. Any URL under /privacy or /terms
redirects client-side to the homepage, and the server returns the homepage's HTML/HTTP 200 for
both. See Critical Fix #7.]
```

---

## 28. Source Code Analysis

**Stack (confirm before sharing with a reviewer expecting "React"):** This is an **Angular 17+ standalone-components application**, not React — despite React being listed as a "tech stack" badge in the marketing copy (the business does React work for clients; the site itself is Angular). Key facts:

- **Framework:** Angular 17+, standalone components (no `NgModule`s), `provideRouter`/`provideHttpClient`/`provideAnimations` in `app.config.ts`.
- **Routing:** `src/app/app.routes.ts` — 9 flat top-level routes (`/`, `/about`, `/services`, `/portfolio`, `/blog`, `/contact`, `/courses`, `/pricing`, `/faq`), each with a `resolve: { seo: pageSeoResolver }` that fetches per-route SEO metadata from Supabase before route activation. Wildcard (`**`) silently `redirectTo: ""` — no real 404 component (§12.2).
- **Components:** `AppComponent` (root shell: loader + header + `<router-outlet>` + footer + a hardcoded WhatsApp floating link) → `HeaderComponent` (DB-driven nav via `nav_items` table, mobile hamburger with correct ARIA), `FooterComponent` (DB-driven `footer_links`/`social_links`/`site_info`, includes a newsletter-signup form that also submits via EmailJS), `LoaderComponent` (global route-transition spinner driven by an HTTP interceptor), `TestimonialsComponent` (**defined but not imported/used anywhere** — dead/orphaned component; matches this project's own documented convention of leaving `video_testimonials` empty), `ThemeSwitcherComponent`.
- **Pages:** one component per route under `src/app/pages/*`, each a large single-file Angular component (inline template + inline/adjacent SCSS + TS logic in one file, 480–1,130 lines each) that subscribes to `ContentService` observables for its Supabase-backed content.
- **Services (the interesting layer):**
  - `ContentService` — generic Supabase query wrapper (`getAll`/`getRow`) with an `Angular TransferState`-based cache, explicitly designed so SSR-fetched data is reused on the client instead of re-fetched on hydration. **This exists for an SSR flow that isn't currently deployed** — it's correctly engineered, just currently inert (§6.1).
  - `SeoService` — listens for `NavigationEnd`, pulls resolved SEO data, updates `Title`/`Meta`/canonical `<link>` in the DOM directly (`document.querySelector`/`createElement`) — a client-side-only mutation strategy that only helps clients that execute JS and wait for it (§6.2).
  - `page-seo.resolver.ts` — Angular `ResolveFn` querying `page_seo` table by route path/slug.
  - `RegionService` — detects visitor region from `Intl.DateTimeFormat().resolvedOptions().timeZone` (`Asia/Karachi`→PAK, `Asia/Dubai`→UAE, else→US), exposes `formatPrice()` used by pricing/courses. **Defaults to US region during SSR/before hydration by design (a deliberate, correct choice for crawler consistency) — but the region-specific price data itself is zero for non-US regions, and `formatPrice()` only falls back to "Contact us" on `null`/`undefined`, not on `0`** (§11 #6, the actual bug).
  - `SupabaseClientService`, `ArticleService`, `EnrollService`, `LoaderService`, `ThemeService` — supporting infrastructure, all consistent with the DB-driven-content architecture.
  - `utils/local-business-schema.ts`, `utils/social-sharing.ts` — schema/sharing helpers.
- **SEO implementation, concretely:** static, correct-looking meta/OG/Twitter/JSON-LD tags are baked into `src/index.html` (used as the fallback/default for every route because nothing server-renders them per-route), then `SeoService` attempts to override them client-side per route once data resolves. The static defaults were clearly written carefully (full OG/Twitter/LinkedIn/Pinterest tags, 5 JSON-LD schema blocks, verification meta stubs) — the SEO *intent* here is genuinely thorough; the gap is entirely that none of it is route-aware at the HTTP-response level (§6 throughout).
- **Performance bottlenecks (structural, from source + network trace):** (1) no SSR/prerender in the deployed build (§6.1/§9); (2) a single `main.[hash].js` bundle with no evidence of route-level lazy-loading in the network trace (all page components are presumably eagerly bundled via direct imports in `app.routes.ts` rather than `loadComponent: () => import(...)`); (3) every page's real content is behind a Supabase network round-trip with no visible fallback/skeleton content beyond the generic loading spinner; (4) GSAP is loaded and run even where its target selector doesn't exist, wasting a small amount of script execution on every load (§4).
- **Build/deploy pipeline (the root cause of §6.1):** `angular.json`'s `build` architect target is the plain `@angular-devkit/build-angular:browser` builder. `package.json` separately defines `build:ssr` (`ng build --configuration production && npm run build:ssr:compile` → `ng run portfolio-ssr:server:production` → `node dist/portfolio-ssr/server/prerender.js`) and `serve:ssr`, but **`netlify.toml`'s build command is `npm install && npm run build`** — the plain browser build, not `build:ssr`. The SSR/prerender pipeline is fully coded but never invoked by the actual deployment.
- **Database:** Supabase/Postgres, schema in `supabase/schema.sql` (25 tables covering nav, footer, site info, page heroes, SEO, stats, features, services, tech stack, case studies, industries, testimonials, video testimonials, pricing plans, course pricing tiers, courses, FAQ categories/items, blog articles/categories/topics, about story, milestones, expertise areas), seeded via 8 modular files in `supabase/seed/` (`01_nav_footer.sql` → `08_page_seo.sql`) totaling ~11,000 lines, which is also the primary source used to reconstruct page content for §27 above.
