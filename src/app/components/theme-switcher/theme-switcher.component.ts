import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  HostListener,
  ElementRef,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { ThemeService, Theme } from "../../services/theme.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-theme-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-switcher" [class.open]="isOpen">
      <button
        class="theme-trigger"
        (click)="toggleDropdown()"
        [attr.aria-expanded]="isOpen"
      >
        <span class="trigger-icon">{{ currentTheme?.icon || "🎨" }}</span>
        <span class="trigger-text">Theme</span>
        <svg
          class="chevron"
          [class.rotated]="isOpen"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <div class="theme-dropdown" *ngIf="isOpen">
        <!-- Light Themes Section (First) -->
        <div class="theme-section">
          <div class="section-header">
            <span class="header-icon">☀️</span>
            <span>Light Themes</span>
          </div>
          <div class="themes-grid">
            <button
              *ngFor="let theme of lightThemes"
              class="theme-option light"
              [class.active]="currentTheme?.id === theme.id"
              (click)="selectTheme(theme)"
            >
              <div class="theme-preview" [style.background]="theme.gradient">
                <span class="theme-icon">{{ theme.icon }}</span>
              </div>
              <span class="theme-name">{{ theme.name }}</span>
              <span class="check-mark" *ngIf="currentTheme?.id === theme.id"
                >✓</span
              >
            </button>
          </div>
        </div>

        <!-- Dark Themes Section -->
        <div class="theme-section">
          <div class="section-header">
            <span class="header-icon">🌙</span>
            <span>Dark Themes</span>
          </div>
          <div class="themes-grid">
            <button
              *ngFor="let theme of darkThemes"
              class="theme-option"
              [class.active]="currentTheme?.id === theme.id"
              (click)="selectTheme(theme)"
            >
              <div class="theme-preview" [style.background]="theme.gradient">
                <span class="theme-icon">{{ theme.icon }}</span>
              </div>
              <span class="theme-name">{{ theme.name }}</span>
              <span class="check-mark" *ngIf="currentTheme?.id === theme.id"
                >✓</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .theme-switcher {
        position: relative;
        z-index: 1000;
      }

      .theme-trigger {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--surface, rgba(255, 255, 255, 0.05));
        border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
        color: var(--text, #fff);
        padding: 0.5rem 1rem;
        border-radius: 50px;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
          background: var(--surface-alt);
          border-color: var(--primary, #0066ff);
          transform: translateY(-2px);
        }

        .trigger-icon {
          font-size: 1.1rem;
        }

        .trigger-text {
          @media (max-width: 768px) {
            display: none;
          }
        }

        .chevron {
          transition: transform 0.3s ease;

          &.rotated {
            transform: rotate(180deg);
          }
        }
      }

      .theme-dropdown {
        position: absolute;
        top: calc(100% + 0.75rem);
        right: 0;
        background: var(--surface, #1a2235);
        border: 1px solid var(--border, #334155);
        border-radius: 1rem;
        padding: 1rem;
        min-width: 360px;
        max-height: 70vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px var(--shadow-color, rgba(0, 0, 0, 0.4));
        animation: slideDown 0.3s ease;

        @media (max-width: 480px) {
          min-width: 300px;
          right: -80px;
          max-height: 60vh;
        }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .theme-section {
        margin-bottom: 1rem;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text, #fff);
        font-weight: 600;
        font-size: 0.85rem;
        margin-bottom: 0.75rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border, #334155);

        .header-icon {
          font-size: 1rem;
        }
      }

      .themes-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;

        @media (max-width: 400px) {
          grid-template-columns: 1fr;
        }
      }

      .theme-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        padding: 0.6rem;
        background: var(--surface-alt, #252f45);
        border: 2px solid transparent;
        border-radius: 0.75rem;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;

        &:hover {
          border-color: var(--primary, #0066ff);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px var(--shadow-color, rgba(0, 0, 0, 0.3));
        }

        &.active {
          border-color: var(--primary, #0066ff);

          .theme-preview {
            box-shadow: 0 0 15px var(--primary, rgba(0, 102, 255, 0.4));
          }
        }

        &.light {
          background: var(--background-alt, #f8fafc);
        }
      }

      .theme-preview {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px var(--shadow-color, rgba(0, 0, 0, 0.3));
        transition: all 0.3s ease;

        .theme-icon {
          font-size: 1.2rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
      }

      .theme-name {
        font-size: 0.7rem;
        color: var(--text-muted, #94a3b8);
        font-weight: 500;
        text-align: center;
      }

      .check-mark {
        position: absolute;
        top: 0.35rem;
        right: 0.35rem;
        width: 18px;
        height: 18px;
        background: var(--primary, #0066ff);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.65rem;
        color: white;
      }
    `,
  ],
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
  themes: Theme[] = [];
  darkThemes: Theme[] = [];
  lightThemes: Theme[] = [];
  currentTheme: Theme | null = null;
  isOpen = false;
  private isBrowser: boolean;
  private subscription?: Subscription;

  constructor(
    private themeService: ThemeService,
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.themes = this.themeService.getThemes();
    this.darkThemes = this.themeService.getDarkThemes();
    this.lightThemes = this.themeService.getLightThemes();
    this.subscription = this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectTheme(theme: Theme) {
    this.themeService.setTheme(theme.id);
    this.isOpen = false;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    if (
      this.isBrowser &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.isOpen = false;
    }
  }
}
