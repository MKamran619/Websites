-- ===========================================================================
-- Run this ONCE against the live database (Supabase Dashboard -> SQL Editor).
--
-- The site reads its content from Supabase at build and run time, so these
-- values are NOT fixed by deploying the repo.
--
-- Safe to re-run: five UPDATEs, no truncate / delete / drop, all idempotent.
-- ===========================================================================


-- 1. BRAND LOGO ------------------------------------------------------------
-- header.component.ts / footer.component.ts render these through [innerHTML].
--
-- Inline SVG, not an <img>. Three reasons, all of which bit the raster version:
--
--   * The supplied artwork is CROPPED. Ink runs onto column 1359 of a 1360px
--     canvas, so the final "e" of "Service" and "w" of "Grow" are sliced off and
--     the underline rule is missing. Those pixels do not exist; no sizing
--     recovers them. This is rebuilt from the vector definition in brand.js -
--     the monogram was measured off the original and overlays it 1:1, and the
--     wordmark is set in Poppins (loaded as a subset from index.html).
--
--   * Transparency is structural. There is no background element at all, so the
--     logo always takes whatever is behind it. The raster needed its white matte
--     knocked out and still needed a separate light/dark pair.
--
--   * The wordmark uses var(--text) / var(--text-muted), so it follows all 26
--     themes in theme.service.ts by itself. The raster could not, which is why
--     "Nexa" measured 1.32:1 - invisible - on the dark themes.
--
-- Sizing is self-contained because Angular-scoped CSS never reaches injected
-- markup, and `display` is deliberately NOT set inline: an inline display
-- outranks every stylesheet rule and silently broke this markup twice.
-- About 23% smaller than the previous lockup, as requested.
update site_info set
  logo_svg_header = $svg$<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 300" width="200" height="40" class="logo-svg responsive-logo" style="height:clamp(28px,3.2vw,40px);width:auto;max-width:none" role="img" aria-label="NexaWeb Service - Build, Launch, Grow">
  <defs>
    <linearGradient id="nwsHeaderMark-0" gradientUnits="userSpaceOnUse" x1="24" y1="186" x2="24" y2="65.7"><stop offset="0%" stop-color="#044DE3"/><stop offset="50%" stop-color="#0F6BF3"/><stop offset="100%" stop-color="#2089F9"/></linearGradient>
    <linearGradient id="nwsHeaderMark-1" gradientUnits="userSpaceOnUse" x1="24" y1="65.7" x2="95.2" y2="36.2"><stop offset="0%" stop-color="#2089F9"/><stop offset="55%" stop-color="#35A6FB"/><stop offset="100%" stop-color="#2C98FA"/></linearGradient>
    <linearGradient id="nwsHeaderMark-2" gradientUnits="userSpaceOnUse" x1="95.2" y1="36.2" x2="146" y2="87"><stop offset="0%" stop-color="#2C98FA"/><stop offset="50%" stop-color="#187AF6"/><stop offset="100%" stop-color="#085AE8"/></linearGradient>
    <linearGradient id="nwsHeaderMark-3" gradientUnits="userSpaceOnUse" x1="215" y1="24" x2="215" y2="144.3"><stop offset="0%" stop-color="#35B2FB"/><stop offset="50%" stop-color="#1474F5"/><stop offset="100%" stop-color="#064EE0"/></linearGradient>
    <linearGradient id="nwsHeaderMark-4" gradientUnits="userSpaceOnUse" x1="215" y1="144.3" x2="143.8" y2="173.8"><stop offset="0%" stop-color="#064EE0"/><stop offset="25%" stop-color="#0341D3"/><stop offset="100%" stop-color="#2C97FB"/></linearGradient>
    <linearGradient id="nwsHeaderMark-5" gradientUnits="userSpaceOnUse" x1="143.8" y1="173.8" x2="93" y2="123"><stop offset="0%" stop-color="#2C97FB"/><stop offset="70%" stop-color="#43C2FD"/><stop offset="100%" stop-color="#3FB6FD"/></linearGradient>
    <linearGradient id="nwsHeaderRule" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4FC3FF" stop-opacity="0.9"/>
      <stop offset="55%" stop-color="#1F86F9" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#4FC3FF" stop-opacity="0.12"/>
    </linearGradient>
  </defs>
  
  <g transform="translate(43 26)">
    <path d="M 24 186 L 24 65.7" stroke="url(#nwsHeaderMark-0)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 24 65.7 A 41.7 41.7 0 0 1 95.2 36.2" stroke="url(#nwsHeaderMark-1)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 95.2 36.2 L 146 87" stroke="url(#nwsHeaderMark-2)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 215 24 L 215 144.3" stroke="url(#nwsHeaderMark-3)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 215 144.3 A 41.7 41.7 0 0 1 143.8 173.8" stroke="url(#nwsHeaderMark-4)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 143.8 173.8 L 93 123" stroke="url(#nwsHeaderMark-5)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="336" y="139" font-family="'Poppins','Segoe UI',Arial,sans-serif" font-size="140" font-weight="700" fill="var(--text, #1B2A3D)">Nexa<tspan fill="#3393FD">Web</tspan><tspan dx="38" font-size="100" font-weight="400" fill="var(--text-muted, #7D94AC)">Service</tspan></text>
  <text x="336" y="238" font-family="'Poppins','Segoe UI',Arial,sans-serif" font-size="84" font-weight="500" letter-spacing="8" fill="var(--text-muted, #7D94AC)">Build<tspan dx="26">·</tspan><tspan dx="26">Launch</tspan><tspan dx="26">·</tspan><tspan dx="26" fill="#1B78FC" font-weight="600">Grow</tspan></text>
  <rect x="336" y="268" width="1036" height="5" rx="2.5" fill="url(#nwsHeaderRule)"/>
</svg>$svg$,
  logo_svg_footer = $svg$<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 300" width="190" height="38" class="logo-svg" style="height:clamp(28px,3.2vw,40px);width:auto;max-width:none" role="img" aria-label="NexaWeb Service - Build, Launch, Grow">
  <defs>
    <linearGradient id="nwsFooterMark-0" gradientUnits="userSpaceOnUse" x1="24" y1="186" x2="24" y2="65.7"><stop offset="0%" stop-color="#044DE3"/><stop offset="50%" stop-color="#0F6BF3"/><stop offset="100%" stop-color="#2089F9"/></linearGradient>
    <linearGradient id="nwsFooterMark-1" gradientUnits="userSpaceOnUse" x1="24" y1="65.7" x2="95.2" y2="36.2"><stop offset="0%" stop-color="#2089F9"/><stop offset="55%" stop-color="#35A6FB"/><stop offset="100%" stop-color="#2C98FA"/></linearGradient>
    <linearGradient id="nwsFooterMark-2" gradientUnits="userSpaceOnUse" x1="95.2" y1="36.2" x2="146" y2="87"><stop offset="0%" stop-color="#2C98FA"/><stop offset="50%" stop-color="#187AF6"/><stop offset="100%" stop-color="#085AE8"/></linearGradient>
    <linearGradient id="nwsFooterMark-3" gradientUnits="userSpaceOnUse" x1="215" y1="24" x2="215" y2="144.3"><stop offset="0%" stop-color="#35B2FB"/><stop offset="50%" stop-color="#1474F5"/><stop offset="100%" stop-color="#064EE0"/></linearGradient>
    <linearGradient id="nwsFooterMark-4" gradientUnits="userSpaceOnUse" x1="215" y1="144.3" x2="143.8" y2="173.8"><stop offset="0%" stop-color="#064EE0"/><stop offset="25%" stop-color="#0341D3"/><stop offset="100%" stop-color="#2C97FB"/></linearGradient>
    <linearGradient id="nwsFooterMark-5" gradientUnits="userSpaceOnUse" x1="143.8" y1="173.8" x2="93" y2="123"><stop offset="0%" stop-color="#2C97FB"/><stop offset="70%" stop-color="#43C2FD"/><stop offset="100%" stop-color="#3FB6FD"/></linearGradient>
    <linearGradient id="nwsFooterRule" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4FC3FF" stop-opacity="0.9"/>
      <stop offset="55%" stop-color="#1F86F9" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#4FC3FF" stop-opacity="0.12"/>
    </linearGradient>
  </defs>
  
  <g transform="translate(43 26)">
    <path d="M 24 186 L 24 65.7" stroke="url(#nwsFooterMark-0)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 24 65.7 A 41.7 41.7 0 0 1 95.2 36.2" stroke="url(#nwsFooterMark-1)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 95.2 36.2 L 146 87" stroke="url(#nwsFooterMark-2)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 215 24 L 215 144.3" stroke="url(#nwsFooterMark-3)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 215 144.3 A 41.7 41.7 0 0 1 143.8 173.8" stroke="url(#nwsFooterMark-4)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 143.8 173.8 L 93 123" stroke="url(#nwsFooterMark-5)" fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="336" y="139" font-family="'Poppins','Segoe UI',Arial,sans-serif" font-size="140" font-weight="700" fill="var(--text, #1B2A3D)">Nexa<tspan fill="#3393FD">Web</tspan><tspan dx="38" font-size="100" font-weight="400" fill="var(--text-muted, #7D94AC)">Service</tspan></text>
  <text x="336" y="238" font-family="'Poppins','Segoe UI',Arial,sans-serif" font-size="84" font-weight="500" letter-spacing="8" fill="var(--text-muted, #7D94AC)">Build<tspan dx="26">·</tspan><tspan dx="26">Launch</tspan><tspan dx="26">·</tspan><tspan dx="26" fill="#1B78FC" font-weight="600">Grow</tspan></text>
  <rect x="336" y="268" width="1036" height="5" rx="2.5" fill="url(#nwsFooterRule)"/>
</svg>$svg$
where id = 1;


-- 2. FOOTER LEGAL LINKS ----------------------------------------------------
-- These were stored as '#'. The cookie banner also links to /privacy, which
-- did not exist - a UK PECR / UK GDPR problem, since a consent banner has to
-- link to a reachable privacy notice. /privacy and /terms now exist in the app.
update footer_links set path = '/privacy'     where group_name = 'legal' and label = 'Privacy Policy';
update footer_links set path = '/terms'       where group_name = 'legal' and label = 'Terms of Service';
update footer_links set path = '/sitemap.xml' where group_name = 'legal' and label = 'Sitemap';


-- 3. US-ONLY PAGE TITLES ---------------------------------------------------
-- Three titles ended "| USA", which is what Google shows in the SERP for every
-- market. Harmless in the US, off-putting in the UK, UAE and Pakistan.
update page_seo set title = replace(title, ' | USA', '') where title like '%| USA%';


-- 4. BUSINESS HOURS (REVIEW BEFORE RUNNING) --------------------------------
-- site_info.hours is 'Mon - Fri: 9AM - 6PM EST'. A single US-Eastern window is
-- wrong for three of the four target markets, and the only real phone number on
-- the site is a Pakistani WhatsApp (+92). Left commented out: only the owner
-- knows the real hours. Pick one and uncomment.
--
-- update site_info set hours = 'Mon - Fri, 9:00-18:00 PKT (UTC+5)' where id = 1;
-- update site_info set hours = 'Mon - Fri, 9:00-18:00 GST (UTC+4)' where id = 1;
-- update site_info set hours = 'Mon - Fri, 9:00-18:00 - UK / UAE / PK by arrangement' where id = 1;


-- 5. VERIFY ----------------------------------------------------------------
-- select label, path from footer_links where group_name = 'legal';
-- select slug, title from page_seo where title like '%USA%';   -- expect 0 rows
-- select left(logo_svg_header, 70) from site_info where id = 1;
