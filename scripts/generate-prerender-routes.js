// Writes prerender-routes.txt, consumed by angular.json's
// build.options.prerender.routesFile. Angular's application builder can only
// discover *unparameterized* routes on its own (`discoverRoutes`); routes
// with a param - here, every /blog/:slug article - have to be listed
// explicitly, one per line, which is exactly what this generates from the
// live blog_articles table so every article gets its own prerendered,
// crawlable HTML file instead of living only behind client-side state.
const fs = require("fs");
const path = require("path");
const { createBuildClient } = require("./supabase-build-client");

const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/blog",
  "/contact",
  "/courses",
  "/pricing",
  "/faq",
];

async function main() {
  const supabase = createBuildClient();
  const { data, error } = await supabase.from("blog_articles").select("id").order("sort_order", { ascending: true });

  if (error) {
    console.error("generate-prerender-routes: failed to load blog_articles, prerendering static routes only:", error.message);
  }

  const blogRoutes = (data || []).map((row) => `/blog/${row.id}`);
  const routes = [...STATIC_ROUTES, ...blogRoutes];

  const outFile = path.join(__dirname, "..", "prerender-routes.txt");
  fs.writeFileSync(outFile, routes.join("\n") + "\n", "utf-8");
  console.log(`✅ prerender-routes.txt — ${routes.length} routes (${STATIC_ROUTES.length} static + ${blogRoutes.length} blog articles)`);
}

main().catch((err) => {
  console.error("generate-prerender-routes failed:", err);
  process.exit(1);
});
