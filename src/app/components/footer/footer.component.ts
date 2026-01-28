import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <footer class="footer">
      <!-- Newsletter Section -->
      <div class="newsletter-section">
        <div class="container">
          <div class="newsletter-content">
            <div class="newsletter-info">
              <h3>Stay Updated</h3>
              <p>
                Get the latest insights on software development, tech trends,
                and exclusive offers.
              </p>
            </div>
            <form class="newsletter-form" (ngSubmit)="subscribeNewsletter()">
              <div class="form-wrapper">
                <input
                  type="email"
                  [(ngModel)]="newsletterEmail"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" class="btn btn-primary">
                  Subscribe
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
                </button>
              </div>
              <p class="form-note">No spam, unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </div>

      <!-- Main Footer -->
      <div class="footer-main">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section footer-brand">
              <a routerLink="/" class="footer-logo">
                <img src="assets/ApnaKam.png" alt="ApnaKam" height="45" />
              </a>
              <p>
                Transforming businesses with cutting-edge software solutions and
                digital consulting services. Your trusted technology partner.
              </p>
              <div class="social-links">
                <a
                  href="https://www.linkedin.com/in/kamran619/"
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                  class="social-link"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/MKamran619"
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  class="social-link"
                >
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
                </a>
                <a
                  href="https://twitter.com/kamransawan"
                  target="_blank"
                  rel="noopener"
                  aria-label="Twitter"
                  class="social-link"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    />
                  </svg>
                </a>
                <a
                  href="mailto:mksawan619@gmail.com"
                  aria-label="Email"
                  class="social-link"
                >
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
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>

            <div class="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a routerLink="/">Home</a></li>
                <li><a routerLink="/about">About</a></li>
                <li><a routerLink="/services">Services</a></li>
                <li><a routerLink="/portfolio">Portfolio</a></li>
                <li><a routerLink="/blog">Blog</a></li>
                <li><a routerLink="/courses">Courses</a></li>
              </ul>
            </div>

            <div class="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a routerLink="/services">Digital Transformation</a></li>
                <li><a routerLink="/services">Custom Development</a></li>
                <li><a routerLink="/services">Cloud Migration</a></li>
                <li><a routerLink="/services">Performance Optimization</a></li>
                <li><a routerLink="/services">Technical Consulting</a></li>
              </ul>
            </div>

            <div class="footer-section">
              <h4>Contact</h4>
              <ul class="contact-list">
                <li>
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
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href="mailto:mksawan619@gmail.com"
                    >mksawan619&#64;gmail.com</a
                  >
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Serving Clients Worldwide</span>
                </li>
                <li>
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
                  <span>Mon - Fri: 9AM - 6PM EST</span>
                </li>
              </ul>
              <a routerLink="/contact" class="btn btn-secondary btn-sm"
                >Get in Touch</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="container">
          <div class="footer-bottom-content">
            <p>&copy; {{ currentYear }} ApnaKam. All rights reserved.</p>
            <div class="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  newsletterEmail = "";

  subscribeNewsletter() {
    if (this.newsletterEmail) {
      // Here you would typically integrate with your email service
      alert("Thank you for subscribing!");
      this.newsletterEmail = "";
    }
  }
}
