import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import emailjs from "@emailjs/browser";

@Component({
  selector: "app-courses",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <!-- Hero Section -->
    <section class="academy-hero">
      <div class="hero-bg-effects">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="grid-pattern"></div>
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
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            ApnaKam Academy
          </span>
          <h1 class="hero-title">
            Master <span class="gradient-text">Modern Development</span><br />
            Build Your Tech Career
          </h1>
          <p class="hero-subtitle">
            Industry-leading training programs designed by Silicon Valley
            experts. Learn in-demand skills, build real-world projects, and
            accelerate your career in tech.
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">Graduates</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">95%</span>
              <span class="stat-label">Job Placement</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">4.9/5</span>
              <span class="stat-label">Student Rating</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">$85K</span>
              <span class="stat-label">Avg. Starting Salary</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Props Section -->
    <section class="value-props">
      <div class="container">
        <div class="props-grid">
          <div class="prop-card">
            <div class="prop-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Structured Learning</h3>
            <p>
              Carefully designed curriculum that takes you from zero to
              job-ready in weeks
            </p>
          </div>
          <div class="prop-card">
            <div class="prop-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3>Hands-On Projects</h3>
            <p>
              Build 10+ real-world projects for your portfolio that impress
              employers
            </p>
          </div>
          <div class="prop-card">
            <div class="prop-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>1-on-1 Mentoring</h3>
            <p>
              Personalized guidance from senior developers with 10+ years
              experience
            </p>
          </div>
          <div class="prop-card">
            <div class="prop-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3>Career Support</h3>
            <p>
              Resume review, interview prep, and direct job placement assistance
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Section -->
    <section class="courses-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Our Programs</span>
          <h2 class="section-title">Industry-Leading Courses</h2>
          <p class="section-subtitle">
            Choose your path to becoming a professional developer
          </p>
        </div>

        <div class="courses-grid">
          <div
            class="course-card"
            *ngFor="let course of courses"
            [class]="'level-' + course.levelClass"
          >
            <div class="card-header">
              <div
                class="course-icon"
                [innerHTML]="getSafeHtml(course.svgIcon)"
              ></div>
              <div class="course-level">{{ course.level }}</div>
            </div>
            <h3>{{ course.title }}</h3>
            <p class="course-description">{{ course.description }}</p>

            <div class="course-topics">
              <span class="topics-label">What You'll Learn:</span>
              <ul>
                <li *ngFor="let topic of course.topics.slice(0, 4)">
                  {{ topic }}
                </li>
                <li *ngIf="course.topics.length > 4" class="more">
                  +{{ course.topics.length - 4 }} more topics
                </li>
              </ul>
            </div>

            <div class="course-meta">
              <div class="meta-item">
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
                {{ course.duration }}
              </div>
              <div class="meta-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Certificate
              </div>
            </div>

            <button
              class="btn-enroll"
              (click)="openEnrollmentModal(course.title)"
            >
              Enroll Now
              <svg
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
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Path -->
    <section class="learning-path">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Roadmap</span>
          <h2 class="section-title">Your Learning Journey</h2>
          <p class="section-subtitle">
            A structured path from beginner to professional developer
          </p>
        </div>

        <div class="path-container">
          <div class="path-line"></div>
          <div class="path-steps">
            <div
              class="path-step"
              *ngFor="let step of learningPath; let i = index"
            >
              <div class="step-marker">
                <span class="step-number">{{ i + 1 }}</span>
              </div>
              <div class="step-content">
                <div class="step-header">
                  <span class="step-duration">{{ step.duration }}</span>
                  <h4>{{ step.title }}</h4>
                </div>
                <p>{{ step.description }}</p>
                <div class="step-skills">
                  <span *ngFor="let skill of step.skills">{{ skill }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section">
      <div class="container">
        <div class="benefits-wrapper">
          <div class="benefits-content">
            <span class="section-tag">Why ApnaKam Academy</span>
            <h2 class="section-title">
              Learn Differently.<br />Succeed Faster.
            </h2>
            <p class="benefits-text">
              Our programs are designed by industry veterans who've trained
              developers at top companies. We focus on practical skills that get
              you hired.
            </p>

            <div class="benefits-list">
              <div class="benefit-item" *ngFor="let benefit of benefits">
                <div class="benefit-check">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div class="benefit-text">
                  <h4>{{ benefit.title }}</h4>
                  <p>{{ benefit.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="benefits-visual">
            <div class="visual-card">
              <div class="testimonial-quote">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  opacity="0.2"
                >
                  <path
                    d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                  />
                </svg>
                <p>
                  "This academy changed my career. I went from complete beginner
                  to landing a $90K job at a tech startup in just 6 months."
                </p>
                <div class="quote-author">
                  <div class="author-avatar">JM</div>
                  <div class="author-info">
                    <span class="author-name">James Mitchell</span>
                    <span class="author-role"
                      >Software Engineer at TechFlow</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Stories -->
    <section class="success-stories">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Success Stories</span>
          <h2 class="section-title">Where Our Graduates Work</h2>
        </div>

        <div class="companies-grid">
          <div class="company-logo" *ngFor="let company of companies">
            <span>{{ company }}</span>
          </div>
        </div>

        <div class="success-stats">
          <div class="success-stat">
            <span class="stat-value">500+</span>
            <span class="stat-desc">Students Trained</span>
          </div>
          <div class="success-stat">
            <span class="stat-value">95%</span>
            <span class="stat-desc">Hired Within 90 Days</span>
          </div>
          <div class="success-stat">
            <span class="stat-value">40%</span>
            <span class="stat-desc">Average Salary Increase</span>
          </div>
          <div class="success-stat">
            <span class="stat-value">4.9★</span>
            <span class="stat-desc">Student Satisfaction</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Transform Your Career?</h2>
            <p class="cta-text">
              Join 500+ developers who've launched successful tech careers
              through our programs. Your future in tech starts here.
            </p>
            <div class="cta-buttons">
              <button
                class="btn btn-primary btn-lg"
                (click)="openEnrollmentModal('Full Stack Development')"
              >
                Get Started Today
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <a routerLink="/contact" class="btn btn-secondary btn-lg">
                Schedule Free Consultation
              </a>
            </div>
            <p class="cta-note">
              No commitment required • Free career consultation available
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Enrollment Modal -->
    <div
      class="enrollment-modal-overlay"
      *ngIf="showEnrollmentModal"
      (click)="closeEnrollmentModal()"
    >
      <div class="enrollment-modal" (click)="$event.stopPropagation()">
        <button class="modal-close" (click)="closeEnrollmentModal()">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div class="modal-header">
          <div class="modal-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <h2>Start Your Journey</h2>
          <p class="modal-subtitle" *ngIf="selectedCourse">
            {{ selectedCourse }}
          </p>
        </div>

        <form
          class="enrollment-form"
          (ngSubmit)="submitEnrollment()"
          #enrollmentForm="ngForm"
        >
          <div class="form-row">
            <div class="form-group">
              <label for="enroll-name">Full Name</label>
              <input
                type="text"
                id="enroll-name"
                name="enrollName"
                [(ngModel)]="enrollmentData.name"
                required
                placeholder="John Doe"
              />
            </div>

            <div class="form-group">
              <label for="enroll-email">Email Address</label>
              <input
                type="email"
                id="enroll-email"
                name="enrollEmail"
                [(ngModel)]="enrollmentData.email"
                required
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="enroll-phone">Phone Number</label>
              <input
                type="tel"
                id="enroll-phone"
                name="enrollPhone"
                [(ngModel)]="enrollmentData.phone"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div class="form-group">
              <label for="enroll-experience">Experience Level</label>
              <select
                id="enroll-experience"
                name="enrollExperience"
                [(ngModel)]="enrollmentData.experience"
                required
              >
                <option value="">Select level...</option>
                <option value="beginner">
                  Beginner - No programming experience
                </option>
                <option value="intermediate">
                  Intermediate - Some coding experience
                </option>
                <option value="advanced">
                  Advanced - Solid programming background
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="enroll-availability">Preferred Learning Schedule</label>
            <select
              id="enroll-availability"
              name="enrollAvailability"
              [(ngModel)]="enrollmentData.availability"
              required
            >
              <option value="">Select schedule...</option>
              <option value="part-time">Part-time (5-10 hours/week)</option>
              <option value="flexible">Flexible (self-paced)</option>
              <option value="intensive">Intensive (15+ hours/week)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="enroll-message"
              >What are your career goals? (Optional)</label
            >
            <textarea
              id="enroll-message"
              name="enrollMessage"
              [(ngModel)]="enrollmentData.message"
              rows="3"
              placeholder="Tell us about your goals and what you hope to achieve..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-lg btn-block"
            [disabled]="!isEnrollmentFormValid()"
          >
            <span *ngIf="!isSubmitting">Submit Application</span>
            <span *ngIf="isSubmitting">Submitting...</span>
          </button>
          <p class="form-note">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Your information is secure. We'll contact you within 24 hours.
          </p>
        </form>
      </div>
    </div>
  `,
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  showEnrollmentModal = false;
  selectedCourse: string = "";
  lastEnrollmentTime: number = 0;
  enrollmentCooldown: number = 60000;
  isSubmitting = false;

  constructor(private sanitizer: DomSanitizer) {}

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  enrollmentData = {
    name: "",
    email: "",
    phone: "",
    courses: [],
    experience: "",
    availability: "",
    message: "",
  };

  learningPath = [
    {
      title: "Foundations",
      description: "Build your foundation with HTML, CSS, and web fundamentals",
      duration: "4-6 weeks",
      skills: ["HTML5", "CSS3", "Responsive Design"],
    },
    {
      title: "Interactive Development",
      description: "Add interactivity with JavaScript and modern ES6+ features",
      duration: "6-8 weeks",
      skills: ["JavaScript", "DOM", "APIs"],
    },
    {
      title: "Framework Mastery",
      description: "Master modern frameworks like React or Angular",
      duration: "8-10 weeks",
      skills: ["React", "Angular", "State Management"],
    },
    {
      title: "Full Stack",
      description: "Complete your journey with backend and deployment skills",
      duration: "10-12 weeks",
      skills: ["Node.js", "Databases", "Cloud Deployment"],
    },
  ];

  benefits = [
    {
      title: "Industry-Relevant Curriculum",
      description: "Content updated quarterly based on job market demands",
    },
    {
      title: "Portfolio-Ready Projects",
      description:
        "Build 10+ projects that demonstrate real skills to employers",
    },
    {
      title: "Lifetime Access",
      description: "Access course materials and updates forever",
    },
    {
      title: "Job Placement Support",
      description: "Resume reviews, mock interviews, and job referrals",
    },
    {
      title: "Community Access",
      description: "Join 500+ developers for networking and peer support",
    },
    {
      title: "Certificate of Completion",
      description: "Industry-recognized certification to boost your profile",
    },
  ];

  companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Netflix",
    "Shopify",
    "Stripe",
    "Airbnb",
    "Uber",
    "Startups",
    "Agencies",
  ];

  courses = [
    {
      svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
      title: "HTML & CSS Fundamentals",
      description:
        "Master the building blocks of the web. Learn semantic HTML5, modern CSS3, Flexbox, Grid, and responsive design principles.",
      topics: [
        "HTML5 Semantics",
        "CSS3 Styling",
        "Flexbox & Grid",
        "Responsive Design",
        "Accessibility",
        "Best Practices",
      ],
      duration: "4 weeks",
      level: "Beginner",
      levelClass: "beginner",
    },
    {
      svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
      title: "Bootstrap Framework",
      description:
        "Build beautiful, responsive websites quickly. Master Bootstrap's grid system, components, and customization techniques.",
      topics: [
        "Bootstrap Grid",
        "UI Components",
        "Responsive Utilities",
        "Custom Themes",
        "SASS Integration",
        "Real Projects",
      ],
      duration: "3 weeks",
      level: "Beginner",
      levelClass: "beginner",
    },
    {
      svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      title: "JavaScript Essentials",
      description:
        "Master the programming language of the web. Learn ES6+, async programming, DOM manipulation, and API integration.",
      topics: [
        "ES6+ Features",
        "DOM Manipulation",
        "Event Handling",
        "Async/Await",
        "Fetch API",
        "Error Handling",
      ],
      duration: "6 weeks",
      level: "Intermediate",
      levelClass: "intermediate",
    },
    {
      svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>`,
      title: "React Development",
      description:
        "Build modern, interactive UIs with React. Master components, hooks, state management, and production-ready patterns.",
      topics: [
        "React Fundamentals",
        "Hooks & State",
        "Context API",
        "React Router",
        "Performance",
        "Testing",
      ],
      duration: "8 weeks",
      level: "Advanced",
      levelClass: "advanced",
    },
    {
      svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>`,
      title: "Angular Framework",
      description:
        "Build enterprise-grade applications with Angular. Master TypeScript, components, services, and advanced patterns.",
      topics: [
        "TypeScript",
        "Components",
        "Services & DI",
        "Routing",
        "Forms",
        "RxJS",
        "NgRx",
      ],
      duration: "8 weeks",
      level: "Advanced",
      levelClass: "advanced",
    },
    {
      svgIcon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      title: "Full Stack Development",
      description:
        "Become a complete developer. Master frontend, backend, databases, and deployment to build full applications.",
      topics: [
        "Frontend Mastery",
        "Node.js/Express",
        "MongoDB/SQL",
        "Authentication",
        "REST APIs",
        "Cloud Deployment",
      ],
      duration: "12 weeks",
      level: "Professional",
      levelClass: "professional",
    },
  ];

  ngOnInit() {
    // Initialize EmailJS with same config as contact
    emailjs.init("FiOYICOvKQmtB0P1N");
  }

  openEnrollmentModal(courseName: string) {
    this.selectedCourse = courseName;
    this.showEnrollmentModal = true;
  }

  closeEnrollmentModal() {
    this.showEnrollmentModal = false;
    this.resetEnrollmentForm();
  }

  resetEnrollmentForm() {
    this.enrollmentData = {
      name: "",
      email: "",
      phone: "",
      courses: [],
      experience: "",
      availability: "",
      message: "",
    };
    this.selectedCourse = "";
  }

  isEnrollmentFormValid(): boolean {
    return (
      this.enrollmentData.name.trim() !== "" &&
      this.enrollmentData.email.trim() !== "" &&
      this.enrollmentData.experience !== "" &&
      this.enrollmentData.availability !== ""
    );
  }

  submitEnrollment() {
    const now = Date.now();
    if (now - this.lastEnrollmentTime < this.enrollmentCooldown) {
      const remainingSeconds = Math.ceil(
        (this.enrollmentCooldown - (now - this.lastEnrollmentTime)) / 1000,
      );
      this.showErrorMessage(
        `Please wait ${remainingSeconds} seconds before submitting again.`,
      );
      return;
    }

    if (!this.isEnrollmentFormValid()) {
      this.showErrorMessage("Please fill in all required fields");
      return;
    }

    const templateParams = {
      to_email: "mksawan619@gmail.com",
      from_name: this.enrollmentData.name,
      from_email: this.enrollmentData.email,
      phone: this.enrollmentData.phone || "Not provided",
      course_name: this.selectedCourse,
      experience: this.enrollmentData.experience,
      availability: this.enrollmentData.availability,
      message: this.enrollmentData.message || "No additional message",
    };

    emailjs.send("service_websites", "template_yh2wuhe", templateParams).then(
      (response) => {
        console.log("Enrollment email sent successfully:", response);
        this.lastEnrollmentTime = now;
        this.showEnrollmentSuccessMessage();
        this.closeEnrollmentModal();
      },
      (error) => {
        console.error("Enrollment submission failed:", error);
        this.showEnrollmentErrorMessage();
      },
    );
  }

  showEnrollmentSuccessMessage() {
    const successDiv = document.createElement("div");
    successDiv.className = "enrollment-success-popup";
    const email = this.enrollmentData.email;
    successDiv.innerHTML =
      `
      <div class="success-content">
        <div class="success-icon">✓</div>
        <h3>Enrollment Successful!</h3>
        <p>Thank you for your interest. We'll review your enrollment and contact you within 24 hours at ` +
      email +
      `.</p>
        <button onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => {
      if (successDiv.parentElement) successDiv.remove();
    }, 5000);
  }

  showEnrollmentErrorMessage() {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message-popup";
    errorDiv.innerHTML = `
      <div class="error-content">
        <div class="error-icon">✕</div>
        <h3>Enrollment Failed</h3>
        <p>There was an issue processing your enrollment. Please try again or contact us at mksawany619@gmail.com.</p>
        <button onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    document.body.appendChild(errorDiv);
    setTimeout(() => {
      if (errorDiv.parentElement) errorDiv.remove();
    }, 7000);
  }

  showErrorMessage(message: string) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "enrollment-error-alert";
    errorDiv.innerHTML = message;
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 2000;
      font-weight: 500;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(errorDiv);
    setTimeout(() => {
      if (errorDiv.parentElement) errorDiv.remove();
    }, 3000);
  }
}
