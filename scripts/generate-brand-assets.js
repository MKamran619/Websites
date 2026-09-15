// Emits every logo/icon asset the site references, all derived from the single
// vector definition in brand.js. Run via `npm run prebuild`, or `npm run brand`.
//
// Why vector rather than the supplied raster: NexaWeb_Service_Logo_Exact.svg is
// a 1360x260 opaque PNG in an <image> wrapper, and it is CROPPED - the final "e"
// of "Service" and "w" of "Grow" are sliced by the canvas edge (ink runs onto
// column 1359), and the underline rule is missing. Those pixels do not exist, so
// no amount of sizing recovers them. brand.js reconstructs the mark as true
// stroke geometry (verified to overlay the original 1:1) and sets the wordmark
// in Poppins, which restores the clipped characters and the rule.
const { Resvg } = require("@resvg/resvg-js");
const fs = require("fs");
const path = require("path");
const B = require("./brand.js");

const ASSETS = path.join(__dirname, "..", "src", "assets");
const BRAND = path.join(ASSETS, "brand");
const ICONS = path.join(ASSETS, "icons");
for (const d of [BRAND, ICONS]) fs.mkdirSync(d, { recursive: true });

const rel = (f) => path.relative(ASSETS, f).split(path.sep).join("/");
function writeSvg(file, svg) {
  fs.writeFileSync(file, svg + "\n");
  console.log(`  ${rel(file).padEnd(40)} ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
function writePng(file, svg, width) {
  const out = new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
  fs.writeFileSync(file, out);
  console.log(`  ${rel(file).padEnd(40)} ${String(width).padStart(4)}px  ${(out.length / 1024).toFixed(1)} KB`);
}

// The horizontal lockup is not written to disk: it lives inline in
// site_info (see supabase/seed/09_live_db_fixes.sql) and is generated from
// brand.js, so a standalone copy would just be a second source of truth.
// tone "theme" binds the wordmark to var(--text)/var(--text-muted), so the logo
// adapts to whichever of the 26 themes is active instead of needing a baked
// light and dark variant. Transparent by construction - no background element.

// Square slots use the monogram alone on a dark tile: the full 5:1 lockup
// letterboxed into a square leaves the logo a few pixels tall.
const faviconSvg = B.buildMarkSvg({ id: "fav", pad: 58, background: "#0A1628", radius: 76 });
const maskableSvg = B.buildMarkSvg({ id: "msk", pad: 118, background: "#0A1628", radius: 0 });

console.log("\nFavicons");
writeSvg(path.join(ASSETS, "favicon.svg"), faviconSvg);
writePng(path.join(ASSETS, "favicon-16x16.png"), faviconSvg, 16);
writePng(path.join(ASSETS, "favicon-32x32.png"), faviconSvg, 32);
writePng(path.join(ASSETS, "apple-touch-icon.png"), faviconSvg, 180);
// Safari pinned tabs require a single-colour SVG; a raster is invalid there.
writeSvg(path.join(ASSETS, "mask-icon.svg"), B.buildMarkSvg({ id: "mask", pad: 20, paint: "#000000" }));

console.log("\nPWA icons (manifest.json)");
for (const size of [192, 256, 384, 512]) {
  writePng(path.join(ICONS, `icon-${size}x${size}.png`), faviconSvg, size);
}
// Maskable: Android crops to a shape, so the mark stays inside the 80% safe zone.
for (const size of [192, 512]) {
  writePng(path.join(ICONS, `icon-maskable-${size}x${size}.png`), maskableSvg, size);
}
const SHORTCUT_TINT = { contact: "#0A56E2", portfolio: "#1F86F9", services: "#4FC3FF" };
for (const [name, tint] of Object.entries(SHORTCUT_TINT)) {
  const svg = B.buildMarkSvg({ id: `sc${name}`, pad: 58, background: "#0A1628", radius: 76, paint: tint });
  writePng(path.join(ICONS, `shortcut-${name}-192x192.png`), svg, 192);
}

console.log("\nJSON-LD Organization.logo");
writePng(path.join(ASSETS, "nexa-web-service-logo.png"),
  B.buildStackedSvg({ id: "orglogo", tone: "dark", background: "#0A1628" }), 512);

console.log("\nSocial profile + cover art");
// Covers embed the full lockup, so only the PNG is written - the networks want
// raster and an SVG copy would have no consumer.
writePng(path.join(ASSETS, "facebook-profile.png"), B.buildAvatarSvg({ id: "fbAv", side: 360 }), 360);
writePng(path.join(ASSETS, "linkedin-profile.png"), B.buildAvatarSvg({ id: "liAv", side: 1080 }), 1080);
writePng(path.join(ASSETS, "facebook-cover.png"), B.buildBannerSvg({ id: "fbCv", width: 820, height: 312 }), 820);
writePng(path.join(ASSETS, "linkedin-cover.png"), B.buildBannerSvg({ id: "liCv", width: 1584, height: 396 }), 1584);
