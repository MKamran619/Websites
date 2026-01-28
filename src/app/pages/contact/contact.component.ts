import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { FormsModule } from "@angular/forms";
import emailjs from "@emailjs/browser";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Contact Hero Section -->
    <section class="contact-hero">
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
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
            Let's Connect
          </span>
          <h1 class="hero-title">
            Start Your <span class="gradient-text">Transformation</span> Journey
          </h1>
          <p class="hero-subtitle">
            Schedule a free 30-minute strategy session to discuss your project
            goals and discover how we can work together
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Content Section -->
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- Left Column - Info -->
          <div class="contact-info">
            <h2 class="info-title">
              Why <span class="gradient-text">Work With Us</span>?
            </h2>
            <p class="intro-text">
              We believe in understanding your business first, then recommending
              solutions that deliver real value. Every consultation starts with
              listening.
            </p>

            <!-- Benefits -->
            <div class="benefits-grid">
              <div class="benefit-card" *ngFor="let benefit of benefits">
                <div class="benefit-icon" [innerHTML]="benefit.icon"></div>
                <h3>{{ benefit.title }}</h3>
                <p>{{ benefit.description }}</p>
              </div>
            </div>

            <!-- Contact Methods -->
            <div class="contact-methods">
              <h3 class="methods-title">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  />
                </svg>
                Direct Contact
              </h3>
              <div class="contact-list">
                <a href="mailto:mksawan619@gmail.com" class="contact-item">
                  <div class="contact-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      />
                      <polyline points="22 6 12 13 2 6" />
                    </svg>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">Email</span>
                    <span class="contact-value">mksawan619&#64;gmail.com</span>
                  </div>
                  <svg
                    class="arrow-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/kamran619/"
                  target="_blank"
                  rel="noopener"
                  class="contact-item"
                >
                  <div class="contact-icon linkedin">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">LinkedIn</span>
                    <span class="contact-value">linkedin.com/in/kamran619</span>
                  </div>
                  <svg
                    class="arrow-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>

                <a
                  href="https://github.com/MKamran619"
                  target="_blank"
                  rel="noopener"
                  class="contact-item"
                >
                  <div class="contact-icon github">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">GitHub</span>
                    <span class="contact-value">github.com/MKamran619</span>
                  </div>
                  <svg
                    class="arrow-icon"
                    width="16"
                    height="16"
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

            <!-- Trust Indicators -->
            <div class="trust-indicators">
              <div class="trust-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Response within 24 hours</span>
              </div>
              <div class="trust-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>100% confidential</span>
              </div>
              <div class="trust-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Free 30-min consultation</span>
              </div>
            </div>
          </div>

          <!-- Right Column - Form -->
          <div class="contact-form-wrapper">
            <div class="form-header">
              <h2>Send a Message</h2>
              <p>Fill out the form below and we'll get back to you shortly</p>
            </div>

            <form
              class="contact-form"
              (ngSubmit)="onSubmit()"
              #contactForm="ngForm"
            >
              <div class="form-row">
                <div class="form-group">
                  <label for="name">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    [(ngModel)]="formData.name"
                    required
                    placeholder="John Smith"
                    #nameField="ngModel"
                  />
                </div>

                <div class="form-group">
                  <label for="email">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      />
                      <polyline points="22 6 12 13 2 6" />
                    </svg>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    [(ngModel)]="formData.email"
                    required
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="company">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M3 21h18" />
                    <path d="M5 21V7l8-4v18" />
                    <path d="M19 21V11l-6-4" />
                    <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
                  </svg>
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  [(ngModel)]="formData.company"
                  required
                  placeholder="Acme Inc."
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="challenge">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Main Challenge *
                  </label>
                  <select
                    id="challenge"
                    name="challenge"
                    [(ngModel)]="formData.challenge"
                    required
                  >
                    <option value="">Select a challenge...</option>
                    <option value="legacy-system">
                      Legacy System Modernization
                    </option>
                    <option value="cloud-migration">Cloud Migration</option>
                    <option value="performance">
                      Performance Optimization
                    </option>
                    <option value="scalability">Scalability Issues</option>
                    <option value="custom-development">
                      Custom Development
                    </option>
                    <option value="team-building">Building Dev Team</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="budget">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path
                        d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                      />
                    </svg>
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    [(ngModel)]="formData.budget"
                    required
                  >
                    <option value="">Select range...</option>
                    <option value="less-5k">Less than $5K</option>
                    <option value="5-10k">$5K - $10K</option>
                    <option value="10-25k">$10K - $25K</option>
                    <option value="25-50k">$25K - $50K</option>
                    <option value="50-100k">$50K - $100K</option>
                    <option value="100k+">$100K+</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="timeline">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Project Timeline *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  [(ngModel)]="formData.timeline"
                  required
                >
                  <option value="">Select timeline...</option>
                  <option value="immediate">Immediate (Next 30 days)</option>
                  <option value="3-months">Within 3 months</option>
                  <option value="6-months">Within 6 months</option>
                  <option value="exploring">Exploring options</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    />
                  </svg>
                  Project Details (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  [(ngModel)]="formData.message"
                  rows="4"
                  placeholder="Tell us more about your project, current challenges, and what success looks like for you..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="submit-btn"
                [disabled]="!isFormValid() || isSubmitting"
                [class.loading]="isSubmitting"
              >
                <span class="btn-text" *ngIf="!isSubmitting">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </span>
                <span class="btn-loading" *ngIf="isSubmitting">
                  <span class="spinner"></span>
                  Sending...
                </span>
              </button>

              <p class="form-note">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Your information is secure and will never be shared.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card" *ngFor="let stat of stats">
            <div class="stat-icon" [innerHTML]="stat.icon"></div>
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">FAQs</span>
          <h2 class="section-title">
            Common <span class="gradient-text">Questions</span>
          </h2>
        </div>

        <div class="faq-grid">
          <div
            class="faq-item"
            *ngFor="let faq of faqs; let i = index"
            [class.active]="activeFaq === i"
            (click)="toggleFaq(i)"
          >
            <div class="faq-question">
              <h3>{{ faq.question }}</h3>
              <div class="faq-toggle">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                    *ngIf="activeFaq !== i"
                  />
                </svg>
              </div>
            </div>
            <div class="faq-answer" [class.show]="activeFaq === i">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  isSubmitting = false;
  activeFaq = -1;

  formData = {
    name: "",
    email: "",
    company: "",
    challenge: "",
    budget: "",
    timeline: "",
    message: "",
  };

  benefits = [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>`,
      title: "Free 30-Min Strategy Session",
      description:
        "No obligation consultation to understand your unique needs and challenges",
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>`,
      title: "Actionable Recommendations",
      description:
        "Walk away with concrete next steps and ROI projections for your project",
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>`,
      title: "10+ Years of Expertise",
      description:
        "Industry best practices and proven solutions tailored to your situation",
    },
  ];

  stats = [
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>`,
      value: "50+",
      label: "Projects Completed",
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>`,
      value: "98%",
      label: "Client Satisfaction",
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>`,
      value: "24h",
      label: "Response Time",
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>`,
      value: "10+",
      label: "Years Experience",
    },
  ];

  faqs = [
    {
      question: "How does the consultation process work?",
      answer:
        "After you submit the form, we'll review your information and reach out within 24 hours to schedule a free 30-minute video call. During this call, we'll discuss your project goals and challenges, and we'll provide initial recommendations and next steps.",
    },
    {
      question: "What types of projects do you take on?",
      answer:
        "We specialize in digital transformation, custom software development, cloud migration, and technical consulting. Projects range from legacy system modernization to building new enterprise applications from scratch.",
    },
    {
      question: "What are your typical project timelines?",
      answer:
        "Timelines vary based on project scope and complexity. Smaller projects may take 4-8 weeks, while larger enterprise initiatives can span 6-12 months. We'll provide a detailed timeline estimate during our initial consultation.",
    },
    {
      question: "Do you work with startups or only enterprises?",
      answer:
        "We work with organizations of all sizes—from ambitious startups to Fortune 500 companies. The key factor is having a clear problem to solve and a commitment to working together toward a solution.",
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "Our core expertise includes Angular, React, .NET Core, Node.js, Azure, AWS, and modern DevOps practices. We choose the best technology for each project's specific requirements rather than forcing a one-size-fits-all approach.",
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      emailjs.init("FiOYICOvKQmtB0P1N");
    }
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

    // Animate benefit cards
    gsap.utils.toArray<HTMLElement>(".benefit-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: index * 0.1,
      });
    });

    // Animate stat cards
    gsap.utils.toArray<HTMLElement>(".stat-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        delay: index * 0.1,
      });
    });
  }

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }

  lastSubmitTime = 0;
  submitCooldown = 60000;

  onSubmit() {
    if (!this.isFormValid()) {
      alert("Please fill in all required fields.");
      return;
    }

    const now = Date.now();
    if (now - this.lastSubmitTime < this.submitCooldown) {
      const remainingSeconds = Math.ceil(
        (this.submitCooldown - (now - this.lastSubmitTime)) / 1000,
      );
      alert(`Please wait ${remainingSeconds} seconds before submitting again.`);
      return;
    }

    this.isSubmitting = true;

    const templateParams = {
      from_name: this.formData.name,
      from_email: this.formData.email,
      email: "mksawan619@gmail.com",
      company: this.formData.company,
      challenge: this.formData.challenge,
      budget: this.formData.budget,
      timeline: this.formData.timeline,
      message: this.formData.message,
      to_email: "mksawan619@gmail.com",
    };

    emailjs.send("service_websites", "template_yh2wuhe", templateParams).then(
      (response: any) => {
        console.log("Email sent successfully:", response);
        this.lastSubmitTime = Date.now();
        this.isSubmitting = false;
        this.showSuccessMessage();
        this.resetForm();
      },
      (error: any) => {
        console.error("Failed to send email:", error);
        this.isSubmitting = false;
        this.showErrorMessage();
      },
    );
  }

  showErrorMessage() {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message-popup";
    errorDiv.innerHTML = `
      <div class="error-content">
        <div class="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h3>Message Failed</h3>
        <p>There was an issue sending your message. Please try again or contact me directly at mksawan619@gmail.com.</p>
        <button onclick="this.parentElement.parentElement.remove()">Try Again</button>
      </div>
    `;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
      if (errorDiv.parentElement) {
        errorDiv.remove();
      }
    }, 7000);
  }

  showSuccessMessage() {
    const successDiv = document.createElement("div");
    successDiv.className = "success-message-popup";
    successDiv.innerHTML = `
      <div class="success-content">
        <div class="success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for reaching out. We'll review your information and contact you within 24 hours to schedule your consultation.</p>
        <button onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    document.body.appendChild(successDiv);

    setTimeout(() => {
      if (successDiv.parentElement) {
        successDiv.remove();
      }
    }, 5000);
  }

  isFormValid(): boolean {
    return (
      this.formData.name.trim() !== "" &&
      this.formData.email.trim() !== "" &&
      this.formData.company.trim() !== "" &&
      this.formData.challenge.trim() !== "" &&
      this.formData.budget.trim() !== "" &&
      this.formData.timeline.trim() !== ""
    );
  }

  resetForm() {
    this.formData = {
      name: "",
      email: "",
      company: "",
      challenge: "",
      budget: "",
      timeline: "",
      message: "",
    };
  }
}
