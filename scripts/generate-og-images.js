// Generates the social-preview images referenced in <head> meta tags
// (og:image / twitter:image, and page_seo.og_image_url per route) that
// previously did not exist as files at all - requesting any of them fell
// through Netlify's SPA catch-all and returned the app shell mislabeled as
// a JPG. Same technique already used by generate-fb-images.js in this repo:
// render hand-authored SVG to a raster image at build time with
// @resvg/resvg-js (no headless browser needed). Colors are the site's own
// CSS custom-property values (styles.scss :root), inlined as literal hex
// because resvg has no external stylesheet/cascade to resolve var() against.
const { Resvg } = require("@resvg/resvg-js");
const fs = require("fs");
const path = require("path");

const ASSETS_DIR = path.join(__dirname, "..", "src", "assets");

const COLORS = {
  bgDark1: "#030712",
  background: "#0a0f1a",
  primary: "#0066ff",
  primaryLight: "#338aff",
  cyan: "#00d4aa",
  blue: "#00b4d8",
  purple: "#7c3aed",
  text: "#ffffff",
  textMuted: "#94a3b8",
};

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** 1200x630 branded OG/Twitter card: dark background, gradient accent bar, wordmark, page-specific headline. */
function buildOgCardSvg({ eyebrow, title, subtitle }) {
  const titleLines = title;
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.bgDark1}"/>
      <stop offset="100%" stop-color="${COLORS.background}"/>
    </linearGradient>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${COLORS.cyan}"/>
      <stop offset="50%" stop-color="${COLORS.blue}"/>
      <stop offset="100%" stop-color="${COLORS.purple}"/>
    </linearGradient>
    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.primary}"/>
      <stop offset="100%" stop-color="${COLORS.primaryLight}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  <rect width="1200" height="10" fill="url(#accentGradient)"/>

  <!-- Brand mark (matches header/footer logo icon geometry) -->
  <g transform="translate(80, 90)">
    <rect x="0" y="0" width="88" height="88" rx="20" fill="${COLORS.primary}" opacity="0.12"/>
    <path d="M32 24L14 44L32 64" stroke="url(#iconGradient)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M56 24L74 44L56 64" stroke="${COLORS.cyan}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M50 28L38 60" stroke="${COLORS.primary}" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
  </g>
  <text x="188" y="128" font-family="Poppins, 'Segoe UI', sans-serif" font-size="34" font-weight="700" fill="${COLORS.text}">Nexa</text>
  <text x="188" y="128" dx="70" font-family="Poppins, 'Segoe UI', sans-serif" font-size="34" font-weight="700" fill="${COLORS.blue}">Web</text>
  <text x="188" y="128" dx="140" font-family="Poppins, 'Segoe UI', sans-serif" font-size="22" font-weight="300" fill="${COLORS.textMuted}">Service</text>

  <text x="80" y="260" font-family="Inter, 'Segoe UI', sans-serif" font-size="26" font-weight="600" letter-spacing="2" fill="${COLORS.cyan}">${escapeXml(eyebrow.toUpperCase())}</text>
  <text x="80" y="340" font-family="'Space Grotesk', Inter, sans-serif" font-size="64" font-weight="800" fill="${COLORS.text}">${escapeXml(titleLines)}</text>
  <text x="80" y="400" font-family="Inter, 'Segoe UI', sans-serif" font-size="28" font-weight="400" fill="${COLORS.textMuted}">${escapeXml(subtitle)}</text>

  <rect x="80" y="500" width="120" height="3" rx="1.5" fill="url(#iconGradient)" opacity="0.6"/>
  <text x="80" y="560" font-family="Inter, 'Segoe UI', sans-serif" font-size="22" font-weight="500" fill="${COLORS.textMuted}">nexawebservice.com</text>
</svg>`;
}

/** 512x512 square brand mark for favicons / Organization.logo. */
function buildLogoIconSvg() {
  return `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.bgDark1}"/>
      <stop offset="100%" stop-color="${COLORS.background}"/>
    </linearGradient>
    <linearGradient id="icon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.primary}"/>
      <stop offset="50%" stop-color="${COLORS.cyan}"/>
      <stop offset="100%" stop-color="${COLORS.primaryLight}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <g transform="translate(96, 96)">
    <path d="M96 64L48 160L96 256" stroke="url(#icon)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M224 64L272 160L224 256" stroke="${COLORS.cyan}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M200 76L120 244" stroke="${COLORS.primary}" stroke-width="18" stroke-linecap="round" opacity="0.6"/>
  </g>
</svg>`;
}

function svgToJpeg(svg, outFile) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    background: COLORS.background,
  });
  const rendered = resvg.render();
  // resvg-js only encodes PNG; writing that buffer under a .jpg filename is
  // fine in practice (every major browser and share-preview crawler sniffs
  // the real image bytes rather than trusting the extension) and avoids
  // pulling in a second image-encoding dependency for JPEG specifically.
  fs.writeFileSync(outFile, rendered.asPng());
  const kb = (rendered.asPng().length / 1024).toFixed(1);
  console.log(`✅ ${path.basename(outFile)} — ${rendered.width}×${rendered.height}px — ${kb} KB`);
}

function svgToPng(svg, outFile, width) {
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: width } });
  const rendered = resvg.render();
  fs.writeFileSync(outFile, rendered.asPng());
  const kb = (rendered.asPng().length / 1024).toFixed(1);
  console.log(`✅ ${path.basename(outFile)} — ${rendered.width}×${rendered.height}px — ${kb} KB`);
}

const CARDS = [
  {
    file: "og-image.jpg",
    eyebrow: "Software Solutions",
    title: "Nexa Web Service",
    subtitle: "Digital Transformation & Development",
  },
  {
    file: "twitter-image.jpg",
    eyebrow: "Software Solutions",
    title: "Nexa Web Service",
    subtitle: "Digital Transformation & Development",
  },
  {
    file: "services-og-image.jpg",
    eyebrow: "What We Do",
    title: "Services",
    subtitle: "Digital Transformation, Cloud & Custom Development",
  },
  {
    file: "portfolio-og-image.jpg",
    eyebrow: "Our Work",
    title: "Case Studies",
    subtitle: "50+ Projects Delivered Worldwide",
  },
  {
    file: "blog-og-image.jpg",
    eyebrow: "Insights",
    title: "Technical Blog",
    subtitle: "Architecture, Cloud, Security & Frontend",
  },
  {
    file: "contact-og-image.jpg",
    eyebrow: "Get In Touch",
    title: "Let's Talk",
    subtitle: "Schedule a Free 30-Minute Consultation",
  },
  {
    file: "courses-og-image.jpg",
    eyebrow: "Nexa Web Service Academy",
    title: "Learn to Code",
    subtitle: "HTML/CSS to Full-Stack Development",
  },
];

fs.mkdirSync(ASSETS_DIR, { recursive: true });

for (const card of CARDS) {
  svgToJpeg(buildOgCardSvg(card), path.join(ASSETS_DIR, card.file));
}

svgToPng(buildLogoIconSvg(), path.join(ASSETS_DIR, "Nexa Web Service.png"), 512);
// favicon.ico intentionally not (re)created here - see index.html comment;
// the raster PNG above plus the existing favicon.svg cover every browser.
