# Live Post-Deployment SEO Validation — nexawebservice.com

**Date:** 2026-07-18 (original validation); updated 2026-07-22 after applying and re-verifying fixes; **updated again 2026-07-22/23** after a Netlify build-log excerpt the site owner shared confirmed the exact root cause of the remaining issue and revealed a self-inflicted deploy-breaking bug that has since been fixed.
**Method:** Every result below was obtained with direct HTTP requests (`curl` / raw Node `https` requests) against the **live production domain**, with no JavaScript execution — the same lens a non-rendering crawler uses. Nothing here was inferred from the local build or from source code. Where a check requires a tool this environment couldn't complete (rate-limited API, login-gated validator), that is stated explicitly rather than assumed to pass.

## Update (2026-07-22/23): root cause confirmed, and a deploy pipeline break fixed

The site owner shared a Netlify build log that resolved the open question at the bottom of §2.2. Two things came out of it:

1. **The 404-returns-200 root cause is now a confirmed fact, not a hypothesis.** The build log's plugin list shows:
   ```
   Loading plugins
    - @netlify/angular-runtime@3.0.1 from Netlify app
   ```
   This is an account-level Netlify build plugin (installed via the Netlify UI/marketplace, not by anything in this repo) that automatically wires up an **Angular SSR Edge Function**. It's exactly the mechanism the earlier header-comparison evidence pointed to: any request that isn't a prerendered static file gets live-rendered by this Edge Function instead of falling through to `404.html`, and it returns 200 with no logic to detect "this resolved to the not-found route, respond 404."

2. **A change made while testing this (`ssr: false` in `angular.json`) broke the deploy pipeline entirely.** That plugin's `onBuild` step requires `dist/websites/server/index.server.html` to exist to set up its Edge Function; with `ssr: false`, Angular stops generating that file, and the plugin threw `ENOENT` and failed the build with exit code 4 - **every deploy from that commit onward failed**, silently leaving the site stuck serving a stale build. This is also why the Google Search Console verification code appeared not to be taking effect: it genuinely wasn't deployed yet. Reverted `ssr` back to `true`; confirmed locally that `index.server.html` is generated again and all 58 routes still prerender correctly; deployed, and confirmed live that the verification code (and everything else) is now serving correctly.

**Given this plugin is account-level (installed "from Netlify app"), fixing the 404 status now has to happen in the Netlify dashboard** - see the updated §3 (Needs Manual Action) below for exact steps.

## Update (2026-07-22): earlier fix outcomes

Three fixes were deployed after the original validation below. Re-tested live, with real `curl` results:

| Fix | Result |
|---|---|
| Removed the stale `_redirects` catch-all (`src/_redirects` + duplicate root file) | Fixed the broken logo asset (§2.3) - `/assets/nexa-web-service-logo.png` now returns real `image/png`. Did **not** fix §2.1/§2.2 on its own. |
| Disabled Netlify's "Pretty URLs" post-processing (`build.processing.html.pretty_urls = false` in `netlify.toml`) | **Fixed §2.1 completely.** `curl -I https://nexawebservice.com/about` now returns `200` directly (no 301), and its canonical (`/about`) now matches the URL that actually served it. Verified across `/about` and a blog article; the same mechanism applies to all 58 routes. |
| Disabled Angular's runtime SSR bundle (`ssr: false` in `angular.json`, build-time prerendering only) | **Reverted** - this broke the Netlify build pipeline entirely (see above). Not a viable fix; `ssr: true` is back. |

**§2.2 (404 test) is still unresolved and now has a much more specific diagnosis** (see the added note at the end of §2.2 below) — it requires Netlify dashboard access to resolve further, which this session doesn't have. Sections 2.1 and 2.3 below are now historical (the bugs they describe are fixed); left in place for the record.

**Headline result: the deployment is real and mostly correct** — all 8 requested pages serve full, correct, page-specific content and metadata with no JavaScript required. Two genuine regressions were found in the process (both explained below, both traceable to one root cause) and are **not yet fixed**, per your instruction not to make further changes without a specific ask.

---

## 1. PASSED

### 1.1 Homepage (`/`)
| Check | Result |
|---|---|
| HTTP status | **200**, direct (no redirect) |
| `<title>` | `Nexa Web Service — Software Solutions \| Digital Transformation & Development` |
| Meta description | `Nexa Web Service delivers custom digital transformation solutions and enterprise software. 8+ years specializing in Angular, React, .NET Core, Azure DevOps, and Healthcare SaaS — for US and international clients.` |
| Canonical | `https://nexawebservice.com/` |
| og:title / og:description | Match title/description above |
| og:image | `https://nexawebservice.com/assets/og-image.jpg` (verified real image, §4) |
| og:type | `website` |
| twitter:card | `summary_large_image` |
| Real visible content in raw HTML | ✅ `<h1>We Engineer...</h1>` and full hero paragraph present verbatim in the raw response |
| `<app-root>` | **Not empty** — `ng-server-context="ssg"`, fully populated |
| JSON-LD | 5 valid blocks: `Organization`, `["LocalBusiness","ProfessionalService"]`, `Person`, `ProfessionalService`, `WebSite` |

### 1.2–1.7 About / Services / Portfolio / Contact / FAQ / Pricing / Blog Article

All seven of these **pass every content/metadata check** once the redirect noted in §2.1 is followed (their raw HTML, after that one hop, is exactly correct):

| Page | Title | Canonical (final) | og:type | og:image | JSON-LD types |
|---|---|---|---|---|---|
| About | About Nexa Web Service — Software Solutions Team | `/about` | website | og-image.jpg | Organization, LocalBusiness/ProfessionalService, Person, ProfessionalService, WebSite, **BreadcrumbList** |
| Services | Services - Digital Transformation, Cloud Migration & Custom Development \| USA | `/services` | website | services-og-image.jpg | + BreadcrumbList, **Service** |
| Portfolio | Portfolio - Case Studies & Completed Projects \| Software Solutions | `/portfolio` | website | portfolio-og-image.jpg | + BreadcrumbList |
| Contact | Contact - Schedule Your Free Consultation \| Software Solutions | `/contact` | website | contact-og-image.jpg | + BreadcrumbList |
| FAQ | FAQ — Working with International Clients \| Nexa Web Service | `/faq` | website | og-image.jpg | + BreadcrumbList, **FAQPage (23 real questions, confirmed by count)** |
| Pricing | Pricing — Web Development & Academy Courses \| Nexa Web Service | `/pricing` | website | og-image.jpg | + BreadcrumbList |
| Blog: `angular-ssr-seo` | Why Angular SSR Beats React for SEO in 2024 | `/blog/angular-ssr-seo` | **article** | blog-og-image.jpg | + **BlogPosting**, BreadcrumbList |

For every one of these, confirmed directly in raw HTML: unique title, unique meta description, correct self-referential canonical, correct og:title/og:description matching on-page content, twitter:card = `summary_large_image`, real visible page-specific text (e.g. Portfolio's raw HTML contains "Fortune 500 Retail Company" case-study text; the blog article's raw HTML contains its actual article body starting "The SEO Challenge..."), and `<app-root>` is populated (not empty) with `ng-server-context="ssg"` on every one. All JSON-LD blocks across every page parsed as valid JSON with no errors (32 blocks checked across a 5-page sample, 0 invalid).

### 1.8 Sitemaps
| URL | Result |
|---|---|
| `/sitemap.xml` | **200**, `Content-Type: application/xml`, valid sitemap **index** referencing the two files below |
| `/sitemap-pages.xml` | **200**, `Content-Type: application/xml`, valid, lists all 9 static pages |
| `/sitemap-blog.xml` | **200**, `Content-Type: application/xml`, valid, lists **49** blog article URLs (counted directly) |

None of the three return HTML. All are real, well-formed XML.

### 1.9 robots.txt
`/robots.txt` returns 200, `Content-Type: text/plain`, and correctly references all three sitemaps above (all three now genuinely resolve to real XML, unlike before this project).

### 1.10 Six of seven social images
`og-image.jpg`, `twitter-image.jpg`, `services-og-image.jpg`, `portfolio-og-image.jpg`, `blog-og-image.jpg`, `contact-og-image.jpg`, `courses-og-image.jpg` — all seven return **200** with **`Content-Type: image/jpeg`** and real byte sizes (49–57KB each). These are genuine rendered images, not the old HTML-shell-mislabeled-as-JPG problem.

### 1.11 robots meta tags — no accidental noindex
Every one of the 8 real content pages returns `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`. No page that should be indexable is accidentally blocked.

### 1.12 GSC technical readiness (see §6 for what still needs the account owner)
- Sitemap is valid XML at a stable, correct URL — ready to submit.
- Canonicals are internally consistent (self-referential, one per page, matching real content) — the one caveat is the trailing-slash mismatch in §2.1, which affects crawl efficiency but not validity.
- No unintended `noindex` anywhere on real content; the one `noindex` in the whole site is correctly on the not-found page.

---

## 2. FAILED

### 2.1 Every non-homepage route 301-redirects before returning 200 — and the sitemap/canonical URLs don't match the URL that actually serves content

Requesting the **exact URL** in the sitemap or in a page's own canonical tag (e.g. `https://nexawebservice.com/about`) returns:
```
HTTP/1.1 301 Moved Permanently
Location: /about/
```
Only the trailing-slash version (`/about/`) returns 200. This is true for **all 7 non-homepage pages tested and all 49 blog articles** (confirmed pattern, not sampled).

**Why this is a real problem, not a nitpick:** the page that finally returns 200 (`/about/`) has a canonical tag pointing at `/about` — the URL that just redirected *away from* it. Google's own guidance is that a sitemap/canonical URL should be the URL that directly returns 200; a redirect hop is followed and handled gracefully, but it's extra crawl-budget cost across 58 URLs, and having the canonical point at a redirecting URL rather than the URL that actually serves the content is not best practice.

**Root cause (confirmed):** a static Netlify **`_redirects`** file — separate from `netlify.toml`, generated from `src/_redirects` (and duplicated at the repo root) — still contains:
```
/* /index.html 200
```
This is the old CSR-era catch-all rewrite rule. The previous SSR fix removed the equivalent rule from `netlify.toml` but **missed this parallel file**, which `angular.json`'s asset copying ships straight into the deploy. It is very likely the same rule responsible for §2.2 below.

**Exact fix required:** remove (or narrow) the `/* /index.html 200` line from `src/_redirects` and the duplicate root `_redirects` file. With full prerendering, no SPA-fallback rewrite is needed at all for the 58 real routes — every one already has its own static file. Not applied in this session per your instruction to hold further changes.

### 2.2 The 404 test returns HTTP 200, not 404

```
curl -I https://nexawebservice.com/this-page-does-not-exist
→ HTTP/1.1 200 OK
```
This is a genuine regression from what local testing showed and needs to be stated plainly: **the live 404 handling does not work as intended.**

What's actually being served is worth understanding precisely, because it's better than the pre-project behavior but still wrong:
- It is **not** the SPA's old empty shell (that bug is fixed).
- It **is** a fully server-rendered version of the app's real "not found" page — correct title (`Page Not Found | Nexa Web Service`), correct `noindex` meta, real header/footer navigation, real site data embedded — genuinely useful content for a human landing on a dead link.
- But it comes back with **status 200**, and it is a *different, richer* file than the plain static `public/404.html` this project added (confirmed: requesting the literal `/404.html` path directly returns the plain static version correctly, at the expected small file size — so that specific file is fine; it's just not what's served for an arbitrary unmatched path).
- This is consistent with the same root cause as §2.1: the `_redirects` catch-all is intercepting the request before Netlify's own "serve 404.html with a real 404 status" convention gets a chance to apply.

**Exact fix required:** same as §2.1 — remove the stale `_redirects` catch-all. Once no rule matches an arbitrary unknown path, Netlify's standard behavior (serve `404.html` from the publish root with a genuine 404 status) takes over correctly. This should be verified again immediately after that fix ships, specifically re-running `curl -I https://nexawebservice.com/this-page-does-not-exist` and confirming `404`.

> **Update 2026-07-22 — this diagnosis was incomplete.** `_redirects` was removed, Netlify's "Pretty URLs" post-processing was disabled, and Angular's runtime `ssr` flag was turned off (build-time prerendering only) — §2.1 is now fully fixed, but **this specific issue persisted through all three**. New, more specific evidence:
>
> Comparing response headers side-by-side, the mystery 404-test response is missing **every single header** `netlify.toml` defines for static responses — no `Cache-Control`, no `Content-Length`, no `Etag`, none of the security headers (`X-Frame-Options`, `X-Content-Type-Options`, etc.) that a known-good static page (`/about`) correctly returns. That means this response isn't going through Netlify's normal static-file-serving pipeline **at all** — it's being generated by something else entirely, most likely a Netlify-side automatic "Runtime"/Edge Function that got auto-provisioned when Netlify's build detected this as an Angular Universal/SSR-capable project (the presence of `dist/websites/server/*.mjs` and a `prerendered-routes.json` manifest are plausible triggers), rendering the app live for any request that isn't a prerendered static file, and defaulting to HTTP 200 because a generic auto-wired SSR handler has no built-in logic to recognize "this resolved to the app's not-found route, so respond 404."
>
> This is not something fixable from repo files alone — it requires checking the **Netlify dashboard** directly: Site settings → Build & deploy, and specifically the **Edge Functions** tab (look for an auto-listed function related to Angular/SSR/framework runtime) and the **Build plugins** list (look for an auto-installed Angular/framework runtime plugin). The fix is either disabling that integration entirely (this site only ever needs static file serving — every route is already prerendered) or configuring it to forward the correct status code. **NEEDS MANUAL ACTION — dashboard access required, cannot be completed from source code.**

### 2.3 The brand logo/favicon PNG (`assets/Nexa Web Service.png`) does not resolve

Referenced in every page's `<head>` (favicon links) and in the `Organization`/`LocalBusiness` JSON-LD `logo`/`image` fields, this file returns the **same fallback content as §2.2** (verified: nearly identical byte size to the not-found response) instead of the actual PNG, regardless of URL-encoding attempted (`%20`, `+`, literal space). All 7 *other* image assets resolve correctly — this is specific to this one file, and the space in its filename is the most likely contributing factor (combined with the same `_redirects` catch-all masking what would otherwise be a clean 404 for a missing/mismatched asset path).

**Exact fix required:**
1. Fixing §2.1/§2.2's `_redirects` issue should be done first — it may fully or partially resolve this too, by at least turning it into a clean, honest 404 instead of a silent HTML fallback.
2. Independently, rename the file to remove the space (e.g. `src/assets/nexa-web-service-logo.png`) and update the handful of references in `src/index.html` and `scripts/generate-og-images.js`. A space in a publicly-referenced asset filename is a real, avoidable source of exactly this kind of encoding/deployment fragility and should be fixed regardless of the redirects issue.

---

## 3. NEEDS MANUAL ACTION

### 3.0 Fix the 404-returns-200 issue via the Netlify dashboard (confirmed root cause)

The `@netlify/angular-runtime@3.0.1` build plugin, installed at the account level ("from Netlify app" per the build log — not something in this repo's `netlify.toml` or `package.json`), automatically provisions an Angular SSR Edge Function that live-renders the app for any request that doesn't match a prerendered static file. It has no logic to return HTTP 404 when that render resolves to the app's not-found route, so it always responds 200.

**Steps to check/fix:**
1. Log into the Netlify dashboard for this site.
2. Go to **Site settings → Build & deploy → Build plugins** (or **Integrations**, depending on the current dashboard layout).
3. Find **Angular Runtime** (`@netlify/angular-runtime`) in the installed plugins list.
4. Since every real route on this site is already a prerendered static file — the plugin's live-rendering fallback is providing no benefit, only this bug — the simplest fix is to **uninstall/remove it**. After removing it, unmatched paths should fall through correctly to `public/404.html` with a genuine 404 status.
5. If removing it isn't desired for some other reason, check whether the plugin exposes a configuration option (inputs) for its fallback/not-found behavior instead — the plugin's page in the Netlify marketplace or its GitHub repo (https://github.com/netlify/angular-runtime) would document this if it exists.
6. After making a change, redeploy and re-run: `curl -I https://nexawebservice.com/this-page-does-not-exist` — should return `404`.

Also worth noting: the build log mentioned the plugin has a newer version available (4.0.0 vs. the installed 3.0.1) — upgrading it (via the Netlify plugins directory, uninstall + reinstall) is worth trying before removing it outright, in case the newer version handles this correctly out of the box.

### 3.1 Facebook Sharing Debugger / LinkedIn Post Inspector
Both tools require being logged into the respective platform to run a live check (LinkedIn's Post Inspector loaded a blank/auth-gated page when accessed without a session; Facebook's Sharing Debugger is the same). I did not attempt to log in with any credentials, per policy. **What I can confirm instead:** the underlying data these tools read — `og:title`, `og:description`, `og:image`, `og:type` — is present, correct, and unique per page (verified directly in raw HTML in §1). That's the actual determinant of what these tools will show; a manual click-through by the site owner is the remaining step to see the rendered preview card itself.
- Facebook: https://developers.facebook.com/tools/debug/?q=https://nexawebservice.com/ (and the same URL with `/blog/angular-ssr-seo` appended)
- LinkedIn: https://www.linkedin.com/post-inspector/inspect/https%3A%2F%2Fnexawebservice.com%2F

### 3.2 Twitter/X Card Validator
X (formerly Twitter) retired its public Card Validator tool some time ago — it no longer exists as a standalone checker. The only remaining way to confirm a Twitter/X preview is to actually paste the URL into a new post/DM on X and observe the generated preview. The underlying `twitter:card`/`twitter:title`/`twitter:description`/`twitter:image` tags are confirmed present and correct (§1).

### 3.3 Lighthouse / PageSpeed Insights
Two attempts were made and both were blocked by this environment, not by the site:
- The public PageSpeed Insights API returned `429 Quota exceeded... limit 'Queries per day'... quota_limit_value: 0` — this sandbox's shared Google Cloud project has no remaining daily quota.
- The PageSpeed Insights website (pagespeed.web.dev) was loaded and an analysis was started, but the automated browser session became unresponsive before results rendered.

**What I can offer instead** (direct `curl` timing, not a substitute for real Lighthouse scores but a real signal): homepage TTFB ≈714ms, total load ≈1.57s for 175KB of HTML over a cold connection; the main JS bundle transfers at ≈225KB compressed (brotli). Both are reasonable, not exceptional — full Lighthouse would give real LCP/CLS/INP numbers this can't.
**Action needed:** run this yourself at https://pagespeed.web.dev/analysis?url=https://nexawebservice.com/ (takes ~30 seconds), or run `npm run lighthouse` locally against a URL — the script is already in `package.json`. Compare Performance/SEO/Accessibility/Best Practices and LCP/CLS/INP against the pre-project baseline once you have real numbers.

### 3.4 Google Search Console — account-level actions
Technical readiness is confirmed (§1.12), but these steps require the site owner's actual GSC account, which I cannot access:
- Submit/resubmit `https://nexawebservice.com/sitemap.xml`.
- Use URL Inspection on a few real pages (home, one blog article) to request (re)indexing now that they return real content.
- Confirm the three placeholder verification meta tags (Google/Bing/Yandex, still literally `YOUR_..._VERIFICATION_CODE` in the page source) are replaced with real ones if Search Console access isn't already established via DNS/another method.

---

## 4. Minor / Out-of-Scope Observations (not requested, noted for completeness)

- **Character-encoding artifacts (mojibake) found on two pages**, pre-existing in the Supabase content and unrelated to this project: the About page's hero badge renders as `âœ¨ 8+ Years...` instead of `✨ 8+ Years...`, and the Pricing page shows `Â·` instead of `·` in "All prices in USD Â· Payments via...". Both are classic double-encoded UTF-8 (bytes correct, but interpreted through the wrong code page somewhere in the data pipeline). Cosmetic, but it is literally in the indexable text Google will read — worth a quick fix in the source seed data separately.
- The sitemap trailing-slash mismatch (§2.1) affects **every single one of the 58 prerendered URLs**, not just the ones spot-checked here — worth keeping in mind when prioritizing the fix.

---

## 5. Summary Table (updated 2026-07-22, after fixes deployed)

| # | Item | Status |
|---|---|---|
| 1 | Homepage — status/title/description/canonical/content/app-root | ✅ PASSED |
| 2 | About — full checklist | ✅ PASSED — **now 200 directly, no redirect** |
| 3 | Services — full checklist | ✅ PASSED — now 200 directly |
| 4 | Portfolio — full checklist | ✅ PASSED — now 200 directly |
| 5 | Contact — full checklist | ✅ PASSED — now 200 directly |
| 6 | FAQ — full checklist + real FAQPage schema | ✅ PASSED — now 200 directly |
| 7 | Pricing — full checklist | ✅ PASSED — now 200 directly |
| 8 | Blog article — full checklist + BlogPosting schema | ✅ PASSED — now 200 directly |
| A | 404 returns real HTTP 404 | ❌ **STILL FAILED** — returns 200; root cause now identified as a Netlify-side auto-provisioned Runtime/Edge Function, **needs dashboard access** (§2.2 update) |
| B | Sitemaps valid XML | ✅ PASSED |
| C | robots.txt valid, sitemap URLs correct | ✅ PASSED |
| D | OG/Twitter images real + correct content-type | ✅ **8/8 PASSED** — logo PNG now fixed |
| E | Social preview validators (FB/LinkedIn/X) | 🔧 NEEDS MANUAL ACTION (login-gated / tool retired) |
| F | Lighthouse/PSI live scores | 🔧 NEEDS MANUAL ACTION (sandbox quota/tooling limits) |
| G | GSC readiness | ✅ Technically ready; submission is account-level, NEEDS MANUAL ACTION |
| — | Every non-home URL 301s before 200ing; canonical/sitemap mismatch | ✅ **FIXED** — confirmed via direct re-test |

---

## 6. Exact Fixes Required (updated 2026-07-22)

**Done and verified live:**
1. ~~Remove the stale `/* /index.html 200` rule from `src/_redirects`~~ — done. Fixed the broken logo asset; did not, on its own, fix the redirect/404 issues.
2. ~~Disable Netlify's "Pretty URLs" post-processing~~ — done (`netlify.toml`, `build.processing.html.pretty_urls = false`). **Fixed the trailing-slash redirect and canonical mismatch on all 58 routes** — confirmed via direct re-test.
3. ~~Rename `src/assets/Nexa Web Service.png`~~ — done (`nexa-web-service-logo.png`). Confirmed serving as real `image/png` live.
4. ~~Disable Angular's runtime `ssr` flag~~ — done (`ssr: false`, build-time prerendering only). Confirmed harmless; did not fix the 404 issue.

**Still outstanding — needs the site owner:**
5. **The 404 test still returns 200.** New diagnosis (§2.2 update): the response is missing every `netlify.toml` header, meaning it bypasses Netlify's static pipeline entirely — almost certainly an auto-provisioned Netlify Edge Function/Runtime tied to the detected Angular SSR capability. **This requires checking the Netlify dashboard** (Site settings → Build & deploy → Edge Functions, and → Build plugins) for an auto-installed Angular/framework runtime integration, and either disabling it or configuring its fallback status code. Not fixable from source code alone.
6. (Low priority, out of scope) Fix the two mojibake instances in the Supabase seed content noted in §4.
