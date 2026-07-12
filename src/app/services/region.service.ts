import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, Observable } from "rxjs";

export type Region = "US" | "UAE" | "PAK";

export interface RegionInfo {
  id: Region;
  name: string;
  flag: string;
  currencyCode: string;
  locale: string;
}

const STORAGE_KEY = "selectedRegion";

@Injectable({
  providedIn: "root",
})
export class RegionService {
  private isBrowser: boolean;
  private currentRegionSubject!: BehaviorSubject<RegionInfo>;
  currentRegion$!: Observable<RegionInfo>;

  readonly regions: RegionInfo[] = [
    { id: "US", name: "United States", flag: "🇺🇸", currencyCode: "USD", locale: "en-US" },
    { id: "UAE", name: "United Arab Emirates", flag: "🇦🇪", currencyCode: "AED", locale: "en-AE" },
    { id: "PAK", name: "Pakistan", flag: "🇵🇰", currencyCode: "PKR", locale: "en-PK" },
  ];

  // Auto-detection is a convenience default only — it deliberately isn't
  // persisted, so a visitor who never explicitly picked a region keeps
  // getting re-detected (e.g. if this mapping is extended later) instead of
  // being stuck on a stale guess.
  private readonly timezoneRegionMap: Record<string, Region> = {
    "Asia/Karachi": "PAK",
    "Asia/Dubai": "UAE",
  };

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Deterministic SSR default so server-rendered HTML always matches a US
    // visitor (or a bot/crawler) before client-side detection/hydration runs.
    this.currentRegionSubject = new BehaviorSubject<RegionInfo>(this.regions[0]);
    this.currentRegion$ = this.currentRegionSubject.asObservable();

    if (this.isBrowser) {
      this.initRegion();
    }
  }

  getRegions(): RegionInfo[] {
    return this.regions;
  }

  getCurrentRegion(): RegionInfo {
    return this.currentRegionSubject.value;
  }

  setRegion(regionId: Region): void {
    const region = this.regions.find((r) => r.id === regionId);
    if (region) {
      this.currentRegionSubject.next(region);
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, regionId);
      }
    }
  }

  formatPrice(amount: number | null | undefined, region?: Region): string {
    if (amount === null || amount === undefined) {
      return "Contact us";
    }
    const info = region
      ? (this.regions.find((r) => r.id === region) ?? this.getCurrentRegion())
      : this.getCurrentRegion();
    return new Intl.NumberFormat(info.locale, {
      style: "currency",
      currency: info.currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  private initRegion(): void {
    const savedRegionId = localStorage.getItem(STORAGE_KEY) as Region | null;
    if (savedRegionId) {
      const region = this.regions.find((r) => r.id === savedRegionId);
      if (region) {
        this.currentRegionSubject.next(region);
        return;
      }
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const detectedId = this.timezoneRegionMap[timezone] ?? "US";
    const detected = this.regions.find((r) => r.id === detectedId) ?? this.regions[0];
    this.currentRegionSubject.next(detected);
  }
}
