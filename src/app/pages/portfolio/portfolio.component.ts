import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
            <span class="badge-icon">🏆</span>
            <span>Proven Results for Businesses Worldwide</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">Case Studies</span> &<br />
            Success Stories
          </h1>
          <p class="hero-subtitle">
            Explore how we've helped businesses like yours achieve measurable
            results through innovative technology solutions. Real projects, real
            impact.
          </p>
        </div>
      </div>
    </section>

    <!-- Case Studies -->
    <section class="portfolio-content">
      <div class="container">
        <div
          class="case-study"
          *ngFor="let study of caseStudies; let i = index"
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
              <div class="visual-label">{{ study.projectType }}</div>
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
            <div class="stat-number">{{ stat.number }}</div>
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
            "Working with ApnaKam was a game-changer for our business. They
            transformed our legacy systems into a modern, scalable platform that
            reduced our operational costs by 40% and improved customer
            satisfaction scores dramatically."
          </blockquote>
          <div class="testimonial-author">
            <div class="author-avatar">JR</div>
            <div class="author-info">
              <span class="author-name">James Richardson</span>
              <span class="author-title">CTO, Fortune 500 Retail Company</span>
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

  impactStats = [
    {
      icon: "🚀",
      number: "50+",
      label: "Projects Delivered",
      description: "Successfully completed enterprise projects",
    },
    {
      icon: "📈",
      number: "3x",
      label: "Performance Gain",
      description: "Average improvement in system performance",
    },
    {
      icon: "💰",
      number: "40%",
      label: "Cost Reduction",
      description: "Average savings in operational costs",
    },
    {
      icon: "⭐",
      number: "4.9/5",
      label: "Client Rating",
      description: "Average satisfaction score",
    },
  ];

  industries = [
    {
      icon: "🛍️",
      name: "E-Commerce & Retail",
      description: "Online stores and retail platforms",
    },
    {
      icon: "💼",
      name: "Financial Services",
      description: "Banks, insurance, and fintech",
    },
    {
      icon: "🏥",
      name: "Healthcare",
      description: "Medical systems and health tech",
    },
    {
      icon: "🏭",
      name: "Manufacturing",
      description: "Industrial automation and IoT",
    },
    {
      icon: "📦",
      name: "Logistics",
      description: "Supply chain and delivery systems",
    },
    {
      icon: "🎓",
      name: "Education",
      description: "E-learning and EdTech platforms",
    },
  ];

  caseStudies = [
    {
      title: "E-Commerce Platform Modernization",
      company: "Fortune 500 Retail Company",
      industry: "Retail & E-Commerce",
      icon: "🛍️",
      projectType: "Platform Modernization",
      duration: "8 months",
      team: "4 developers",
      challenge:
        "Legacy monolithic e-commerce platform causing slow deployments, scaling issues during peak seasons, and poor mobile experience leading to 35% cart abandonment.",
      solution:
        "Implemented microservices architecture with Angular PWA frontend, Node.js backend, and Azure cloud infrastructure. Introduced CI/CD pipelines, containerization with Kubernetes, and implemented a headless commerce approach.",
      results: [
        { metric: "300%", description: "Faster page load times" },
        { metric: "10x", description: "Peak traffic capacity" },
        { metric: "50%", description: "Reduced cart abandonment" },
        { metric: "$2M", description: "Annual savings" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "Docker",
        "Kubernetes",
        "Azure",
        "PostgreSQL",
        "Redis",
      ],
    },
    {
      title: "Enterprise CRM System Integration",
      company: "B2B SaaS Company",
      industry: "Technology",
      icon: "📊",
      projectType: "System Integration",
      duration: "6 months",
      team: "3 developers",
      challenge:
        "Multiple disconnected systems causing data silos, hours of manual data entry, and limited real-time reporting capabilities affecting sales team productivity.",
      solution:
        "Built unified API layer with .NET Core, created real-time Power BI dashboards, and implemented automated workflows with Azure Logic Apps to integrate 5 disparate systems.",
      results: [
        { metric: "75%", description: "Less manual data entry" },
        { metric: "Real-time", description: "Cross-system sync" },
        { metric: "60%", description: "Faster reporting" },
        { metric: "$1.5M", description: "Revenue increase" },
      ],
      technologies: [
        ".NET Core",
        "Angular",
        "SQL Server",
        "Azure Service Bus",
        "Power BI",
        "Azure Logic Apps",
      ],
    },
    {
      title: "Legacy System Modernization",
      company: "Insurance Industry Leader",
      industry: "Insurance & Finance",
      icon: "🏢",
      projectType: "Digital Transformation",
      duration: "18 months",
      team: "6 developers",
      challenge:
        "20-year-old mainframe system with $500K annual licensing costs, difficulty hiring specialized talent, and 6-month feature deployment cycles limiting market competitiveness.",
      solution:
        "Systematically migrated monolithic COBOL application to .NET microservices with Angular frontend using strangler fig pattern, maintaining zero downtime throughout migration.",
      results: [
        { metric: "$5M", description: "3-year savings" },
        { metric: "40x", description: "Faster deployments" },
        { metric: "200+", description: "Dev talent pool access" },
        { metric: "99.99%", description: "System uptime" },
      ],
      technologies: [
        ".NET Core",
        "Angular",
        "Azure",
        "Docker",
        "PostgreSQL",
        "Event Sourcing",
        "Kafka",
      ],
    },
    {
      title: "Real-Time Analytics Platform",
      company: "Financial Services Company",
      industry: "Financial Services",
      icon: "📈",
      projectType: "Data Platform",
      duration: "10 months",
      team: "5 developers",
      challenge:
        "Batch-based analytics system with 24-hour data lag causing delayed business insights, missed trading opportunities, and inability to detect fraud in real-time.",
      solution:
        "Built real-time streaming data pipeline with Apache Kafka, created interactive Angular dashboards, implemented ML-powered anomaly detection, and deployed on AWS for global scale.",
      results: [
        { metric: "100x", description: "Faster data processing" },
        { metric: "Real-time", description: "Fraud detection" },
        { metric: "$800K", description: "Infrastructure savings" },
        { metric: "30%", description: "Revenue increase" },
      ],
      technologies: [
        "Node.js",
        "Angular",
        "Apache Kafka",
        "Elasticsearch",
        "AWS",
        "Python",
        "TensorFlow",
      ],
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
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
}
