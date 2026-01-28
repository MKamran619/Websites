import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-blog",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
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
    <section class="featured-section">
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
            <a href="#" class="btn btn-primary">
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
            </a>
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
              *ngFor="let cat of categories"
              class="category-btn"
              [class.active]="activeCategory === cat.name"
              (click)="filterByCategory(cat.name)"
            >
              <span class="cat-icon">{{ cat.icon }}</span>
              {{ cat.name }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Grid -->
    <section class="blog-content">
      <div class="container">
        <div class="blog-grid">
          <article class="blog-card" *ngFor="let post of filteredPosts">
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
            <a href="#" class="read-more">
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
            </a>
          </article>
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
          <div class="topic-card" *ngFor="let topic of topics">
            <div class="topic-icon">{{ topic.icon }}</div>
            <h3>{{ topic.name }}</h3>
            <p>{{ topic.description }}</p>
            <span class="topic-count">{{ topic.count }} Articles</span>
          </div>
        </div>
      </div>
    </section>

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
export class BlogComponent implements OnInit {
  private isBrowser: boolean;
  newsletterEmail = "";
  activeCategory = "All";

  featuredPost = {
    title: "The Complete Guide to Digital Transformation in 2024",
    excerpt:
      "Discover the strategies, technologies, and best practices that are driving successful digital transformation initiatives across American businesses. Learn from real case studies and avoid common pitfalls.",
    date: "Jan 2024",
    category: "Digital Transformation",
    readTime: 15,
    icon: "🚀",
    tags: ["Strategy", "Cloud", "AI", "Innovation"],
  };

  categories = [
    { name: "Architecture", icon: "🏗️" },
    { name: "Cloud", icon: "☁️" },
    { name: "Performance", icon: "⚡" },
    { name: "AI/ML", icon: "🤖" },
    { name: "DevOps", icon: "🔄" },
  ];

  topics = [
    {
      icon: "🏗️",
      name: "System Architecture",
      description: "Design patterns and architectural decisions",
      count: 12,
    },
    {
      icon: "☁️",
      name: "Cloud Computing",
      description: "AWS, Azure, and cloud-native development",
      count: 8,
    },
    {
      icon: "⚡",
      name: "Performance",
      description: "Optimization and scalability techniques",
      count: 6,
    },
    {
      icon: "🤖",
      name: "AI & Machine Learning",
      description: "Practical AI applications in enterprise",
      count: 5,
    },
    {
      icon: "🔒",
      name: "Security",
      description: "Best practices and compliance",
      count: 7,
    },
    {
      icon: "📱",
      name: "Modern Frontend",
      description: "Angular, React, and UI/UX best practices",
      count: 10,
    },
  ];

  blogPosts = [
    {
      title: "Why Angular SSR Beats React for SEO in 2024",
      excerpt:
        "A comprehensive comparison of server-side rendering implementations and their impact on search engine optimization, performance, and user experience.",
      date: "Jan 2024",
      category: "Architecture",
      readTime: 8,
      icon: "🅰️",
    },
    {
      title: "Microservices: When to Use and When to Avoid",
      excerpt:
        "Understanding the trade-offs of microservices architecture and making the right choice for your organization's scale, complexity, and team structure.",
      date: "Dec 2023",
      category: "Architecture",
      readTime: 12,
      icon: "🔌",
    },
    {
      title: "Cost Optimization in Cloud Architectures",
      excerpt:
        "Practical strategies for reducing cloud infrastructure costs by 40% while maintaining performance, scalability, and reliability for enterprise applications.",
      date: "Nov 2023",
      category: "Cloud",
      readTime: 10,
      icon: "💰",
    },
    {
      title: "Building High-Performance APIs with .NET Core",
      excerpt:
        "Deep dive into performance optimization techniques, caching strategies, and best practices that can improve your API response times by 10x.",
      date: "Oct 2023",
      category: "Performance",
      readTime: 15,
      icon: "⚡",
    },
    {
      title: "AI Integration in Enterprise Applications",
      excerpt:
        "How enterprises are leveraging AI and ML to gain competitive advantages, automate processes, and deliver personalized customer experiences.",
      date: "Sep 2023",
      category: "AI/ML",
      readTime: 11,
      icon: "🤖",
    },
    {
      title: "DevOps Best Practices for Fast Deployment",
      excerpt:
        "Implementing CI/CD pipelines that enable multiple daily deployments with zero downtime and automated rollback capabilities.",
      date: "Aug 2023",
      category: "DevOps",
      readTime: 9,
      icon: "🔄",
    },
  ];

  filteredPosts = [...this.blogPosts];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.animateOnScroll();
    }
  }

  filterByCategory(category: string) {
    this.activeCategory = category;
    if (category === "All") {
      this.filteredPosts = [...this.blogPosts];
    } else {
      this.filteredPosts = this.blogPosts.filter(
        (post) => post.category === category,
      );
    }
  }

  subscribeNewsletter() {
    if (this.newsletterEmail) {
      // Add newsletter subscription logic here
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
