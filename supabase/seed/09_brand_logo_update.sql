-- Points the live header and footer at the supplied logo artwork.
--
-- The header and footer logos are NOT in the codebase: header.component.ts and
-- footer.component.ts render site_info.logo_svg_header / logo_svg_footer through
-- [innerHTML] (bypassSecurityTrustHtml), so any HTML works - here an <img> of
-- the original file rather than an inline SVG. Editing the repo alone changes
-- nothing in production; run this against the project database as well
-- (Supabase Dashboard -> SQL Editor).
--
-- /assets/brand/nexaweb-logo-640.png is the supplied artwork, unmodified, at
-- 640px wide (the full-res 1360px original is alongside it as
-- nexaweb-logo.png). Both header and footer reference the same URL, so it is
-- fetched once and cached.
--
-- The .logo-plate wrapper exists because the artwork's background is opaque
-- #FEFDFD. On the 11 dark themes in theme.service.ts (and the dark footer) the
-- logo would otherwise appear as a bare white rectangle; the plate makes that
-- read as a deliberate logo panel. On the 15 light themes it is invisible.
-- Delete the wrapping <span> if you would rather have the raw image.

update site_info set
  logo_svg_header = $svg$<span class="logo-plate" style="display:inline-block;background:#FEFDFD;border-radius:10px;padding:6px 10px;line-height:0"><img src="/assets/brand/nexaweb-logo-640.png" width="290" height="55" alt="NexaWeb Service - Build, Launch, Grow" class="logo-svg responsive-logo" decoding="async" fetchpriority="high" style="display:block;width:100%;height:auto;max-width:290px"></span>$svg$,
  logo_svg_footer = $svg$<span class="logo-plate" style="display:inline-block;background:#FEFDFD;border-radius:10px;padding:6px 10px;line-height:0"><img src="/assets/brand/nexaweb-logo-640.png" width="270" height="52" alt="NexaWeb Service - Build, Launch, Grow" class="logo-svg" decoding="async" loading="lazy" style="display:block;width:100%;height:auto;max-width:270px"></span>$svg$
where id = 1;
