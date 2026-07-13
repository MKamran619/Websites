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

@Injectable({
  providedIn: "root",
})
export class RegionService {
  private currentRegionSubject!: BehaviorSubject<RegionInfo>;
  currentRegion$!: Observable<RegionInfo>;

  readonly regions: RegionInfo[] = [
    { id: "US", name: "United States", flag: "🇺🇸", currencyCode: "USD", locale: "en-US" },
    { id: "UAE", name: "United Arab Emirates", flag: "🇦🇪", currencyCode: "AED", locale: "en-AE" },
    { id: "PAK", name: "Pakistan", flag: "🇵🇰", currencyCode: "PKR", locale: "en-PK" },
  ];

  private readonly timezoneRegionMap: Record<string, Region> = {
    "Asia/Karachi": "PAK",
    "Asia/Dubai": "UAE",
  };

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    // Deterministic SSR default so server-rendered HTML always matches a US
    // visitor (or a bot/crawler) before client-side detection runs.
    this.currentRegionSubject = new BehaviorSubject<RegionInfo>(this.regions[0]);
    this.currentRegion$ = this.currentRegionSubject.asObservable();

    if (isPlatformBrowser(platformId)) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const detectedId = this.timezoneRegionMap[timezone] ?? "US";
      const detected = this.regions.find((r) => r.id === detectedId) ?? this.regions[0];
      this.currentRegionSubject.next(detected);
    }
  }

  getCurrentRegion(): RegionInfo {
    return this.currentRegionSubject.value;
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
}
