import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContentService } from "../../services/content.service";

gsap.registerPlugin(ScrollTrigger);

interface PageHero {
  page: string;
  badge: string;
  title: string;
  subtitle: string;
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
  icon: string;
  value: string;
  label: string;
  description: string;
  sort_order: number;
}

interface Industry {
  id: number;
  icon: string;
  name: string;
  description: string;
  sort_order: number;
}

interface CaseStudyResult {
  metric: string;
  description: string;
}

interface CaseStudy {
  id: number;
  title: string;
  company: string;
  industry: string;
  icon: string;
  project_type: string;
  duration: string;
  team: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  technologies: string[];
  sort_order: number;
}

interface Testimonial {
  context: string;
  quote: string;
  author_name: string;
  author_title: string;
  company: string | null;
  avatar_url: string | null;
  rating: number | null;
  sort_order: number;
}

@Component({
  selector: "app-portfolio",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Premium Hero Section -->
    <section class="portfolio-hero">
      <div class="hero-bg-effects">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="grid-pattern"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>{{ hero?.badge }}</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">Case Studies</span> &<br />
            Representative Work
          </h1>
          <p class="hero-subtitle">
            {{ hero?.subtitle }}
          </p>
        </div>
      </div>
    </section>

    <!-- Case Studies -->
    <section class="portfolio-content">
      <div class="container">
        <div
          class="case-study"
          *ngFor="let study of visibleCaseStudies; let i = index"
          [class.reverse]="i % 2 !== 0"
        >
          <div class="case-study-content">
            <div class="study-header">
              <span class="industry-badge">{{ study.industry }}</span>
              <h2>{{ study.title }}</h2>
              <p class="company">{{ study.company }}</p>
            </div>

            <div class="study-section challenge">
              <div class="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <div class="section-content">
                <h3>The Challenge</h3>
                <p>{{ study.challenge }}</p>
              </div>
            </div>

            <div class="study-section solution">
              <div class="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                  />
                </svg>
              </div>
              <div class="section-content">
                <h3>Our Solution</h3>
                <p>{{ study.solution }}</p>
              </div>
            </div>

            <div class="results">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                Measurable Results
              </h3>
              <div class="results-grid">
                <div class="result-item" *ngFor="let result of study.results">
                  <div class="result-metric">{{ result.metric }}</div>
                  <p>{{ result.description }}</p>
                </div>
              </div>
            </div>

            <div class="technologies">
              <h3>Tech Stack</h3>
              <div class="tech-tags">
                <span
                  class="tech-tag"
                  *ngFor="let tech of study.technologies"
                  >{{ tech }}</span
                >
              </div>
            </div>
          </div>

          <div class="case-study-visual">
            <div class="visual-card">
              <div class="visual-icon">{{ study.icon }}</div>
              <div class="visual-label">{{ study.project_type }}</div>
              <div class="visual-timeline">
                <span class="timeline-item">
                  <strong>Duration:</strong> {{ study.duration }}
                </span>
                <span class="timeline-item">
                  <strong>Team:</strong> {{ study.team }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="load-more-container"
          *ngIf="
            !showAllCaseStudies && caseStudies.length > visibleCaseStudiesCount
          "
        >
          <button
            class="btn btn-outline load-more-btn"
            (click)="loadMoreCaseStudies()"
          >
            <span>More Success Stories</span>
            <span class="remaining-count"
              >({{ caseStudies.length - visibleCaseStudiesCount }} more)</span
            >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Impact Stats -->
    <section class="portfolio-stats">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Impact Summary</span>
          <h2 class="section-title">The Numbers Speak for Themselves</h2>
        </div>
        <div class="stats-grid">
          <div class="stat-card" *ngFor="let stat of impactStats">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-number">{{ stat.value }}</div>
            <p class="stat-label">{{ stat.label }}</p>
            <p class="stat-description">{{ stat.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Industries Served -->
    <section class="industries-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Industries Served</span>
          <h2 class="section-title">Expertise Across Sectors</h2>
          <p class="section-subtitle">
            Delivering tailored solutions for diverse industries
          </p>
        </div>
        <div class="industries-grid">
          <div class="industry-card" *ngFor="let industry of industries">
            <div class="industry-icon">{{ industry.icon }}</div>
            <h3>{{ industry.name }}</h3>
            <p>{{ industry.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Testimonial -->
    <section class="testimonial-section">
      <div class="container">
        <div class="testimonial-card">
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
          <blockquote>
            "{{ testimonial?.quote }}"
          </blockquote>
          <div class="testimonial-author">
            <div class="author-avatar">JR</div>
            <div class="author-info">
              <span class="author-name">{{ testimonial?.author_name }}</span>
              <span class="author-title">{{ testimonial?.author_title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Write Your Success Story?</h2>
            <p class="cta-text">
              Every case study started with a conversation. Let's discuss how we
              can transform your challenges into measurable results.
            </p>
            <div class="cta-buttons">
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
              <a routerLink="/services" class="btn btn-secondary btn-lg">
                <span>View Services</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent implements OnInit {
  private isBrowser: boolean;

  showAllCaseStudies = false;
  visibleCaseStudiesCount = 6;

  get visibleCaseStudies() {
    return this.showAllCaseStudies
      ? this.caseStudies
      : this.caseStudies.slice(0, this.visibleCaseStudiesCount);
  }

  hero: PageHero | null = null;
  impactStats: StatBlock[] = [];
  industries: Industry[] = [];
  caseStudies: CaseStudy[] = [];
  testimonial: Testimonial | null = null;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private content: ContentService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.content
      .getRow<PageHero>("page_heroes", { page: "portfolio" })
      .subscribe((hero) => {
        this.hero = hero;
      });
    this.content
      .getAll<StatBlock>("stat_blocks", {
        match: { page: "portfolio", section: "impact" },
      })
      .subscribe((stats) => {
        this.impactStats = stats;
      });
    this.content.getAll<Industry>("industries").subscribe((industries) => {
      this.industries = industries;
    });
    this.content
      .getAll<CaseStudy>("case_studies")
      .subscribe((caseStudies) => {
        this.caseStudies = caseStudies;
      });
    this.content
      .getRow<Testimonial>("testimonials", { context: "portfolio" })
      .subscribe((testimonial) => {
        this.testimonial = testimonial;
      });

    if (this.isBrowser) {
      this.animateOnScroll();
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

    // Case studies
    gsap.utils.toArray<HTMLElement>(".case-study").forEach((study, index) => {
      gsap.from(study, {
        scrollTrigger: {
          trigger: study,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
      });
    });

    // Stats cards
    gsap.utils.toArray<HTMLElement>(".stat-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.6,
        delay: index * 0.1,
      });
    });

    // Industry cards
    gsap.utils.toArray<HTMLElement>(".industry-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: index * 0.08,
      });
    });

    // Testimonial
    gsap.from(".testimonial-card", {
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
    });

    // CTA
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
  }

  loadMoreCaseStudies() {
    this.showAllCaseStudies = true;
    // Refresh ScrollTrigger after showing more case studies
    if (this.isBrowser) {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 100);
    }
  }
}

