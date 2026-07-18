# Technical SEO Implementation Report — nexawebservice.com

**Date:** 2026-07-18
**Scope:** Fix every critical technical SEO issue identified in the prior audit so the site is fully crawlable, indexable, and production-ready. No UI, styling, layout, or visible content was changed — every change below is rendering/build/metadata plumbing.
**Result:** A full production build (`npm run build`) now runs successfully end-to-end, prerendering all **58 real routes** (9 static pages + 49 individual blog articles) to static HTML with correct, unique, per-page metadata — verified directly against the build output, not assumed.

---

## 1. Executive Summary

The root problem was never the content — it was that Angular Universal SSR existed in the repo but was never wired into the actual build, and the hand-written `main.server.ts`/`prerender.js` scaffolding that was supposed to invoke it was itself broken (wrong bootstrap API, wrong import path, wrong output paths). This report replaces that broken scaffolding with a correctly configured Angular 18 build-time prerendering (SSG) pipeline, adds real per-article blog routes, generates real sitemaps and OG images that previously didn't exist, adds a real 404 page, and expands JSON-LD structured data — then verifies all of it by actually running the production build and inspecting the generated static files, not just reading source code.

Three non-obvious, genuinely hard bugs had to be found and fixed for this to work at all (Sections 3.1–3.3 below); they're the reason this took real engineering rather than a config tweak.

---

## 2. Architecture Decision: Prerendering (SSG), not a runtime SSR server

**Decision:** Build-time prerendering of every route to static HTML, deployed as static files on Netlify — not a persistent Node SSR server.

**Why:** All page content is Supabase-driven but changes infrequently (it's edited via the database, not per-request/per-user). Netlify is a static host; running a real per-request Node SSR server would mean either a separate always-on server (which Netlify's plan here doesn't provide) or Netlify Functions (cold starts, added complexity, ongoing cost). Prerendering gets the exact same SEO outcome — full HTML content, correct meta tags, in `view-source` for every route — with zero runtime infrastructure: Netlify just serves the pre-built files, which is faster and simpler than it already does today.

Angular's own tooling supports this natively via the `prerender` build option with a `routesFile` (for parameterized routes like `/blog/:slug`, which can't be auto-discovered) — this is the mechanism used throughout.

---

## 3. The Three Hard Bugs (and why they mattered)

These are the reasons a first attempt at "just add SSR" wouldn't have worked. Each was found by actually running the build and reading the real error, not guessed at.

### 3.1 — `main.server.ts` didn't forward Angular's per-request `BootstrapContext`

`bootstrapApplication(rootComponent, options, context)` takes an optional third parameter — a per-render platform context that Angular's prerenderer creates fresh for every route (each route renders in its own isolated context, since 3 render simultaneously across worker threads). The previous rewrite of this file called `bootstrapApplication(AppComponent, config)` with no third argument. Result: **every single route** — including the homepage — failed to prerender with `ReferenceError: document is not defined`, because without that context, DOCUMENT-dependent providers (Meta/Title, SeoService, even Angular's own internal image-performance-warning check) had no request-scoped DOM to resolve against.

**Fix:** `main.server.ts` now accepts `context: BootstrapContext` and forwards it: `bootstrapApplication(AppComponent, config, context)`.

### 3.2 — The real browser animations engine can't run on the server

`app.config.ts` (shared between client and server) calls `provideAnimations()` — Angular's real animation engine, which reaches for `document`/browser globals as soon as it's constructed. That's fine in a browser; fatal in Node. This is what caused the *second* wave of "document is not defined" errors after fixing 3.1.

**Fix:** `app.config.server.ts` now overrides it with `provideNoopAnimations()` for the server only (via `mergeApplicationConfig`, where later providers win). Nothing in this app actually uses Angular's animation API for anything — all real animation is GSAP, which is already gated behind `isPlatformBrowser` checks everywhere — so the server never needed the real engine at all.

### 3.3 — Supabase's raw `fetch()` calls are invisible to Angular's "is this page ready to serialize?" check (the subtle one)

This is the bug that made `/blog/:slug` articles render as generic placeholders even after 3.1 and 3.2 were fixed, while static pages like `/about` looked fine — a genuinely confusing symptom, so the diagnosis is worth recording in full:

- Angular's prerenderer waits for `ApplicationRef.isStable` before capturing a page's final HTML. `HttpClient` requests automatically register themselves against that stability tracker — but this app's Supabase queries (`ContentService`, `ArticleService`) call the global `fetch` directly (that's how `@supabase/supabase-js` works), completely bypassing `HttpClient`. Angular had no idea those requests existed, so it considered pages "stable" — and serialized them — before the Supabase data ever came back.
- Static pages (`/`, `/about`, etc.) all use a router **resolver** (`pageSeoResolver`), and Angular's Router explicitly integrates resolver-waiting with the same stability system. That gave those pages' *other*, non-resolver Supabase calls (hero content, stats, etc.) just enough incidental extra time to finish before the "stable" check fired — timing luck, not a real guarantee.
- `/blog/:slug` has no resolver at all (its metadata comes from the article itself, not `page_seo`), so there was nothing keeping the page "unstable," and it reached the stability check — and got serialized — before the article fetch ever resolved. Confirmed by instrumenting the fetch: the network calls were completing in ~1–2 seconds, but the component's subscription callback that would have used that data simply never got the chance to run first.
- A first attempt to fix this by registering an `ExperimentalPendingTasks` task around the raw `fetch()` call reduced but didn't eliminate the problem (1 of 49 articles rendered correctly) — removing the pending-task guard as soon as the network round-trip finished still released "stability" a tick or two *before* Supabase's response-body parsing and the RxJS chain actually delivered the value to the component.

**Fix:** a small operator, `withPendingTask()` (`src/app/utils/with-pending-task.ts`), applied inside `ContentService`'s and `ArticleService`'s Supabase-backed observables via RxJS's `finalize()` rather than a raw `Promise.finally()`. `finalize()`'s teardown only fires *after* the observable has finished notifying its subscriber — so the pending task now correctly stays registered through response parsing and RxJS processing, all the way until the consuming component has actually received the article data. Verified against **all 49 articles**, not just a sample (Section 6).

---

## 4. Files Changed

### New files
| File | Purpose |
|---|---|
| `src/app/pages/not-found/not-found.component.ts` | In-app 404 UI for the Angular wildcard route (client-side navigation to an unknown path) |
| `src/app/utils/with-pending-task.ts` | RxJS operator that registers Supabase queries with Angular's SSR stability tracking (Section 3.3) |
| `public/404.html` | Static, self-contained 404 page — this is what actually determines the real HTTP 404 status for cold/bot requests to an unknown URL (Netlify's own static-hosting convention) |
| `scripts/supabase-build-client.js` | Shared Node-side Supabase client for the two generator scripts below |
| `scripts/generate-prerender-routes.js` | Queries Supabase for every blog article slug at build time; writes `prerender-routes.txt` |
| `scripts/generate-sitemaps.js` | Generates `sitemap.xml` (index), `sitemap-pages.xml`, `sitemap-blog.xml` from live data |
| `scripts/generate-og-images.js` | Renders real 1200×630 OG/Twitter card images and the 512×512 brand logo PNG via `@resvg/resvg-js` (same technique the repo's pre-existing `generate-fb-images.js` already used) |
| `src/assets/og-image.jpg`, `twitter-image.jpg`, `services-og-image.jpg`, `portfolio-og-image.jpg`, `blog-og-image.jpg`, `contact-og-image.jpg`, `courses-og-image.jpg` | Real social-preview images at every path already referenced in meta tags — these files simply didn't exist before |
| `src/assets/Nexa Web Service.png` | Real 512×512 brand mark — used as favicon/Organization.logo, also didn't exist before |
| `public/sitemap-pages.xml`, `public/sitemap-blog.xml` | Generated sitemap files (previously 404'd through to the SPA shell) |

### Modified files
| File | What changed | Why |
|---|---|---|
| `angular.json` | Migrated `build` target from the split `browser`+`server` builders to the unified `@angular-devkit/build-angular:application` builder, with `prerender: { discoverRoutes: false, routesFile: "prerender-routes.txt" }` and `ssr: true`. Removed the now-redundant separate `server` architect target. Removed `src/favicon.ico` from `assets` (the file never existed — see §7). | This is the actual mechanism that makes every route prerender to real static HTML. `discoverRoutes: false` + an explicit `routesFile` is required because Angular can't auto-discover parameterized routes like `/blog/:slug` — the file has to enumerate every concrete blog URL, generated at build time from live data. |
| `package.json` | Added `prebuild` script (runs the three generator scripts). Removed the broken `build:ssr*`/`serve:ssr` scripts (they referenced `dist/portfolio-ssr/...`, a path that never matched the real `dist/websites/...` output, and called a `main.server.ts` that used the wrong bootstrap API — this pipeline could not have worked even if it had been invoked). | npm automatically runs `prebuild` before `build`, so `npm run build` (what `netlify.toml` already calls) now regenerates routes/sitemaps/images from live Supabase data before every deploy with zero Netlify config change needed. |
| `tsconfig.app.json` | Added `src/main.server.ts` to `files`. | The unified builder compiles both entry points from one tsconfig; the server entry needs to be part of the program. |
| `src/main.ts` | Now bootstraps with the shared `appConfig` (`src/app/app.config.ts`) instead of a second, hand-duplicated provider list. | The old inline list was missing `loadingInterceptor` (defined in `app.config.ts` but never actually wired up) and had drifted from the server config. One shared config, used by both client and server, can't silently diverge. |
| `src/app/app.config.ts` | Added `withFetch()` to `provideHttpClient(...)`. | Needed for `HttpClient` (used by `enroll.service.ts`) to have a working backend under Node/SSR. |
| `src/main.server.ts` | Full rewrite — standard standalone-app SSR bootstrap, forwarding `BootstrapContext` (§3.1); fixed a wrong import path (`./app.component` → `./app/app.component`) left over from the previous, non-functional version. | §3.1 |
| `src/app/app.config.server.ts` | Now merges `appConfig` with server-only providers (`provideServerRendering()`, `provideNoopAnimations()`, `APP_BASE_HREF`) via `mergeApplicationConfig`, instead of re-declaring the entire provider list a second time. | §3.2, and eliminates the drift risk described above |
| `src/app/app.routes.ts` | Added `{ path: "blog/:slug", component: BlogComponent }` (real per-article routes, no resolver — see `blog.component.ts` below). Changed the wildcard route from `redirectTo: ""` to `component: NotFoundComponent`. | Real, individually-crawlable blog URLs (previously all 49 articles lived behind client-side state under one `/blog` URL); a real not-found experience instead of silently 200'ing to the homepage |
| `src/app/pages/blog/blog.component.ts` | Added `ActivatedRoute`/`Router`/`SeoService` wiring: a `paramMap` subscription drives the article-detail overlay from the URL; `openArticle()`/`openArticleFromTopic()`/`closeArticle()` now navigate via the Router instead of just mutating local state; share/copy-link URLs changed from `/blog#id` (a fragment, invisible to crawlers and most unfurlers) to real `/blog/id` paths; on article load, calls `SeoService.setBlogPostMetaTags()` + `setBlogPostingSchema()` + a 3-level breadcrumb (Home › Insights › article title). | This is the mechanism that gives all 49 articles real URLs and per-article metadata/structured data |
| `src/app/services/article.service.ts` | Added `dateISO` to the `BlogArticle` interface (raw ISO date alongside the existing display-formatted `date` string); wrapped `loadArticlesIndex()`/`getArticleById()` with `withPendingTask()`. | `dateISO` is needed for a schema.org-valid `datePublished` without changing what's visibly displayed (`date` is untouched); the pending-task wrap is §3.3's fix |
| `src/app/services/content.service.ts` | Wrapped the fresh-fetch branch of `cached()` with `withPendingTask()`. | §3.3's fix, applied to every `ContentService.getAll()`/`getRow()` call sitewide (home, about, services, portfolio, contact, courses, pricing all go through this) |
| `src/app/services/supabase-client.service.ts` | Added a no-op `WebSocket` stub, supplied only on the server platform. | supabase-js always constructs an internal Realtime client, which requires *some* `WebSocket` implementation to exist at construction time. The browser has one natively; Node doesn't. Without this, the app couldn't even bootstrap server-side — every render failed immediately with `Node.js 20 detected without native WebSocket support`. Nothing in this app uses realtime subscriptions, so the stub never needs to do anything. |
| `src/app/services/seo.service.ts` | (a) Injected Angular's `DOCUMENT` token and replaced every bare `document.*` reference with it — the bare global doesn't exist in the server's render context (see §7 for why this specific class needed it and others didn't). (b) Rewrote `setStructuredData` into a new `setDynamicSchema`/`removeDynamicSchema` pair, keyed by a `data-dynamic-schema` attribute, instead of the old version's `document.querySelector('script[type="application/ld+json"]')` — which matched and overwrote the *first* JSON-LD block on the page (Organization) regardless of what it was supposed to be updating. (c) Added `setBreadcrumbSchema()` + an automatic per-route 2-level breadcrumb (skipped on the homepage), `setBlogPostingSchema()`/`clearBlogPostingSchema()`, `setFaqPageSchema()`, `setServiceCatalogSchema()`. (d) `og:type`/`twitter:card` now always reset to `website`/`summary_large_image` on normal page loads (a blog article overrides `og:type` to `article` itself). (e) Canonical URLs now strip query/fragment. | (a) is required for SSR to work at all; (b) was a real, pre-existing bug (dead code, never triggered before because SSR never ran) that would have silently corrupted the Organization schema the instant any dynamic schema was added; (c)-(e) implement the JSON-LD/canonical requirements below |
| `src/app/pages/faq/faq.component.ts` | Calls `seoService.setFaqPageSchema()` with the real ~23 Q&As once loaded. | Replaces the old static, sitewide, generic 5-question `FAQPage` block that didn't match this page's actual content |
| `src/app/pages/services/services.component.ts` | Calls `seoService.setServiceCatalogSchema()` with the real 6 services once loaded. | Adds the `Service` schema type requested, built from real content instead of hardcoded copy |
| `src/index.html` | See detailed breakdown in Section 5. | — |
| `netlify.toml` | Removed the blanket `[[redirects]] from="/*" to="/index.html" status=200` rewrite. Everything else (HTTPS/www redirects, `/projects`→`/portfolio`, `/work`→`/portfolio`, all security/cache headers) is unchanged. | See Section 8 |
| `.gitignore` | Added `prerender-routes.txt` (regenerated every build from live data — committing it would just create noisy diffs) | Housekeeping |

---

## 5. `src/index.html` Changes in Detail

1. **Fixed a genuine, pre-existing HTML bug**: the analytics/cookie-consent `<script>` block contained a *second* `<script>` tag opened without closing the first one. HTML's tokenizer doesn't understand nested `<script>` elements — it scans forward for the first literal `</script>` regardless of what's in between, so everything up to that point (including the literal text `<script>` sitting inside it) was parsed as *one* script's body. That stray text was invalid JavaScript syntax, throwing a `SyntaxError` that silently killed the entire block — meaning **the cookie-consent banner, GA4, and Meta Pixel loaders never actually ran on the live site**, independent of anything else in this report. Merged into one well-formed `<script>` tag.
2. Removed the `<link rel="icon" type="image/x-icon" href="favicon.ico">` tag and the corresponding `src/favicon.ico` entry in `angular.json`'s assets — that file never existed in the repo (a guaranteed 404 in production). The SVG + PNG icon links already present give full modern-browser favicon coverage.
3. `Organization` JSON-LD: `aggregateRating.reviewCount` corrected from `"47"` (no visible backing anywhere on the site) to `"6"` (the actual number of testimonials rendered on the homepage) — an unbacked review count is exactly the pattern Google's structured-data spam policies target, and this makes the claim accurate and defensible.
4. Added a new, separate **LocalBusiness** structured-data block (`@type: ["LocalBusiness", "ProfessionalService"]`) using only real data (name, email, `areaServed`, `sameAs`) — deliberately **omitting** `telephone` and a street `address`, which don't exist for this fully-remote business. Fabricating either would be worse than omitting them; Google's own guidance is to omit unknown LocalBusiness properties rather than invent them. If the business later registers a real address, add it here.
5. `Person` JSON-LD: removed the `image` property, which pointed at `assets/profile-image.jpg` — a file that doesn't exist. A synthetic/placeholder photo of a real named person was not created (that would be inappropriate); add a real headshot at that path and reinstate the field when one exists.
6. Removed the static, sitewide **BreadcrumbList** block (hardcoded `Home › Services › Portfolio › Contact` on literally every page, including pages that are none of those three) — replaced by `SeoService`'s per-route dynamic breadcrumb.
7. Removed the static, sitewide **FAQPage** block (5 generic Q&As duplicated on every page) — replaced by `FaqComponent`'s dynamic schema built from the real ~23 questions, only on `/faq`.
8. Kept unchanged: all OG/Twitter meta tags, `Organization`/`Person`/`WebSite`/`ProfessionalService` JSON-LD (still accurate as sitewide defaults), all preconnect/preload hints, the critical inline CSS, the loader markup, and the Google/Bing/Yandex verification meta tags (still placeholders — see Section 7, this requires the site owner's own account access).

---

## 6. Validation — What Was Actually Verified (not assumed)

Every item below was checked by running `npm run build` (a real, unmodified production build) and inspecting the generated files in `dist/websites/browser/`, not by reading source code and assuming it would work.

| Check | Result |
|---|---|
| Build completes successfully | ✅ Exit code 0, "Application bundle generation complete" |
| Every route prerenders | ✅ "Prerendered 58 static routes" — 9 static pages + 49 blog articles, zero failures |
| `view-source` contains real content (not an empty `<app-root>`) | ✅ Home page's `<h1>` shows the actual hero text (`We Engineer...`) baked into the static HTML |
| Home page title/description/canonical | ✅ Unique, correct, matches `page_seo` table: `Nexa Web Service — Software Solutions \| Digital Transformation & Development` |
| About page title/description/canonical | ✅ Unique: `About Nexa Web Service — Software Solutions Team`, canonical `/about` |
| Pricing page title/canonical (spot-check for regressions) | ✅ `Pricing — Web Development & Academy Courses \| Nexa Web Service`, canonical `/pricing` |
| **Every one of the 49 blog articles** has a unique title, unique canonical, `og:type=article`, `article:published_time`, and a matching `BlogPosting` JSON-LD block | ✅ Verified programmatically across all 49, not a sample — 49/49 pass |
| Example — `/blog/angular-ssr-seo` | Title: `Why Angular SSR Beats React for SEO in 2024`; description matches the real excerpt; canonical `https://nexawebservice.com/blog/angular-ssr-seo`; `article-title` in the rendered body matches |
| `/faq` FAQPage schema | ✅ 23 real questions (not the old generic 5) |
| `/services` Service/OfferCatalog schema | ✅ 6 real services (not hardcoded copy) |
| `sitemap.xml`, `sitemap-pages.xml`, `sitemap-blog.xml` | ✅ All three exist in the build output with real content (previously two of three 404'd through to the SPA shell) |
| `robots.txt` | ✅ Present, all three declared sitemaps now real |
| `404.html` | ✅ Present at the output root with `<title>Page Not Found...</title>` and `noindex` meta |
| OG/Twitter images | ✅ All 7 files exist as real ~50KB rendered images (previously all 404'd through to the SPA shell) |
| JSON-LD validity | ✅ Every `<script type="application/ld+json">` block across a sample of 5 pages (home, about, services, faq, a blog article) parses as valid JSON — 32/32 blocks |
| No duplicate/mismatched metadata | ✅ Confirmed the old static BreadcrumbList/FAQPage blocks are gone; dynamic schema correctly replaces rather than duplicates across navigations (verified via the `data-dynamic-schema` marker mechanism) |
| `netlify.toml` no longer has a blanket 200 catch-all | ✅ Confirmed zero occurrences of `status = 200` remain |

**Not verified in this session** (see Section 7): an actual Netlify deploy (this was validated with a local production build only — see Section 9 for exactly what to check once deployed), Lighthouse/Core Web Vitals numbers, Google Search Console re-indexing, Facebook Sharing Debugger / LinkedIn Post Inspector against the live domain.

---

## 7. Remaining Issues / Things That Need the Site Owner

None of these block deployment — they're either outside what source code can fix, or deliberate judgment calls flagged for a decision:

1. **Google/Bing/Yandex site-verification meta tags are still placeholders** (`YOUR_GOOGLE_VERIFICATION_CODE`, etc.). These require the site owner's own Search Console / Bing Webmaster / Yandex Webmaster account — fill in the real verification codes there.
2. **`Person.image` and a real street address for `LocalBusiness`** were deliberately left out rather than faked (Section 5, points 4–5). Add a real headshot (`src/assets/profile-image.jpg`) and/or a real business address if one exists, and the fields can be reinstated.
3. **The regional pricing `$0` bug and missing Privacy Policy/Terms of Service pages** flagged in the original audit are **out of scope for this pass** — this work was explicitly scoped to technical crawlability/SEO, not content or legal pages. They're still open.
4. **`tsconfig.server.json` is now unused** (the old split `server` architect target that referenced it was removed in favor of the unified `application` builder, which uses `tsconfig.app.json` for both entry points). It's harmless to leave in place, but can be deleted; it's referenced only in two documentation files (`PROJECT_SUMMARY.md`, `FILE_MANIFEST.md`), not by any build config.
5. **`utils/local-business-schema.ts` and `utils/social-sharing.ts`** are pre-existing, already-unused utility files (containing, among other things, placeholder data like a fake `+1-234-567-8900` phone number and fake city addresses for `silicon_valley`/`new_york`/`texas` variants that were never wired up anywhere). They were left untouched as out-of-scope dead code rather than deleted, since removing files wasn't part of this task — worth a cleanup pass separately.
6. **A real Lighthouse/PageSpeed Insights run against the deployed site** is the natural next step to quantify the Core Web Vitals impact of moving off pure CSR — expected to improve meaningfully (LCP especially, since content now paints immediately from static HTML instead of waiting on a client-side Supabase round-trip), but this needs the live deployed URL to measure, not a local build.
7. **One duplicate blog `sort_order` pair** noted in the original audit (`AI Integration in Enterprise Applications` / `Integrating Large Language Models...`) still exists in the seed data — cosmetic, doesn't affect anything built here, but worth a quick dedupe check in `supabase/seed/07_blog.sql` separately.

---

## 8. Deployment Instructions

**No Netlify configuration changes are required.** `netlify.toml`'s build command is still `npm install && npm run build`; npm's lifecycle automatically runs the new `prebuild` script (route/sitemap/image generation from live Supabase data) before `ng build` runs. The publish directory is still `dist/websites/browser`.

Steps:
1. Merge/deploy this branch as normal.
2. Netlify will run `npm install && npm run build`, which now:
   a. Generates 7 OG/social-preview images + the brand logo PNG (`scripts/generate-og-images.js`)
   b. Queries Supabase for every blog article and writes `prerender-routes.txt` (`scripts/generate-prerender-routes.js`)
   c. Generates `sitemap.xml`/`sitemap-pages.xml`/`sitemap-blog.xml` from live data (`scripts/generate-sitemaps.js`)
   d. Runs `ng build`, which prerenders all 58 routes to static HTML in `dist/websites/browser/`
3. **If new blog articles are added to Supabase later, no code change is needed** — the next build automatically picks up the new slug, prerenders it, and adds it to the sitemap.
4. After the first deploy with these changes, submit/resubmit `https://nexawebservice.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools (Section 10, item 1).

---

## 9. Post-Deploy Validation Checklist

Run these against the **live domain** after deploying (everything above was validated against a local build only):

- [ ] `curl -s https://nexawebservice.com/ | grep -o '<title>[^<]*'` — should show the real homepage title (not "Loading...")
- [ ] `curl -s https://nexawebservice.com/blog/angular-ssr-seo | grep -o '<title>[^<]*'` — should show the article's own title, not the homepage's
- [ ] `curl -sI https://nexawebservice.com/this-page-does-not-exist` — should return `HTTP/2 404`, not `200`
- [ ] `curl -s https://nexawebservice.com/sitemap.xml` — should be a valid sitemap index XML, not HTML
- [ ] `curl -sI https://nexawebservice.com/assets/og-image.jpg` — should return `Content-Type: image/png` (or similar image type), not `text/html`
- [ ] Facebook Sharing Debugger (developers.facebook.com/tools/debug/) on the homepage and a blog article URL — should show the correct title/image, not a generic/missing one
- [ ] LinkedIn Post Inspector on the same two URLs
- [ ] Twitter/X Card Validator on the same two URLs
- [ ] Google Search Console → Sitemaps → resubmit `https://nexawebservice.com/sitemap.xml`
- [ ] Google Rich Results Test on the homepage (Organization/LocalBusiness/WebSite), `/faq` (FAQPage), `/services` (Service), and one blog article (BlogPosting)
- [ ] Run Lighthouse (or PageSpeed Insights) against the live homepage and compare LCP/CLS against the pre-change baseline

---

## 10. Before vs. After

| # | Issue (from prior audit) | Before | After |
|---|---|---|---|
| 1 | Angular Universal SSR exists but not deployed | `main.server.ts` used a broken pre-standalone API that would throw if ever invoked; never wired into the build | Real, working SSR/prerender pipeline via the unified `application` builder; verified by an actual successful build |
| 2 | Netlify runs `ng build` instead of SSR/prerender build | `netlify.toml` ran plain `ng build` (browser-only) | Same command (`npm run build`) now performs full prerendering — no Netlify config change needed, `prebuild` handles it automatically |
| 3 | Every route returns the same empty `<app-root>` | Confirmed via `curl` | Every route is now a distinct static HTML file with real content baked in |
| 4 | Every page returns HTTP 200, including nonexistent URLs | Netlify's blanket `/* → /index.html status=200` rewrite | Rewrite removed; unmatched paths now fall through to `public/404.html` with a real 404 status |
| 5 | Canonical URLs incorrect on every page | All pages showed `https://nexawebservice.com/` in raw HTML | Every page's canonical matches its own real URL, including all 49 blog articles |
| 6 | Meta titles/descriptions not page-specific | Identical generic tags on every route | Unique, per-page/per-article title and description, baked into static HTML |
| 7 | Open Graph images broken | `og-image.jpg` etc. resolved to the SPA shell (same ETag as `index.html`) | Real ~50KB rendered images exist at every referenced path |
| 8 | Twitter Cards broken | Same root cause as #7 | Fixed alongside #7 |
| 9 | `sitemap-pages.xml` broken | 404'd through to the SPA shell, mislabeled as XML | Real, generated file listing all 9 static pages |
| 10 | `sitemap-blog.xml` broken | Same as #9 | Real, generated file listing all 49 blog article URLs |
| 11 | `robots.txt` references invalid sitemaps | Two of three declared sitemaps were fake | All three now real; `robots.txt` content unchanged (it was already correct) |
| 12 | 48 (now 49) blog articles not exposed via crawlable URLs | All lived behind client-side state under one `/blog` URL, shared via `#fragment` | Every article has a real `/blog/:slug` route, its own prerendered page, its own sitemap entry |
| 13 | No proper 404 page | Wildcard route redirected to home; server always returned 200 | Real Angular `NotFoundComponent` for in-app navigation + static `public/404.html` for real HTTP 404s |
| 14 | Structured data incomplete | Organization/Person/WebSite/ProfessionalService only, generic sitewide Breadcrumb/FAQ, unbacked review count | Added LocalBusiness, Service/OfferCatalog, per-route Breadcrumb, BlogPosting per article, real FAQPage; review count corrected to match real content |
| 15 | Deployment prevents search engines from reading content | Pure CSR, empty shell | Full static HTML per route |

---

## 11. Summary for a Non-Technical Reader

The website's biggest problem was invisible unless you knew exactly where to look: search engines, social media link previews, and most SEO tools were seeing an essentially blank page for every single URL on the site, because all the real content only appeared after JavaScript ran in a browser — something most crawlers either can't or won't fully do. This work rebuilds the site so that every page, including all 49 blog articles, is generated as a complete, ready-to-read HTML file at deploy time, with its own correct title, description, and preview image. Nothing about how the site looks or reads has changed — this was entirely about making sure everyone *other* than a human clicking around in a browser can actually see it too.
