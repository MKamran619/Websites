import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, Observable } from "rxjs";

export type Region = "US" | "UK" | "UAE" | "PAK";

/**
 * Prices as stored in Supabase (pricing_plans.prices / courses.prices jsonb).
 * Deliberately Partial: rows routinely carry only some regions, and a missing
 * key must behave differently from a zero. Treating them the same is what put
 * "Rs 0" on every course - see priceFor().
 */
export type PriceMap = Partial<Record<Region, number>>;

export interface RegionInfo {
  id: Region;
  name: string;
  flag: string;
  currencyCode: string;
  locale: string;
}

@Injectable({
  providedIn: "root",
})
export class RegionService {
  private currentRegionSubject!: BehaviorSubject<RegionInfo>;
  currentRegion$!: Observable<RegionInfo>;

  /** US is index 0 and is both the SSR default and the pricing fallback. */
  readonly regions: RegionInfo[] = [
    { id: "US", name: "United States", flag: "🇺🇸", currencyCode: "USD", locale: "en-US" },
    { id: "UK", name: "United Kingdom", flag: "🇬🇧", currencyCode: "GBP", locale: "en-GB" },
    { id: "UAE", name: "United Arab Emirates", flag: "🇦🇪", currencyCode: "AED", locale: "en-AE" },
    { id: "PAK", name: "Pakistan", flag: "🇵🇰", currencyCode: "PKR", locale: "en-PK" },
  ];

  private readonly timezoneRegionMap: Record<string, Region> = {
    "Asia/Karachi": "PAK",
    "Asia/Dubai": "UAE",
    "Asia/Muscat": "UAE",
    "Europe/London": "UK",
    "Europe/Belfast": "UK",
    "Europe/Jersey": "UK",
    "Europe/Guernsey": "UK",
    "Europe/Isle_of_Man": "UK",
  };

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    // Deterministic SSR default so server-rendered HTML always matches a US
    // visitor (or a bot/crawler) before client-side detection runs.
    this.currentRegionSubject = new BehaviorSubject<RegionInfo>(this.regions[0]);
    this.currentRegion$ = this.currentRegionSubject.asObservable();

    if (isPlatformBrowser(platformId)) {
      const detected = this.detect();
      if (detected.id !== this.regions[0].id) {
        this.currentRegionSubject.next(detected);
      }
    }
  }

  /**
   * Timezone first, then the browser's locale as a fallback. Timezone alone
   * missed UK visitors entirely (there was no UK region at all) and misses
   * anyone travelling or on a VPN; en-GB / en-AE / ur-PK catch most of the rest.
   */
  private detect(): RegionInfo {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const byTz = this.timezoneRegionMap[tz];
      if (byTz) return this.byId(byTz);
    } catch {
      /* Intl unavailable - fall through to locale */
    }

    const langs: string[] =
      (navigator.languages as string[] | undefined) ??
      (navigator.language ? [navigator.language] : []);
    for (const raw of langs) {
      const tag = raw.toLowerCase();
      if (tag.endsWith("-gb")) return this.byId("UK");
      if (tag.endsWith("-ae")) return this.byId("UAE");
      if (tag.endsWith("-pk") || tag.startsWith("ur")) return this.byId("PAK");
    }
    return this.regions[0];
  }

  private byId(id: Region): RegionInfo {
    return this.regions.find((r) => r.id === id) ?? this.regions[0];
  }

  getCurrentRegion(): RegionInfo {
    return this.currentRegionSubject.value;
  }

  setRegion(id: Region): void {
    this.currentRegionSubject.next(this.byId(id));
  }

  /**
   * Which region's figure will actually be shown for this price map. A region
   * is only used when it has a real, positive amount; otherwise we fall back to
   * the US/USD figure. Without this, UAE and UK (and every course in PAK) are
   * stored as 0 and rendered as "AED 0" / "Rs 0" - i.e. advertised as free.
   */
  regionUsedFor(prices: PriceMap | null | undefined): RegionInfo | null {
    if (!prices) return null;
    const current = this.getCurrentRegion();
    const local = prices[current.id];
    if (typeof local === "number" && local > 0) return current;
    const usd = prices["US"];
    if (typeof usd === "number" && usd > 0) return this.regions[0];
    return null;
  }

  /** Currency code actually displayed for this price map (for the "prices in X" note). */
  currencyUsedFor(prices: PriceMap | null | undefined): string {
    return this.regionUsedFor(prices)?.currencyCode ?? this.getCurrentRegion().currencyCode;
  }

  /** Formatted price, or "Contact us" when no usable figure exists. */
  priceFor(prices: PriceMap | null | undefined): string {
    const region = this.regionUsedFor(prices);
    if (!region) return "Contact us";
    return this.format(prices![region.id]!, region);
  }

  /** Format a bare amount. Kept for callers that already resolved a region. */
  formatPrice(amount: number | null | undefined, region?: Region): string {
    if (amount === null || amount === undefined) return "Contact us";
    return this.format(amount, region ? this.byId(region) : this.getCurrentRegion());
  }

  private format(amount: number, info: RegionInfo): string {
    return new Intl.NumberFormat(info.locale, {
      style: "currency",
      currency: info.currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  }
}
