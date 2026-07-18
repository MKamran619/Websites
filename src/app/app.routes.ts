import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ServicesComponent } from "./pages/services/services.component";
import { PortfolioComponent } from "./pages/portfolio/portfolio.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { BlogComponent } from "./pages/blog/blog.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { PricingComponent } from "./pages/pricing/pricing.component";
import { FaqComponent } from "./pages/faq/faq.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { pageSeoResolver } from "./services/page-seo.resolver";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "about",
    component: AboutComponent,
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "services",
    component: ServicesComponent,
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "portfolio",
    component: PortfolioComponent,
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "blog",
    component: BlogComponent,
    resolve: { seo: pageSeoResolver },
  },
  {
    // Real, individually-crawlable article URLs. No pageSeoResolver here -
    // BlogComponent sets its own per-article title/description/canonical/
    // BlogPosting schema once the article loads (see loadArticleDetail()),
    // since page_seo is keyed by static route path and has no concept of a
    // blog slug.
    path: "blog/:slug",
    component: BlogComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "courses",
    component: CoursesComponent,
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "pricing",
    component: PricingComponent,
    resolve: { seo: pageSeoResolver },
  },
  {
    path: "faq",
    component: FaqComponent,
    resolve: { seo: pageSeoResolver },
  },
  // Previously `redirectTo: ""`, which meant an invalid URL silently served
  // the homepage - combined with Netlify's old blanket 200 rewrite, every
  // typo'd or bogus URL on the whole domain returned HTTP 200 (a soft 404).
  // A real 404 status for unknown URLs is now handled by public/404.html
  // (see netlify.toml); this component is only what a user sees if they hit
  // a bad route while already navigating client-side inside the app.
  { path: "**", component: NotFoundComponent },
];
