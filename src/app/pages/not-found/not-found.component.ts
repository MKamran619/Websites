import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";

/**
 * Wildcard-route (`**`) component - shown when the Angular router itself
 * can't match a path during in-app, client-side navigation (JS already
 * running). It does NOT determine the HTTP status code for a cold request
 * to an unknown URL; that's handled separately by the static public/404.html
 * file, which Netlify serves with a real 404 status for any path that
 * doesn't match a redirect rule or an existing prerendered file. See
 * TECHNICAL_SEO_IMPLEMENTATION_REPORT.md.
 */
@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="not-found">
      <div class="container">
        <p class="not-found-code">404</p>
        <h1>Page Not Found</h1>
        <p class="not-found-text">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div class="not-found-links">
          <a routerLink="/" class="btn-primary">Back to Home</a>
          <a routerLink="/contact" class="btn-secondary">Contact Us</a>
        </div>
        <nav class="not-found-nav" aria-label="Popular pages">
          <a routerLink="/services">Services</a>
          <a routerLink="/portfolio">Case Studies</a>
          <a routerLink="/blog">Insights</a>
          <a routerLink="/faq">FAQ</a>
        </nav>
      </div>
    </section>
  `,
  styles: [
    `
      .not-found {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 4rem 1.5rem;
      }
      .container {
        max-width: 42rem;
      }
      .not-found-code {
        font-family: "Space Grotesk", Inter, sans-serif;
        font-size: 5rem;
        font-weight: 800;
        background: var(--gradient, linear-gradient(135deg, #0066ff 0%, #00d4aa 100%));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
      }
      h1 {
        margin: 0.5rem 0 1rem;
      }
      .not-found-text {
        color: var(--text-muted, #94a3b8);
        margin-bottom: 2rem;
      }
      .not-found-links {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 2.5rem;
      }
      .btn-primary,
      .btn-secondary {
        padding: 0.75rem 1.5rem;
        border-radius: 9999px;
        font-weight: 600;
        text-decoration: none;
      }
      .btn-primary {
        background: var(--primary, #0066ff);
        color: #fff;
      }
      .btn-secondary {
        border: 1px solid var(--border, #334155);
        color: var(--text, #fff);
      }
      .not-found-nav {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .not-found-nav a {
        color: var(--text-muted, #94a3b8);
        text-decoration: underline;
      }
    `,
  ],
})
export class NotFoundComponent implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Page Not Found | Nexa Web Service");
    this.meta.updateTag({ name: "robots", content: "noindex, follow" });
  }
}
