import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { routes } from "./app.routes";
import { loadingInterceptor } from "./interceptors/loading.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    // withFetch(): the HttpClient backend needs to run on Node's native
    // fetch during prerendering/SSR (the default XHR-based backend has no
    // XHR implementation on the server).
    provideHttpClient(withInterceptors([loadingInterceptor]), withFetch()),
  ],
};
