import {
  Component,
  HostListener,
  OnInit,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  RouterLink,
  RouterLinkActive,
  Router,
  NavigationEnd,
} from "@angular/router";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";
import { ThemeService } from "../../services/theme.service";
import { ContentService } from "../../services/content.service";
import { DOCUMENT } from "@angular/common";
import { isPlatformBrowser } from "@angular/common";

export interface NavItem {
  path: string;
  label: string;
  icon_svg: string;
  exact_match: boolean;
  sort_order: number;
}

interface HeaderSiteInfo {
  logo_svg_header: string;
}

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
            <a
              routerLink="/"
              class="logo"
              [innerHTML]="getSafeHtml(siteInfo?.logo_svg_header)"
            ></a>
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
                [routerLinkActiveOptions]="{ exact: item.exact_match }"
                (click)="closeMenu()"
                class="nav-link"
              >
                <span class="nav-icon" [innerHTML]="getSafeHtml(item.icon_svg)"></span>
                <span class="nav-text">{{ item.label }}</span>
              </a>
            </li>
            @if (showTheme) {
            <li class="nav-theme">
              <app-theme-switcher></app-theme-switcher>
            </li>
            }
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
  showTheme = false;
  private lastScrollTop = 0;
  private isBrowser: boolean;

  navItems: NavItem[] = [];
  siteInfo: HeaderSiteInfo | null = null;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private themeService: ThemeService,
    private content: ContentService,
    private sanitizer: DomSanitizer,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getSafeHtml(html: string | null | undefined): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html || "");
  }

  ngOnInit() {
    this.content.getAll<NavItem>("nav_items").subscribe((items) => {
      this.navItems = items;
    });
    this.content
      .getRow<HeaderSiteInfo>("site_info", { id: 1 })
      .subscribe((info) => {
        this.siteInfo = info;
      });

    if (this.isBrowser) {
      // Prevent browser restoring previous scroll position on history navigation
      if ("scrollRestoration" in history) {
        try {
          (history as any).scrollRestoration = "manual";
        } catch (e) {}
      }

      // Ensure page starts at top on full reload
      setTimeout(
        () => window.scrollTo({ top: 0, left: 0, behavior: "auto" }),
        0,
      );

      this.checkScroll();

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
        if (event instanceof NavigationEnd) {
          setTimeout(
            () => window.scrollTo({ top: 0, left: 0, behavior: "auto" }),
            0,
          );
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
    const scrollTop =
      this.isBrowser && window
        ? window.pageYOffset || this.document.documentElement.scrollTop
        : 0;

    // Only add scrolled class, never hide header
    this.isScrolled = scrollTop > 50;
    this.isHidden = false;
    this.lastScrollTop = scrollTop;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.isBrowser) {
      try {
        (this.document.body as HTMLElement).style.overflow = this.menuOpen
          ? "hidden"
          : "";
      } catch (e) {}
    }
  }

  closeMenu() {
    this.menuOpen = false;
    if (this.isBrowser) {
      try {
        (this.document.body as HTMLElement).style.overflow = "";
      } catch (e) {}
    }
  }
}
