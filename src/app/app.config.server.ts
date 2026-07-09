import { APP_BASE_HREF } from "@angular/common";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { routes } from "./app.routes";
import { loadingInterceptor } from "./interceptors/loading.interceptor";

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    { provide: APP_BASE_HREF, useValue: "/" },
  ],
};
