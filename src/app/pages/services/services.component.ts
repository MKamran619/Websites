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
            Expert Solutions
          </span>
          <h1 class="hero-title">
            Services That <span class="gradient-text">Transform</span> Your
            Business
          </h1>
          <p class="hero-subtitle">
            From digital transformation to custom development, we deliver
            end-to-end solutions that drive real business results
          </p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">50+</span>
              <span class="stat-label">Projects Delivered</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number">98%</span>
              <span class="stat-label">Client Satisfaction</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number">10+</span>
              <span class="stat-label">Years Experience</span>
            </div>
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
            <p class="service-description">{{ service.shortDescription }}</p>

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
                *ngFor="let benefit of service.benefitTags"
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
            A systematic approach refined over 10+ years to ensure project
            success
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

  services = [
    {
      title: "Digital Transformation",
      shortDescription:
        "Transform legacy systems into modern, scalable platforms with zero-downtime migrations and strategic cloud adoption.",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>`,
      features: [
        "Legacy system modernization",
        "Cloud migration (Azure/AWS)",
        "API-first architecture",
        "Microservices design",
        "Zero-downtime deployments",
        "Data migration strategies",
      ],
      benefitTags: ["40% Cost Reduction", "3x Faster", "99.9% Uptime"],
      benefits: [
        { icon: "⚡", text: "Faster time-to-market" },
        { icon: "💰", text: "Reduced operational costs" },
        { icon: "📈", text: "Improved scalability" },
        { icon: "🔒", text: "Enhanced security" },
      ],
    },
    {
      title: "Custom Development",
      shortDescription:
        "Full-stack enterprise applications built for your specific needs with focus on performance, scalability, and maintainability.",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>`,
      features: [
        "Enterprise app architecture",
        "Angular/React frontends",
        ".NET/Node.js backends",
        "Real-time dashboards",
        "E-commerce platforms",
        "High-performance systems",
      ],
      benefitTags: ["Custom Built", "Scalable", "Production-Ready"],
      benefits: [
        { icon: "🎯", text: "Purpose-built solutions" },
        { icon: "⚙️", text: "Seamless integration" },
        { icon: "🚀", text: "Production-ready quality" },
        { icon: "🔄", text: "Easy maintenance" },
      ],
    },
    {
      title: "Performance Optimization",
      shortDescription:
        "Unlock hidden potential in existing systems through strategic optimization achieving 3x average performance improvement.",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>`,
      features: [
        "Performance audits",
        "Code optimization",
        "Database tuning",
        "Caching strategies",
        "CDN optimization",
        "Monitoring setup",
      ],
      benefitTags: ["3x Faster", "Lower Costs", "Better SEO"],
      benefits: [
        { icon: "⚡", text: "Faster load times" },
        { icon: "💸", text: "Lower infrastructure costs" },
        { icon: "😊", text: "Better user experience" },
        { icon: "📊", text: "Improved SEO rankings" },
      ],
    },
    {
      title: "Strategic Consulting",
      shortDescription:
        "Expert guidance on technology decisions with comprehensive roadmaps aligned with your business objectives.",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>`,
      features: [
        "Technology roadmaps",
        "Architecture reviews",
        "Team mentoring",
        "Tech selection guidance",
        "Risk assessment",
        "Cost-benefit analysis",
      ],
      benefitTags: ["Expert Guidance", "Risk Mitigation", "ROI Focus"],
      benefits: [
        { icon: "🎓", text: "Expert perspective" },
        { icon: "🎯", text: "Business-aligned" },
        { icon: "📚", text: "Knowledge transfer" },
        { icon: "💡", text: "Innovation strategies" },
      ],
    },
    {
      title: "Cloud & DevOps",
      shortDescription:
        "Automate deployments, scale infrastructure, and ensure reliability with modern cloud and DevOps practices.",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>`,
      features: [
        "CI/CD pipelines",
        "Containerization (Docker/Kubernetes)",
        "Cloud scaling (AWS/Azure)",
        "Monitoring & logging",
        "Disaster recovery",
        "Infrastructure as Code",
      ],
      benefitTags: ["99.99% Uptime", "Automated", "Scalable"],
      benefits: [
        { icon: "☁️", text: "Cloud reliability" },
        { icon: "🔧", text: "Automated deployments" },
        { icon: "📈", text: "Effortless scaling" },
        { icon: "🔒", text: "Secure infrastructure" },
      ],
    },
  ];

  processSteps = [
    {
      number: "00",
      title: "Kickoff & Logo",
      description:
        "Project kickoff with branding and logo setup for a unified identity.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <text x="12" y="16" text-anchor="middle" font-size="10" fill="currentColor">Logo</text>
      </svg>`,
      deliverables: ["Logo Files", "Brand Guidelines"],
    },
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
      name: "Project-Based",
      description: "Perfect for defined scope projects with clear deliverables",
      pricePrefix: "From",
      price: "$5,000",
      priceSuffix: "/project",
      features: [
        "Fixed scope & timeline",
        "Detailed project proposal",
        "Milestone-based payments",
        "Full documentation",
        "30-day support included",
      ],
    },
    {
      name: "Dedicated Engagement",
      description: "Ideal for ongoing development and complex initiatives",
      pricePrefix: "",
      price: "$150",
      priceSuffix: "/hour",
      features: [
        "Flexible scope",
        "Priority scheduling",
        "Weekly progress reports",
        "Direct communication",
        "Continuous optimization",
        "Knowledge transfer",
      ],
    },
    {
      name: "Consulting & Advisory",
      description: "Strategic guidance for technology decisions",
      pricePrefix: "From",
      price: "$2,500",
      priceSuffix: "/engagement",
      features: [
        "Technology assessments",
        "Architecture reviews",
        "Roadmap planning",
        "Team mentoring",
        "Written recommendations",
      ],
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private sanitizer: DomSanitizer,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    // Component initialization
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
