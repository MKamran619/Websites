import { Injectable, TransferState, makeStateKey } from "@angular/core";
import { Observable, from, of, shareReplay } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { SupabaseClientService } from "./supabase-client.service";

export interface QueryOptions {
  /** Equality filters, e.g. { context: 'home' } or { page: 'services' } */
  match?: Record<string, string | number | boolean>;
  orderBy?: string;
  ascending?: boolean;
}

/**
 * Generic read-only content accessor for Supabase-backed page/section content.
 * Wraps every query in Angular TransferState so data fetched during SSR is
 * reused on the client instead of being fetched a second time on hydration.
 */
@Injectable({
  providedIn: "root",
})
export class ContentService {
  private cache = new Map<string, Observable<any>>();

  constructor(
    private supabase: SupabaseClientService,
    private transferState: TransferState,
  ) {}

  /** Ordered list query, optionally filtered, e.g. all nav items, testimonials for one context. */
  getAll<T>(table: string, options: QueryOptions = {}): Observable<T[]> {
    const match = options.match ?? {};
    const orderBy = options.orderBy ?? "sort_order";
    const ascending = options.ascending ?? true;
    const key = `all:${table}:${JSON.stringify(match)}:${orderBy}:${ascending}`;

    return this.cached<T[]>(key, () => {
      let query = this.supabase.client.from(table).select("*");
      if (Object.keys(match).length) {
        query = query.match(match);
      }
      return from(query.order(orderBy, { ascending })).pipe(
        map(({ data, error }) => {
          if (error) throw error;
          return (data ?? []) as T[];
        }),
        catchError((error) => {
          console.error(`ContentService.getAll(${table}) failed:`, error);
          return of([] as T[]);
        }),
      );
    });
  }

  /** Single keyed/singleton row query, e.g. site_info, a page's hero, page_seo for one route. */
  getRow<T>(table: string, match: Record<string, string | number>): Observable<T | null> {
    const key = `row:${table}:${JSON.stringify(match)}`;

    return this.cached<T | null>(key, () =>
      from(
        this.supabase.client.from(table).select("*").match(match).maybeSingle(),
      ).pipe(
        map(({ data, error }) => {
          if (error) throw error;
          return (data ?? null) as T | null;
        }),
        catchError((error) => {
          console.error(`ContentService.getRow(${table}) failed:`, error);
          return of(null);
        }),
      ),
    );
  }

  private cached<T>(key: string, factory: () => Observable<T>): Observable<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const stateKey = makeStateKey<T>(key);
    let source: Observable<T>;

    if (this.transferState.hasKey(stateKey)) {
      const transferred = this.transferState.get(stateKey, undefined as unknown as T);
      this.transferState.remove(stateKey);
      source = of(transferred);
    } else {
      source = factory().pipe(
        map((result) => {
          this.transferState.set(stateKey, result);
          return result;
        }),
        shareReplay(1),
      );
    }

    this.cache.set(key, source);
    return source;
  }
}
