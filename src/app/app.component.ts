import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import {
  RouterOutlet,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { SeoService } from "./services/seo.service";
import { LoaderService } from "./services/loader.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
  ],
  template: `
    <app-loader></app-loader>
    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Professional Portfolio";
  private routerSubscription: Subscription | undefined;
  private isBrowser: boolean;

  constructor(
    private seoService: SeoService,
    private router: Router,
    private loaderService: LoaderService,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Listen for clicks on links and buttons
  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent): void {
    if (!this.isBrowser) return;

    const target = event.target as HTMLElement;

    // Check if clicked element is a link, button, or inside one
    const clickableElement = target.closest(
      "a, button, [routerLink], .btn, .nav-link, .card, .clickable",
    );

    if (clickableElement) {
      // Show loader with random duration
      this.loaderService.showWithRandomDuration();
    }
  }

  ngOnInit() {
    // SEO service is initialized automatically

    // Listen to router events for loading indicator
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Random delay for variety
        const randomDelay = Math.floor(Math.random() * 400) + 200;
        setTimeout(() => {
          this.loaderService.hide();
        }, randomDelay);
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
