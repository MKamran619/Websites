import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, from, forkJoin } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { SupabaseClientService } from "./supabase-client.service";

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

const LIST_COLUMNS =
  "id,title,excerpt,date,category,read_time,icon,tags,featured,sort_order,author_name,author_role,author_avatar";

/**
 * Formats a Postgres `date` value (e.g. "2024-01-01") back into the
 * "Mon YYYY" display format that was used by the original static JSON
 * (e.g. "Jan 2024"), so templates that render `article.date` verbatim
 * don't need to change.
 */
function formatDbDate(value: string | null | undefined): string {
  if (!value) {
    return "";
  }
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  private articlesIndexSubject = new BehaviorSubject<ArticlesIndex | null>(
    null,
  );
  private articleCache = new Map<string, BlogArticle>();

  articlesIndex$ = this.articlesIndexSubject.asObservable();

  constructor(private supabase: SupabaseClientService) {}

  /**
   * Map a raw `blog_articles` row (snake_case) into the BlogArticle shape
   * (camelCase, nested `author`) expected by existing templates.
   */
  private mapArticleRow(row: any): BlogArticle {
    return {
      id: row.id,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      date: formatDbDate(row.date),
      category: row.category,
      readTime: row.read_time,
      icon: row.icon,
      tags: row.tags ?? [],
      featured: row.featured,
      author: {
        name: row.author_name,
        role: row.author_role,
        avatar: row.author_avatar,
      },
    };
  }

  /**
   * Load the articles index containing all article metadata, categories,
   * and topics. Backed by Supabase instead of a static JSON file, but
   * keeps the same caching semantics (BehaviorSubject + cached emission).
   */
  loadArticlesIndex(): Observable<ArticlesIndex> {
    const cached = this.articlesIndexSubject.getValue();
    if (cached) {
      return of(cached);
    }

    const articles$ = from(
      this.supabase.client
        .from("blog_articles")
        .select(LIST_COLUMNS)
        .order("sort_order", { ascending: true }),
    );
    const categories$ = from(
      this.supabase.client
        .from("blog_categories")
        .select("name,icon")
        .order("sort_order", { ascending: true }),
    );
    const topics$ = from(
      this.supabase.client
        .from("blog_topics")
        .select("icon,name,description,count")
        .order("sort_order", { ascending: true }),
    );

    return forkJoin([articles$, categories$, topics$]).pipe(
      map(([articlesRes, categoriesRes, topicsRes]) => {
        if (articlesRes.error) throw articlesRes.error;
        if (categoriesRes.error) throw categoriesRes.error;
        if (topicsRes.error) throw topicsRes.error;

        const index: ArticlesIndex = {
          articles: (articlesRes.data ?? []).map((row: any) =>
            this.mapArticleRow(row),
          ),
          categories: (categoriesRes.data ?? []) as Category[],
          topics: (topicsRes.data ?? []) as Topic[],
        };
        return index;
      }),
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

    return from(
      this.supabase.client
        .from("blog_articles")
        .select("*")
        .eq("id", id)
        .maybeSingle(),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data ? this.mapArticleRow(data) : null;
      }),
      tap((article) => {
        if (article) {
          this.articleCache.set(id, article);
        }
      }),
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
    return from(
      this.supabase.client
        .from("blog_categories")
        .select("name,icon")
        .order("sort_order", { ascending: true }),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Category[];
      }),
      catchError((error) => {
        console.error("Error loading categories:", error);
        return of([] as Category[]);
      }),
    );
  }

  /**
   * Get all topics
   */
  getTopics(): Observable<Topic[]> {
    return from(
      this.supabase.client
        .from("blog_topics")
        .select("icon,name,description,count")
        .order("sort_order", { ascending: true }),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Topic[];
      }),
      catchError((error) => {
        console.error("Error loading topics:", error);
        return of([] as Topic[]);
      }),
    );
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
