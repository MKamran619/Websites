import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoaderService } from "../../services/loader.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-loader",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-overlay" *ngIf="isLoading">
      <div class="loader-container">
        <!-- Code Brackets Loader matching logo -->
        <svg
          class="loader-icon"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="loaderGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style="stop-color:var(--primary)" />
              <stop
                offset="50%"
                style="stop-color:var(--secondary, var(--primary))"
              />
              <stop
                offset="100%"
                style="stop-color:var(--primary-light, var(--primary))"
              />
            </linearGradient>
          </defs>

          <!-- Left bracket < -->
          <path
            class="bracket-left"
            d="M30 20L10 40L30 60"
            stroke="url(#loaderGradient)"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
          <!-- Right bracket > -->
          <path
            class="bracket-right"
            d="M50 20L70 40L50 60"
            stroke="var(--secondary, var(--primary))"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
          <!-- Center slash / -->
          <path
            class="slash"
            d="M45 25L35 55"
            stroke="var(--primary)"
            stroke-width="4"
            stroke-linecap="round"
            opacity="0.6"
          />
        </svg>

        <!-- Loading text -->
        <p class="loader-text">Loading...</p>
      </div>
    </div>
  `,
  styles: [
    `
      .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background, #0a0f1a);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.3s ease;
      }

      .loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
      }

      .loader-icon {
        animation: pulse 1.5s ease-in-out infinite;
      }

      .bracket-left {
        animation: bracketLeft 1s ease-in-out infinite;
        transform-origin: center;
      }

      .bracket-right {
        animation: bracketRight 1s ease-in-out infinite;
        transform-origin: center;
      }

      .slash {
        animation: slashPulse 1s ease-in-out infinite;
      }

      .loader-text {
        color: var(--text-muted, #94a3b8);
        font-family: "Inter", "Segoe UI", sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin: 0;
        animation: textPulse 1.5s ease-in-out infinite;
      }

      @keyframes pulse {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      @keyframes bracketLeft {
        0%,
        100% {
          transform: translateX(0);
          opacity: 1;
        }
        50% {
          transform: translateX(-5px);
          opacity: 0.7;
        }
      }

      @keyframes bracketRight {
        0%,
        100% {
          transform: translateX(0);
          opacity: 1;
        }
        50% {
          transform: translateX(5px);
          opacity: 0.7;
        }
      }

      @keyframes slashPulse {
        0%,
        100% {
          opacity: 0.6;
        }
        50% {
          opacity: 1;
        }
      }

      @keyframes textPulse {
        0%,
        100% {
          opacity: 0.7;
        }
        50% {
          opacity: 1;
        }
      }
    `,
  ],
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription: Subscription | undefined;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.isLoading$.subscribe(
      (loading) => (this.isLoading = loading),
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
