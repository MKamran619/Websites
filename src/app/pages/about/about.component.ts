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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Premium Hero Section -->
    <section class="about-hero">
      <div class="hero-bg-effects">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="grid-pattern"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">✨</span>
            <span>Trusted by 50+ American Businesses</span>
          </div>
          <h1 class="hero-title">
            Building <span class="gradient-text">Digital Excellence</span>
            <br />Since 2014
          </h1>
          <p class="hero-subtitle">
            ApnaKam is a leading software development company passionate about
            transforming businesses through innovative technology solutions.
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">10+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">Projects Delivered</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">98%</span>
              <span class="stat-label">Client Satisfaction</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">$5M+</span>
              <span class="stat-label">Value Created</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="story-grid">
          <div class="story-content">
            <span class="section-tag">Our Story</span>
            <h2 class="section-title">From Code to Business Transformation</h2>
            <p class="story-text">
              Our journey began with a simple belief: technology should solve
              real problems, not create complexity. Over the past decade, we've
              had the privilege of working with startups and Fortune 500
              companies alike, turning their vision into reality.
            </p>
            <p class="story-text">
              Today, we specialize in helping businesses worldwide navigate
              digital transformation, modernize legacy systems, and build
              scalable solutions that drive measurable ROI. Every project is
              approached with the same commitment to excellence and partnership.
            </p>
            <div class="story-highlights">
              <div class="highlight-item">
                <div class="highlight-icon">🎯</div>
                <div class="highlight-text">
                  <strong>Mission-Driven</strong>
                  <span>Solutions that align with your business goals</span>
                </div>
              </div>
              <div class="highlight-item">
                <div class="highlight-icon">🤝</div>
                <div class="highlight-text">
                  <strong>Partnership Approach</strong>
                  <span>Your success is our success</span>
                </div>
              </div>
              <div class="highlight-item">
                <div class="highlight-icon">🚀</div>
                <div class="highlight-text">
                  <strong>Results-Focused</strong>
                  <span>Delivering measurable business value</span>
                </div>
              </div>
            </div>
          </div>
          <div class="story-visual">
            <div class="visual-card">
              <div class="card-inner">
                <div class="experience-badge">
                  <span class="badge-year">2014</span>
                  <span class="badge-text">Started Journey</span>
                </div>
                <div class="milestones">
                  <div class="milestone" *ngFor="let milestone of milestones">
                    <span class="milestone-year">{{ milestone.year }}</span>
                    <span class="milestone-title">{{ milestone.title }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Expertise Section -->
    <section class="expertise-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Technical Expertise</span>
          <h2 class="section-title">Technology Stack & Capabilities</h2>
          <p class="section-subtitle">
            A comprehensive skill set refined over 10+ years of building
            enterprise-grade solutions
          </p>
        </div>
        <div class="expertise-grid">
          <div class="expertise-card" *ngFor="let area of expertiseAreas">
            <div class="card-icon" [innerHTML]="getSafeHtml(area.icon)"></div>
            <h3 class="card-title">{{ area.title }}</h3>
            <p class="card-description">{{ area.description }}</p>
            <div class="tech-tags">
              <span class="tech-tag" *ngFor="let tech of area.technologies">{{
                tech
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Core Values</span>
          <h2 class="section-title">What Drives Our Work</h2>
        </div>
        <div class="values-grid">
          <div class="value-card" *ngFor="let value of coreValues">
            <div class="value-number">{{ value.number }}</div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-description">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy Quote -->
    <section class="philosophy-section">
      <div class="container">
        <div class="philosophy-card">
          <div class="quote-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"
              ></path>
              <path
                d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
              ></path>
            </svg>
          </div>
          <blockquote class="philosophy-quote">
            We don't just write code; we architect solutions that transform
            businesses. Every line of code is written with your ROI in mind.
          </blockquote>
          <div class="philosophy-author">
            <div class="author-info">
              <span class="author-name">ApnaKam Team</span>
              <span class="author-title">Software Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Me -->
    <section class="why-choose-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Why ApnaKam?</span>
          <h2 class="section-title">The ApnaKam Advantage</h2>
        </div>
        <div class="advantages-grid">
          <div class="advantage-card" *ngFor="let advantage of advantages">
            <div class="advantage-icon">{{ advantage.icon }}</div>
            <h3 class="advantage-title">{{ advantage.title }}</h3>
            <p class="advantage-description">{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Transform Your Business?</h2>
            <p class="cta-text">
              Let's discuss how we can work together to achieve your technology
              goals. Schedule a free 30-minute consultation today.
            </p>
            <div class="cta-buttons">
              <a routerLink="/contact" class="btn btn-primary btn-lg">
                <span>Schedule Consultation</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a routerLink="/portfolio" class="btn btn-secondary btn-lg">
                <span>View Case Studies</span>
              </a>
            </div>
          </div>
          <div class="cta-decoration">
            <div class="decoration-circle"></div>
            <div class="decoration-ring"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean = false;
  platformId: Object;

  milestones = [
    { year: "2016", title: "First Enterprise Project" },
    { year: "2018", title: "Technical Lead Role" },
    { year: "2020", title: "Cloud Architecture Specialist" },
    { year: "2022", title: "Digital Transformation Consultant" },
    { year: "2024", title: "ApnaKam Founded" },
  ];

  expertiseAreas = [
    {
      title: "Frontend Development",
      description:
        "Creating beautiful, responsive, and performant user interfaces",
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
      technologies: [
        "Angular",
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "SCSS",
      ],
    },
    {
      title: "Backend Development",
      description:
        "Building robust, scalable server-side applications and APIs",
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>',
      technologies: [
        ".NET Core",
        "Node.js",
        "Python",
        "REST APIs",
        "GraphQL",
        "Microservices",
      ],
    },
    {
      title: "Cloud & DevOps",
      description:
        "Deploying and managing applications in the cloud with automation",
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
      technologies: [
        "Azure",
        "AWS",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Terraform",
      ],
    },
    {
      title: "Database & Architecture",
      description: "Designing data models and system architectures that scale",
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
      technologies: [
        "SQL Server",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "System Design",
        "DDD",
      ],
    },
  ];

  coreValues = [
    {
      number: "01",
      title: "Excellence in Execution",
      description:
        "Every project receives meticulous attention to detail and commitment to the highest quality standards.",
    },
    {
      number: "02",
      title: "Transparent Communication",
      description:
        "Clear, honest communication throughout the project lifecycle. No surprises, just results.",
    },
    {
      number: "03",
      title: "Business-First Approach",
      description:
        "Technology decisions are always aligned with your business objectives and ROI expectations.",
    },
    {
      number: "04",
      title: "Continuous Innovation",
      description:
        "Staying ahead of technology trends to deliver modern, future-proof solutions.",
    },
  ];

  advantages = [
    {
      icon: "🇺🇸",
      title: "US Business Focus",
      description:
        "Deep understanding of American business practices, compliance requirements, and market dynamics.",
    },
    {
      icon: "⏰",
      title: "Time Zone Aligned",
      description:
        "Flexible working hours to accommodate your schedule. Real-time collaboration when you need it.",
    },
    {
      icon: "💬",
      title: "Direct Communication",
      description:
        "Work directly with me - no middlemen, no handoffs. Your vision stays intact throughout.",
    },
    {
      icon: "🔒",
      title: "NDA Protected",
      description:
        "Your intellectual property is protected. Complete confidentiality on all projects.",
    },
    {
      icon: "💰",
      title: "Competitive Pricing",
      description:
        "Premium quality at competitive rates. Transparent pricing with no hidden costs.",
    },
    {
      icon: "🛡️",
      title: "Long-term Support",
      description:
        "Partnership doesn't end at delivery. Ongoing support and maintenance available.",
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private sanitizer: DomSanitizer,
  ) {
    this.platformId = platformId;
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.animateOnScroll();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 200);
    }
  }

  animateOnScroll() {
    // Hero animations
    gsap.from(".hero-content > *", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Story section
    gsap.from(".story-content", {
      scrollTrigger: {
        trigger: ".story-section",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
    });

    gsap.from(".story-visual", {
      scrollTrigger: {
        trigger: ".story-section",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
    });

    // Expertise cards
    gsap.utils
      .toArray<HTMLElement>(".expertise-card")
      .forEach((card, index) => {
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

    // Value cards
    gsap.utils.toArray<HTMLElement>(".value-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: index * 0.15,
      });
    });

    // Advantage cards
    gsap.utils
      .toArray<HTMLElement>(".advantage-card")
      .forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          delay: index * 0.08,
        });
      });

    // Philosophy section
    gsap.from(".philosophy-card", {
      scrollTrigger: {
        trigger: ".philosophy-section",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
    });

    // CTA section
    gsap.from(".cta-card", {
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
    });

    // Refresh ScrollTrigger to ensure all animations are properly registered
    ScrollTrigger.refresh();
  }
}
