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

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    data: {
      title:
        "Nexa Web Service — Software Solutions | Digital Transformation & Development",
      description:
        "Nexa Web Service delivers custom digital transformation solutions and enterprise software. 8+ years specializing in Angular, React, .NET Core, Azure DevOps, and Healthcare SaaS â€” for US and international clients.",
      keywords:
        "software engineer USA, digital transformation, full-stack developer, custom development, enterprise solutions",
      ogImage: "https://nexawebservice.com/assets/og-image.jpg",
    },
  },
  {
    path: "about",
    component: AboutComponent,
    data: {
      title: "About Nexa Web Service — Software Solutions Team",
      description:
        "Kamran Sohail â€” Senior Full Stack Developer with 8+ years building Angular, React, .NET Core, and Azure DevOps solutions for US, UAE, and UK clients. Founder of Nexa Web Service.",
      keywords:
        "about software engineer, technical consultant, digital transformation expert, software development",
      ogImage: "https://nexawebservice.com/assets/og-image.jpg",
    },
  },
  {
    path: "services",
    component: ServicesComponent,
    data: {
      title:
        "Services - Digital Transformation, Cloud Migration & Custom Development | USA",
      description:
        "Professional software development services including digital transformation, custom development, cloud migration, legacy modernization, and technical consulting.",
      keywords:
        "software development services, digital transformation, cloud migration, legacy modernization, custom development, technical consulting",
      ogImage: "https://nexawebservice.com/assets/services-og-image.jpg",
    },
  },
  {
    path: "portfolio",
    component: PortfolioComponent,
    data: {
      title:
        "Portfolio - Case Studies & Completed Projects | Software Solutions",
      description:
        "Explore 50+ completed projects showcasing expertise in digital transformation, cloud migration, custom development, and enterprise solutions.",
      keywords:
        "portfolio, case studies, completed projects, software solutions, enterprise development, project examples",
      ogImage: "https://nexawebservice.com/assets/portfolio-og-image.jpg",
    },
  },
  {
    path: "blog",
    component: BlogComponent,
    data: {
      title: "Blog - Technical Insights & Software Development Articles | USA",
      description:
        "Read technical articles and insights on digital transformation, software engineering best practices, cloud architecture, and industry trends.",
      keywords:
        "software engineering blog, technical articles, digital transformation, cloud architecture, development best practices",
      ogImage: "https://nexawebservice.com/assets/blog-og-image.jpg",
    },
  },
  {
    path: "contact",
    component: ContactComponent,
    data: {
      title: "Contact - Schedule Your Free Consultation | Software Solutions",
      description:
        "Get in touch to schedule a free 30-minute strategy session. Discuss your project needs with an experienced technical consultant.",
      keywords:
        "contact, consultation, schedule meeting, software engineer contact, technical consultation, free consultation",
      ogImage: "https://nexawebservice.com/assets/contact-og-image.jpg",
    },
  },
  {
    path: "courses",
    component: CoursesComponent,
    data: {
      title:
        "Web Development Courses | Learn HTML, CSS, JavaScript, Angular, React | USA",
      description:
        "Comprehensive web development courses from beginner to advanced. Master HTML, CSS, Bootstrap, JavaScript, jQuery, Angular, React, and Full Stack Development.",
      keywords:
        "web development courses, learn coding, JavaScript courses, Angular courses, React courses, Bootstrap courses, jQuery, HTML CSS",
      ogImage: "https://nexawebservice.com/assets/courses-og-image.jpg",
    },
  },
  {
    path: "pricing",
    component: PricingComponent,
    data: {
      title: "Pricing â€” Web Development & Academy Courses | Nexa Web Service",
      description:
        "Transparent pricing for web development projects starting at $500. Academy courses from $39. US clients welcome. Pay via PayPal or Wise.",
      keywords:
        "web development pricing, freelance developer rates, website cost, course pricing, affordable web development",
      ogImage: "https://nexawebservice.com/assets/og-image.jpg",
    },
  },
  {
    path: "faq",
    component: FaqComponent,
    data: {
      title: "FAQ â€” Working with International Clients | Nexa Web Service",
      description:
        "Answers to common questions about working with Nexa Web Service from the US, payment methods, project timelines, and our Academy courses.",
      keywords:
        "faq, international clients, USD payments, remote developer, web development questions, timezone",
      ogImage: "https://nexawebservice.com/assets/og-image.jpg",
    },
  },
  { path: "**", redirectTo: "" },
];
