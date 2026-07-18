import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

// Previously this duplicated its own inline provider list instead of using
// appConfig, which meant `loadingInterceptor` (registered in app.config.ts)
// was never actually wired up client-side. Bootstrapping from the single
// shared appConfig keeps client and server (main.server.ts) in sync.
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
