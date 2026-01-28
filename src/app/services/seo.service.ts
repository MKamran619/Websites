import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SeoService {
  private baseUrl = "https://websiteservice619.netlify.app";

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
  ) {
    this.initializeSeoOnRouteChange();
  }

  private initializeSeoOnRouteChange() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const state = this.router.routerState.root;
        if (state && state.firstChild) {
          const data = state.firstChild.data;
          if (data) {
            this.setMetaTags(data);
          }
        }
      });
  }

  setMetaTags(data: any) {
    // Set Title
    if (data["title"]) {
      this.title.setTitle(data["title"]);
    }

    // Set Meta Description
    if (data["description"]) {
      this.meta.updateTag({
        name: "description",
        content: data["description"],
      });
      this.meta.updateTag({
        property: "og:description",
        content: data["description"],
      });
      this.meta.updateTag({
        property: "twitter:description",
        content: data["description"],
      });
    }

    // Set Keywords
    if (data["keywords"]) {
      this.meta.updateTag({
        name: "keywords",
        content: data["keywords"],
      });
    }

    // Set OG Image
    if (data["ogImage"]) {
      this.meta.updateTag({
        property: "og:image",
        content: data["ogImage"],
      });
      this.meta.updateTag({
        property: "twitter:image",
        content: data["ogImage"],
      });
    }

    // Set OG Title
    if (data["title"]) {
      this.meta.updateTag({
        property: "og:title",
        content: data["title"],
      });
      this.meta.updateTag({
        property: "twitter:title",
        content: data["title"],
      });
    }

    // Set OG URL
    const url = this.baseUrl + this.router.url;
    this.meta.updateTag({
      property: "og:url",
      content: url,
    });
    this.meta.updateTag({
      property: "twitter:url",
      content: url,
    });

    // Update Canonical Tag
    this.updateCanonicalTag(url);
  }

  private updateCanonicalTag(url: string) {
    let link = document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }

  // Specific method for blog posts with additional metadata
  setBlogPostMetaTags(
    title: string,
    description: string,
    image: string,
    url: string,
    author: string,
    publishDate: string,
  ) {
    this.title.setTitle(title);

    this.meta.updateTag({ name: "description", content: description });
    this.meta.updateTag({ property: "og:title", content: title });
    this.meta.updateTag({ property: "og:description", content: description });
    this.meta.updateTag({ property: "og:image", content: image });
    this.meta.updateTag({ property: "og:url", content: url });
    this.meta.updateTag({ property: "og:type", content: "article" });
    this.meta.updateTag({ property: "article:author", content: author });
    this.meta.updateTag({
      property: "article:published_time",
      content: publishDate,
    });

    this.meta.updateTag({
      property: "twitter:card",
      content: "summary_large_image",
    });
    this.meta.updateTag({ property: "twitter:title", content: title });
    this.meta.updateTag({
      property: "twitter:description",
      content: description,
    });
    this.meta.updateTag({ property: "twitter:image", content: image });

    this.updateCanonicalTag(url);
  }

  // Structured data for pages
  setStructuredData(schema: any) {
    let script = document.querySelector(
      'script[type="application/ld+json"]',
    ) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }

  // Generate schema for various content types
  getLocalBusinessSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Software Solutions",
      image: `${this.baseUrl}/assets/logo.png`,
      description:
        "Digital transformation and custom software development solutions for American businesses",
      url: this.baseUrl,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: "mksawan619@gmail.com",
        areaServed: "US",
      },
      sameAs: [
        "https://www.linkedin.com/in/kamran619/",
        "https://github.com/MKamran619",
        "https://twitter.com/kamransawan",
      ],
    };
  }

  getProfessionalServiceSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Software Solutions - Digital Transformation & Development",
      provider: {
        "@type": "Person",
        name: "Kamran Sohail",
      },
      areaServed: "US",
      serviceType: [
        "Digital Transformation",
        "Custom Development",
        "Cloud Migration",
        "Technical Consulting",
      ],
    };
  }
}
