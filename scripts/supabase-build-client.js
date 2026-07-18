// Shared Supabase client for build-time Node scripts (prerender route
// enumeration, sitemap generation). Reads the SAME public/anon values
// already shipped to every browser in src/environments/environment.prod.ts -
// this is not a secret, so duplicating it here for a Node context is safe.
// Kept as a single small CommonJS module so all three build scripts import
// one source of truth instead of re-parsing the TS environment file.
const { createClient } = require("@supabase/supabase-js");

// supabase-js always constructs an internal RealtimeClient, even though
// these build scripts only ever do plain REST reads (.from().select()) and
// never touch realtime/websocket features. That constructor requires *some*
// WebSocket implementation to exist, which plain Node 20 doesn't provide
// globally. A no-op stub satisfies the constructor without pulling in a
// real WebSocket dependency - nothing here ever calls .connect() on it.
// SupabaseClientService (src/app/services/supabase-client.service.ts) uses
// the same stub, guarded to the server platform, for the same reason during
// SSR/prerendering.
class NoopWebSocket {
  constructor(_url, _protocols) {}
  close() {}
  send() {}
  addEventListener() {}
  removeEventListener() {}
}

const SUPABASE_URL = "https://enijmkzmranhirwajvms.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_SQKWNZH8Hti-b9kGCOcScQ_-_BSQQfm";

function createBuildClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    realtime: { transport: NoopWebSocket },
  });
}

module.exports = { createBuildClient };
