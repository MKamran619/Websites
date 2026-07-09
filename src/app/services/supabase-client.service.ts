import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../../environments/environment";
import { LoaderService } from "./loader.service";

@Injectable({
  providedIn: "root",
})
export class SupabaseClientService {
  readonly client: SupabaseClient;

  constructor(loader: LoaderService) {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
        global: {
          // Every Supabase query (ContentService, ArticleService, etc.) goes
          // through this fetch, so this is the one place that needs to know
          // about the global loader instead of every calling service.
          fetch: (input, init) => {
            loader.show();
            return fetch(input, init).finally(() => loader.hide());
          },
        },
      },
    );
  }
}
