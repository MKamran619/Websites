import {
  Component,
  HostListener,
  OnInit,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";
import { DOCUMENT } from "@angular/common";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ThemeSwitcherComponent],
  template: `
    <header
      class="header"
      [class.scrolled]="isScrolled"
      [class.hidden]="isHidden"
    >
      <nav class="navbar">
        <div class="container">
          <div class="nav-brand">
            <a routerLink="/" class="logo">
              <img
                src="assets/ApnaKam.png"
                alt="ApnaKam - Premium Software Solutions"
                width="170"
                height="50"
                loading="eager"
              />
            </a>
          </div>

          <button
            class="hamburger"
            (click)="toggleMenu()"
            [class.active]="menuOpen"
            aria-label="Toggle navigation menu"
            [attr.aria-expanded]="menuOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul class="nav-menu" [class.open]="menuOpen">
            <li *ngFor="let item of navItems">
              <a
                [routerLink]="item.path"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: item.exact }"
                (click)="closeMenu()"
                class="nav-link"
              >
                <span class="nav-icon" [innerHTML]="item.icon"></span>
                <span class="nav-text">{{ item.label }}</span>
              </a>
            </li>
            <li class="nav-theme">
              <app-theme-switcher></app-theme-switcher>
            </li>
            <li class="nav-cta">
              <a
                routerLink="/contact"
                routerLinkActive="active"
                class="cta-btn"
                (click)="closeMenu()"
              >
                <span>Let's Talk</span>
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
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isScrolled = false;
  isHidden = false;
  private lastScrollTop = 0;
  private isBrowser: boolean;

  // Professional SVG icons for navigation
  navItems = [
    {
      path: "/",
      label: "Home",
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
      exact: true,
    },
    {
      path: "/services",
      label: "Services",
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
      exact: false,
    },
    {
      path: "/portfolio",
      label: "Case Studies",
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
      exact: false,
    },
    {
      path: "/blog",
      label: "Insights",
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
      exact: false,
    },
    {
      path: "/courses",
      label: "Academy",
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>',
      exact: false,
    },
    {
      path: "/about",
      label: "About Us",
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
      exact: false,
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.checkScroll();
      // Hide theme dropdown if on websiteservice619 domain
      if (this.document.location.hostname.includes("websiteservice619")) {
        setTimeout(() => {
          const themeSwitcher =
            this.document.querySelector("app-theme-switcher");
          if (themeSwitcher) {
            (themeSwitcher as HTMLElement).style.display = "none";
          }
        }, 0);
      }

      // Move About Us to last in navItems
      const aboutIndex = this.navItems.findIndex(
        (item) => item.path === "/about",
      );
      if (aboutIndex > -1) {
        const aboutItem = this.navItems.splice(aboutIndex, 1)[0];
        this.navItems.push(aboutItem);
      }

      // Set default theme to Clean White
      if (
        this.isBrowser &&
        localStorage.getItem("selectedTheme") !== "light-clean"
      ) {
        localStorage.setItem("selectedTheme", "light-clean");
        // Optionally reload to apply theme immediately
        setTimeout(() => window.location.reload(), 100);
      }

      this.router.events.subscribe((event) => {
        // Scroll to top on route change
        if (event.constructor.name === "NavigationEnd") {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      });
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (!this.isBrowser) return;
    this.checkScroll();
  }

  private checkScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Only add scrolled class, never hide header
    this.isScrolled = scrollTop > 50;
    this.isHidden = false;
    this.lastScrollTop = scrollTop;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.isBrowser) {
      document.body.style.overflow = this.menuOpen ? "hidden" : "";
    }
  }

  closeMenu() {
    this.menuOpen = false;
    if (this.isBrowser) {
      document.body.style.overflow = "";
    }
  }
}
