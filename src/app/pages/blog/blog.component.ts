import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  ArticleService,
  BlogArticle,
  Category,
  Topic,
} from "../../services/article.service";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-blog",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <!-- Article Detail View -->
    <div
      class="article-overlay"
      *ngIf="selectedArticle"
      (click)="closeArticle()"
    >
      <article class="article-detail" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="closeArticle()">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="article-header">
          <div class="article-meta">
            <span class="article-category">{{ selectedArticle.category }}</span>
            <span class="article-date">{{ selectedArticle.date }}</span>
            <span class="article-read-time"
              >{{ selectedArticle.readTime }} min read</span
            >
          </div>
          <h1 class="article-title">{{ selectedArticle.title }}</h1>
          <div class="article-author">
            <div class="author-avatar">
              {{ selectedArticle.author?.avatar || "KS" }}
            </div>
            <div class="author-info">
              <span class="author-name">{{
                selectedArticle.author?.name || "Kamran Sohail"
              }}</span>
              <span class="author-role">{{
                selectedArticle.author?.role || "Software Engineer & Consultant"
              }}</span>
            </div>
          </div>
          <div class="article-tags" *ngIf="selectedArticle.tags">
            <span class="tag" *ngFor="let tag of selectedArticle.tags">{{
              tag
            }}</span>
          </div>
        </div>

        <div class="article-content-wrapper">
          <div
            class="article-content"
            *ngIf="!isLoadingContent && sanitizedContent"
            [innerHTML]="sanitizedContent"
          ></div>
          <div class="loading-content" *ngIf="isLoadingContent">
            <div class="loading-spinner"></div>
            <p>Loading article...</p>
          </div>
          <div
            class="no-content"
            *ngIf="!isLoadingContent && !sanitizedContent"
          >
            <p>Content not available.</p>
          </div>
        </div>

        <div class="article-footer">
          <div class="share-section">
            <span>Share this article:</span>
            <div class="share-buttons">
              <button
                class="share-btn"
                title="Share on LinkedIn"
                (click)="shareOnLinkedIn()"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </button>
              <button
                class="share-btn"
                title="Share on Twitter"
                (click)="shareOnTwitter()"
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
              </button>
              <button class="share-btn" title="Copy link" (click)="copyLink()">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                  ></path>
                  <path
                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <button class="btn btn-primary" (click)="closeArticle()">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Articles
          </button>
        </div>
      </article>
    </div>

    <!-- Premium Hero Section -->
    <section class="blog-hero">
      <div class="hero-bg-effects">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="grid-pattern"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">📚</span>
            <span>Technical Insights & Industry Trends</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">Insights</span> & Knowledge Hub
          </h1>
          <p class="hero-subtitle">
            Explore in-depth articles on software development, digital
            transformation, and emerging technologies. Learn from real-world
            experience.
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Post -->
    <section class="featured-section" *ngIf="featuredPost">
      <div class="container">
        <div class="featured-post">
          <div class="featured-content">
            <span class="featured-badge">Featured Article</span>
            <h2>{{ featuredPost.title }}</h2>
            <p class="featured-excerpt">{{ featuredPost.excerpt }}</p>
            <div class="featured-meta">
              <span class="category">{{ featuredPost.category }}</span>
              <span class="date">{{ featuredPost.date }}</span>
              <span class="read-time"
                >{{ featuredPost.readTime }} min read</span
              >
            </div>
            <button class="btn btn-primary" (click)="openArticle(featuredPost)">
              <span>Read Full Article</span>
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
          <div class="featured-visual">
            <div class="visual-card">
              <div class="visual-icon">{{ featuredPost.icon }}</div>
              <div class="visual-tags">
                <span *ngFor="let tag of featuredPost.tags">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories-section">
      <div class="container">
        <div class="categories-header">
          <h2>Browse by Topic</h2>
          <div class="categories-list">
            <button
              class="category-btn"
              [class.active]="activeCategory === 'All'"
              (click)="filterByCategory('All')"
            >
              All Posts
            </button>
            <button
              *ngFor="let cat of visibleCategories"
              class="category-btn"
              [class.active]="activeCategory === cat.name"
              (click)="filterByCategory(cat.name)"
            >
              <span class="cat-icon">{{ cat.icon }}</span>
              {{ cat.name }}
            </button>
            <button
              *ngIf="!showAllCategories && remainingCategoriesCount > 0"
              class="category-btn more-btn"
              (click)="showAllCategories = true"
            >
              <span class="cat-icon">+</span>
              {{ remainingCategoriesCount }} More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Grid -->
    <section class="blog-content">
      <div class="container">
        <div class="loading-state" *ngIf="isLoading">
          <div class="loading-spinner"></div>
          <p>Loading articles...</p>
        </div>
        <div class="blog-grid" *ngIf="!isLoading">
          <article
            class="blog-card"
            *ngFor="
              let post of showAllArticles
                ? filteredPosts
                : filteredPosts.slice(0, visibleArticlesCount)
            "
          >
            <div class="card-header">
              <span class="post-icon">{{ post.icon }}</span>
              <div class="card-meta">
                <span class="category">{{ post.category }}</span>
                <span class="date">{{ post.date }}</span>
              </div>
            </div>
            <h2>{{ post.title }}</h2>
            <p class="excerpt">{{ post.excerpt }}</p>
            <div class="card-footer">
              <div class="author-info">
                <div class="author-avatar">KS</div>
                <span class="author-name">Kamran Sohail</span>
              </div>
              <span class="read-time">{{ post.readTime }} min</span>
            </div>
            <button class="read-more" (click)="openArticle(post)">
              Read Article
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
          </article>
        </div>
        <div
          class="load-more-articles"
          *ngIf="
            !isLoading &&
            !showAllArticles &&
            filteredPosts.length > visibleArticlesCount
          "
        >
          <button
            class="btn btn-outline load-more-btn"
            (click)="loadMoreArticles()"
          >
            <span>Load More Articles</span>
            <span class="remaining-count"
              >({{ filteredPosts.length - visibleArticlesCount }} more)</span
            >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
        <div
          class="no-articles"
          *ngIf="!isLoading && filteredPosts.length === 0"
        >
          <p>No articles found in this category.</p>
        </div>
      </div>
    </section>

    <!-- Topics Grid -->
    <section class="topics-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Explore Topics</span>
          <h2 class="section-title">Deep Dives into Key Areas</h2>
        </div>
        <div class="topics-grid">
          <div
            class="topic-card clickable"
            *ngFor="
              let topic of showAllTopics
                ? topics
                : topics.slice(0, visibleTopicsCount)
            "
            (click)="openTopic(topic)"
          >
            <div class="topic-icon">{{ topic.icon }}</div>
            <h3>{{ topic.name }}</h3>
            <p>{{ topic.description }}</p>
            <span class="topic-count">{{ topic.count }} Articles</span>
            <div class="topic-arrow">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="load-more-container"
          *ngIf="!showAllTopics && topics.length > visibleTopicsCount"
        >
          <button
            class="btn btn-outline load-more-btn"
            (click)="loadMoreTopics()"
          >
            <span>Load More Topics</span>
            <span class="remaining-count"
              >({{ topics.length - visibleTopicsCount }} more)</span
            >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Topic Articles Overlay -->
    <div class="topic-overlay" *ngIf="selectedTopic" (click)="closeTopic()">
      <div class="topic-articles-panel" (click)="$event.stopPropagation()">
        <div class="topic-panel-header">
          <button class="back-btn" (click)="closeTopic()">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="topic-header-content">
            <span class="topic-header-icon">{{ selectedTopic.icon }}</span>
            <div>
              <h2>{{ selectedTopic.name }}</h2>
              <p>{{ selectedTopic.description }}</p>
            </div>
          </div>
          <button class="close-btn" (click)="closeTopic()">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="topic-articles-count">
          <span>{{ topicArticles.length }} articles available</span>
        </div>

        <div class="topic-articles-list">
          <div
            class="topic-article-item"
            *ngFor="let article of topicArticles"
            (click)="openArticleFromTopic(article)"
          >
            <div class="article-item-icon">{{ article.icon }}</div>
            <div class="article-item-content">
              <h3>{{ article.title }}</h3>
              <p>{{ article.excerpt }}</p>
              <div class="article-item-meta">
                <span class="date">{{ article.date }}</span>
                <span class="read-time">{{ article.readTime }} min read</span>
                <div class="article-item-tags">
                  <span
                    class="tag"
                    *ngFor="let tag of article.tags?.slice(0, 3)"
                    >{{ tag }}</span
                  >
                </div>
              </div>
            </div>
            <div class="article-item-arrow">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>

        <div class="no-articles-topic" *ngIf="topicArticles.length === 0">
          <p>No articles found for this topic.</p>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-card">
          <div class="newsletter-content">
            <div class="newsletter-icon">
              <svg
                width="48"
                height="48"
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
            </div>
            <h2>Stay Ahead of the Curve</h2>
            <p>
              Get exclusive insights on digital transformation, software
              development trends, and practical guides delivered straight to
              your inbox. Join 1,000+ tech leaders.
            </p>
            <form class="newsletter-form" (ngSubmit)="subscribeNewsletter()">
              <div class="form-group">
                <input
                  type="email"
                  [(ngModel)]="newsletterEmail"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <button type="submit" class="btn btn-primary">
                  <span>Subscribe</span>
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
              <p class="form-note">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </div>
          <div class="newsletter-decoration">
            <div class="decoration-circle"></div>
            <div class="decoration-ring"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h2 class="cta-title">Have a Project in Mind?</h2>
            <p class="cta-text">
              Let's turn your ideas into reality. Schedule a free consultation
              to discuss how we can help transform your business.
            </p>
            <div class="cta-buttons">
              <a routerLink="/contact" class="btn btn-primary btn-lg">
                <span>Start a Conversation</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit, AfterViewInit, OnDestroy {
  private isBrowser: boolean;
  private destroy$ = new Subject<void>();

  newsletterEmail = "";
  activeCategory = "All";
  platformId: Object;
  selectedArticle: BlogArticle | null = null;
  selectedTopic: Topic | null = null;
  topicArticles: BlogArticle[] = [];
  isLoading = true;
  isLoadingContent = false;
  sanitizedContent: SafeHtml | null = null;
  showAllTopics = false;
  visibleTopicsCount = 6;
  showAllCategories = false;
  visibleCategoriesCount = 6;
  showAllArticles = false;
  visibleArticlesCount = 6;

  featuredPost: BlogArticle | null = null;
  blogPosts: BlogArticle[] = [];
  filteredPosts: BlogArticle[] = [];
  categories: Category[] = [];
  topics: Topic[] = [];

  get visibleCategories(): Category[] {
    return this.showAllCategories
      ? this.categories
      : this.categories.slice(0, this.visibleCategoriesCount);
  }

  get remainingCategoriesCount(): number {
    return this.categories.length - this.visibleCategoriesCount;
  }

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private articleService: ArticleService,
    private sanitizer: DomSanitizer,
  ) {
    this.platformId = platformId;
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.loadArticles();
    if (this.isBrowser) {
      this.animateOnScroll();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 200);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadArticles() {
    this.isLoading = true;

    // Load articles index
    this.articleService
      .loadArticlesIndex()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (index) => {
          this.categories = index.categories;
          this.topics = index.topics;

          // Separate featured and regular posts
          this.featuredPost = index.articles.find((a) => a.featured) || null;
          this.blogPosts = index.articles.filter((a) => !a.featured);
          this.filteredPosts = [...this.blogPosts];
          this.isLoading = false;

          // Refresh animations after content loads
          if (this.isBrowser) {
            setTimeout(() => {
              ScrollTrigger.refresh(true);
            }, 100);
          }
        },
        error: (error) => {
          console.error("Error loading articles:", error);
          this.isLoading = false;
        },
      });
  }

  filterByCategory(category: string) {
    this.activeCategory = category;
    this.showAllArticles = false; // Reset to show only first 6 when changing category
    if (category === "All") {
      this.filteredPosts = [...this.blogPosts];
    } else {
      this.filteredPosts = this.blogPosts.filter(
        (post) => post.category === category,
      );
    }
  }

  loadMoreArticles() {
    this.showAllArticles = true;
    // Refresh animations for newly visible article cards
    if (this.isBrowser) {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 100);
    }
  }

  openArticle(post: BlogArticle) {
    this.selectedArticle = { ...post };
    this.sanitizedContent = null;
    this.isLoadingContent = true;

    if (this.isBrowser) {
      document.body.style.overflow = "hidden";
    }

    // Load full article content from JSON
    this.articleService
      .getArticleById(post.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (fullArticle) => {
          if (fullArticle && this.selectedArticle) {
            this.selectedArticle = fullArticle;
            // Sanitize the HTML content to bypass Angular security
            if (fullArticle.content) {
              this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
                fullArticle.content,
              );
            }
          }
          this.isLoadingContent = false;
        },
        error: (error) => {
          console.error("Error loading article content:", error);
          this.isLoadingContent = false;
        },
      });
  }

  closeArticle() {
    this.selectedArticle = null;
    this.sanitizedContent = null;
    if (this.isBrowser) {
      document.body.style.overflow = "";
    }
  }

  loadMoreTopics() {
    this.showAllTopics = true;
    // Refresh animations for newly visible topic cards
    if (this.isBrowser) {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 100);
    }
  }

  openTopic(topic: Topic) {
    this.selectedTopic = topic;
    // Filter articles by topic name (matching category)
    this.topicArticles = this.blogPosts.filter(
      (post) => post.category === topic.name,
    );
    // Also include the featured post if it matches
    if (this.featuredPost && this.featuredPost.category === topic.name) {
      this.topicArticles = [this.featuredPost, ...this.topicArticles];
    }
    if (this.isBrowser) {
      document.body.style.overflow = "hidden";
    }
  }

  closeTopic() {
    this.selectedTopic = null;
    this.topicArticles = [];
    if (this.isBrowser) {
      document.body.style.overflow = "";
    }
  }

  openArticleFromTopic(article: BlogArticle) {
    this.closeTopic();
    setTimeout(() => {
      this.openArticle(article);
    }, 100);
  }

  copyLink() {
    if (this.isBrowser && this.selectedArticle) {
      const url = `${window.location.origin}/blog#${this.selectedArticle.id}`;
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  }

  shareOnLinkedIn() {
    if (this.isBrowser && this.selectedArticle) {
      const url = encodeURIComponent(
        `${window.location.origin}/blog#${this.selectedArticle.id}`,
      );
      const title = encodeURIComponent(this.selectedArticle.title);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank",
      );
    }
  }

  shareOnTwitter() {
    if (this.isBrowser && this.selectedArticle) {
      const url = encodeURIComponent(
        `${window.location.origin}/blog#${this.selectedArticle.id}`,
      );
      const text = encodeURIComponent(this.selectedArticle.title);
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        "_blank",
      );
    }
  }

  subscribeNewsletter() {
    if (this.newsletterEmail) {
      console.log("Subscribed:", this.newsletterEmail);
      alert(
        "Thank you for subscribing! You'll receive our latest insights soon.",
      );
      this.newsletterEmail = "";
    }
  }

  animateOnScroll() {
    // Hero animations
    gsap.from(".hero-content > *", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Featured post
    gsap.from(".featured-post", {
      scrollTrigger: {
        trigger: ".featured-section",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
    });

    // Blog cards
    gsap.utils.toArray<HTMLElement>(".blog-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.1,
      });
    });

    // Topic cards
    gsap.utils.toArray<HTMLElement>(".topic-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: index * 0.08,
      });
    });

    // Newsletter
    gsap.from(".newsletter-card", {
      scrollTrigger: {
        trigger: ".newsletter-section",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
    });
  }
}
