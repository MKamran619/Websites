import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import emailjs from "@emailjs/browser";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="contact-hero">
      <div class="container">
        <h1>Let's Work Together</h1>
        <p>Schedule your free 30-minute strategy session</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Before You Tell Me About Your Project</h2>
            <p class="intro-text">
              Let me show you what's possible. I believe in understanding your
              business first, then recommending solutions that deliver real
              value.
            </p>

            <div class="contact-benefits">
              <div class="benefit-item" *ngFor="let benefit of benefits">
                <div class="benefit-icon">{{ benefit.icon }}</div>
                <div>
                  <h3>{{ benefit.title }}</h3>
                  <p>{{ benefit.description }}</p>
                </div>
              </div>
            </div>

            <div class="contact-methods">
              <h3>Connect With Me</h3>
              <ul>
                <li>
                  <strong>Email:</strong>
                  <a href="mailto:kamran.sohail@gmail.com"
                    >kamran.sohail&#64;gmail.com</a
                  >
                </li>
                <li>
                  <strong>LinkedIn:</strong>
                  <a
                    href="https://www.linkedin.com/in/kamran-sohail/"
                    target="_blank"
                    rel="noopener"
                    >LinkedIn Profile</a
                  >
                </li>
                <li>
                  <strong>GitHub:</strong>
                  <a href="https://github.com" target="_blank" rel="noopener"
                    >GitHub Repository</a
                  >
                </li>
                <!-- <li>
                  <strong>WhatsApp:</strong>
                  <a
                    href="https://wa.me/923447510711"
                    target="_blank"
                    rel="noopener"
                    >+923447510711</a
                  >
                </li> -->
              </ul>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <form
              class="contact-form"
              (ngSubmit)="onSubmit()"
              #contactForm="ngForm"
            >
              <div class="form-group">
                <label for="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  [(ngModel)]="formData.name"
                  required
                  #nameField="ngModel"
                />
              </div>

              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  [(ngModel)]="formData.email"
                  required
                />
              </div>

              <div class="form-group">
                <label for="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  [(ngModel)]="formData.company"
                  required
                />
              </div>

              <div class="form-group">
                <label for="challenge">What's Your Main Challenge?</label>
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
                  <option value="performance">Performance Optimization</option>
                  <option value="scalability">Scalability Issues</option>
                  <option value="custom-development">Custom Development</option>
                  <option value="team-building">Building Dev Team</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label for="budget">Project Budget Range</label>
                <select
                  id="budget"
                  name="budget"
                  [(ngModel)]="formData.budget"
                  required
                >
                  <option value="">Select range...</option>
                  <option value="less-500">Less than $500</option>
                  <option value="500-1000">$500 - $1K</option>
                  <option value="1000-5000">$1K - $5K</option>
                  <option value="5000-10000">$5K - $10K</option>
                  <option value="10-25k">$10K - $25K</option>
                  <option value="25-50k">$25K - $50K</option>
                  <option value="50-100k">$50K - $100K</option>
                  <option value="100-250k">$100K - $250K</option>
                  <option value="250k+">$250K+</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div class="form-group">
                <label for="timeline">Timeline</label>
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
                <label for="message">Tell Me More About Your Project</label>
                <textarea
                  id="message"
                  name="message"
                  [(ngModel)]="formData.message"
                  rows="4"
                ></textarea>
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-lg"
                [disabled]="!isFormValid()"
              >
                Schedule Consultation
              </button>
              <p class="form-note">
                We'll connect via Calendly to schedule your free 30-minute
                strategy session.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="social-section">
      <div class="container">
        <h2>Also Available On</h2>
        <div class="social-links">
          <a
            href="https://www.linkedin.com/in/kamran619/"
            target="_blank"
            rel="noopener"
            class="social-link"
            >LinkedIn</a
          >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener"
            class="social-link"
            >GitHub</a
          >
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener"
            class="social-link"
            >Twitter</a
          >
          <a
            href="https://dev.to"
            target="_blank"
            rel="noopener"
            class="social-link"
            >Dev.to</a
          >
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
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
      icon: "🎯",
      title: "Free Consultation",
      description:
        "No obligation 30-minute strategy session to understand your needs",
    },
    {
      icon: "💡",
      title: "Expert Insights",
      description:
        "Industry best practices and proven solutions tailored to your situation",
    },
    {
      icon: "📊",
      title: "Concrete Recommendations",
      description: "Actionable steps and ROI projections for your project",
    },
  ];

  ngOnInit() {
    // Initialize EmailJS
    emailjs.init("FiOYICOvKQmtB0P1N");
  }

  lastSubmitTime = 0;
  submitCooldown = 60000; // 60 seconds cooldown between submissions

  onSubmit() {
    if (!this.isFormValid()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Rate limiting: prevent duplicate submissions within cooldown period
    const now = Date.now();
    if (now - this.lastSubmitTime < this.submitCooldown) {
      const remainingSeconds = Math.ceil(
        (this.submitCooldown - (now - this.lastSubmitTime)) / 1000,
      );
      alert(`Please wait ${remainingSeconds} seconds before submitting again.`);
      return;
    }

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
        this.showSuccessMessage();
        this.resetForm();
      },
      (error: any) => {
        console.error("Failed to send email:", error);
        this.showErrorMessage();
      },
    );
  }

  showErrorMessage() {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message-popup";
    errorDiv.innerHTML = `
      <div class="error-content">
        <div class="error-icon">✕</div>
        <h3>Message Failed</h3>
        <p>There was an issue sending your message. Please try again or contact us directly at mksawany619@gmail.com.</p>
        <button onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    document.body.appendChild(errorDiv);

    // Auto-remove after 7 seconds
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
        <div class="success-icon">✓</div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for reaching out. We'll review your information and contact you shortly to schedule your consultation.</p>
        <button onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    document.body.appendChild(successDiv);

    // Auto-remove after 5 seconds
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
