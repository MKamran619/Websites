import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BlogPostingParams {
  title: string;
  description: string;
  image: string;
  url: string;
  authorName: string;
  /** ISO 8601 date (e.g. "2024-01-01"), not the display-formatted date. */
  datePublished: string;
}

export interface FaqSchemaItem {
  question: string;
  /** May contain inline HTML (e.g. <strong>); it is stripped for the schema's plain-text field. */
  answer: string;
}

export interface ServiceCatalogItem {
  name: string;
  description: string;
}

// Top-level nav path -> human label, used to build accurate per-route breadcrumbs.
// Mirrors the labels seeded in nav_items (see supabase/seed/01_nav_footer.sql).
const ROUTE_LABELS: Record<string, string> = {
  about: "About Us",
  services: "Services",
  portfolio: "Case Studies",
  blog: "Insights",
  contact: "Contact",
  courses: "Academy",
  pricing: "Pricing",
  faq: "FAQ",
};

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

@Injectable({
  providedIn: "root",
})
export class SeoService {
  private baseUrl = "https://nexawebservice.com";

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.initializeSeoOnRouteChange();
  }

  private initializeSeoOnRouteChange() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const state = this.router.routerState.snapshot.root;
        if (state && state.firstChild) {
          const data = state.firstChild.data;
          if (data) {
            this.setMetaTags(data["seo"] ?? data);
          }
        }
        // Default, route-derived breadcrumb. Components that need a more
        // specific trail (e.g. a blog article's Home > Insights > Title)
        // call setBreadcrumbSchema() themselves afterwards, which wins.
        this.updateDefaultBreadcrumb(this.router.url);
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

    // OG type defaults back to "website" for regular pages (a blog article
    // sets this to "article" itself via setBlogPostMetaTags).
    this.meta.updateTag({ property: "og:type", content: "website" });
    this.meta.updateTag({ property: "twitter:card", content: "summary_large_image" });

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
    // Strip query/fragment - canonical should point at the clean page URL.
    const clean = url.split("?")[0].split("#")[0];
    let link = this.document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement;
    if (!link) {
      link = this.document.createElement("link");
      link.setAttribute("rel", "canonical");
      this.document.head.appendChild(link);
    }
    link.setAttribute("href", clean);
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

  /**
   * Adds or replaces a single dynamically-managed JSON-LD block, keyed by
   * `key` (via a `data-dynamic-schema` marker attribute). This never touches
   * the static, site-wide schema blocks authored directly in index.html
   * (Organization/Person/WebSite/LocalBusiness/Service) - only the
   * route-specific blocks (breadcrumb, BlogPosting, FAQPage, service
   * catalog) that legitimately differ per page and must not accumulate
   * duplicates across client-side navigations.
   */
  private setDynamicSchema(schema: unknown, key: string) {
    this.document
      .querySelectorAll(`script[data-dynamic-schema="${key}"]`)
      .forEach((el) => el.remove());
    const script = this.document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("data-dynamic-schema", key);
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  private removeDynamicSchema(key: string) {
    this.document
      .querySelectorAll(`script[data-dynamic-schema="${key}"]`)
      .forEach((el) => el.remove());
  }

  setBreadcrumbSchema(items: BreadcrumbItem[]) {
    this.setDynamicSchema(
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
      "breadcrumb",
    );
  }

  /** Home > <top-level nav label> breadcrumb, derived from the current URL. Skipped on the homepage itself. */
  private updateDefaultBreadcrumb(url: string) {
    const segments = url.split("/").filter(Boolean);
    if (segments.length === 0) {
      this.removeDynamicSchema("breadcrumb");
      return;
    }
    const topSegment = segments[0];
    const label = ROUTE_LABELS[topSegment] ?? topSegment;
    this.setBreadcrumbSchema([
      { name: "Home", url: `${this.baseUrl}/` },
      { name: label, url: `${this.baseUrl}/${topSegment}` },
    ]);
  }

  setBlogPostingSchema(params: BlogPostingParams) {
    this.setDynamicSchema(
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: params.title,
        description: params.description,
        image: params.image,
        url: params.url,
        mainEntityOfPage: { "@type": "WebPage", "@id": params.url },
        datePublished: params.datePublished,
        author: { "@type": "Person", name: params.authorName },
        publisher: {
          "@type": "Organization",
          name: "Nexa Web Service",
          logo: {
            "@type": "ImageObject",
            url: `${this.baseUrl}/assets/og-image.jpg`,
          },
        },
      },
      "blogposting",
    );
  }

  clearBlogPostingSchema() {
    this.removeDynamicSchema("blogposting");
  }

  /** Real FAQPage schema built from the FAQ page's actual Q&A content (not a generic sitewide stand-in). */
  setFaqPageSchema(items: FaqSchemaItem[]) {
    this.setDynamicSchema(
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: stripHtml(item.answer),
          },
        })),
      },
      "faqpage",
    );
  }

  /** Service + OfferCatalog schema for the Services page, built from the real services list. */
  setServiceCatalogSchema(services: ServiceCatalogItem[]) {
    this.setDynamicSchema(
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Software Development & Digital Transformation Consulting",
        provider: { "@type": "Person", name: "Kamran Sohail" },
        areaServed: ["US", "AE", "GB"],
        url: `${this.baseUrl}/services`,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
            },
          })),
        },
      },
      "servicecatalog",
    );
  }
}
