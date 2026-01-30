import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  readTime: number;
  icon: string;
  tags?: string[];
  featured?: boolean;
  fileName?: string;
  author?: Author;
}

export interface Category {
  name: string;
  icon: string;
}

export interface Topic {
  icon: string;
  name: string;
  description: string;
  count: number;
}

export interface ArticlesIndex {
  articles: BlogArticle[];
  categories: Category[];
  topics: Topic[];
}

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  private readonly ARTICLES_PATH = "assets/articles";
  private articlesIndexSubject = new BehaviorSubject<ArticlesIndex | null>(
    null,
  );
  private articleCache = new Map<string, BlogArticle>();
  private isBrowser: boolean;

  articlesIndex$ = this.articlesIndexSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Load the articles index containing all article metadata
   */
  loadArticlesIndex(): Observable<ArticlesIndex> {
    const cached = this.articlesIndexSubject.getValue();
    if (cached) {
      return of(cached);
    }

    return this.http
      .get<ArticlesIndex>(`${this.ARTICLES_PATH}/index.json`)
      .pipe(
        tap((index) => this.articlesIndexSubject.next(index)),
        catchError((error) => {
          console.error("Error loading articles index:", error);
          return of({ articles: [], categories: [], topics: [] });
        }),
      );
  }

  /**
   * Get all articles (metadata only, no full content)
   */
  getArticles(): Observable<BlogArticle[]> {
    return this.loadArticlesIndex().pipe(map((index) => index.articles));
  }

  /**
   * Get the featured article
   */
  getFeaturedArticle(): Observable<BlogArticle | undefined> {
    return this.getArticles().pipe(
      map((articles) => articles.find((article) => article.featured)),
    );
  }

  /**
   * Get articles by category
   */
  getArticlesByCategory(category: string): Observable<BlogArticle[]> {
    return this.getArticles().pipe(
      map((articles) =>
        category === "All"
          ? articles.filter((a) => !a.featured)
          : articles.filter((a) => a.category === category && !a.featured),
      ),
    );
  }

  /**
   * Get a full article by ID (with content)
   */
  getArticleById(id: string): Observable<BlogArticle | null> {
    // Check cache first
    if (this.articleCache.has(id)) {
      return of(this.articleCache.get(id)!);
    }

    return this.http.get<BlogArticle>(`${this.ARTICLES_PATH}/${id}.json`).pipe(
      tap((article) => this.articleCache.set(id, article)),
      catchError((error) => {
        console.error(`Error loading article ${id}:`, error);
        return of(null);
      }),
    );
  }

  /**
   * Get all categories
   */
  getCategories(): Observable<Category[]> {
    return this.loadArticlesIndex().pipe(map((index) => index.categories));
  }

  /**
   * Get all topics
   */
  getTopics(): Observable<Topic[]> {
    return this.loadArticlesIndex().pipe(map((index) => index.topics));
  }

  /**
   * Search articles by title or tags
   */
  searchArticles(query: string): Observable<BlogArticle[]> {
    const lowerQuery = query.toLowerCase();
    return this.getArticles().pipe(
      map((articles) =>
        articles.filter(
          (article) =>
            article.title.toLowerCase().includes(lowerQuery) ||
            article.excerpt.toLowerCase().includes(lowerQuery) ||
            article.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
        ),
      ),
    );
  }

  /**
   * Get related articles based on category and tags
   */
  getRelatedArticles(
    article: BlogArticle,
    limit: number = 3,
  ): Observable<BlogArticle[]> {
    return this.getArticles().pipe(
      map((articles) => {
        return articles
          .filter((a) => a.id !== article.id)
          .map((a) => ({
            article: a,
            score: this.calculateRelevanceScore(article, a),
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map((item) => item.article);
      }),
    );
  }

  private calculateRelevanceScore(
    source: BlogArticle,
    target: BlogArticle,
  ): number {
    let score = 0;

    // Same category gives highest score
    if (source.category === target.category) {
      score += 10;
    }

    // Matching tags
    if (source.tags && target.tags) {
      const matchingTags = source.tags.filter((tag) =>
        target.tags?.includes(tag),
      ).length;
      score += matchingTags * 5;
    }

    return score;
  }

  /**
   * Clear the article cache
   */
  clearCache(): void {
    this.articleCache.clear();
    this.articlesIndexSubject.next(null);
  }
}
