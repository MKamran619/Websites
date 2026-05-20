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
            <span>8+ Years of Enterprise Development Experience</span>
          </div>
          <h1 class="hero-title">
            Building <span class="gradient-text">Digital Excellence</span>
            <br />With Real Expertise
          </h1>
          <p class="hero-subtitle">
            Nexa Web Services is a freshly launched agency backed by 8+ years of hands-on enterprise development — Angular, React, .NET Core, Azure DevOps, and Healthcare SaaS. Senior-level work, delivered directly to you.
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">8+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">5</span>
              <span class="stat-label">Companies Served</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">3</span>
              <span class="stat-label">Countries (US / UAE / PK)</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">2024</span>
              <span class="stat-label">Agency Founded</span>
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
              Our journey reflects 8+ years of building real enterprise software for US and international clients — fully remote. From launching an Angular SSR application for a US logistics company (Metropolitan), to delivering HIPAA-compliant healthcare modules at CareCloud (US), to building complex ERP systems for UAE enterprise clients — we have navigated demanding requirements across industries and timezones.
            </p>
            <p class="story-text">
              In 2024, we launched Nexa Web Services to bring that same senior-level expertise directly to businesses like yours — without agency overhead. You work with an experienced senior developer, not a junior who escalates everything. Every project gets clean architecture, real performance, and code built to last.
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
            A real technical skill set built over 8+ years across US, UAE, and UK enterprise clients
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
            Every line of code I write carries 8 years of production experience — from HIPAA-compliant healthcare platforms to enterprise ERP systems across three countries. My clients get that senior-level thinking on every task, not just the big ones.
          </blockquote>
          <div class="philosophy-author">
            <div class="author-info">
              <span class="author-name">Kamran Sohail</span>
              <span class="author-title">Founder, Nexa Web Services · Senior Full Stack Developer</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Me -->
    <section class="why-choose-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Why Choose Us?</span>
          <h2 class="section-title">The Nexa Web Services Advantage</h2>
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
    { year: "2017", title: "Started — Frontend Developer (Eposelive)" },
    { year: "2019", title: "Full Stack — Angular + Node.js (TakDevs)" },
    { year: "2021", title: "Remote US Client — Full Stack (Metropolitan)" },
    { year: "2022", title: "Enterprise ERP — UAE (Inspire System)" },
    { year: "2024", title: "US Healthcare SaaS — Angular 17 (CareCloud)" },
    { year: "2024", title: "Nexa Web Services — Launched" },
  ];

  expertiseAreas = [
    {
      title: "Frontend — Angular & React",
      description:
        "8+ years building enterprise Angular and React UIs — from healthcare SaaS dashboards to ERP workflows handling thousands of daily users",
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
      technologies: [
        "Angular 2–17+",
        "React",
        "TypeScript",
        "RxJS",
        "NgRx / Redux",
        "HTML5 / CSS3",
      ],
    },
    {
      title: "UI Frameworks & Design Systems",
      description:
        "Hands-on experience with major enterprise UI component libraries, building consistent and accessible design systems",
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>',
      technologies: [
        "Telerik Kendo UI",
        "Angular Material",
        "CoreUI",
        "Bootstrap",
        "Material UI",
        "DevExtreme",
      ],
    },
    {
      title: "Backend — .NET Core & Node.js",
      description:
        "Production REST APIs and business logic in .NET Core/C# and Node.js, with SQL-optimised data layers for high-volume applications",
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>',
      technologies: [
        ".NET Core / C#",
        "Node.js",
        "Strapi",
        "REST APIs",
        "GraphQL",
        "Microservices",
      ],
    },
    {
      title: "Databases",
      description:
        "Relational and NoSQL databases — stored procedure optimisation that reduced query response times by 35% in production",
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
      technologies: [
        "SQL Server",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      title: "DevOps & Cloud",
      description:
        "Azure DevOps CI/CD pipelines that reduced deployment cycles by 40% at CareCloud. Experienced with cloud-native deployments and infrastructure automation",
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
      technologies: [
        "Azure DevOps",
        "CI/CD Pipelines",
        "Git / GitHub",
        "Netlify",
        "Railway",
        "FileZilla",
      ],
    },
    {
      title: "AI-Powered Development",
      description:
        "Daily use of AI tools to accelerate development velocity, improve code quality, and deliver better-documented code faster",
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>',
      technologies: [
        "GitHub Copilot",
        "ChatGPT (GPT-4)",
        "Claude (Anthropic)",
        "OpenAI Codex",
      ],
    },
  ];

  coreValues = [
    {
      number: "01",
      title: "Clean Architecture First",
      description:
        "Reusable components, consistent patterns, and code built to be maintained — not just to ship. Standards enforced through peer review and clean architecture principles.",
    },
    {
      number: "02",
      title: "Transparent & Async-Ready",
      description:
        "Daily updates, clear timelines, and zero surprises — the same async discipline built across 8 years of remote work for US and UAE clients.",
    },
    {
      number: "03",
      title: "Performance is Non-Negotiable",
      description:
        "Lighthouse scores, query response times, CI/CD speed — measurable performance matters in production, not just in demos.",
    },
    {
      number: "04",
      title: "AI-Augmented Quality",
      description:
        "Using GitHub Copilot, Claude, and GPT-4 daily means faster delivery and higher quality — not shortcuts. AI handles the boilerplate; judgment handles the architecture.",
    },
  ];

  advantages = [
    {
      icon: "🇺🇸",
      title: "Real US Client Experience",
      description:
        "Worked directly with US companies — CareCloud (Healthcare SaaS, Hybrid US) and Metropolitan Warehouse & Delivery (Remote, US). We understand American delivery standards, communication norms, and business expectations.",
    },
    {
      icon: "⏰",
      title: "Async-Friendly & Remote-First",
      description:
        "Based in Islamabad, Pakistan (UTC+5). 8+ years of async remote collaboration across US, UAE, and UK — you receive morning updates every day and replies within hours, not days.",
    },
    {
      icon: "💬",
      title: "Senior Developer Directly",
      description:
        "You work with an 8+ year senior developer, not a project manager or junior who escalates everything. Your vision stays intact from kickoff to launch.",
    },
    {
      icon: "🏥",
      title: "Healthcare & Enterprise Grade",
      description:
        "HIPAA-aware development experience from CareCloud. Enterprise ERP and complex workflow experience from Inspire System. We know what production-grade means.",
    },
    {
      icon: "💰",
      title: "Competitive Pricing",
      description:
        "Senior-level quality at offshore rates. You get the expertise of a US agency without the US agency price tag — fully transparent, no hidden costs.",
    },
    {
      icon: "🤖",
      title: "AI-Accelerated Delivery",
      description:
        "Daily use of GitHub Copilot, ChatGPT, Claude, and OpenAI Codex means faster delivery, higher code quality, and better documentation — without cutting corners.",
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
