import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ServicesComponent } from "./pages/services/services.component";
import { PortfolioComponent } from "./pages/portfolio/portfolio.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { BlogComponent } from "./pages/blog/blog.component";
import { CoursesComponent } from "./pages/courses/courses.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    data: {
      title:
        "ApnaKam — Software Solutions | Digital Transformation & Development",
      description:
        "ApnaKam delivers custom digital transformation solutions and enterprise software. 10+ years specializing in full-stack development, legacy modernization, and cloud-native architectures.",
      keywords:
        "software engineer USA, digital transformation, full-stack developer, custom development, enterprise solutions",
      ogImage: "https://websiteservice619.netlify.app/assets/og-image.jpg",
    },
  },
  {
    path: "about",
    component: AboutComponent,
    data: {
      title: "About ApnaKam — Software Solutions Team",
      description:
        "Learn about our 10+ years of experience in software engineering, digital transformation, and technical consulting for businesses worldwide.",
      keywords:
        "about software engineer, technical consultant, digital transformation expert, software development",
      ogImage: "https://websiteservice619.netlify.app/assets/og-image.jpg",
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
      ogImage:
        "https://websiteservice619.netlify.app/assets/services-og-image.jpg",
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
      ogImage:
        "https://websiteservice619.netlify.app/assets/portfolio-og-image.jpg",
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
      ogImage: "https://websiteservice619.netlify.app/assets/blog-og-image.jpg",
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
      ogImage:
        "https://websiteservice619.netlify.app/assets/contact-og-image.jpg",
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
      ogImage:
        "https://websiteservice619.netlify.app/assets/courses-og-image.jpg",
    },
  },
  { path: "**", redirectTo: "" },
];
