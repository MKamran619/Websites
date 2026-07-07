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
  { path: "**", redirectTo: "" },
];
