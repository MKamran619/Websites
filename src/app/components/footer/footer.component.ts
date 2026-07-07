import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import emailjs from "@emailjs/browser";
import { ContentService } from "../../services/content.service";

export interface SiteInfo {
  brand_name: string;
  brand_description: string;
  logo_svg_footer: string;
  contact_email: string;
  hours: string;
  location: string;
  whatsapp_url: string;
  linkedin_url: string;
  twitter_url: string;
  copyright_start_year: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon_svg: string;
  sort_order: number;
}

export interface FooterLink {
  group_name: "quick_links" | "services" | "legal";
  label: string;
  path: string;
  sort_order: number;
}

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
                  [disabled]="isSubscribing || subscribeSuccess"
                />
                <button type="submit" class="btn btn-primary" [disabled]="isSubscribing || subscribeSuccess || !newsletterEmail">
                  <span *ngIf="!isSubscribing && !subscribeSuccess">
                    Subscribe
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span *ngIf="isSubscribing">Subscribing...</span>
                  <span *ngIf="subscribeSuccess">✓ Subscribed!</span>
                </button>
              </div>
              <p class="form-note" *ngIf="!subscribeSuccess">No spam, unsubscribe anytime.</p>
              <p class="form-note success-note" *ngIf="subscribeSuccess">You're in! We'll send you our latest insights and updates.</p>
            </form>
          </div>
        </div>
      </div>

      <!-- Main Footer -->
      <div class="footer-main">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section footer-brand">
              <a
                routerLink="/"
                class="footer-logo"
                [innerHTML]="getSafeHtml(siteInfo?.logo_svg_footer)"
              ></a>
              <p>{{ siteInfo?.brand_description }}</p>
              <div class="social-links">
                <a
                  *ngFor="let link of socialLinks"
                  [href]="link.url"
                  [attr.target]="link.url.startsWith('http') ? '_blank' : null"
                  [attr.rel]="link.url.startsWith('http') ? 'noopener' : null"
                  [attr.aria-label]="link.platform"
                  class="social-link"
                  [innerHTML]="getSafeHtml(link.icon_svg)"
                ></a>
              </div>
            </div>

            <div class="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li *ngFor="let link of quickLinks">
                  <a [routerLink]="link.path">{{ link.label }}</a>
                </li>
              </ul>
            </div>

            <div class="footer-section">
              <h4>Services</h4>
              <ul>
                <li *ngFor="let link of serviceLinks">
                  <a [routerLink]="link.path">{{ link.label }}</a>
                </li>
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
                  <a [href]="'mailto:' + siteInfo?.contact_email">{{
                    siteInfo?.contact_email
                  }}</a>
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
                  <span>{{ siteInfo?.location }}</span>
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
                  <span>{{ siteInfo?.hours }}</span>
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
            <p>
              &copy; {{ siteInfo?.copyright_start_year }} -
              {{ currentYear }} {{ siteInfo?.brand_name }}. All rights
              reserved.
            </p>
            <div class="footer-links">
              <a *ngFor="let link of legalLinks" [href]="link.path">{{
                link.label
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  newsletterEmail = "";
  isSubscribing = false;
  subscribeSuccess = false;
  private isBrowser: boolean;

  siteInfo: SiteInfo | null = null;
  socialLinks: SocialLink[] = [];
  quickLinks: FooterLink[] = [];
  serviceLinks: FooterLink[] = [];
  legalLinks: FooterLink[] = [];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private content: ContentService,
    private sanitizer: DomSanitizer,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getSafeHtml(html: string | null | undefined): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html || "");
  }

  ngOnInit() {
    if (this.isBrowser) {
      emailjs.init("FiOYICOvKQmtB0P1N");
    }

    this.content.getRow<SiteInfo>("site_info", { id: 1 }).subscribe((info) => {
      this.siteInfo = info;
    });
    this.content.getAll<SocialLink>("social_links").subscribe((links) => {
      this.socialLinks = links;
    });
    this.content
      .getAll<FooterLink>("footer_links", { match: { group_name: "quick_links" } })
      .subscribe((links) => {
        this.quickLinks = links;
      });
    this.content
      .getAll<FooterLink>("footer_links", { match: { group_name: "services" } })
      .subscribe((links) => {
        this.serviceLinks = links;
      });
    this.content
      .getAll<FooterLink>("footer_links", { match: { group_name: "legal" } })
      .subscribe((links) => {
        this.legalLinks = links;
      });
  }

  subscribeNewsletter() {
    if (!this.newsletterEmail || this.isSubscribing) return;
    this.isSubscribing = true;
    const templateParams = {
      from_name: "Newsletter Subscriber",
      from_email: this.newsletterEmail,
      email: "contact@nexawebservice.com",
      company: "Newsletter Subscription",
      challenge: "newsletter",
      budget: "N/A",
      timeline: "N/A",
      message: `New newsletter subscriber: ${this.newsletterEmail}`,
      to_email: "contact@nexawebservice.com",
    };
    emailjs.send("service_websites", "template_yh2wuhe", templateParams).then(
      () => {
        this.isSubscribing = false;
        this.subscribeSuccess = true;
        this.newsletterEmail = "";
        setTimeout(() => { this.subscribeSuccess = false; }, 6000);
      },
      () => {
        this.isSubscribing = false;
        alert("Subscription failed. Please try again or email us at contact@nexawebservice.com");
      }
    );
  }
}
