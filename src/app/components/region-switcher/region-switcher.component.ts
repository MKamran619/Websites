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
import { RegionService, RegionInfo } from "../../services/region.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-region-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="region-switcher" [class.open]="isOpen">
      <button
        class="region-trigger"
        (click)="toggleDropdown()"
        [attr.aria-expanded]="isOpen"
      >
        <span class="trigger-flag">{{ currentRegion?.flag || "🌐" }}</span>
        <span class="trigger-text">{{ currentRegion?.id || "Region" }}</span>
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

      <div class="region-dropdown" *ngIf="isOpen">
        <button
          *ngFor="let region of regions"
          class="region-option"
          [class.active]="currentRegion?.id === region.id"
          (click)="selectRegion(region)"
        >
          <span class="region-flag">{{ region.flag }}</span>
          <span class="region-name">{{ region.name }}</span>
          <span class="check-mark" *ngIf="currentRegion?.id === region.id">✓</span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .region-switcher {
        position: relative;
        z-index: 1000;
      }

      .region-trigger {
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

        .trigger-flag {
          font-size: 1.1rem;
        }

        .chevron {
          transition: transform 0.3s ease;

          &.rotated {
            transform: rotate(180deg);
          }
        }
      }

      .region-dropdown {
        position: absolute;
        top: calc(100% + 0.75rem);
        right: 0;
        background: var(--surface, #1a2235);
        border: 1px solid var(--border, #334155);
        border-radius: 1rem;
        padding: 0.5rem;
        min-width: 220px;
        box-shadow: 0 20px 40px var(--shadow-color, rgba(0, 0, 0, 0.4));
        animation: slideDown 0.3s ease;
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

      .region-option {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        width: 100%;
        padding: 0.6rem 0.75rem;
        background: transparent;
        border: none;
        border-radius: 0.6rem;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        text-align: left;

        &:hover {
          background: var(--surface-alt, #252f45);
        }

        &.active {
          background: var(--surface-alt, #252f45);

          .region-name {
            color: var(--primary, #0066ff);
          }
        }
      }

      .region-flag {
        font-size: 1.2rem;
      }

      .region-name {
        font-size: 0.85rem;
        color: var(--text, #fff);
        font-weight: 500;
        flex: 1;
      }

      .check-mark {
        font-size: 0.75rem;
        color: var(--primary, #0066ff);
      }
    `,
  ],
})
export class RegionSwitcherComponent implements OnInit, OnDestroy {
  regions: RegionInfo[] = [];
  currentRegion: RegionInfo | null = null;
  isOpen = false;
  private isBrowser: boolean;
  private subscription?: Subscription;

  constructor(
    private regionService: RegionService,
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.regions = this.regionService.getRegions();
    this.subscription = this.regionService.currentRegion$.subscribe((region) => {
      this.currentRegion = region;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectRegion(region: RegionInfo) {
    this.regionService.setRegion(region.id);
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
