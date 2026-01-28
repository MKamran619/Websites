import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-testimonials",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="testimonials" id="testimonials">
      <!-- Background Effects -->
      <div class="testimonials-bg">
        <div class="gradient-orb gradient-orb-1"></div>
        <div class="gradient-orb gradient-orb-2"></div>
        <div class="grid-pattern"></div>
      </div>

      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="section-badge">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            Client Success Stories
          </span>
          <h2 class="section-title">
            What Our <span class="gradient-text">Clients</span> Say
          </h2>
          <p class="section-subtitle">
            Don't just take our word for it — hear from business leaders who've
            transformed their operations
          </p>
        </div>

        <!-- Main Carousel -->
        <div class="carousel-wrapper">
          <!-- Navigation Arrows -->
          <button
            class="carousel-nav carousel-prev"
            (click)="prevSlide()"
            [class.disabled]="currentIndex === 0"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div class="carousel-container">
            <div
              class="carousel-track"
              [style.transform]="'translateX(' + -currentIndex * 100 + '%)'"
            >
              <div
                class="testimonial-slide"
                *ngFor="let testimonial of testimonials; let i = index"
              >
                <div
                  class="testimonial-card featured"
                  [class.active]="i === currentIndex"
                >
                  <!-- Quote Icon -->
                  <div class="quote-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      opacity="0.15"
                    >
                      <path
                        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                      />
                    </svg>
                  </div>

                  <!-- Rating Stars -->
                  <div class="rating">
                    <div class="stars">
                      <svg
                        *ngFor="let star of [1, 2, 3, 4, 5]"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#fbbf24"
                      >
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                    </div>
                    <span class="rating-text">5.0</span>
                  </div>

                  <!-- Quote Text -->
                  <blockquote class="quote">
                    "{{ testimonial.quote }}"
                  </blockquote>

                  <!-- Author Info -->
                  <div class="author-section">
                    <div class="author-avatar">
                      <span class="avatar-initials">{{
                        getInitials(testimonial.author)
                      }}</span>
                    </div>
                    <div class="author-info">
                      <h4 class="author-name">{{ testimonial.author }}</h4>
                      <p class="author-title">{{ testimonial.title }}</p>
                      <p class="author-company">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path d="M3 21h18" />
                          <path d="M5 21V7l8-4v18" />
                          <path d="M19 21V11l-6-4" />
                          <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
                        </svg>
                        {{ testimonial.company }}
                      </p>
                    </div>
                  </div>

                  <!-- Verified Badge -->
                  <div class="verified-badge">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Verified Client
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            class="carousel-nav carousel-next"
            (click)="nextSlide()"
            [class.disabled]="currentIndex >= testimonials.length - 1"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
          <button
            *ngFor="let testimonial of testimonials; let i = index"
            class="indicator"
            [class.active]="i === currentIndex"
            (click)="goToSlide(i)"
            [attr.aria-label]="'Go to testimonial ' + (i + 1)"
          ></button>
        </div>

        <!-- Mini Testimonials Grid -->
        <div class="mini-testimonials">
          <div
            class="mini-card"
            *ngFor="let testimonial of testimonials.slice(0, 3); let i = index"
            [class.active]="i === currentIndex"
            (click)="goToSlide(i)"
          >
            <div class="mini-avatar">{{ getInitials(testimonial.author) }}</div>
            <div class="mini-info">
              <span class="mini-name">{{ testimonial.author }}</span>
              <span class="mini-company">{{ testimonial.company }}</span>
            </div>
            <div class="mini-rating">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              5.0
            </div>
          </div>
        </div>

        <!-- Video Testimonials Section -->
        <div class="video-testimonials">
          <h3 class="video-section-title">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            Video Testimonials
          </h3>
          <p class="video-section-subtitle">
            Watch real clients share their success stories
          </p>

          <div class="video-grid">
            <div class="video-card" *ngFor="let video of videoTestimonials">
              <div class="video-thumbnail" (click)="playVideo(video.id)">
                <div class="play-button">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div class="video-overlay">
                  <span class="video-duration">{{ video.duration }}</span>
                </div>
              </div>
              <div class="video-info">
                <h4 class="video-title">{{ video.title }}</h4>
                <div class="video-author">
                  <div class="video-avatar">
                    {{ getInitials(video.author) }}
                  </div>
                  <div class="video-author-info">
                    <span class="video-author-name">{{ video.author }}</span>
                    <span class="video-author-role">{{ video.role }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Video Modal -->
          <div
            class="video-modal-overlay"
            *ngIf="activeVideoId"
            (click)="closeVideo()"
          >
            <div class="video-modal" (click)="$event.stopPropagation()">
              <button class="modal-close" (click)="closeVideo()">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <iframe
                *ngIf="activeVideoId"
                [src]="getVideoUrl(activeVideoId)"
                width="100%"
                height="100%"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </div>
          </div>
        </div>

        <!-- Trust Stats -->
        <div class="trust-stats">
          <div class="stat-item">
            <div class="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-number">50+</span>
              <span class="stat-label">Happy Clients</span>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-number">4.9</span>
              <span class="stat-label">Avg. Rating</span>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-number">98%</span>
              <span class="stat-label">Satisfaction</span>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <polyline points="22 6 12 13 2 6" />
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-number">24h</span>
              <span class="stat-label">Response Time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .testimonials {
        padding: 8rem 0;
        position: relative;
        overflow: hidden;
        background: var(--background);
      }

      .testimonials-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .gradient-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.3;
      }

      .gradient-orb-1 {
        width: 600px;
        height: 600px;
        background: var(--gradient);
        top: -200px;
        right: -200px;
        animation: float 20s ease-in-out infinite;
      }

      .gradient-orb-2 {
        width: 500px;
        height: 500px;
        background: var(--shadow-color);
        bottom: -150px;
        left: -150px;
        animation: float 25s ease-in-out infinite reverse;
      }

      .grid-pattern {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px);
        background-size: 60px 60px;
      }

      @keyframes float {
        0%,
        100% {
          transform: translate(0, 0) scale(1);
        }
        33% {
          transform: translate(30px, -30px) scale(1.05);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.95);
        }
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        position: relative;
        z-index: 1;
      }

      /* Section Header */
      .section-header {
        text-align: center;
        margin-bottom: 4rem;
      }

      .section-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 50px;
        color: var(--primary);
        font-size: 0.85rem;
        font-weight: 500;
        margin-bottom: 1.5rem;
      }

      .section-title {
        font-family: "Space Grotesk", sans-serif;
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 700;
        color: var(--text);
        margin: 0 0 1rem;
        line-height: 1.2;
      }

      .gradient-text {
        background: var(--gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .section-subtitle {
        font-size: 1.1rem;
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.7;
      }

      /* Carousel */
      .carousel-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .carousel-container {
        flex: 1;
        overflow: hidden;
        border-radius: 1.5rem;
      }

      .carousel-track {
        display: flex;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .testimonial-slide {
        flex: 0 0 100%;
        padding: 0 1rem;
      }

      .carousel-nav {
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }

      .carousel-nav:hover:not(.disabled) {
        background: var(--surface);
        border-color: var(--primary);
        color: var(--primary);
        transform: scale(1.1);
      }

      .carousel-nav.disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      /* Testimonial Card */
      .testimonial-card {
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: 1.5rem;
        padding: 3rem;
        position: relative;
        overflow: hidden;
        transition: all 0.4s ease;
      }

      .testimonial-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--gradient);
      }

      .testimonial-card.active {
        border-color: var(--primary);
        box-shadow:
          0 25px 50px -12px var(--shadow-color),
          0 0 0 1px var(--surface);
      }

      .quote-icon {
        position: absolute;
        top: 2rem;
        right: 2rem;
        color: var(--primary);
      }

      .rating {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }

      .stars {
        display: flex;
        gap: 0.25rem;
      }

      .rating-text {
        font-weight: 600;
        color: #fbbf24;
      }

      .quote {
        font-size: 1.25rem;
        color: var(--text);
        line-height: 1.8;
        margin: 0 0 2rem;
        font-style: italic;
        position: relative;
      }

      .author-section {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border);
      }

      .author-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--gradient);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.25rem;
        color: var(--background);
      }

      .avatar-initials {
        text-transform: uppercase;
      }

      .author-info {
        flex: 1;
      }

      .author-name {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text);
        margin: 0 0 0.25rem;
      }

      .author-title {
        font-size: 0.9rem;
        color: var(--primary);
        margin: 0 0 0.25rem;
        font-weight: 500;
      }

      .author-company {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: var(--text-muted);
        margin: 0;
      }

      .verified-badge {
        position: absolute;
        bottom: 1.5rem;
        right: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 50px;
        color: #22c55e;
        font-size: 0.75rem;
        font-weight: 500;
      }

      /* Carousel Indicators */
      .carousel-indicators {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 3rem;
      }

      .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: none;
        background: var(--surface-alt);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .indicator.active {
        background: var(--gradient);
        transform: scale(1.2);
        box-shadow: 0 0 20px var(--shadow-color);
      }

      .indicator:hover:not(.active) {
        background: var(--surface);
      }

      /* Mini Testimonials */
      .mini-testimonials {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 4rem;
      }

      .mini-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.25rem;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .mini-card:hover,
      .mini-card.active {
        background: var(--surface);
        border-color: var(--primary);
        transform: translateY(-2px);
      }

      .mini-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--gradient);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.85rem;
        color: var(--background);
        flex-shrink: 0;
      }

      .mini-info {
        flex: 1;
        min-width: 0;
      }

      .mini-name {
        display: block;
        font-weight: 600;
        color: var(--text);
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .mini-company {
        display: block;
        color: var(--text-muted);
        font-size: 0.75rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .mini-rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #fbbf24;
        font-size: 0.85rem;
        font-weight: 600;
      }

      /* Trust Stats */
      .trust-stats {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        padding: 2rem 3rem;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 1.5rem;
        backdrop-filter: blur(10px);
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .stat-icon {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        background: var(--surface);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);
      }

      .stat-content {
        display: flex;
        flex-direction: column;
      }

      .stat-number {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text);
        font-family: "Space Grotesk", sans-serif;
      }

      .stat-label {
        font-size: 0.85rem;
        color: var(--text-muted);
      }

      .stat-divider {
        width: 1px;
        height: 50px;
        background: linear-gradient(
          to bottom,
          transparent,
          var(--border),
          transparent
        );
      }

      /* Responsive */
      @media (max-width: 1024px) {
        .carousel-nav {
          display: none;
        }

        .carousel-wrapper {
          padding: 0;
        }

        .trust-stats {
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .stat-divider {
          display: none;
        }

        .stat-item {
          width: calc(50% - 1rem);
          justify-content: center;
        }
      }

      @media (max-width: 768px) {
        .testimonials {
          padding: 5rem 0;
        }

        .container {
          padding: 0 1rem;
        }

        .section-header {
          margin-bottom: 3rem;
        }

        .testimonial-card {
          padding: 2rem 1.5rem;
        }

        .quote {
          font-size: 1.1rem;
        }

        .quote-icon {
          display: none;
        }

        .verified-badge {
          position: static;
          margin-top: 1.5rem;
          justify-content: center;
        }

        .mini-testimonials {
          grid-template-columns: 1fr;
        }

        .trust-stats {
          padding: 1.5rem;
        }

        .stat-item {
          width: 100%;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
        }

        .stat-number {
          font-size: 1.25rem;
        }
      }

      /* Video Testimonials Section */
      .video-testimonials {
        margin: 4rem 0;
        padding: 3rem;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 24px;
      }

      .video-section-title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text);
        margin-bottom: 0.5rem;
        text-align: center;
      }

      .video-section-title svg {
        color: #a855f7;
      }

      .video-section-subtitle {
        text-align: center;
        color: var(--text-muted);
        margin-bottom: 2.5rem;
        font-size: 1.05rem;
      }

      .video-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }

      @media (max-width: 968px) {
        .video-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 640px) {
        .video-grid {
          grid-template-columns: 1fr;
        }

        .video-testimonials {
          padding: 2rem 1.5rem;
        }
      }

      .video-card {
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.4s ease;
      }

      .video-card:hover {
        transform: translateY(-8px);
        border-color: var(--primary);
        box-shadow: 0 20px 40px var(--shadow-color);
      }

      .video-thumbnail {
        position: relative;
        aspect-ratio: 16/9;
        background: var(--surface);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .play-button {
        width: 72px;
        height: 72px;
        background: var(--surface-alt);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--background);
        transition: all 0.3s ease;
        box-shadow: 0 8px 30px var(--shadow-color);
      }

      .play-button svg {
        margin-left: 4px;
      }

      .video-thumbnail:hover .play-button {
        transform: scale(1.1);
        background: #a855f7;
        color: white;
      }

      .video-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0.75rem;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        display: flex;
        justify-content: flex-end;
      }

      .video-duration {
        background: rgba(0, 0, 0, 0.7);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        color: white;
        font-weight: 600;
      }

      .video-info {
        padding: 1.25rem;
      }

      .video-title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text);
        margin-bottom: 1rem;
        line-height: 1.4;
      }

      .video-author {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .video-avatar {
        width: 36px;
        height: 36px;
        background: var(--gradient);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 700;
        color: white;
      }

      .video-author-info {
        display: flex;
        flex-direction: column;
      }

      .video-author-name {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text);
      }

      .video-author-role {
        font-size: 0.75rem;
        color: var(--text-muted);
      }

      /* Video Modal */
      .video-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 2rem;
        animation: fadeIn 0.3s ease;
      }

      .video-modal {
        position: relative;
        width: 100%;
        max-width: 900px;
        aspect-ratio: 16/9;
        background: #000;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
      }

      .video-modal .modal-close {
        position: absolute;
        top: -48px;
        right: 0;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
      }

      .video-modal .modal-close:hover {
        background: rgba(239, 68, 68, 0.3);
        border-color: rgba(239, 68, 68, 0.5);
      }

      .video-modal iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class TestimonialsComponent implements OnInit, OnDestroy, AfterViewInit {
  currentIndex = 0;
  private autoPlayInterval: any;
  private isBrowser: boolean;
  activeVideoId: string | null = null;

  // Video testimonials data
  videoTestimonials = [
    {
      id: "dQw4w9WgXcQ", // Replace with actual client testimonial video ID
      title: "How ApnaKam Transformed Our Digital Presence",
      author: "James Mitchell",
      role: "CEO, TechFlow Solutions",
      duration: "2:34",
    },
    {
      id: "9bZkp7q19f0", // Replace with actual client testimonial video ID
      title: "Our Experience Working with ApnaKam",
      author: "Sarah Anderson",
      role: "CTO, FinanceHub Inc",
      duration: "3:12",
    },
    {
      id: "M7lc1UVf-VE", // Replace with actual client testimonial video ID
      title: "From Concept to Launch in 6 Weeks",
      author: "Robert Chen",
      role: "Founder, StartupWave",
      duration: "4:05",
    },
  ];

  testimonials = [
    {
      quote:
        "Exceptional work. The modernization of our legacy system exceeded expectations. They delivered on time and under budget while maintaining zero downtime during the transition.",
      author: "John Smith",
      company: "Fortune 500 Tech Company",
      title: "Chief Technology Officer",
      image: "",
    },
    {
      quote:
        "A rare combination of technical expertise and business acumen. They understood our challenges and delivered solutions that drove real revenue growth of 40% in the first quarter.",
      author: "Sarah Johnson",
      company: "SaaS Startup",
      title: "Founder & CEO",
      image: "",
    },
    {
      quote:
        "Professional, responsive, and brilliant. They took our vague ideas and turned them into a scalable, high-performing system that handles 10x our previous traffic with ease.",
      author: "Michael Chen",
      company: "E-Commerce Leader",
      title: "VP of Engineering",
      image: "",
    },
    {
      quote:
        "The technical leadership and mentoring they provided transformed our entire engineering team. The knowledge transfer was exceptional and continues to benefit us.",
      author: "Emily Rodriguez",
      company: "Financial Services Corp",
      title: "Engineering Manager",
      image: "",
    },
    {
      quote:
        "Outstanding ROI on the investment. Not just good code, but strategic solutions that aligned perfectly with our business objectives and reduced operational costs by 60%.",
      author: "David Park",
      company: "Insurance Corporation",
      title: "Chief Strategy Officer",
      image: "",
    },
    {
      quote:
        "Rare to find someone with this depth of expertise across so many technologies and the wisdom to choose exactly the right tool for each problem we faced.",
      author: "Lisa Martinez",
      company: "Healthcare Tech",
      title: "Product Director",
      image: "",
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private sanitizer: DomSanitizer,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.startAutoPlay();
    }
  }

  ngAfterViewInit(): void {
    // Additional initialization if needed
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Video testimonial methods
  playVideo(videoId: string): void {
    this.activeVideoId = videoId;
    if (this.isBrowser) {
      document.body.style.overflow = "hidden";
    }
  }

  closeVideo(): void {
    this.activeVideoId = null;
    if (this.isBrowser) {
      document.body.style.overflow = "";
    }
  }

  getVideoUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
    );
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2);
  }

  nextSlide(): void {
    if (this.currentIndex < this.testimonials.length - 1) {
      this.currentIndex++;
      this.resetAutoPlay();
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.resetAutoPlay();
    }
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      if (this.currentIndex >= this.testimonials.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    }, 6000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
