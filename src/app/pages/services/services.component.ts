import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ContentService } from "../../services/content.service";

interface PageHero {
  page: string;
  badge: string | null;
  title: string;
  subtitle: string | null;
  cta_primary_label: string | null;
  cta_primary_link: string | null;
  cta_secondary_label: string | null;
  cta_secondary_link: string | null;
  tech_badges: string[] | null;
  code_snippet: string | null;
}

interface StatBlock {
  page: string;
  section: string;
  icon: string | null;
  value: string;
  label: string;
  description: string | null;
  sort_order: number;
}

interface Service {
  page: string;
  icon: string | null;
  title: string;
  short_description: string | null;
  features: string[];
  benefit_tags: string[] | null;
  sort_order: number;
}

@Component({
  selector: "app-services",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Services Hero Section -->
    <section class="services-hero">
      <div class="hero-bg">
        <div class="gradient-sphere gradient-sphere-1"></div>
        <div class="gradient-sphere gradient-sphere-2"></div>
        <div class="grid-overlay"></div>
      </div>

      <div class="container">
        <div class="hero-content">
          <span class="hero-badge">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              />
            </svg>
            {{ hero?.badge }}
          </span>
          <h1 class="hero-title" [innerHTML]="hero?.title"></h1>
          <p class="hero-subtitle">
            {{ hero?.subtitle }}
          </p>
          <div class="hero-stats">
            <ng-container *ngFor="let stat of heroStats; let last = last">
              <div class="stat">
                <span class="stat-number">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
              <div class="stat-divider" *ngIf="!last"></div>
            </ng-container>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid Section -->
    <section class="services-grid-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">What We Offer</span>
          <h2 class="section-title">
            Comprehensive <span class="gradient-text">Services</span>
          </h2>
          <p class="section-description">
            Tailored solutions designed to address your unique challenges and
            drive measurable outcomes
          </p>
        </div>

        <div class="services-grid">
          <div
            class="service-card"
            *ngFor="let service of services; let i = index"
            [class.featured]="i === 0"
          >
            <div class="card-header">
              <div
                class="service-icon"
                [innerHTML]="getSafeHtml(service.icon)"
              ></div>
              <div class="service-number">0{{ i + 1 }}</div>
            </div>

            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.short_description }}</p>

            <ul class="service-features">
              <li *ngFor="let feature of service.features.slice(0, 4)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ feature }}
              </li>
            </ul>

            <div class="service-benefits-preview">
              <div
                class="benefit-tag"
                *ngFor="let benefit of service.benefit_tags"
              >
                {{ benefit }}
              </div>
            </div>

            <div class="card-footer">
              <a routerLink="/contact" class="learn-more-btn">
                Get Started
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">How We Work</span>
          <h2 class="section-title">
            Our Proven <span class="gradient-text">Process</span>
          </h2>
          <p class="section-description">
            A systematic approach refined over 8+ years of production enterprise development
          </p>
        </div>

        <div class="process-timeline">
          <div class="timeline-line"></div>
          <div
            class="process-step"
            *ngFor="let step of processSteps; let i = index"
          >
            <div class="step-marker">
              <div class="marker-number">{{ step.number }}</div>
              <div class="marker-ring"></div>
            </div>
            <div class="step-content">
              <div class="step-icon" [innerHTML]="getSafeHtml(step.icon)"></div>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-description">{{ step.description }}</p>
              <div class="step-deliverables">
                <span
                  class="deliverable"
                  *ngFor="let deliverable of step.deliverables"
                >
                  {{ deliverable }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technologies Section -->
    <section class="tech-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Tech Stack</span>
          <h2 class="section-title">
            Technologies We <span class="gradient-text">Use</span>
          </h2>
        </div>

        <div class="tech-categories">
          <div class="tech-category" *ngFor="let category of techCategories">
            <h3 class="category-title">{{ category.name }}</h3>
            <div class="tech-items">
              <div class="tech-item" *ngFor="let tech of category.items">
                <span class="tech-name">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Preview Section -->
    <section class="pricing-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Investment</span>
          <h2 class="section-title">
            Transparent <span class="gradient-text">Pricing</span>
          </h2>
          <p class="section-description">
            Flexible engagement models designed to match your project needs and
            budget
          </p>
        </div>

        <div class="pricing-grid">
          <div
            class="pricing-card"
            *ngFor="let plan of pricingPlans; let i = index"
            [class.featured]="i === 1"
          >
            <div class="pricing-badge" *ngIf="i === 1">Most Popular</div>
            <div class="pricing-header">
              <h3 class="plan-name">{{ plan.name }}</h3>
              <p class="plan-description">{{ plan.description }}</p>
            </div>
            <div class="pricing-amount">
              <span class="price-prefix">{{ plan.pricePrefix }}</span>
              <span class="price">{{ plan.price }}</span>
              <span class="price-suffix">{{ plan.priceSuffix }}</span>
            </div>
            <ul class="plan-features">
              <li *ngFor="let feature of plan.features">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ feature }}
              </li>
            </ul>
            <a
              routerLink="/contact"
              class="pricing-cta"
              [class.primary]="i === 1"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-bg">
        <div class="cta-gradient"></div>
      </div>
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Transform Your Business?</h2>
          <p class="cta-description">
            Let's schedule a free 30-minute consultation to discuss your project
            goals and how we can help you achieve them.
          </p>
          <div class="cta-buttons">
            <a routerLink="/contact" class="btn btn-primary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              Schedule Free Consultation
            </a>
            <a routerLink="/portfolio" class="btn btn-secondary">
              View Our Work
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <div class="cta-trust">
            <div class="trust-item">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              No commitment required
            </div>
            <div class="trust-item">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Response within 24 hours
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;

  hero: PageHero | null = null;
  heroStats: StatBlock[] = [];
  services: Service[] = [];

  processSteps = [
    {
      number: "01",
      title: "Discovery & Assessment",
      description:
        "Deep dive into your current systems, challenges, and goals through comprehensive analysis and stakeholder interviews.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>`,
      deliverables: ["Technical Audit", "Gap Analysis", "Requirements Doc"],
    },
    {
      number: "02",
      title: "Strategy Development",
      description:
        "Create a comprehensive roadmap with clear milestones, timelines, and success metrics aligned with business goals.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>`,
      deliverables: ["Project Roadmap", "Architecture Plan", "Timeline"],
    },
    {
      number: "03",
      title: "Implementation",
      description:
        "Execute with precision using agile methodology, maintaining transparency and regular communication throughout.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>`,
      deliverables: ["Sprint Demos", "Code Reviews", "Documentation"],
    },
    {
      number: "04",
      title: "Optimization & Support",
      description:
        "Continuous monitoring, optimization, and support to ensure sustained success and maximum ROI.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 20V10"/>
        <path d="M18 20V4"/>
        <path d="M6 20v-4"/>
      </svg>`,
      deliverables: ["Performance Reports", "Optimization", "Training"],
    },
  ];

  techCategories = [
    {
      name: "Frontend",
      items: [
        "Angular",
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "SCSS",
      ],
    },
    {
      name: "Backend",
      items: [".NET Core", "Node.js", "Python", "GraphQL", "REST APIs", "gRPC"],
    },
    {
      name: "Cloud & DevOps",
      items: ["Azure", "AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    },
    {
      name: "Database",
      items: [
        "SQL Server",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Elasticsearch",
        "CosmosDB",
      ],
    },
  ];

  pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small businesses needing a professional web presence",
      pricePrefix: "From",
      price: "$500",
      priceSuffix: "/project",
      features: [
        "Landing page or portfolio site",
        "Responsive mobile design",
        "Contact form integration",
        "Basic SEO setup",
        "2 rounds of revisions",
        "1 month post-launch support",
      ],
    },
    {
      name: "Business",
      description: "For growing businesses needing a full multi-page website or web app",
      pricePrefix: "From",
      price: "$2,000",
      priceSuffix: "/project",
      features: [
        "5–10 page website or web app",
        "Custom design & branding",
        "CMS or admin dashboard",
        "API / backend integration",
        "Full SEO optimization",
        "3 months post-launch support",
      ],
    },
    {
      name: "Enterprise",
      description: "Complex platforms, digital transformation & legacy modernization",
      pricePrefix: "From",
      price: "$10,000",
      priceSuffix: "/project",
      features: [
        "Full-stack enterprise application",
        "Cloud architecture (AWS / Azure)",
        "Microservices / API design",
        "CI/CD pipeline setup",
        "Security & compliance review",
        "6+ months ongoing support",
      ],
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private sanitizer: DomSanitizer,
    private content: ContentService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getSafeHtml(html: string | null): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html || "");
  }

  ngOnInit() {
    this.content
      .getRow<PageHero>("page_heroes", { page: "services" })
      .subscribe((hero) => {
        this.hero = hero;
      });

    this.content
      .getAll<StatBlock>("stat_blocks", {
        match: { page: "services", section: "hero" },
      })
      .subscribe((stats) => {
        this.heroStats = stats;
      });

    this.content
      .getAll<Service>("services", { match: { page: "services" } })
      .subscribe((services) => {
        this.services = services;
      });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initAnimations();
    }
  }

  private async initAnimations() {
    const gsapModule = await import("gsap");
    const scrollTriggerModule = await import("gsap/ScrollTrigger");

    const gsap = gsapModule.gsap;
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

    gsap.registerPlugin(ScrollTrigger);

    // Animate service cards
    gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.1,
      });
    });

    // Animate process steps
    gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, index) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        x: index % 2 === 0 ? -30 : 30,
        duration: 0.6,
        delay: index * 0.15,
      });
    });

    // Animate pricing cards
    gsap.utils.toArray<HTMLElement>(".pricing-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.5,
        delay: index * 0.1,
      });
    });
  }
}
