// Generates the three sitemap files robots.txt has always declared, only
// two of which ever actually existed (sitemap-pages.xml and
// sitemap-blog.xml previously 404'd through to the SPA shell - see
// TECHNICAL_SEO_IMPLEMENTATION_REPORT.md). Output goes to public/, which
// angular.json's build.options.assets already copies verbatim into the
// build output root, so no further wiring is needed:
//   sitemap.xml       - sitemap INDEX referencing the two below
//   sitemap-pages.xml - every static, non-blog route
//   sitemap-blog.xml  - every individual blog article URL (real routes now,
//                       see BlogComponent's /blog/:slug route)
const fs = require("fs");
const path = require("path");
const { createBuildClient } = require("./supabase-build-client");

const BASE_URL = "https://nexawebservice.com";
const PUBLIC_DIR = path.join(__dirname, "..", "public");

const STATIC_PAGES = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/services", changefreq: "monthly", priority: "0.9" },
  { loc: "/portfolio", changefreq: "weekly", priority: "0.85" },
  { loc: "/about", changefreq: "monthly", priority: "0.8" },
  { loc: "/contact", changefreq: "monthly", priority: "0.9" },
  { loc: "/blog", changefreq: "weekly", priority: "0.85" },
  { loc: "/courses", changefreq: "monthly", priority: "0.8" },
  { loc: "/pricing", changefreq: "monthly", priority: "0.85" },
  { loc: "/faq", changefreq: "monthly", priority: "0.7" },
];

function today() {
  // Deterministic (no Date.now() ambiguity concerns here - this runs once,
  // synchronously, at build time on the CI machine's real clock).
  return new Date().toISOString().slice(0, 10);
}

function xmlEscape(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildUrlsetXml(entries) {
  const lastmod = today();
  const body = entries
    .map(
      (entry) => `  <url>
    <loc>${xmlEscape(BASE_URL + entry.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function buildSitemapIndexXml(sitemapFiles) {
  const lastmod = today();
  const body = sitemapFiles
    .map(
      (file) => `  <sitemap>
    <loc>${xmlEscape(BASE_URL + "/" + file)}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

async function main() {
  const supabase = createBuildClient();
  const { data, error } = await supabase
    .from("blog_articles")
    .select("id")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("generate-sitemaps: failed to load blog_articles, sitemap-blog.xml will be empty:", error.message);
  }

  const blogEntries = (data || []).map((row) => ({
    loc: `/blog/${row.id}`,
    changefreq: "monthly",
    priority: "0.6",
  }));

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-pages.xml"), buildUrlsetXml(STATIC_PAGES), "utf-8");
  console.log(`✅ sitemap-pages.xml — ${STATIC_PAGES.length} pages`);

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-blog.xml"), buildUrlsetXml(blogEntries), "utf-8");
  console.log(`✅ sitemap-blog.xml — ${blogEntries.length} articles`);

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "sitemap.xml"),
    buildSitemapIndexXml(["sitemap-pages.xml", "sitemap-blog.xml"]),
    "utf-8",
  );
  console.log("✅ sitemap.xml — sitemap index referencing the two above");
}

main().catch((err) => {
  console.error("generate-sitemaps failed:", err);
  process.exit(1);
});
