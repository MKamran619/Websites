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
import { ContentService } from "../../services/content.service";

gsap.registerPlugin(ScrollTrigger);

interface PageHero {
  page: string;
  badge: string;
  title: string;
  subtitle: string;
  cta_primary_label: string;
  cta_primary_link: string;
  cta_secondary_label: string;
  cta_secondary_link: string;
  tech_badges: string[];
  code_snippet: string;
}

interface StatBlock {
  page: string;
  section: string;
  icon: string;
  value: string;
  label: string;
  description: string;
  sort_order: number;
}

interface AboutStoryHighlight {
  icon: string;
  title: string;
  description: string;
}

interface AboutStory {
  id: number;
  paragraph_1: string;
  paragraph_2: string;
  highlights: AboutStoryHighlight[];
  quote_text: string;
  quote_author: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  sort_order: number;
}

interface ExpertiseArea {
  icon: string;
  title: string;
  description: string;
  tech_stack: string[];
  sort_order: number;
}

interface FeatureBlock {
  page: string;
  section: string;
  icon: string;
  eyebrow: string | null;
  title: string;
  description: string;
  sort_order: number;
}

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
            <span class="badge-icon">âœ¨</span>
            <span>{{ hero?.badge }}</span>
          </div>
          <h1 class="hero-title">
            Building <span class="gradient-text">Digital Excellence</span>
            <br />With Real Expertise
          </h1>
          <p class="hero-subtitle">
            {{ hero?.subtitle }}
          </p>
          <div class="hero-stats">
            <div class="stat-item" *ngFor="let stat of heroStats">
              <span class="stat-number">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
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
              {{ story?.paragraph_1 }}
            </p>
            <p class="story-text">
              {{ story?.paragraph_2 }}
            </p>
            <div class="story-highlights">
              <div class="highlight-item" *ngFor="let highlight of story?.highlights">
                <div class="highlight-icon">{{ highlight.icon }}</div>
                <div class="highlight-text">
                  <strong>{{ highlight.title }}</strong>
                  <span>{{ highlight.description }}</span>
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
              <span class="tech-tag" *ngFor="let tech of area.tech_stack">{{
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
            <div class="value-number">{{ value.icon }}</div>
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
            {{ story?.quote_text }}
          </blockquote>
          <div class="philosophy-author">
            <div class="author-info">
              <span class="author-name">{{ quoteAuthorName }}</span>
              <span class="author-title">{{ quoteAuthorTitle }}</span>
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
          <h2 class="section-title">The Nexa Web Service Advantage</h2>
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

  hero: PageHero | null = null;
  heroStats: StatBlock[] = [];
  story: AboutStory | null = null;
  quoteAuthorName = '';
  quoteAuthorTitle = '';
  milestones: Milestone[] = [];
  expertiseAreas: ExpertiseArea[] = [];
  coreValues: FeatureBlock[] = [];
  advantages: FeatureBlock[] = [];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private sanitizer: DomSanitizer,
    private content: ContentService,
  ) {
    this.platformId = platformId;
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.content
      .getRow<PageHero>("page_heroes", { page: "about" })
      .subscribe((hero) => {
        this.hero = hero;
      });
    this.content
      .getAll<StatBlock>("stat_blocks", { match: { page: "about", section: "hero" } })
      .subscribe((stats) => {
        this.heroStats = stats;
      });
    this.content
      .getRow<AboutStory>("about_story", { id: 1 })
      .subscribe((story) => {
        this.story = story;
        if (story?.quote_author) {
          const [name, title] = story.quote_author.split("|");
          this.quoteAuthorName = name ?? story.quote_author;
          this.quoteAuthorTitle = title ?? "";
        }
      });
    this.content.getAll<Milestone>("milestones").subscribe((milestones) => {
      this.milestones = milestones;
    });
    this.content
      .getAll<ExpertiseArea>("expertise_areas")
      .subscribe((areas) => {
        this.expertiseAreas = areas;
      });
    this.content
      .getAll<FeatureBlock>("feature_blocks", { match: { page: "about", section: "core_values" } })
      .subscribe((values) => {
        this.coreValues = values;
      });
    this.content
      .getAll<FeatureBlock>("feature_blocks", { match: { page: "about", section: "why_choose_us" } })
      .subscribe((advantages) => {
        this.advantages = advantages;
      });

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

