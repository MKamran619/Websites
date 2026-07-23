import { Routes } from "@angular/router";
import { pageSeoResolver } from "./services/page-seo.resolver";

// Every route below is lazy-loaded (loadComponent) instead of statically
// imported. Previously all 10 page components were eagerly bundled into
// main.js, so visiting the homepage downloaded the code for every other
// page too - Lighthouse flagged ~201 KiB of unused JavaScript on first
// load, matching this exactly. Lazy loading is fully compatible with
// build-time prerendering: each route still gets its own fully-rendered
// static HTML file (prerendering dynamically imports whatever component a
// given route needs during that route's own render pass) - this only
// changes how much JS ships up front to a real browser, not what's in the
// prerendered HTML.
export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/home/home.component").then((m) => m.HomeComponent),
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "about",
    loadComponent: () =>
      import("./pages/about/about.component").then((m) => m.AboutComponent),
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "services",
    loadComponent: () =>
      import("./pages/services/services.component").then(
        (m) => m.ServicesComponent,
      ),
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "portfolio",
    loadComponent: () =>
      import("./pages/portfolio/portfolio.component").then(
        (m) => m.PortfolioComponent,
      ),
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "blog",
    loadComponent: () =>
      import("./pages/blog/blog.component").then((m) => m.BlogComponent),
    resolve: { seo: pageSeoResolver },
  },
  {
    // Real, individually-crawlable article URLs. No pageSeoResolver here -
    // BlogComponent sets its own per-article title/description/canonical/
    // BlogPosting schema once the article loads (see loadArticleDetail()),
    // since page_seo is keyed by static route path and has no concept of a
    // blog slug.
    path: "blog/:slug",
    loadComponent: () =>
      import("./pages/blog/blog.component").then((m) => m.BlogComponent),
  },
  {
    path: "contact",
    loadComponent: () =>
      import("./pages/contact/contact.component").then(
        (m) => m.ContactComponent,
      ),
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "courses",
    loadComponent: () =>
      import("./pages/courses/courses.component").then(
        (m) => m.CoursesComponent,
      ),
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "pricing",
    loadComponent: () =>
      import("./pages/pricing/pricing.component").then(
        (m) => m.PricingComponent,
      ),
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "faq",
    loadComponent: () =>
      import("./pages/faq/faq.component").then((m) => m.FaqComponent),
    resolve: { seo: pageSeoResolver },
  },
  // Previously `redirectTo: ""`, which meant an invalid URL silently served
  // the homepage - combined with Netlify's old blanket 200 rewrite, every
  // typo'd or bogus URL on the whole domain returned HTTP 200 (a soft 404).
  // A real 404 status for unknown URLs is now handled by public/404.html
  // (see netlify.toml); this component is only what a user sees if they hit
  // a bad route while already navigating client-side inside the app.
  {
    path: "**",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(
        (m) => m.NotFoundComponent,
      ),
  },
];
