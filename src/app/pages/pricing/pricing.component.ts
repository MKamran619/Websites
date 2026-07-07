import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import emailjs from "@emailjs/browser";
import { ContentService } from "../../services/content.service";

interface PricingPlan {
  name: string;
  description: string | null;
  price: string;
  unit: string | null;
  featured: boolean;
  icon: string | null;
  features: string[];
  sort_order: number;
}

interface CoursePricingTier {
  name: string;
  level: string | null;
  level_class: string | null;
  duration: string | null;
  price: string | null;
  sort_order: number;
}

interface FeatureBlock {
  page: string;
  section: string;
  icon: string | null;
  eyebrow: string | null;
  title: string;
  description: string | null;
  sort_order: number;
}

@Component({
  selector: "app-pricing",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <!-- Hero -->
    <section class="pricing-hero">
      <div class="hero-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
      </div>
      <div class="container">
        <span class="hero-badge">Transparent Pricing</span>
        <h1>Simple, <span class="gradient-text">Honest Pricing</span></h1>
        <p class="hero-sub">
          No hidden fees. No surprises. Every project starts with a free
          30-minute consultation so you know exactly what you're paying for.
        </p>
        <div class="currency-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          All prices in USD Â· Payments via PayPal, Wise, or bank transfer Â· Serving US &amp; global clients
        </div>
      </div>
    </section>

    <!-- Plans -->
    <section class="plans-section">
      <div class="container">
        <div class="plans-grid">
          <div class="plan-card" *ngFor="let plan of plans" [class.featured]="plan.featured">
            <div class="plan-badge" *ngIf="plan.featured">Most Popular</div>
            <div class="plan-header">
              <div class="plan-icon" [innerHTML]="plan.icon"></div>
              <h3>{{ plan.name }}</h3>
              <p class="plan-desc">{{ plan.description }}</p>
              <div class="plan-price">
                <span class="price-from">Starting from</span>
                <span class="price-amount">{{ plan.price }}</span>
                <span class="price-unit">{{ plan.unit }}</span>
              </div>
            </div>
            <ul class="plan-features">
              <li *ngFor="let feature of plan.features">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ feature }}
              </li>
            </ul>
            <a routerLink="/contact" class="plan-cta" [class.cta-primary]="plan.featured" [class.cta-outline]="!plan.featured">
              Get Free Quote
            </a>
            <button class="plan-subscribe" (click)="openSubscriptionModal(plan.name, plan.price)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Subscribe to This Plan
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Subscription Modal -->
    <div class="subscription-modal-overlay" *ngIf="showSubscriptionModal" (click)="closeSubscriptionModal()">
      <div class="subscription-modal" (click)="$event.stopPropagation()">
        <button class="modal-close" (click)="closeSubscriptionModal()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="sub-modal-header">
          <div class="sub-modal-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2>Subscribe to <span class="gradient-text">{{ selectedPlanName }}</span></h2>
          <p class="sub-modal-subtitle">Fill in your details and we'll reach out within 24 hours to get started.</p>
          <div class="sub-plan-badge">
            <span class="badge-label">Selected Plan</span>
            <span class="badge-name">{{ selectedPlanName }}</span>
            <span class="badge-price">{{ selectedPlanPrice }}</span>
          </div>
        </div>

        <form class="sub-form" (ngSubmit)="submitSubscription()" #subForm="ngForm">
          <div class="form-row">
            <div class="form-group">
              <label for="s-name">Full Name</label>
              <input type="text" id="s-name" name="sName" [(ngModel)]="subscriptionData.name" required placeholder="John Doe"/>
            </div>
            <div class="form-group">
              <label for="s-email">Email Address</label>
              <input type="email" id="s-email" name="sEmail" [(ngModel)]="subscriptionData.email" required placeholder="john@example.com"/>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="s-phone">Phone Number</label>
              <input type="tel" id="s-phone" name="sPhone" [(ngModel)]="subscriptionData.phone" placeholder="+1 (555) 123-4567"/>
            </div>
            <div class="form-group">
              <label for="s-company">Company / Business Name</label>
              <input type="text" id="s-company" name="sCompany" [(ngModel)]="subscriptionData.company" placeholder="Acme Inc."/>
            </div>
          </div>

          <div class="form-group">
            <label for="s-timeline">Project Timeline</label>
            <select id="s-timeline" name="sTimeline" [(ngModel)]="subscriptionData.timeline" required>
              <option value="">When do you want to start?</option>
              <option value="immediately">Immediately â€” as soon as possible</option>
              <option value="1-2weeks">In 1â€“2 weeks</option>
              <option value="1month">Within a month</option>
              <option value="flexible">Flexible / not sure yet</option>
            </select>
          </div>

          <div class="form-group">
            <label for="s-message">Project Details (Optional)</label>
            <textarea id="s-message" name="sMessage" [(ngModel)]="subscriptionData.message" rows="3" placeholder="Briefly describe your project or any questionsâ€¦"></textarea>
          </div>

          <button type="submit" class="btn-submit" [disabled]="!isSubscriptionFormValid() || isSubSubmitting">
            <span *ngIf="!isSubSubmitting">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Confirm Subscription
            </span>
            <span *ngIf="isSubSubmitting">Submittingâ€¦</span>
          </button>
          <p class="form-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            No payment required now. We'll confirm details before any charge.
          </p>
        </form>
      </div>
    </div>

    <!-- Academy Pricing -->
    <section class="academy-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Nexa Web Service Academy</span>
          <h2>Course <span class="gradient-text">Pricing</span></h2>
          <p>Learn web development with expert mentorship â€” courses designed for beginners to advanced developers</p>
        </div>
        <div class="courses-grid">
          <div class="course-price-card" *ngFor="let course of coursePricing">
            <div class="course-level" [class]="course.level_class">{{ course.level }}</div>
            <h4>{{ course.name }}</h4>
            <div class="course-duration">{{ course.duration }}</div>
            <div class="course-fee">
              <span class="fee-amount">{{ course.price }}</span>
              <span class="fee-note">one-time</span>
            </div>
            <button class="course-cta" (click)="openEnrollmentModal(course.name, course.price)">Enroll Now</button>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Our Process</span>
          <h2>How We <span class="gradient-text">Work Together</span></h2>
        </div>
        <div class="steps-grid">
          <div class="step" *ngFor="let step of steps; let i = index">
            <div class="step-number">{{ i + 1 }}</div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ teaser -->
    <section class="faq-teaser">
      <div class="container">
        <div class="teaser-card">
          <h3>Questions about pricing or working with an international team?</h3>
          <p>Read our full FAQ covering payments, timezones, communication, and how international engagements work.</p>
          <a routerLink="/faq" class="btn-outline">Read FAQ</a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <h2>Ready to Start?</h2>
          <p>Book a free 30-minute call. No commitment. We'll scope your project and give you an exact quote.</p>
          <a routerLink="/contact" class="btn-primary">Schedule Free Consultation</a>
        </div>
      </div>
    </section>

    <!-- Enrollment Modal -->
    <div class="enrollment-modal-overlay" *ngIf="showEnrollmentModal" (click)="closeEnrollmentModal()">
      <div class="enrollment-modal" (click)="$event.stopPropagation()">
        <button class="modal-close" (click)="closeEnrollmentModal()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="modal-header">
          <div class="modal-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <h2>Enroll Now</h2>
          <p class="modal-subtitle">{{ selectedCourse }}</p>
          <div class="modal-price" *ngIf="selectedPrice">
            <span class="price-label">Course Fee</span>
            <span class="price-value">{{ selectedPrice }}</span>
            <span class="price-note">one-time payment</span>
          </div>
        </div>

        <form class="enrollment-form" (ngSubmit)="submitEnrollment()" #enrollForm="ngForm">
          <div class="form-row">
            <div class="form-group">
              <label for="p-name">Full Name</label>
              <input type="text" id="p-name" name="pName" [(ngModel)]="enrollmentData.name" required placeholder="John Doe"/>
            </div>
            <div class="form-group">
              <label for="p-email">Email Address</label>
              <input type="email" id="p-email" name="pEmail" [(ngModel)]="enrollmentData.email" required placeholder="john@example.com"/>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="p-phone">Phone Number</label>
              <input type="tel" id="p-phone" name="pPhone" [(ngModel)]="enrollmentData.phone" placeholder="+1 (555) 123-4567"/>
            </div>
            <div class="form-group">
              <label for="p-experience">Experience Level</label>
              <select id="p-experience" name="pExperience" [(ngModel)]="enrollmentData.experience" required>
                <option value="">Select level...</option>
                <option value="beginner">Beginner - No programming experience</option>
                <option value="intermediate">Intermediate - Some coding experience</option>
                <option value="advanced">Advanced - Solid programming background</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="p-availability">Preferred Learning Schedule</label>
            <select id="p-availability" name="pAvailability" [(ngModel)]="enrollmentData.availability" required>
              <option value="">Select schedule...</option>
              <option value="part-time">Part-time (5-10 hours/week)</option>
              <option value="flexible">Flexible (self-paced)</option>
              <option value="intensive">Intensive (15+ hours/week)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="p-message">Career Goals (Optional)</label>
            <textarea id="p-message" name="pMessage" [(ngModel)]="enrollmentData.message" rows="3" placeholder="Tell us about your goals..."></textarea>
          </div>

          <button type="submit" class="btn-submit" [disabled]="!isEnrollmentFormValid() || isSubmitting">
            <span *ngIf="!isSubmitting">Submit Application</span>
            <span *ngIf="isSubmitting">Submitting...</span>
          </button>
          <p class="form-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Your information is secure. We'll contact you within 24 hours.
          </p>
        </form>
      </div>
    </div>
  `,
  styleUrls: ["./pricing.component.scss"],
})
export class PricingComponent implements OnInit {
  showEnrollmentModal = false;
  selectedCourse = "";
  selectedPrice = "";
  isSubmitting = false;
  lastEnrollmentTime = 0;
  enrollmentCooldown = 60000;

  showSubscriptionModal = false;
  selectedPlanName = "";
  selectedPlanPrice = "";
  isSubSubmitting = false;
  lastSubTime = 0;
  private isBrowser: boolean;

  enrollmentData = { name: "", email: "", phone: "", experience: "", availability: "", message: "" };
  subscriptionData = { name: "", email: "", phone: "", company: "", timeline: "", message: "" };

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private content: ContentService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) emailjs.init("FiOYICOvKQmtB0P1N");

    this.content.getAll<PricingPlan>("pricing_plans").subscribe((plans) => {
      this.plans = plans;
    });

    this.content
      .getAll<CoursePricingTier>("course_pricing_tiers")
      .subscribe((tiers) => {
        this.coursePricing = tiers;
      });

    this.content
      .getAll<FeatureBlock>("feature_blocks", {
        match: { page: "pricing", section: "process" },
      })
      .subscribe((steps) => {
        this.steps = steps;
      });
  }

  openEnrollmentModal(courseName: string, price: string | null) {
    this.selectedCourse = courseName;
    this.selectedPrice = price || "";
    this.showEnrollmentModal = true;
  }

  closeEnrollmentModal() {
    this.showEnrollmentModal = false;
    this.enrollmentData = { name: "", email: "", phone: "", experience: "", availability: "", message: "" };
    this.selectedCourse = "";
    this.selectedPrice = "";
  }

  isEnrollmentFormValid(): boolean {
    return this.enrollmentData.name.trim() !== "" &&
      this.enrollmentData.email.trim() !== "" &&
      this.enrollmentData.experience !== "" &&
      this.enrollmentData.availability !== "";
  }

  submitEnrollment() {
    if (!this.isEnrollmentFormValid()) return;
    const now = Date.now();
    if (now - this.lastEnrollmentTime < this.enrollmentCooldown) return;
    this.isSubmitting = true;
    const templateParams = {
      from_name: this.enrollmentData.name,
      from_email: this.enrollmentData.email,
      email: "contact@nexawebservice.com",
      company: `${this.selectedCourse} â€” ${this.selectedPrice}`,
      challenge: this.enrollmentData.experience,
      budget: this.enrollmentData.availability,
      timeline: this.enrollmentData.phone || "Not provided",
      message: this.enrollmentData.message,
      to_email: "contact@nexawebservice.com",
    };
    emailjs.send("service_websites", "template_yh2wuhe", templateParams).then(
      () => {
        this.lastEnrollmentTime = Date.now();
        this.isSubmitting = false;
        this.showSuccessPopup();
        this.closeEnrollmentModal();
      },
      () => {
        this.isSubmitting = false;
        this.showErrorPopup();
      }
    );
  }

  showSuccessPopup() {
    const div = document.createElement("div");
    div.style.cssText = "position:fixed;top:24px;right:24px;background:#10b981;color:#fff;padding:16px 24px;border-radius:12px;z-index:9999;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.15)";
    div.textContent = "âœ“ Enrollment submitted! We'll contact you within 24 hours.";
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 5000);
  }

  showErrorPopup() {
    const div = document.createElement("div");
    div.style.cssText = "position:fixed;top:24px;right:24px;background:#ef4444;color:#fff;padding:16px 24px;border-radius:12px;z-index:9999;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.15)";
    div.textContent = "âœ• Submission failed. Please try again or contact us directly.";
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 5000);
  }

  openSubscriptionModal(planName: string, planPrice: string) {
    this.selectedPlanName = planName;
    this.selectedPlanPrice = planPrice;
    this.showSubscriptionModal = true;
  }

  closeSubscriptionModal() {
    this.showSubscriptionModal = false;
    this.subscriptionData = { name: "", email: "", phone: "", company: "", timeline: "", message: "" };
    this.selectedPlanName = "";
    this.selectedPlanPrice = "";
  }

  isSubscriptionFormValid(): boolean {
    return this.subscriptionData.name.trim() !== "" &&
      this.subscriptionData.email.trim() !== "" &&
      this.subscriptionData.timeline !== "";
  }

  submitSubscription() {
    if (!this.isSubscriptionFormValid()) return;
    const now = Date.now();
    if (now - this.lastSubTime < 60000) return;
    this.isSubSubmitting = true;
    const templateParams = {
      from_name: this.subscriptionData.name,
      from_email: this.subscriptionData.email,
      email: "contact@nexawebservice.com",
      company: `[SUBSCRIPTION] ${this.selectedPlanName} (${this.selectedPlanPrice})${this.subscriptionData.company ? " â€” " + this.subscriptionData.company : ""}`,
      challenge: "Subscription inquiry",
      budget: this.selectedPlanPrice,
      timeline: this.subscriptionData.timeline,
      message: this.subscriptionData.message,
      to_email: "contact@nexawebservice.com",
    };
    emailjs.send("service_websites", "template_yh2wuhe", templateParams).then(
      () => {
        this.lastSubTime = Date.now();
        this.isSubSubmitting = false;
        const div = document.createElement("div");
        div.style.cssText = "position:fixed;top:24px;right:24px;background:#10b981;color:#fff;padding:16px 24px;border-radius:12px;z-index:9999;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.15)";
        div.textContent = "âœ“ Subscription request sent! We'll contact you within 24 hours.";
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 5000);
        this.closeSubscriptionModal();
      },
      () => {
        this.isSubSubmitting = false;
        this.showErrorPopup();
      }
    );
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  plans: PricingPlan[] = [];
  coursePricing: CoursePricingTier[] = [];
  steps: FeatureBlock[] = [];
}

