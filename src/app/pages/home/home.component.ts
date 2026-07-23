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
import { ContentService } from "../../services/content.service";

gsap.registerPlugin(ScrollTrigger);

export interface PageHero {
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

export interface FeatureBlock {
  page: string;
  section: string;
  icon: string | null;
  eyebrow: string | null;
  title: string;
  description: string | null;
  sort_order: number;
}

export interface StatBlock {
  page: string;
  section: string;
  icon: string | null;
  value: string;
  label: string;
  description: string | null;
  sort_order: number;
}

export interface TechStackItem {
  icon: string | null;
  name: string;
  sort_order: number;
}

export interface HomeService {
  page: string;
  icon: string | null;
  title: string;
  short_description: string | null;
  features: string[] | null;
  benefit_tags: string[] | null;
  sort_order: number;
}

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
          <h1 class="hero-title">
            <span class="title-line">We Engineer</span>
            <span class="title-gradient">Build · Launch · <span style="-webkit-text-fill-color:#4f8ef7;color:#4f8ef7">Grow</span></span>
            <span class="title-accent">For Your Business</span>
          </h1>

          <p class="hero-subtitle">
            {{ heroSubtitleMain }}
          </p>
          <p class="hero-subtitle-smb" *ngIf="heroSubtitleSmb">
            {{ heroSubtitleSmb }}
          </p>

          <div class="hero-features">
            <div class="feature-item" *ngFor="let feature of heroFeatures">
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
              <span>{{ feature.title }}</span>
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
              <span>{{ hero?.cta_primary_label }}</span>
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
              <span>{{ hero?.cta_secondary_label }}</span>
            </a>
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
            <div class="window-content"><pre><code>{{ hero?.code_snippet }}</code></pre></div>
          </div>
          <div class="tech-badges">
            <span class="tech-badge" *ngFor="let badge of hero?.tech_badges">{{ badge }}</span>
          </div>

          <div class="hero-stats">
            <ng-container *ngFor="let stat of heroStats; let last = last">
              <div class="stat-item">
                <div class="stat-top">
                  <div class="stat-icon">
                    <svg
                      *ngIf="stat.label === 'Years Experience'"
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
                    <svg
                      *ngIf="stat.label === 'Countries Served'"
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
                    <svg
                      *ngIf="stat.label === 'Client Satisfaction'"
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
                  <div class="stat-value">
                    <span class="stat-number" [attr.data-count]="stat.value">{{ stat.value }}</span
                    ><span class="stat-plus" *ngIf="stat.label !== 'Countries Served'">{{ stat.label === 'Client Satisfaction' ? '%' : '+' }}</span>
                  </div>
                </div>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
              <div class="stat-divider" *ngIf="!last"></div>
            </ng-container>
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
            <div class="prop-number">{{ prop.eyebrow }}</div>
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
            <p>{{ service.short_description }}</p>
            <ul class="service-features">
              <li *ngFor="let feature of service.features">{{ feature }}</li>
            </ul>
            <a
              routerLink="/services"
              class="service-link"
              [attr.aria-label]="'Learn more about ' + service.title"
            >
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
            <div class="stat-number">{{ stat.value }}</div>
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

  hero: PageHero | null = null;
  heroSubtitleMain = "";
  heroSubtitleSmb = "";
  heroFeatures: FeatureBlock[] = [];
  heroStats: StatBlock[] = [];
  trustStats: StatBlock[] = [];
  technologies: TechStackItem[] = [];
  valueProps: FeatureBlock[] = [];
  services: HomeService[] = [];
  whyChooseUs: FeatureBlock[] = [];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private content: ContentService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.content.getRow<PageHero>("page_heroes", { page: "home" }).subscribe((hero) => {
      this.hero = hero;
      const [main, smb] = (hero?.subtitle ?? "").split("\n\n");
      this.heroSubtitleMain = main ?? "";
      this.heroSubtitleSmb = smb ?? "";
    });
    this.content
      .getAll<FeatureBlock>("feature_blocks", { match: { page: "home", section: "hero_features" } })
      .subscribe((rows) => (this.heroFeatures = rows));
    this.content
      .getAll<StatBlock>("stat_blocks", { match: { page: "home", section: "hero" } })
      .subscribe((rows) => (this.heroStats = rows));
    this.content
      .getAll<StatBlock>("stat_blocks", { match: { page: "home", section: "trust" } })
      .subscribe((rows) => (this.trustStats = rows));
    this.content.getAll<TechStackItem>("tech_stack_items").subscribe((rows) => (this.technologies = rows));
    this.content
      .getAll<FeatureBlock>("feature_blocks", { match: { page: "home", section: "value_props" } })
      .subscribe((rows) => (this.valueProps = rows));
    this.content
      .getAll<HomeService>("services", { match: { page: "home" } })
      .subscribe((rows) => (this.services = rows));
    this.content
      .getAll<FeatureBlock>("feature_blocks", { match: { page: "home", section: "why_choose_us" } })
      .subscribe((rows) => (this.whyChooseUs = rows));

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
    gsap.from(".hero-title .title-line", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
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
