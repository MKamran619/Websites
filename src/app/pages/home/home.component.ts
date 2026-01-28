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
      <div class="hero-background">
        <div class="gradient-sphere sphere-1"></div>
        <div class="gradient-sphere sphere-2"></div>
        <div class="gradient-sphere sphere-3"></div>
        <div class="grid-overlay"></div>
        <div class="particles" id="particles"></div>
      </div>

      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">🚀</span>
            <span>Available for Projects</span>
          </div>

          <h1 class="hero-title">
            <span class="title-line">Transforming Ideas Into</span>
            <span class="title-gradient">Digital Excellence</span>
          </h1>

          <p class="hero-subtitle">
            We are a team of expert developers with 10+ years crafting scalable,
            high-performance solutions for businesses worldwide. From startups
            to Fortune 500 companies.
          </p>

          <div class="hero-cta">
            <a routerLink="/contact" class="btn btn-primary btn-lg">
              <span>Start Your Project</span>
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
              <span>View Our Work</span>
            </a>
          </div>

          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number" data-count="50">0</span
              ><span class="stat-plus">+</span>
              <span class="stat-label">Projects Delivered</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number" data-count="10">0</span
              ><span class="stat-plus">+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number" data-count="98">0</span
              ><span class="stat-plus">%</span>
              <span class="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="code-window">
            <div class="window-header">
              <div class="window-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="window-title">excellence.ts</span>
            </div>
            <div class="window-content">
              <pre><code><span class="keyword">const</span> <span class="variable">apnaKam</span> = {{'{'}}</code></pre>
              <pre><code>  <span class="property">company</span>: <span class="string">"ApnaKam Technologies"</span>,</code></pre>
              <pre><code>  <span class="property">expertise</span>: [<span class="string">"Web Dev"</span>, <span class="string">"Cloud"</span>],</code></pre>
              <pre><code>  <span class="property">mission</span>: <span class="string">"Building Solutions"</span>,</code></pre>
              <pre><code>  <span class="property">available</span>: <span class="boolean">true</span></code></pre>
              <pre><code>{{'}'}};</code></pre>
            </div>
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

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Client Success Stories</span>
          <h2 class="section-title">What Clients Say</h2>
        </div>

        <div class="testimonials-grid">
          <div
            class="testimonial-card"
            *ngFor="let testimonial of testimonials"
          >
            <div class="quote-icon">"</div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
            <div class="testimonial-author">
              <div class="author-avatar">{{ testimonial.initials }}</div>
              <div class="author-info">
                <h4>{{ testimonial.name }}</h4>
                <p>{{ testimonial.role }}</p>
              </div>
            </div>
            <div class="testimonial-rating">
              <span *ngFor="let star of [1, 2, 3, 4, 5]">⭐</span>
            </div>
          </div>
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
    { icon: "⚛️", name: "Angular" },
    { icon: "🔷", name: "TypeScript" },
    { icon: "💎", name: ".NET Core" },
    { icon: "🟢", name: "Node.js" },
    { icon: "☁️", name: "Azure" },
    { icon: "🐳", name: "Docker" },
    { icon: "⚡", name: "PostgreSQL" },
    { icon: "🔥", name: "Redis" },
    { icon: "📊", name: "GraphQL" },
    { icon: "🎨", name: "React" },
  ];

  valueProps = [
    {
      icon: "💰",
      number: "40%",
      title: "Cost Reduction",
      description:
        "Optimized solutions that reduce development and operational costs significantly",
    },
    {
      icon: "⚡",
      number: "300%",
      title: "Performance Boost",
      description:
        "Systems engineered for maximum speed, scale, and high availability",
    },
    {
      icon: "🎯",
      number: "50+",
      title: "Projects Delivered",
      description:
        "Proven track record across diverse industries and technology stacks",
    },
    {
      icon: "🏆",
      number: "100%",
      title: "Client Satisfaction",
      description:
        "Dedicated to exceeding expectations on every single project",
    },
  ];

  services = [
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

  testimonials = [
    {
      text: "ApnaKam transformed our legacy system into a modern, scalable platform. The 3x performance improvement exceeded our expectations.",
      name: "Sarah Johnson",
      role: "CTO, TechCorp Inc.",
      initials: "SJ",
    },
    {
      text: "Working with ApnaKam was a game-changer. They delivered our e-commerce platform on time and under budget with exceptional quality.",
      name: "Michael Chen",
      role: "CEO, RetailPlus",
      initials: "MC",
    },
    {
      text: "The cloud migration project was seamless. ApnaKam's expertise saved us $200K annually in infrastructure costs.",
      name: "Emily Davis",
      role: "VP Engineering, FinanceHub",
      initials: "ED",
    },
  ];

  trustStats = [
    { icon: "📊", number: "50+", label: "Projects Completed" },
    { icon: "🔄", number: "85%", label: "Repeat Business Rate" },
    { icon: "⚡", number: "3x", label: "Avg. Performance Gain" },
    { icon: "⭐", number: "4.9/5", label: "Client Satisfaction" },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Kill any existing ScrollTrigger instances to prevent conflicts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Reset counters to 0 before animating
      this.resetCounters();

      this.animateOnScroll();
      this.createParticles();
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Delay counter animation slightly to ensure DOM is ready
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

  resetCounters() {
    const counters = document.querySelectorAll(".stat-number[data-count]");
    counters.forEach((counter) => {
      counter.innerHTML = "0";
    });
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
      // Reset counter to 0 first
      counter.innerHTML = "0";

      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
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
    gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, delay: 1 });
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

    // Testimonials
    gsap.utils
      .toArray<HTMLElement>(".testimonial-card")
      .forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
          opacity: 0,
          scale: 0.9,
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
