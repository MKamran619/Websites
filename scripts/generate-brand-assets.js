// Emits every logo/icon asset the site references, all of them cut from the
// supplied artwork (src/assets/brand/nexaweb-logo.svg) rather than redrawn.
// Run via `npm run prebuild`, or `npm run brand` on its own.
//
// Square slots (favicons, PWA icons, social avatars) use the monogram cropped
// out of the original at MARK_BOX - letterboxing the full 5.2:1 banner into a
// square would leave the logo a few pixels tall. Wide slots use the whole
// banner untouched. Because the artwork's background is opaque white, dark
// canvases get the banner on a white plate.
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
  console.log(`  ${rel(file).padEnd(38)} ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
function writePng(file, svg, width) {
  const out = new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
  fs.writeFileSync(file, out);
  console.log(`  ${rel(file).padEnd(38)} ${String(width).padStart(4)}px  ${(out.length / 1024).toFixed(1)} KB`);
}

console.log("Original artwork (verbatim)");
// The PNG carried inside the supplied SVG wrapper - same pixels, no base64 bloat.
const rawPng = B.sourcePng();
fs.writeFileSync(path.join(BRAND, "nexaweb-logo.png"), rawPng);
console.log(`  ${"brand/nexaweb-logo.png".padEnd(38)} ${B.ART.width}x${B.ART.height}  ${(rawPng.length / 1024).toFixed(1)} KB`);

// Display-sized copy of the same artwork for the header/footer. The full-res
// file is 275 KB; the header renders it at 290 CSS px, so 640 wide covers 2x
// displays at a fraction of the bytes. Identical artwork, just not oversized.
const banner640 = new Resvg(B.buildBannerSvg(), { fitTo: { mode: "width", value: 640 } }).render().asPng();
fs.writeFileSync(path.join(BRAND, "nexaweb-logo-640.png"), banner640);
console.log(`  ${"brand/nexaweb-logo-640.png".padEnd(38)} 640x122  ${(banner640.length / 1024).toFixed(1)} KB`);

// Crop the monogram out of the original ONCE, at its native 239px, and reuse it
// for every square slot. Deliberately not pre-upscaled: the source carries only
// 239px of detail, so rendering it larger here adds bytes without adding
// sharpness (a 3x crop measured 336 KB against 26 KB for this one). Large PWA
// icons are therefore soft - that is inherent to the supplied raster artwork.
const markPng = new Resvg(B.buildMarkCropSvg(), { fitTo: { mode: "width", value: B.MARK_BOX.width } }).render().asPng();
fs.writeFileSync(path.join(BRAND, "nexaweb-mark.png"), markPng);
console.log(`  ${"brand/nexaweb-mark.png".padEnd(38)} ${B.MARK_BOX.width}px     ${(markPng.length / 1024).toFixed(1)} KB`);
const markB64 = markPng.toString("base64");

const markSquare = B.buildMarkSquareSvg({ markB64, fill: 0.66 });
const markRounded = B.buildMarkSquareSvg({ markB64, fill: 0.66, radius: 150 });
const markMaskable = B.buildMarkSquareSvg({ markB64, fill: 0.5 });


// No SVG favicon: the source is a 239px raster, so an SVG wrapper round it
// would be ~86 KB and no crisper than these PNGs at 16-48px.
console.log("\nFavicons");
writePng(path.join(ASSETS, "favicon-16x16.png"), markSquare, 16);
writePng(path.join(ASSETS, "favicon-32x32.png"), markSquare, 32);
writePng(path.join(ASSETS, "favicon-48x48.png"), markSquare, 48);
writePng(path.join(ASSETS, "apple-touch-icon.png"), markRounded, 180);

console.log("\nPWA icons (manifest.json)");
for (const size of [192, 256, 384, 512]) {
  writePng(path.join(ICONS, `icon-${size}x${size}.png`), markRounded, size);
}
// Maskable: Android crops to a shape, so the mark sits inside the 80% safe zone.
for (const size of [192, 512]) {
  writePng(path.join(ICONS, `icon-maskable-${size}x${size}.png`), markMaskable, size);
}
for (const name of ["contact", "portfolio", "services"]) {
  writePng(path.join(ICONS, `shortcut-${name}-192x192.png`), markRounded, 192);
}

console.log("\nJSON-LD Organization.logo");
writePng(path.join(ASSETS, "nexa-web-service-logo.png"), markSquare, 512);

console.log("\nSocial profile + cover art");
writePng(path.join(ASSETS, "facebook-profile.png"), markSquare, 360);
writePng(path.join(ASSETS, "linkedin-profile.png"), markSquare, 1080);
// Covers embed the full banner, so only the PNG is written - an SVG copy would
// be another ~370 KB of base64 for no consumer.
writePng(path.join(ASSETS, "facebook-cover.png"), B.buildBannerOnCanvas({ width: 820, height: 312 }), 820);
writePng(path.join(ASSETS, "linkedin-cover.png"), B.buildBannerOnCanvas({ width: 1584, height: 396 }), 1584);

// Safari pinned tabs require a single-colour SVG; a raster is not valid there,
// so this one slot uses a black silhouette of the same monogram.
console.log("\nSafari pinned tab (must be monochrome SVG)");
const MARK_A = "M 24 186 L 24 65.7 A 41.7 41.7 0 0 1 95.2 36.2 L 146 87";
const MARK_B = "M 215 24 L 215 144.3 A 41.7 41.7 0 0 1 143.8 173.8 L 93 123";
writeSvg(path.join(ASSETS, "mask-icon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 279 250" width="279" height="250" role="img" aria-label="NexaWeb Service">
  <path d="${MARK_A}" fill="none" stroke="#000" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${MARK_B}" fill="none" stroke="#000" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`);
