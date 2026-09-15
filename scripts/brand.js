// Single source of truth for the NexaWeb Service brand mark.
//
// The supplied "NexaWeb_Service_Logo_Exact.svg" was not vector art - it was a
// 1360x260 PNG wrapped in an <image> tag (and cropped: the trailing "e" of
// "Service" and "w" of "Grow" were clipped off at the right edge). Everything
// below is a true-vector reconstruction measured off that raster.
//
// The monogram is two congruent strokes related by an exact 180-degree
// rotation about the centre of the box. Each stroke is: a straight stem, a
// 135-degree arc elbow, then a 45-degree diagonal. Measured from the source:
//   stroke width 48, stem centrelines at x=24 / x=215, arc radius 41.7,
//   arch apex at x=65.7 (pixel-measured 65.5 - the model is exact).
// Because it is stroke geometry rather than filled outlines it stays crisp at
// any size and needs no font, which is what makes the favicon/PWA/OG raster
// pipeline work (no webfont is installed on the build machine).

const MARK = {
  width: 239,
  height: 210,
  strokeWidth: 48,
  // Each ribbon is stem -> 135-degree arc elbow -> 45-degree diagonal. They are
  // kept as three separate segments (rather than one path) so each can carry the
  // colour actually measured along that part of the supplied artwork; the
  // artwork's shading is hand-painted and runs along the ribbon, which a single
  // linear gradient cannot reproduce. Segment ends share a colour and a round
  // cap at the same point, so the joins are seamless.
  // Colours below are medians sampled off the source raster at 5 points per
  // segment (see the trace in the commit that introduced this file).
  segments: [
    { d: "M 24 186 L 24 65.7", grad: [[24, 186], [24, 65.7]], stops: [[0, "#044DE3"], [50, "#0F6BF3"], [100, "#2089F9"]] },
    { d: "M 24 65.7 A 41.7 41.7 0 0 1 95.2 36.2", grad: [[24, 65.7], [95.2, 36.2]], stops: [[0, "#2089F9"], [55, "#35A6FB"], [100, "#2C98FA"]] },
    { d: "M 95.2 36.2 L 146 87", grad: [[95.2, 36.2], [146, 87]], stops: [[0, "#2C98FA"], [50, "#187AF6"], [100, "#085AE8"]] },
    { d: "M 215 24 L 215 144.3", grad: [[215, 24], [215, 144.3]], stops: [[0, "#35B2FB"], [50, "#1474F5"], [100, "#064EE0"]] },
    { d: "M 215 144.3 A 41.7 41.7 0 0 1 143.8 173.8", grad: [[215, 144.3], [143.8, 173.8]], stops: [[0, "#064EE0"], [25, "#0341D3"], [100, "#2C97FB"]] },
    { d: "M 143.8 173.8 L 93 123", grad: [[143.8, 173.8], [93, 123]], stops: [[0, "#2C97FB"], [70, "#43C2FD"], [100, "#3FB6FD"]] },
  ],
  // Flat two-path form, for monochrome uses (Safari mask-icon, tinted shortcuts).
  pathA: "M 24 186 L 24 65.7 A 41.7 41.7 0 0 1 95.2 36.2 L 146 87",
  pathB: "M 215 24 L 215 144.3 A 41.7 41.7 0 0 1 143.8 173.8 L 93 123",
};

// Colours sampled directly from the supplied artwork.
const COLORS = {
  markLight: "#4FC3FF",
  markMid: "#1F86F9",
  markDeep: "#0A56E2",
  navy: "#1B2A3D",   // "Nexa"
  webBlue: "#3393FD", // "Web"
  muted: "#7D94AC",  // "Service" + tagline
  growBlue: "#1B78FC", // "Grow"
  white: "#FFFFFF",
};

// The artwork's typeface is a geometric sans with a single-storey "a"
// (Poppins). The codebase already names Poppins everywhere; see index.html for
// the subset webfont that finally makes that true in the browser. resvg falls
// back to a system sans at build time, which only affects raster OG cards.
const FONT_DISPLAY = "'Poppins','Segoe UI',Arial,sans-serif";

/** Gradient defs for the mark. `id` must be unique per inlined document. */
function markDefs(id) {
  return MARK.segments.map((seg, n) => {
    const [[x1, y1], [x2, y2]] = seg.grad;
    const stops = seg.stops
      .map(([off, col]) => `<stop offset="${off}%" stop-color="${col}"/>`)
      .join("");
    return `<linearGradient id="${id}-${n}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops}</linearGradient>`;
  }).join("\n    ");
}

/**
 * The two monogram strokes. `paint` is any SVG paint value (a url(#id)
 * gradient reference, a literal colour, or currentColor for monochrome use).
 */
function markPaths(paint) {
  const common = `fill="none" stroke-width="${MARK.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"`;
  // A solid override (mask-icon, tinted shortcut icons) collapses to two paths.
  const solid = paint && !/^url\(#(.*)\)$/.test(paint);
  if (solid) {
    return `<path d="${MARK.pathA}" stroke="${paint}" ${common}/>
    <path d="${MARK.pathB}" stroke="${paint}" ${common}/>`;
  }
  const id = (paint || "").replace(/^url\(#/, "").replace(/\)$/, "");
  return MARK.segments
    .map((seg, n) => `<path d="${seg.d}" stroke="url(#${id}-${n})" ${common}/>`)
    .join("\n    ");
}

/** Standalone monogram, padded into a square. `pad` is in mark units. */
function buildMarkSvg({ id = "nwsMark", pad = 26, background = null, radius = 0, paint = null } = {}) {
  const w = MARK.width + pad * 2;
  const h = MARK.height + pad * 2;
  const side = Math.max(w, h);
  const ox = (side - MARK.width) / 2;
  const oy = (side - MARK.height) / 2;
  const bg = background
    ? `<rect width="${side}" height="${side}" rx="${radius}" fill="${background}"/>`
    : "";
  // A solid paint renders as two flat paths, so the gradient defs are dead weight.
  const defs = paint ? "" : `
  <defs>${markDefs(id)}</defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" width="${side}" height="${side}" role="img" aria-label="NexaWeb Service">${defs}
  ${bg}
  <g transform="translate(${ox} ${oy})">
    ${markPaths(paint || `url(#${id})`)}
  </g>
</svg>`;
}

/**
 * Resolve wordmark colours for a surface.
 *  light - dark text, for white/light backgrounds
 *  dark  - white text, for dark backgrounds (the site footer, OG cards)
 *  theme - CSS custom properties, so inlined markup follows the live theme
 *          across all 26 themes in theme.service.ts (with literal fallbacks
 *          for SSR and for any context that has no cascade, e.g. resvg).
 */
function tones(tone) {
  if (tone === "theme") {
    return {
      primary: `var(--text, ${COLORS.navy})`,
      accent: COLORS.webBlue,
      muted: `var(--text-muted, ${COLORS.muted})`,
      grow: COLORS.growBlue,
    };
  }
  if (tone === "dark") {
    return { primary: COLORS.white, accent: COLORS.webBlue, muted: "#A8BDD4", grow: "#5AA6FF" };
  }
  return { primary: COLORS.navy, accent: COLORS.webBlue, muted: COLORS.muted, grow: COLORS.growBlue };
}

/**
 * Full horizontal lockup: monogram + "NexaWeb Service" + rule + tagline.
 * Geometry mirrors the supplied artwork (mark at x=43, text from x=336,
 * wordmark baseline y=139, tagline baseline y=238), with the clipped
 * characters restored and the underline rule the crop cut off put back.
 */
function buildHorizontalSvg({ id = "nwsLogo", tone = "light", tagline = true, background = null, attrs = "" } = {}) {
  const c = tones(tone);
  const h = tagline ? 300 : 180;
  const w = 1500;
  const bg = background ? `<rect width="${w}" height="${h}" fill="${background}"/>` : "";
  const taglineBlock = tagline
    ? `
  <text x="336" y="238" font-family="${FONT_DISPLAY}" font-size="84" font-weight="500" letter-spacing="8" fill="${c.muted}">Build<tspan dx="26">·</tspan><tspan dx="26">Launch</tspan><tspan dx="26">·</tspan><tspan dx="26" fill="${c.grow}" font-weight="600">Grow</tspan></text>
  <rect x="336" y="268" width="1036" height="5" rx="2.5" fill="url(#${id}Rule)"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"${attrs ? " " + attrs : ""} role="img" aria-label="NexaWeb Service - Build, Launch, Grow">
  <defs>
    ${markDefs(id + "Mark")}
    <linearGradient id="${id}Rule" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${COLORS.markLight}" stop-opacity="0.9"/>
      <stop offset="55%" stop-color="${COLORS.markMid}" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="${COLORS.markLight}" stop-opacity="0.12"/>
    </linearGradient>
  </defs>
  ${bg}
  <g transform="translate(43 26)">
    ${markPaths(`url(#${id}Mark)`)}
  </g>
  <text x="336" y="139" font-family="${FONT_DISPLAY}" font-size="140" font-weight="700" fill="${c.primary}">Nexa<tspan fill="${c.accent}">Web</tspan><tspan dx="38" font-size="100" font-weight="400" fill="${c.muted}">Service</tspan></text>${taglineBlock}
</svg>`;
}

/** Square stacked lockup - social avatars, app icons at large sizes. */
function buildStackedSvg({ id = "nwsStack", tone = "dark", background = null, side = 512 } = {}) {
  const c = tones(tone);
  const bg = background ? `<rect width="1000" height="1000" fill="${background}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="${side}" height="${side}" role="img" aria-label="NexaWeb Service">
  <defs>${markDefs(id + "Mark")}</defs>
  ${bg}
  <g transform="translate(${(1000 - MARK.width * 1.62) / 2} 168) scale(1.62)">
    ${markPaths(`url(#${id}Mark)`)}
  </g>
  <text x="500" y="740" text-anchor="middle" font-family="${FONT_DISPLAY}" font-size="150" font-weight="700" fill="${c.primary}">Nexa<tspan fill="${c.accent}">Web</tspan></text>
  <text x="500" y="838" text-anchor="middle" font-family="${FONT_DISPLAY}" font-size="66" font-weight="500" letter-spacing="17" fill="${c.muted}">SERVICES</text>
  <rect x="290" y="884" width="420" height="7" rx="3.5" fill="${COLORS.markMid}" opacity="0.85"/>
</svg>`;
}


/** Width/height of the horizontal lockup, for callers that place it. */
const HORIZONTAL = { width: 1500, height: 300, heightNoTagline: 180 };

/** The horizontal lockup as an embeddable <g>, for composing into banners. */
function horizontalGroup({ id, tone = "dark", tagline = true, x = 0, y = 0, scale = 1 }) {
  const inner = buildHorizontalSvg({ id, tone, tagline })
    .replace(/^<svg[^>]*>\s*/, "")
    .replace(/\s*<\/svg>$/, "");
  return `<g transform="translate(${x} ${y}) scale(${scale})">${inner}</g>`;
}

/**
 * Square social avatar (Facebook / LinkedIn profile picture). Full-bleed dark
 * tile - these are displayed cropped to a circle by both networks, so the
 * stacked lockup is kept well inside the safe circle.
 */
function buildAvatarSvg({ id = "nwsAv", side = 1080, background = "#0A1628" } = {}) {
  return buildStackedSvg({ id, tone: "dark", background, side });
}

/**
 * Wide social banner (Facebook cover 820x312, LinkedIn cover 1584x396).
 * The lockup is scaled to `fill` of the banner width and centred; both
 * networks crop banners aggressively on mobile, so nothing sits near an edge.
 */
function buildBannerSvg({ id = "nwsBn", width = 1584, height = 396, fill = 0.62, url = "nexawebservice.com" } = {}) {
  const scale = (width * fill) / HORIZONTAL.width;
  const lw = HORIZONTAL.width * scale;
  const lh = HORIZONTAL.height * scale;
  const x = (width - lw) / 2;
  const y = (height - lh) / 2 - height * 0.045;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="NexaWeb Service">
  <defs>
    <linearGradient id="${id}Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="100%" stop-color="#0A1628"/>
    </linearGradient>
    <linearGradient id="${id}Bar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${COLORS.markDeep}"/>
      <stop offset="50%" stop-color="${COLORS.markMid}"/>
      <stop offset="100%" stop-color="${COLORS.markLight}"/>
    </linearGradient>
    <radialGradient id="${id}Glow" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="${COLORS.markMid}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${COLORS.markMid}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${id}Bg)"/>
  <rect width="${width}" height="${height}" fill="url(#${id}Glow)"/>
  <rect width="${width}" height="${Math.max(4, Math.round(height * 0.022))}" fill="url(#${id}Bar)"/>
  ${horizontalGroup({ id: id + "L", tone: "dark", x, y, scale })}
  <text x="${width / 2}" y="${height - Math.round(height * 0.085)}" text-anchor="middle" font-family="${FONT_DISPLAY}" font-size="${Math.round(height * 0.058)}" font-weight="500" letter-spacing="${(height * 0.006).toFixed(1)}" fill="#8FA9C4">${url}</text>
</svg>`;
}

module.exports = { MARK, COLORS, FONT_DISPLAY, HORIZONTAL, markDefs, markPaths, buildMarkSvg, buildHorizontalSvg, buildStackedSvg, horizontalGroup, buildAvatarSvg, buildBannerSvg, tones };
