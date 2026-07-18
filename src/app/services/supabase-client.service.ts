import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../../environments/environment";
import { LoaderService } from "./loader.service";

/**
 * supabase-js always constructs an internal RealtimeClient, even for apps
 * (like this one) that only ever do plain REST reads via .from().select()
 * and never touch realtime/websocket features. That constructor requires
 * *some* WebSocket implementation to exist. The browser provides one
 * natively; Node (used during SSR/prerendering, see main.server.ts) does
 * not, and throws at construction time without one. This no-op stub
 * satisfies the constructor - nothing in this app ever calls .connect() on
 * it, so it never needs to actually do anything.
 */
class NoopServerWebSocket {
  constructor(_url: string, _protocols?: string | string[]) {}
  close(): void {}
  send(): void {}
  addEventListener(): void {}
  removeEventListener(): void {}
}

@Injectable({
  providedIn: "root",
})
export class SupabaseClientService {
  readonly client: SupabaseClient;

  constructor(
    loader: LoaderService,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
        ...(isPlatformServer(platformId)
          ? { realtime: { transport: NoopServerWebSocket as any } }
          : {}),
        global: {
          // Every Supabase query (ContentService, ArticleService, etc.) goes
          // through this fetch, so this is the one place that needs to know
          // about the global loader instead of every calling service.
          //
          // SSR-stability handling (waiting for these fetches before
          // prerendering serializes a page) lives at the RxJS layer instead
          // of here - see src/app/utils/with-pending-task.ts and its usage
          // in ContentService/ArticleService - because it has to bracket
          // the full chain (response parsing + RxJS emission to the
          // consuming component), not just this raw fetch call.
          fetch: (input, init) => {
            loader.show();
            return fetch(input, init).finally(() => loader.hide());
          },
        },
      },
    );
  }
}
