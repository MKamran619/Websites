// Brand artwork = the supplied file, used verbatim.
//
// src/assets/brand/nexaweb-logo.svg is a byte-for-byte copy of
// NexaWeb_Service_Logo_Exact.svg. That file is not vector art: it is a single
// 1360x260 opaque PNG wrapped in an <image> tag, base64-inlined (375 KB).
// nexaweb-logo.png below is that exact same PNG extracted from the wrapper -
// identical pixels, ~25% smaller because it skips the base64 inflation - and is
// what everything actually references.
//
// Things to know about the source artwork, measured from its pixels:
//   * background is FULLY OPAQUE #FEFDFD, so it shows as a white block on any
//     dark surface (the footer, the OG cards, dark themes)
//   * it is CROPPED at the right edge - the final "e" of "Service" and "w" of
//     "Grow" are cut off, and the underline rule is missing
//   * the monogram occupies x 43..281, y 26..235 (239x210) - MARK_BOX below.
//     Square slots (favicons, PWA icons) crop to that rather than letterboxing
//     a 5.2:1 banner into a square, but the pixels are still the original's.
const fs = require("fs");
const path = require("path");

const ASSETS = path.join(__dirname, "..", "src", "assets");
const SOURCE_SVG = path.join(ASSETS, "brand", "nexaweb-logo.svg");

const ART = { width: 1360, height: 260, background: "#FEFDFD" };
const MARK_BOX = { x: 43, y: 26, width: 239, height: 210 };

/** The PNG bytes carried inside the supplied SVG wrapper. */
function sourcePng() {
  const svg = fs.readFileSync(SOURCE_SVG, "utf8");
  const m = svg.match(/base64,\s*([A-Za-z0-9+/=]+)/);
  if (!m) throw new Error("no base64 PNG found inside " + SOURCE_SVG);
  return Buffer.from(m[1], "base64");
}

let _b64 = null;
const sourceB64 = () => (_b64 = _b64 || sourcePng().toString("base64"));

/** <image> element placing the original artwork at the given box. */
function artImage({ x = 0, y = 0, width = ART.width, height = ART.height } = {}) {
  return `<image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="data:image/png;base64,${sourceB64()}"/>`;
}

/** The full banner, unmodified, as a standalone SVG. */
function buildBannerSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${ART.width}" height="${ART.height}" viewBox="0 0 ${ART.width} ${ART.height}" role="img" aria-label="NexaWeb Service">
  ${artImage()}
</svg>`;
}

/**
 * The monogram, centred on a square. `markB64` is the already-cropped monogram
 * PNG (see generate-brand-assets.js) - embedding just that, rather than the
 * whole banner behind a clip path, keeps these files ~10 KB instead of ~370 KB.
 * `fill` is the fraction of the square the mark spans.
 */
function buildMarkSquareSvg({ markB64, fill = 0.66, background = ART.background, radius = 0 } = {}) {
  const S = 1000;
  const w = S * fill;
  const h = (w * MARK_BOX.height) / MARK_BOX.width;
  const x = (S - w) / 2;
  const y = (S - h) / 2;
  const bg = background ? `<rect width="${S}" height="${S}" rx="${radius}" fill="${background}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" role="img" aria-label="NexaWeb Service">
  ${bg}
  <image x="${x}" y="${y}" width="${w}" height="${h}" xlink:href="data:image/png;base64,${markB64}"/>
</svg>`;
}

/** SVG that crops the monogram out of the original, for rasterising once. */
function buildMarkCropSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${MARK_BOX.width}" height="${MARK_BOX.height}" viewBox="${MARK_BOX.x} ${MARK_BOX.y} ${MARK_BOX.width} ${MARK_BOX.height}">
  <rect x="${MARK_BOX.x}" y="${MARK_BOX.y}" width="${MARK_BOX.width}" height="${MARK_BOX.height}" fill="${ART.background}"/>
  ${artImage()}
</svg>`;
}

/**
 * The banner on a wide canvas. The artwork's own background is opaque white, so
 * on a dark canvas it sits on a white plate with padding - otherwise it reads as
 * a rendering fault rather than a logo.
 */
function buildBannerOnCanvas({ width, height, dark = true, fill = 0.74, url = "nexawebservice.com" } = {}) {
  const scale = (width * fill) / ART.width;
  const w = ART.width * scale;
  const h = ART.height * scale;
  const x = (width - w) / 2;
  const y = (height - h) / 2 - height * 0.05;
  const pad = Math.round(h * 0.16);
  const plate = dark
    ? `<rect x="${x - pad}" y="${y - pad}" width="${w + pad * 2}" height="${h + pad * 2}" rx="${Math.round(h * 0.18)}" fill="${ART.background}"/>`
    : "";
  const bg = `<rect width="${width}" height="${height}" fill="${dark ? "#0A1628" : ART.background}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="NexaWeb Service">
  ${bg}
  ${plate}
  ${artImage({ x, y, width: w, height: h })}
  <text x="${width / 2}" y="${height - Math.round(height * 0.07)}" text-anchor="middle" font-family="'Poppins','Segoe UI',Arial,sans-serif" font-size="${Math.round(height * 0.055)}" font-weight="500" fill="${dark ? "#8FA9C4" : "#7D94AC"}">${url}</text>
</svg>`;
}

module.exports = { ART, MARK_BOX, SOURCE_SVG, sourcePng, sourceB64, artImage, buildBannerSvg, buildMarkCropSvg, buildMarkSquareSvg, buildBannerOnCanvas };
