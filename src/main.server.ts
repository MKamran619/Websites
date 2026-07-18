import { bootstrapApplication, BootstrapContext } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { config } from "./app/app.config.server";

// Standard Angular standalone-app server bootstrap. The previous version of
// this file used the pre-standalone `platformServer().bootstrapModule(...)`
// API against AppComponent directly - bootstrapModule expects an NgModule,
// not a standalone component, so it would have thrown at runtime. It also
// only ever `console.log`'d the rendered HTML rather than returning it, and
// imported AppComponent from the wrong relative path ("./app.component"
// instead of "./app/app.component"). None of that mattered in practice
// because this file was never actually invoked by the deployed build (see
// TECHNICAL_SEO_IMPLEMENTATION_REPORT.md) - this default-exported bootstrap
// function is what the Angular CLI's application builder now calls directly
// during prerendering/SSR.
//
// The `context` parameter matters: it carries the per-request platform
// (each concurrent prerender/SSR render gets its own, created by the
// builder/CommonEngine). Without forwarding it into bootstrapApplication,
// every render fell back to a bare/default platform with no request-scoped
// DOCUMENT wired up, which surfaced as "ReferenceError: document is not
// defined" while resolving DOCUMENT-dependent providers (Meta/Title/
// SeoService, Angular's own internal image-performance-warning check, etc.)
// for every single route.
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, config, context);

export default bootstrap;
