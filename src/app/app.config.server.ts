import { APP_BASE_HREF } from "@angular/common";
import { ApplicationConfig, mergeApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { appConfig } from "./app.config";

// Merges the shared client config (router, animations, HttpClient +
// interceptor) with server-only providers, instead of duplicating the whole
// provider list a second time. The previous version re-declared
// provideAnimations/provideRouter/provideHttpClient here, completely
// disconnected from app.config.ts - a second set of providers that could
// silently drift out of sync with the client bootstrap.
//
// provideNoopAnimations() overrides appConfig's provideAnimations(): the
// real animations engine reaches for `document`/browser globals as soon as
// it's injected, which crashed every single prerendered route with
// "ReferenceError: document is not defined" (this app's animations are all
// driven by GSAP directly in components anyway, gated behind
// isPlatformBrowser checks - Angular's own animations API isn't used for
// anything, so the server never needs the real engine).
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideNoopAnimations(),
    { provide: APP_BASE_HREF, useValue: "/" },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
