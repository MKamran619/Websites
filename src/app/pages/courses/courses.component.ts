import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import emailjs from "@emailjs/browser";

@Component({
  selector: "app-courses",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <section class="courses-hero">
      <div class="container">
        <h1>Web Development Courses</h1>
        <p>
          Master modern web development with comprehensive, hands-on courses
        </p>
      </div>
    </section>

    <section class="courses-intro">
      <div class="container">
        <div class="intro-content">
          <h2>Learn Web Development From Expert</h2>
          <p>
            Our courses are designed to take you from beginner to professional
            web developer. Each course includes practical projects, real-world
            examples, and personalized mentoring.
          </p>
          <div class="intro-features">
            <div class="feature">
              <span class="feature-icon">📚</span>
              <h4>Structured Curriculum</h4>
              <p>
                Carefully organized learning path for effective skill building
              </p>
            </div>
            <div class="feature">
              <span class="feature-icon">💻</span>
              <h4>Hands-On Projects</h4>
              <p>Real-world projects to build your portfolio</p>
            </div>
            <div class="feature">
              <span class="feature-icon">🎯</span>
              <h4>Job Ready Skills</h4>
              <p>Learn industry-relevant skills employers are looking for</p>
            </div>
            <div class="feature">
              <span class="feature-icon">👨‍🏫</span>
              <h4>Expert Mentoring</h4>
              <p>One-on-one guidance from experienced developers</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="courses-grid">
      <div class="container">
        <h2 class="section-title">Our Courses</h2>
        <div class="grid">
          <div class="course-card" *ngFor="let course of courses">
            <div class="course-header">
              <div class="course-icon">{{ course.icon }}</div>
              <h3>{{ course.title }}</h3>
            </div>
            <p class="course-description">{{ course.description }}</p>
            <div class="course-topics">
              <h4>Topics Covered:</h4>
              <ul>
                <li *ngFor="let topic of course.topics">{{ topic }}</li>
              </ul>
            </div>
            <div class="course-details">
              <span class="duration">⏱️ {{ course.duration }}</span>
              <span class="level">📊 {{ course.level }}</span>
            </div>
            <button
              class="btn btn-course"
              (click)="openEnrollmentModal(course.title)"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="learning-path">
      <div class="container">
        <h2 class="section-title">Recommended Learning Path</h2>
        <div class="path-timeline">
          <div class="path-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Foundations</h4>
              <p>Start with HTML & CSS to understand web basics</p>
              <span class="courses-list">HTML, CSS</span>
            </div>
          </div>

          <div class="path-arrow">→</div>

          <div class="path-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Styling & Design</h4>
              <p>Master Bootstrap for responsive design</p>
              <span class="courses-list">Bootstrap</span>
            </div>
          </div>

          <div class="path-arrow">→</div>

          <div class="path-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Interactivity</h4>
              <p>Add functionality with JavaScript & jQuery</p>
              <span class="courses-list">JavaScript, jQuery</span>
            </div>
          </div>

          <div class="path-arrow">→</div>

          <div class="path-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Modern Frameworks</h4>
              <p>Build professional apps with Angular & React</p>
              <span class="courses-list">Angular, React</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="course-benefits">
      <div class="container">
        <h2 class="section-title">Why Take Our Courses?</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-number">1</div>
            <h4>Expert Instructor</h4>
            <p>Learn from developer with 10+ years of industry experience</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-number">2</div>
            <h4>Updated Content</h4>
            <p>Curriculum updated with latest web development trends</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-number">3</div>
            <h4>Portfolio Building</h4>
            <p>Create real projects to showcase to employers</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-number">4</div>
            <h4>Career Support</h4>
            <p>Guidance on job search and interview preparation</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-number">5</div>
            <h4>Lifetime Access</h4>
            <p>Lifetime access to course materials and updates</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-number">6</div>
            <h4>Community</h4>
            <p>Join a community of learners for peer support</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Start Your Web Development Journey?</h2>
          <p>Begin learning today and transform your career</p>
          <div class="cta-buttons">
            <button
              class="btn btn-primary btn-lg"
              (click)="openEnrollmentModal('All Courses')"
            >
              Explore All Courses
            </button>
            <a routerLink="/contact" class="btn btn-secondary btn-lg"
              >Schedule Consultation</a
            >
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
        <button class="modal-close" (click)="closeEnrollmentModal()">✕</button>

        <h2>Enroll in Course</h2>
        <p class="modal-subtitle" *ngIf="selectedCourse">
          {{ selectedCourse }}
        </p>

        <form
          class="enrollment-form"
          (ngSubmit)="submitEnrollment()"
          #enrollmentForm="ngForm"
        >
          <div class="form-group">
            <label for="enroll-name">Your Name</label>
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

          <div class="form-group">
            <label for="enroll-availability">Learning Schedule</label>
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
              >Why are you interested in this course?</label
            >
            <textarea
              id="enroll-message"
              name="enrollMessage"
              [(ngModel)]="enrollmentData.message"
              rows="3"
              placeholder="Tell us about your goals..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-lg"
            [disabled]="!isEnrollmentFormValid()"
          >
            Submit Enrollment
          </button>
          <p class="form-note">
            We'll review your enrollment and contact you within 24 hours.
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
  enrollmentCooldown: number = 60000; // 60 seconds

  enrollmentData = {
    name: "",
    email: "",
    phone: "",
    courses: [],
    experience: "",
    availability: "",
    message: "",
  };

  courses = [
    {
      icon: "🏗️",
      title: "HTML Fundamentals",
      description:
        "Learn the building blocks of web pages. Master semantic HTML, forms, and accessibility.",
      topics: [
        "HTML5 Basics",
        "Semantic HTML",
        "Forms & Validation",
        "Accessibility",
        "Best Practices",
      ],
      duration: "4 weeks",
      level: "Beginner",
    },
    {
      icon: "🎨",
      title: "CSS Styling",
      description:
        "Create beautiful, responsive designs. Learn CSS3, Flexbox, Grid, and animations.",
      topics: [
        "CSS Selectors",
        "Flexbox Layout",
        "CSS Grid",
        "Responsive Design",
        "Animations & Transitions",
        "SASS/SCSS",
      ],
      duration: "4 weeks",
      level: "Beginner",
    },
    {
      icon: "📱",
      title: "Bootstrap Framework",
      description:
        "Build responsive websites quickly with Bootstrap. Master components and utilities.",
      topics: [
        "Bootstrap Basics",
        "Grid System",
        "Components",
        "Responsive Design",
        "Customization",
        "Real-world Projects",
      ],
      duration: "3 weeks",
      level: "Beginner-Intermediate",
    },
    {
      icon: "⚡",
      title: "JavaScript Essentials",
      description:
        "Master the programming language of the web. Learn ES6+, DOM manipulation, and APIs.",
      topics: [
        "JavaScript Fundamentals",
        "ES6+ Features",
        "DOM Manipulation",
        "Event Handling",
        "Async Programming",
        "REST APIs",
      ],
      duration: "6 weeks",
      level: "Intermediate",
    },
    {
      icon: "🪛",
      title: "jQuery Mastery",
      description:
        "Learn jQuery for DOM manipulation and AJAX. Simplify JavaScript development.",
      topics: [
        "jQuery Selectors",
        "DOM Manipulation",
        "Event Handling",
        "AJAX",
        "Effects & Animations",
        "jQuery Plugins",
      ],
      duration: "3 weeks",
      level: "Intermediate",
    },
    {
      icon: "🅰️",
      title: "Angular Framework",
      description:
        "Build professional single-page applications. Master components, services, and routing.",
      topics: [
        "Angular Basics",
        "Components & Templates",
        "Services & Dependency Injection",
        "Routing",
        "Forms",
        "HTTP Client",
        "Advanced Patterns",
      ],
      duration: "8 weeks",
      level: "Advanced",
    },
    {
      icon: "⚛️",
      title: "React Fundamentals",
      description:
        "Build interactive UIs with React. Learn components, hooks, state management.",
      topics: [
        "React Basics",
        "JSX",
        "Components & Props",
        "State & Hooks",
        "Event Handling",
        "API Integration",
        "Performance Optimization",
      ],
      duration: "8 weeks",
      level: "Advanced",
    },
    {
      icon: "🚀",
      title: "Full Stack Development",
      description:
        "Combine frontend and backend skills. Build complete web applications from scratch.",
      topics: [
        "Frontend Technologies",
        "Backend Basics",
        "Database Design",
        "API Development",
        "Authentication",
        "Deployment",
        "Best Practices",
      ],
      duration: "12 weeks",
      level: "Advanced",
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
