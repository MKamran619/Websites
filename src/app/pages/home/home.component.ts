import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section with Animated Background -->
    <section class="hero">
      <div class="hero-bg-effects">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="grid-pattern"></div>
      </div>

      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary)"
              stroke-width="2"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>New Agency · 8+ Years Enterprise Experience</span>
          </div>

          <h1 class="hero-title">
            <span class="title-line">We Engineer</span>
            <span class="title-gradient">Build · Launch · <span style="-webkit-text-fill-color:#4f8ef7;color:#4f8ef7">Grow</span></span>
            <span class="title-accent">For Your Business</span>
          </h1>

          <p class="hero-subtitle">
            From concept to deployment, we deliver enterprise-grade software solutions that drive growth. Backed by 8+ years of hands-on Angular, React, .NET Core, and Azure DevOps experience — including US Healthcare SaaS and UAE enterprise ERP — Nexa Web Services brings senior-level expertise at competitive rates.
          </p>
          <p class="hero-subtitle-smb">
            We also help coaches, consultants, and service-based businesses optimize their websites for search, speed, and conversions.
          </p>

          <div class="hero-features">
            <div class="feature-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                stroke-width="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Enterprise Solutions</span>
            </div>
            <div class="feature-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                stroke-width="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Cloud Architecture</span>
            </div>
            <div class="feature-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                stroke-width="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>SEO & Optimization</span>
            </div>
          </div>

          <div class="hero-cta">
            <a routerLink="/contact" class="btn btn-primary btn-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
              <span>Start a Conversation</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="arrow-icon"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a routerLink="/portfolio" class="btn btn-secondary btn-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span>Explore Case Studies</span>
            </a>
          </div>

          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--primary)"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span class="stat-number" data-count="8">8</span
              ><span class="stat-plus">+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--primary)"
                  stroke-width="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span class="stat-number" data-count="3">3</span>
              <span class="stat-label">Countries Served</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--primary)"
                  stroke-width="2"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
              </div>
              <span class="stat-number" data-count="98">98</span
              ><span class="stat-plus">%</span>
              <span class="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="visual-glow"></div>
          <div class="code-window">
            <div class="window-header">
              <div class="window-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="window-title">success.config.ts</span>
            </div>
            <div class="window-content">
              <pre><code><span class="keyword">export const</span> <span class="variable">nexaWebService</span> = {{'{'}}</code></pre>
              <pre><code>  <span class="property">name</span>: <span class="string">"Nexa Web Services Technologies"</span>,</code></pre>
              <pre><code>  <span class="property">services</span>: [</code></pre>
              <pre><code>    <span class="string">"Custom Software"</span>,</code></pre>
              <pre><code>    <span class="string">"Cloud Solutions"</span>,</code></pre>
              <pre><code>    <span class="string">"SEO & Optimization"</span></code></pre>
              <pre><code>  ],</code></pre>
              <pre><code>  <span class="property">commitment</span>: <span class="string">"Excellence"</span>,</code></pre>
              <pre><code>  <span class="property">readyToHelp</span>: <span class="boolean">true</span></code></pre>
              <pre><code>{{'}'}};</code></pre>
            </div>
          </div>
          <div class="tech-badges">
            <span class="tech-badge">Angular 17+</span>
            <span class="tech-badge">React</span>
            <span class="tech-badge">.NET Core</span>
            <span class="tech-badge">SEO & CWV</span>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="tech-stack">
      <div class="container">
        <p class="tech-label">Trusted Technologies</p>
        <div class="tech-carousel">
          <div class="tech-track">
            <div class="tech-item" *ngFor="let tech of technologies">
              <span class="tech-icon">{{ tech.icon }}</span>
              <span class="tech-name">{{ tech.name }}</span>
            </div>
            <div class="tech-item" *ngFor="let tech of technologies">
              <span class="tech-icon">{{ tech.icon }}</span>
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Proposition Section -->
    <section class="value-props">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Why Choose Us</span>
          <h2 class="section-title">Delivering Measurable Results</h2>
          <p class="section-subtitle">
            Every project is approached with a focus on business impact and
            technical excellence
          </p>
        </div>

        <div class="props-grid">
          <div class="prop-card" *ngFor="let prop of valueProps; let i = index">
            <div class="prop-icon">{{ prop.icon }}</div>
            <div class="prop-number">{{ prop.number }}</div>
            <h3>{{ prop.title }}</h3>
            <p>{{ prop.description }}</p>
            <div class="prop-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-preview">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">What We Do</span>
          <h2 class="section-title">Services That Drive Growth</h2>
          <p class="section-subtitle">
            End-to-end solutions tailored to your unique business challenges
          </p>
        </div>

        <div class="services-grid">
          <div
            class="service-card"
            *ngFor="let service of services; let i = index"
            [style.--delay]="i * 0.1 + 's'"
          >
            <div class="service-icon-wrapper">
              <div class="service-icon">{{ service.icon }}</div>
              <div class="icon-glow"></div>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <ul class="service-features">
              <li *ngFor="let feature of service.features">{{ feature }}</li>
            </ul>
            <a routerLink="/services" class="service-link">
              Learn more
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Nexa Section -->
    <section class="why-choose">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Why Nexa</span>
          <h2 class="section-title">Enterprise-Grade Thinking. Any Project Size.</h2>
          <p class="section-subtitle">
            Whether you're a Fortune 500 scaling infrastructure or a service-based brand optimizing your digital presence — we bring senior-level expertise to every engagement.
          </p>
        </div>

        <div class="why-grid">
          <div class="why-card" *ngFor="let item of whyChooseUs">
            <div class="why-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>

        <!-- Who We Serve -->
        <div class="who-serves">
          <div class="serve-card">
            <div class="serve-icon">🏢</div>
            <h4>Enterprise &amp; Mid-Market</h4>
            <p>SaaS platforms, cloud migration, legacy modernization, DevOps pipelines, US Healthcare EHR, UAE enterprise ERP systems</p>
          </div>
          <div class="serve-divider">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <div class="serve-card">
            <div class="serve-icon">🏪</div>
            <h4>Small Business &amp; Coaches</h4>
            <p>Website redesigns, SEO &amp; speed audits, landing pages, Wix/WordPress/Webflow optimization, digital presence for service brands</p>
          </div>
        </div>

        <div class="why-cta">
          <a routerLink="/contact" class="btn btn-primary">
            Get a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="trust-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Track Record</span>
          <h2 class="section-title">Impact By Numbers</h2>
        </div>

        <div class="trust-grid">
          <div class="trust-item" *ngFor="let stat of trustStats">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-number">{{ stat.number }}</div>
            <p>{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <div class="cta-badge">🎯 Free Consultation</div>
          <h2>Ready to Transform Your Business?</h2>
          <p>
            Let's discuss how we can help you achieve your technical and
            business goals with a no-obligation strategy session.
          </p>
          <div class="cta-buttons">
            <a routerLink="/contact" class="btn btn-primary btn-lg">
              Schedule Free Consultation
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
          </div>
          <p class="cta-note">
            ✓ No commitment required ✓ 30-minute session ✓ Actionable insights
          </p>
        </div>
        <div class="cta-decoration">
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private isBrowser: boolean;

  technologies = [
    { icon: "⚛️", name: "Angular 17+" },
    { icon: "🎨", name: "React" },
    { icon: "🔷", name: "TypeScript" },
    { icon: "💎", name: ".NET Core / C#" },
    { icon: "🟢", name: "Node.js" },
    { icon: "☁️", name: "Azure DevOps" },
    { icon: "⚡", name: "SQL Server" },
    { icon: "📊", name: "GraphQL" },
    { icon: "🗄️", name: "MongoDB" },
    { icon: "🤖", name: "GitHub Copilot" },
  ];

  valueProps = [
    {
      icon: "⚡",
      number: "40%",
      title: "Faster CI/CD",
      description:
        "Reduced deployment cycles by 40% at CareCloud via Azure DevOps pipeline architecture",
    },
    {
      icon: "🗄️",
      number: "35%",
      title: "Query Speed Gain",
      description:
        "Optimised SQL Server stored procedures cutting critical response times by 35% at Metropolitan",
    },
    {
      icon: "⏱️",
      number: "30%",
      title: "Faster Development",
      description:
        "Led end-to-end feature cycles at Inspire System, cutting development turnaround by 30%",
    },
    {
      icon: "🤖",
      number: "AI",
      title: "Accelerated Delivery",
      description:
        "Daily use of GitHub Copilot, Claude, and GPT-4 — faster code, better quality, cleaner docs",
    },
  ];

  services = [
    {
      icon: "🔍",
      title: "SEO & Website Optimization",
      description:
        "Full technical SEO audits, on-page optimization, Core Web Vitals improvements, and structured data implementation. We help Wix, WordPress, Webflow, and custom-built sites rank higher and load faster.",
      features: ["Technical SEO Audit", "Core Web Vitals", "Schema Markup", "Page Speed Boost"],
    },
    {
      icon: "🚀",
      title: "Digital Transformation",
      description:
        "Modernize legacy systems and embrace cloud-native architectures for the future",
      features: ["Cloud Migration", "API Development", "Microservices"],
    },
    {
      icon: "💻",
      title: "Custom Development",
      description:
        "Full-stack enterprise applications built with scalability in mind",
      features: ["Web Applications", "Mobile Apps", "Enterprise Software"],
    },
    {
      icon: "⚡",
      title: "Performance Optimization",
      description: "Unlock speed and efficiency in your existing systems",
      features: ["Code Optimization", "Database Tuning", "Caching Strategies"],
    },
    {
      icon: "🎯",
      title: "Strategic Consulting",
      description:
        "Expert guidance on technology roadmaps and architecture decisions",
      features: ["Tech Assessment", "Team Mentoring", "Architecture Review"],
    },
  ];

  whyChooseUs = [
    {
      icon: "🎯",
      title: "Senior-Level Expertise",
      description:
        "8+ years of hands-on Angular, React, .NET Core, and Azure — not junior talent with your work outsourced.",
    },
    {
      icon: "⚡",
      title: "Proven Results",
      description:
        "40% faster CI/CD at CareCloud, 35% query speed gain at Metropolitan, zero-downtime deployments across 3 countries.",
    },
    {
      icon: "🔍",
      title: "SEO & Performance First",
      description:
        "We don't just build sites — we optimize them. Technical SEO, Core Web Vitals, and speed improvements built into every project.",
    },
    {
      icon: "🤝",
      title: "Direct Communication",
      description:
        "You work directly with the senior developer. No project manager chain, no offshore handoffs — real accountability.",
    },
    {
      icon: "💡",
      title: "AI-Accelerated Delivery",
      description:
        "Daily use of GitHub Copilot, Claude, and GPT-4 means faster delivery, fewer bugs, and more focus on what matters.",
    },
    {
      icon: "🌍",
      title: "Global Track Record",
      description:
        "Enterprise solutions delivered across the US, UAE, and UK — including HIPAA-compliant healthcare and Fortune-level ERP systems.",
    },
  ];

  trustStats = [
    { icon: "📊", number: "8+", label: "Years Experience" },
    { icon: "🌍", number: "3", label: "Countries Served (US / UAE / UK)" },
    { icon: "⚡", number: "40%", label: "CI/CD Cycle Improvement (CareCloud)" },
    { icon: "⭐", number: "98%", label: "Client Satisfaction" },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Kill any existing ScrollTrigger instances to prevent conflicts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      this.animateOnScroll();
      this.createParticles();
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Slight delay to ensure DOM is fully rendered before setting up scroll-triggered counters
      setTimeout(() => {
        this.animateCounters();
      }, 100);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  }

  createParticles() {
    const container = document.getElementById("particles");
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 5 + "s";
      particle.style.animationDuration = Math.random() * 3 + 2 + "s";
      container.appendChild(particle);
    }
  }

  animateCounters() {
    const counters = document.querySelectorAll(".stat-number[data-count]");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count") || "0");

      // Use fromTo so the element shows its final value by default (no "0" flash)
      // and only animates 0 → target when the scrollTrigger fires
      gsap.fromTo(
        counter,
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          immediateRender: false, // do NOT apply the "from" state until scroll trigger fires
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }

  animateOnScroll() {
    // Hero animations
    gsap.from(".hero-badge", { opacity: 0, y: 20, duration: 0.6, delay: 0.2 });
    gsap.from(".hero-title .title-line", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.4,
    });
    gsap.from(".hero-title .title-gradient", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.6,
    });
    gsap.from(".hero-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.8,
    });
    gsap.from(".hero-subtitle-smb", {
      opacity: 0,
      y: 15,
      duration: 0.6,
      delay: 1.0,
    });
    gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, delay: 1.1 });
    gsap.from(".hero-stats", { opacity: 0, y: 20, duration: 0.6, delay: 1.2 });
    gsap.from(".hero-visual", { opacity: 0, x: 50, duration: 1, delay: 0.8 });

    // Value props
    gsap.utils.toArray<HTMLElement>(".prop-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%", once: true },
        opacity: 0,
        y: 60,
        duration: 0.7,
        delay: index * 0.15,
      });
    });

    // Service cards
    gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%", once: true },
        opacity: 0,
        y: 60,
        duration: 0.7,
        delay: index * 0.15,
      });
    });

    // Why choose cards
    gsap.utils.toArray<HTMLElement>(".why-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%", once: true },
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        delay: index * 0.1,
      });
    });

    // Trust items
    gsap.utils.toArray<HTMLElement>(".trust-item").forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 85%", once: true },
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: index * 0.1,
      });
    });
  }
}
