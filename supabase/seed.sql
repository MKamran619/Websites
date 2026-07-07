-- Nexa Web Service — full content seed.
-- Run this ONCE in the Supabase SQL Editor AFTER schema.sql.
-- Safe to re-run: every table is truncated or scoped-deleted before its inserts.

-- ============================================================================
-- 01_nav_footer.sql
-- ============================================================================
-- Seed: site-wide nav, footer, and site_info
-- Transcribed verbatim from header.component.ts / footer.component.ts

truncate table nav_items restart identity cascade;
insert into nav_items (label, path, icon_svg, exact_match, sort_order) values
('Home', '/', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>$svg$, true, 1),
('Services', '/services', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>$svg$, false, 2),
('Case Studies', '/portfolio', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>$svg$, false, 3),
('Insights', '/blog', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>$svg$, false, 4),
('Academy', '/courses', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>$svg$, false, 5),
('Pricing', '/pricing', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>$svg$, false, 6),
('FAQ', '/faq', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>$svg$, false, 7),
('About Us', '/about', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>$svg$, false, 8);

truncate table footer_links restart identity cascade;
insert into footer_links (group_name, label, path, sort_order) values
('quick_links', 'Home', '/', 1),
('quick_links', 'About', '/about', 2),
('quick_links', 'Services', '/services', 3),
('quick_links', 'Portfolio', '/portfolio', 4),
('quick_links', 'Blog', '/blog', 5),
('quick_links', 'Courses', '/courses', 6),
('services', 'Digital Transformation', '/services', 1),
('services', 'Custom Development', '/services', 2),
('services', 'Cloud Migration', '/services', 3),
('services', 'Performance Optimization', '/services', 4),
('services', 'Technical Consulting', '/services', 5),
('legal', 'Privacy Policy', '#', 1),
('legal', 'Terms of Service', '#', 2),
('legal', 'Sitemap', '#', 3);

truncate table social_links restart identity cascade;
insert into social_links (context, platform, url, icon_svg, sort_order) values
('footer', 'LinkedIn', 'https://www.linkedin.com/in/kamran619/', $svg$<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>$svg$, 1),
('footer', 'Twitter', 'https://twitter.com/kamransawan', $svg$<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>$svg$, 2),
('footer', 'Email', 'mailto:contact@nexawebservice.com', $svg$<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>$svg$, 3);

insert into site_info (id, brand_name, brand_description, logo_svg_header, logo_svg_footer, contact_email, hours, location, whatsapp_url, linkedin_url, twitter_url, copyright_start_year)
values (
  1,
  'Nexa Web Service',
  $txt$Transforming businesses with cutting-edge software solutions and digital consulting services. Your trusted technology partner.$txt$,
  $svg$<svg width="290" height="58" viewBox="0 0 290 58" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg responsive-logo">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:var(--primary)" />
      <stop offset="100%" style="stop-color:var(--primary-light, var(--primary))" />
    </linearGradient>
    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:var(--primary)" />
      <stop offset="50%" style="stop-color:var(--secondary, var(--primary))" />
      <stop offset="100%" style="stop-color:var(--primary-light, var(--primary))" />
    </linearGradient>
    <linearGradient id="iconBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:var(--primary);stop-opacity:0.12" />
      <stop offset="100%" style="stop-color:var(--secondary, var(--primary));stop-opacity:0.06" />
    </linearGradient>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="var(--primary)" flood-opacity="0.25" />
    </filter>
  </defs>
  <g class="logo-icon" filter="url(#softShadow)">
    <rect x="4" y="7" width="44" height="44" rx="12" fill="url(#iconBg)" />
    <rect x="8" y="11" width="36" height="36" rx="9" fill="var(--primary)" opacity="0.08" />
    <path d="M22 19L12 29L22 39" stroke="url(#iconGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M30 19L40 29L30 39" stroke="var(--secondary, var(--primary))" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M28 21L24 37" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" opacity="0.5" />
    <circle cx="44" cy="11" r="3" fill="var(--secondary, var(--accent))" opacity="0.9" />
  </g>
  <g filter="url(#softGlow)">
    <text x="58" y="34" font-family="'Poppins', 'Segoe UI', sans-serif" font-size="20"><tspan font-weight="700" fill="#1a202c">Nexa</tspan><tspan font-weight="700" fill="#4f8ef7">Web</tspan></text>
    <text x="162" y="34" font-family="'Poppins', 'Segoe UI', sans-serif" font-size="13" font-weight="300" fill="#94a3b8">Service</text>
  </g>
  <g transform="translate(0, 2)">
    <text x="58" y="50" font-family="'Inter', 'Segoe UI', sans-serif" font-size="13" font-weight="500" fill="var(--text-muted)" letter-spacing="1.2" opacity="0.75">
      <tspan>Build · Launch · </tspan><tspan fill="var(--primary)">Grow</tspan>
    </text>
    <rect x="58" y="52" width="120" height="2" rx="1" fill="url(#iconGradient)" opacity="0.25" />
  </g>
</svg>$svg$,
  $svg$<svg class="logo-svg" width="270" height="54" viewBox="0 0 270 58" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:var(--primary)" />
      <stop offset="100%" style="stop-color:var(--primary-light, var(--primary))" />
    </linearGradient>
    <linearGradient id="footerIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:var(--primary)" />
      <stop offset="50%" style="stop-color:var(--secondary, var(--primary))" />
      <stop offset="100%" style="stop-color:var(--primary-light, var(--primary))" />
    </linearGradient>
    <linearGradient id="footerIconBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:var(--primary);stop-opacity:0.12" />
      <stop offset="100%" style="stop-color:var(--secondary, var(--primary));stop-opacity:0.06" />
    </linearGradient>
    <filter id="footerGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <filter id="footerShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="var(--primary)" flood-opacity="0.25" />
    </filter>
  </defs>
  <g class="logo-icon" filter="url(#footerShadow)">
    <rect x="4" y="7" width="44" height="44" rx="12" fill="url(#footerIconBg)" />
    <rect x="8" y="11" width="36" height="36" rx="9" fill="var(--primary)" opacity="0.08" />
    <path d="M22 19L12 29L22 39" stroke="url(#footerIconGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M30 19L40 29L30 39" stroke="var(--secondary, var(--primary))" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M28 21L24 37" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" opacity="0.5" />
    <circle cx="44" cy="11" r="3" fill="var(--secondary, var(--accent))" opacity="0.9" />
  </g>
  <g filter="url(#footerGlow)">
    <text x="58" y="34" font-family="'Poppins', 'Segoe UI', sans-serif" font-size="18"><tspan font-weight="700" fill="#1a202c">Nexa</tspan><tspan font-weight="700" fill="#4f8ef7">Web</tspan></text>
    <text x="148" y="34" font-family="'Poppins', 'Segoe UI', sans-serif" font-size="12" font-weight="300" fill="#94a3b8">Service</text>
  </g>
  <text x="58" y="48" font-family="'Inter', 'Segoe UI', sans-serif" font-size="8" font-weight="500" fill="var(--text-muted)" letter-spacing="1.8" opacity="0.75">
    <tspan>Build · Launch · </tspan><tspan fill="var(--primary)">Grow</tspan>
  </text>
  <rect x="58" y="52" width="115" height="2" rx="1" fill="url(#footerIconGradient)" opacity="0.25" />
</svg>$svg$,
  'contact@nexawebservice.com',
  'Mon - Fri: 9AM - 6PM EST',
  'Serving Clients Worldwide',
  'https://wa.me/923447510711',
  'https://www.linkedin.com/in/kamran619/',
  'https://twitter.com/kamransawan',
  2014
)
on conflict (id) do update set
  brand_name = excluded.brand_name,
  brand_description = excluded.brand_description,
  logo_svg_header = excluded.logo_svg_header,
  logo_svg_footer = excluded.logo_svg_footer,
  contact_email = excluded.contact_email,
  hours = excluded.hours,
  location = excluded.location,
  whatsapp_url = excluded.whatsapp_url,
  linkedin_url = excluded.linkedin_url,
  twitter_url = excluded.twitter_url,
  copyright_start_year = excluded.copyright_start_year;

-- ============================================================================
-- 02_home.sql
-- ============================================================================
-- Seed: home page content
-- Transcribed verbatim from src/app/pages/home/home.component.ts

-- Hero: title is stored as plain text (the 3 differently-styled spans -
-- title-line / title-gradient (with a nested colored "Grow") / title-accent -
-- are presentational markup kept static in the template, since the schema's
-- `title` column is a single text field with no structured parts).
-- subtitle stores both paragraphs joined by a blank line (\n\n);
-- the component splits on that to render the two original <p> tags
-- (hero-subtitle = enterprise paragraph, hero-subtitle-smb = SMB paragraph).
insert into page_heroes (page, badge, title, subtitle, cta_primary_label, cta_primary_link, cta_secondary_label, cta_secondary_link, tech_badges, code_snippet)
values (
  'home',
  'New Agency · 8+ Years Enterprise Experience',
  $txt$We Engineer Build · Launch · Grow For Your Business$txt$,
  $txt$From concept to deployment, we deliver enterprise-grade software solutions that drive growth. Backed by 8+ years of hands-on Angular, React, .NET Core, and Azure DevOps experience — including US Healthcare SaaS and UAE enterprise ERP — Nexa Web Service brings senior-level expertise at competitive rates.

We also help coaches, consultants, and service-based businesses optimize their websites for search, speed, and conversions.$txt$,
  'Start a Conversation',
  '/contact',
  'Explore Case Studies',
  '/portfolio',
  array['Angular 17+', 'React', '.NET Core', 'SEO & CWV'],
  $code$export const nexaWebService = {
  name: "Nexa Web Service Technologies",
  services: [
    "Custom Software",
    "Cloud Solutions",
    "SEO & Optimization"
  ],
  commitment: "Excellence",
  readyToHelp: true
};$code$
)
on conflict (page) do update set
  badge = excluded.badge,
  title = excluded.title,
  subtitle = excluded.subtitle,
  cta_primary_label = excluded.cta_primary_label,
  cta_primary_link = excluded.cta_primary_link,
  cta_secondary_label = excluded.cta_secondary_label,
  cta_secondary_link = excluded.cta_secondary_link,
  tech_badges = excluded.tech_badges,
  code_snippet = excluded.code_snippet;

-- Hero features (3 items, icon is a fixed checkmark svg in the template, not per-item data)
delete from feature_blocks where page = 'home' and section = 'hero_features';
insert into feature_blocks (page, section, icon, eyebrow, title, description, sort_order) values
('home', 'hero_features', null, null, 'Enterprise Solutions', null, 1),
('home', 'hero_features', null, null, 'Cloud Architecture', null, 2),
('home', 'hero_features', null, null, 'SEO & Optimization', null, 3);

-- Hero stats
delete from stat_blocks where page = 'home' and section = 'hero';
insert into stat_blocks (page, section, icon, value, label, description, sort_order) values
('home', 'hero', null, '8', 'Years Experience', null, 1),
('home', 'hero', null, '3', 'Countries Served', null, 2),
('home', 'hero', null, '98', 'Client Satisfaction', null, 3);

-- Trust stats
delete from stat_blocks where page = 'home' and section = 'trust';
insert into stat_blocks (page, section, icon, value, label, description, sort_order) values
('home', 'trust', '📊', '8+', 'Years Experience', null, 1),
('home', 'trust', '🌍', '3', 'Countries Served (US / UAE / UK)', null, 2),
('home', 'trust', '⚡', '40%', 'CI/CD Cycle Improvement (CareCloud)', null, 3),
('home', 'trust', '⭐', '98%', 'Client Satisfaction', null, 4);

-- Technology carousel
truncate table tech_stack_items restart identity cascade;
insert into tech_stack_items (icon, name, sort_order) values
('⚛️', 'Angular 17+', 1),
('🎨', 'React', 2),
('🔷', 'TypeScript', 3),
('💎', '.NET Core / C#', 4),
('🟢', 'Node.js', 5),
('☁️', 'Azure DevOps', 6),
('⚡', 'SQL Server', 7),
('📊', 'GraphQL', 8),
('🗄️', 'MongoDB', 9),
('🤖', 'GitHub Copilot', 10);

-- Value propositions
delete from feature_blocks where page = 'home' and section = 'value_props';
insert into feature_blocks (page, section, icon, eyebrow, title, description, sort_order) values
('home', 'value_props', '⚡', '40%', 'Faster CI/CD', 'Reduced deployment cycles by 40% at CareCloud via Azure DevOps pipeline architecture', 1),
('home', 'value_props', '🗄️', '35%', 'Query Speed Gain', 'Optimised SQL Server stored procedures cutting critical response times by 35% at Metropolitan', 2),
('home', 'value_props', '⏱️', '30%', 'Faster Development', 'Led end-to-end feature cycles at Inspire System, cutting development turnaround by 30%', 3),
('home', 'value_props', '🤖', 'AI', 'Accelerated Delivery', 'Daily use of GitHub Copilot, Claude, and GPT-4 — faster code, better quality, cleaner docs', 4);

-- Services
delete from services where page = 'home';
insert into services (page, icon, title, short_description, features, benefit_tags, sort_order) values
('home', '🔍', 'SEO & Website Optimization', $txt$Full technical SEO audits, on-page optimization, Core Web Vitals improvements, and structured data implementation. We help Wix, WordPress, Webflow, and custom-built sites rank higher and load faster.$txt$, array['Technical SEO Audit', 'Core Web Vitals', 'Schema Markup', 'Page Speed Boost'], null, 1),
('home', '🚀', 'Digital Transformation', 'Modernize legacy systems and embrace cloud-native architectures for the future', array['Cloud Migration', 'API Development', 'Microservices'], null, 2),
('home', '💻', 'Custom Development', 'Full-stack enterprise applications built with scalability in mind', array['Web Applications', 'Mobile Apps', 'Enterprise Software'], null, 3),
('home', '⚡', 'Performance Optimization', 'Unlock speed and efficiency in your existing systems', array['Code Optimization', 'Database Tuning', 'Caching Strategies'], null, 4),
('home', '🎯', 'Strategic Consulting', 'Expert guidance on technology roadmaps and architecture decisions', array['Tech Assessment', 'Team Mentoring', 'Architecture Review'], null, 5);

-- Why choose us
delete from feature_blocks where page = 'home' and section = 'why_choose_us';
insert into feature_blocks (page, section, icon, eyebrow, title, description, sort_order) values
('home', 'why_choose_us', '🎯', null, 'Senior-Level Expertise', $txt$8+ years of hands-on Angular, React, .NET Core, and Azure — not junior talent with your work outsourced.$txt$, 1),
('home', 'why_choose_us', '⚡', null, 'Proven Results', '40% faster CI/CD at CareCloud, 35% query speed gain at Metropolitan, zero-downtime deployments across 3 countries.', 2),
('home', 'why_choose_us', '🔍', null, 'SEO & Performance First', $txt$We don't just build sites — we optimize them. Technical SEO, Core Web Vitals, and speed improvements built into every project.$txt$, 3),
('home', 'why_choose_us', '🤝', null, 'Direct Communication', $txt$You work directly with the senior developer. No project manager chain, no offshore handoffs — real accountability.$txt$, 4),
('home', 'why_choose_us', '💡', null, 'AI-Accelerated Delivery', 'Daily use of GitHub Copilot, Claude, and GPT-4 means faster delivery, fewer bugs, and more focus on what matters.', 5),
('home', 'why_choose_us', '🌍', null, 'Global Track Record', 'Enterprise solutions delivered across the US, UAE, and UK — including HIPAA-compliant healthcare and Fortune-level ERP systems.', 6);

-- ============================================================================
-- 03_about_contact.sql
-- ============================================================================
-- Seed: About + Contact page content
-- Transcribed verbatim from src/app/pages/about/about.component.ts and
-- src/app/pages/contact/contact.component.ts
-- (site_info contact fields are already seeded in 01_nav_footer.sql — not repeated here)

-- ============================================================================
-- ABOUT PAGE
-- ============================================================================

-- Hero
-- title is stored as plain flattened text for reference; the actual <h1> markup
-- (gradient span on "Digital Excellence" + line break before "With Real Expertise")
-- is kept static in the template, same convention as home.component's hero title.
insert into page_heroes (page, badge, title, subtitle, cta_primary_label, cta_primary_link, cta_secondary_label, cta_secondary_link, tech_badges, code_snippet)
values (
  'about',
  '8+ Years of Enterprise Development Experience',
  $txt$Building Digital Excellence With Real Expertise$txt$,
  $txt$Nexa Web Service is a freshly launched agency backed by 8+ years of hands-on enterprise development — Angular, React, .NET Core, Azure DevOps, and Healthcare SaaS. Senior-level work, delivered directly to you.$txt$,
  null, null, null, null, null, null
)
on conflict (page) do update set
  badge = excluded.badge,
  title = excluded.title,
  subtitle = excluded.subtitle,
  cta_primary_label = excluded.cta_primary_label,
  cta_primary_link = excluded.cta_primary_link,
  cta_secondary_label = excluded.cta_secondary_label,
  cta_secondary_link = excluded.cta_secondary_link,
  tech_badges = excluded.tech_badges,
  code_snippet = excluded.code_snippet;

-- Hero stats (4 items)
delete from stat_blocks where page = 'about' and section = 'hero';
insert into stat_blocks (page, section, icon, value, label, description, sort_order) values
('about', 'hero', null, '8+', 'Years Experience', null, 1),
('about', 'hero', null, '5', 'Companies Served', null, 2),
('about', 'hero', null, '3', 'Countries (US / UAE / PK)', null, 3),
('about', 'hero', null, '2024', 'Agency Founded', null, 4);

-- Story (singleton) + highlights + philosophy quote
-- quote_author combines display name and title separated by "|" since the
-- template renders them on two separate lines (author-name / author-title);
-- the component splits on "|" to populate each.
insert into about_story (id, paragraph_1, paragraph_2, highlights, quote_text, quote_author)
values (
  1,
  $txt$Our journey reflects 8+ years of building real enterprise software for US and international clients — fully remote. From launching an Angular SSR application for a US logistics company (Metropolitan), to delivering HIPAA-compliant healthcare modules at CareCloud (US), to building complex ERP systems for UAE enterprise clients — we have navigated demanding requirements across industries and timezones.$txt$,
  $txt$In 2024, we launched Nexa Web Service to bring that same senior-level expertise directly to businesses like yours — without agency overhead. You work with an experienced senior developer, not a junior who escalates everything. Every project gets clean architecture, real performance, and code built to last.$txt$,
  $json$[
    {"icon": "🎯", "title": "Mission-Driven", "description": "Solutions that align with your business goals"},
    {"icon": "🤝", "title": "Partnership Approach", "description": "Your success is our success"},
    {"icon": "🚀", "title": "Results-Focused", "description": "Delivering measurable business value"}
  ]$json$::jsonb,
  $txt$Every line of code I write carries 8 years of production experience — from HIPAA-compliant healthcare platforms to enterprise ERP systems across three countries. My clients get that senior-level thinking on every task, not just the big ones.$txt$,
  $txt$Kamran Sohail|Founder, Nexa Web Service · Senior Full Stack Developer$txt$
)
on conflict (id) do update set
  paragraph_1 = excluded.paragraph_1,
  paragraph_2 = excluded.paragraph_2,
  highlights = excluded.highlights,
  quote_text = excluded.quote_text,
  quote_author = excluded.quote_author;

-- Milestones (timeline)
truncate table milestones restart identity cascade;
insert into milestones (year, title, description, sort_order) values
('2017', $txt$Started — Frontend Developer (Eposelive)$txt$, null, 1),
('2019', $txt$Full Stack — Angular + Node.js (TakDevs)$txt$, null, 2),
('2021', $txt$Remote US Client — Full Stack (Metropolitan)$txt$, null, 3),
('2022', $txt$Enterprise ERP — UAE (Inspire System)$txt$, null, 4),
('2024', $txt$US Healthcare SaaS — Angular 17 (CareCloud)$txt$, null, 5),
('2024', $txt$Nexa Web Service — Launched$txt$, null, 6);

-- Expertise areas
truncate table expertise_areas restart identity cascade;
insert into expertise_areas (icon, title, description, tech_stack, sort_order) values
(
  $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>$svg$,
  $txt$Frontend — Angular & React$txt$,
  $txt$8+ years building enterprise Angular and React UIs — from healthcare SaaS dashboards to ERP workflows handling thousands of daily users$txt$,
  array['Angular 2–17+', 'React', 'TypeScript', 'RxJS', 'NgRx / Redux', 'HTML5 / CSS3'],
  1
),
(
  $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>$svg$,
  $txt$UI Frameworks & Design Systems$txt$,
  $txt$Hands-on experience with major enterprise UI component libraries, building consistent and accessible design systems$txt$,
  array['Telerik Kendo UI', 'Angular Material', 'CoreUI', 'Bootstrap', 'Material UI', 'DevExtreme'],
  2
),
(
  $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>$svg$,
  $txt$Backend — .NET Core & Node.js$txt$,
  $txt$Production REST APIs and business logic in .NET Core/C# and Node.js, with SQL-optimised data layers for high-volume applications$txt$,
  array['.NET Core / C#', 'Node.js', 'Strapi', 'REST APIs', 'GraphQL', 'Microservices'],
  3
),
(
  $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>$svg$,
  $txt$Databases$txt$,
  $txt$Relational and NoSQL databases — stored procedure optimisation that reduced query response times by 35% in production$txt$,
  array['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB'],
  4
),
(
  $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>$svg$,
  $txt$DevOps & Cloud$txt$,
  $txt$Azure DevOps CI/CD pipelines that reduced deployment cycles by 40% at CareCloud. Experienced with cloud-native deployments and infrastructure automation$txt$,
  array['Azure DevOps', 'CI/CD Pipelines', 'Git / GitHub', 'Netlify', 'Railway', 'FileZilla'],
  5
),
(
  $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>$svg$,
  $txt$AI-Powered Development$txt$,
  $txt$Daily use of AI tools to accelerate development velocity, improve code quality, and deliver better-documented code faster$txt$,
  array['GitHub Copilot', 'ChatGPT (GPT-4)', 'Claude (Anthropic)', 'OpenAI Codex'],
  6
);

-- Core values (icon column repurposed to hold the display number "01".."04"; eyebrow left null)
delete from feature_blocks where page = 'about' and section = 'core_values';
insert into feature_blocks (page, section, icon, eyebrow, title, description, sort_order) values
('about', 'core_values', '01', null, $txt$Clean Architecture First$txt$, $txt$Reusable components, consistent patterns, and code built to be maintained — not just to ship. Standards enforced through peer review and clean architecture principles.$txt$, 1),
('about', 'core_values', '02', null, $txt$Transparent & Async-Ready$txt$, $txt$Daily updates, clear timelines, and zero surprises — the same async discipline built across 8 years of remote work for US and UAE clients.$txt$, 2),
('about', 'core_values', '03', null, $txt$Performance is Non-Negotiable$txt$, $txt$Lighthouse scores, query response times, CI/CD speed — measurable performance matters in production, not just in demos.$txt$, 3),
('about', 'core_values', '04', null, $txt$AI-Augmented Quality$txt$, $txt$Using GitHub Copilot, Claude, and GPT-4 daily means faster delivery and higher quality — not shortcuts. AI handles the boilerplate; judgment handles the architecture.$txt$, 4);

-- Why choose us (advantages)
delete from feature_blocks where page = 'about' and section = 'why_choose_us';
insert into feature_blocks (page, section, icon, eyebrow, title, description, sort_order) values
('about', 'why_choose_us', '🇺🇸', null, $txt$Real US Client Experience$txt$, $txt$Worked directly with US companies — CareCloud (Healthcare SaaS, Hybrid US) and Metropolitan Warehouse & Delivery (Remote, US). We understand American delivery standards, communication norms, and business expectations.$txt$, 1),
('about', 'why_choose_us', '⏰', null, $txt$Async-Friendly & Remote-First$txt$, $txt$Based in Islamabad, Pakistan (UTC+5). 8+ years of async remote collaboration across US, UAE, and UK — you receive morning updates every day and replies within hours, not days.$txt$, 2),
('about', 'why_choose_us', '💬', null, $txt$Senior Developer Directly$txt$, $txt$You work with an 8+ year senior developer, not a project manager or junior who escalates everything. Your vision stays intact from kickoff to launch.$txt$, 3),
('about', 'why_choose_us', '🏥', null, $txt$Healthcare & Enterprise Grade$txt$, $txt$HIPAA-aware development experience from CareCloud. Enterprise ERP and complex workflow experience from Inspire System. We know what production-grade means.$txt$, 4),
('about', 'why_choose_us', '💰', null, $txt$Competitive Pricing$txt$, $txt$Senior-level quality at offshore rates. You get the expertise of a US agency without the US agency price tag — fully transparent, no hidden costs.$txt$, 5),
('about', 'why_choose_us', '🤖', null, $txt$AI-Accelerated Delivery$txt$, $txt$Daily use of GitHub Copilot, ChatGPT, Claude, and OpenAI Codex means faster delivery, higher code quality, and better documentation — without cutting corners.$txt$, 6);

-- ============================================================================
-- CONTACT PAGE
-- ============================================================================

-- Hero
-- title is stored as plain flattened text for reference; the actual <h1> markup
-- (gradient span on "Transformation") is kept static in the template.
insert into page_heroes (page, badge, title, subtitle, cta_primary_label, cta_primary_link, cta_secondary_label, cta_secondary_link, tech_badges, code_snippet)
values (
  'contact',
  $txt$Let's Connect$txt$,
  $txt$Start Your Transformation Journey$txt$,
  $txt$Schedule a free 30-minute strategy session to discuss your project goals and discover how we can work together$txt$,
  null, null, null, null, null, null
)
on conflict (page) do update set
  badge = excluded.badge,
  title = excluded.title,
  subtitle = excluded.subtitle,
  cta_primary_label = excluded.cta_primary_label,
  cta_primary_link = excluded.cta_primary_link,
  cta_secondary_label = excluded.cta_secondary_label,
  cta_secondary_link = excluded.cta_secondary_link,
  tech_badges = excluded.tech_badges,
  code_snippet = excluded.code_snippet;

-- Benefits cards
delete from feature_blocks where page = 'contact' and section = 'benefits';
insert into feature_blocks (page, section, icon, eyebrow, title, description, sort_order) values
(
  'contact', 'benefits',
  $svg$<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>$svg$,
  null,
  $txt$Free 30-Min Strategy Session$txt$,
  $txt$No obligation consultation to understand your unique needs and challenges$txt$,
  1
),
(
  'contact', 'benefits',
  $svg$<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>$svg$,
  null,
  $txt$Actionable Recommendations$txt$,
  $txt$Walk away with concrete next steps and ROI projections for your project$txt$,
  2
),
(
  'contact', 'benefits',
  $svg$<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>$svg$,
  null,
  $txt$8+ Years of Enterprise Experience$txt$,
  $txt$US Healthcare SaaS (CareCloud), UAE Enterprise ERP (Inspire), US Logistics (Metropolitan) — industry-tested solutions tailored to your situation$txt$,
  3
);

-- ============================================================================
-- 04_services_pricing_courses.sql
-- ============================================================================
-- Seed: services, pricing, and courses pages
-- Transcribed verbatim from:
--   src/app/pages/services/services.component.ts
--   src/app/pages/pricing/pricing.component.ts
--   src/app/pages/courses/courses.component.ts

-- ============================================================
-- SERVICES PAGE
-- ============================================================

-- Hero
insert into page_heroes (page, badge, title, subtitle, cta_primary_label, cta_primary_link, cta_secondary_label, cta_secondary_link, tech_badges, code_snippet)
values (
  'services',
  'Expert Solutions',
  $txt$Services That <span class="gradient-text">Transform</span> Your Business$txt$,
  $txt$From digital transformation to custom development, we deliver end-to-end solutions that drive real business results$txt$,
  null,
  null,
  null,
  null,
  null,
  null
)
on conflict (page) do update set
  badge = excluded.badge,
  title = excluded.title,
  subtitle = excluded.subtitle,
  cta_primary_label = excluded.cta_primary_label,
  cta_primary_link = excluded.cta_primary_link,
  cta_secondary_label = excluded.cta_secondary_label,
  cta_secondary_link = excluded.cta_secondary_link,
  tech_badges = excluded.tech_badges,
  code_snippet = excluded.code_snippet;

-- Hero stats
delete from stat_blocks where page = 'services' and section = 'hero';
insert into stat_blocks (page, section, icon, value, label, description, sort_order) values
('services', 'hero', null, '50+', 'Projects Delivered', null, 1),
('services', 'hero', null, '98%', 'Client Satisfaction', null, 2),
('services', 'hero', null, '8+', 'Years Experience', null, 3);

-- Services grid
delete from services where page = 'services';
insert into services (page, icon, title, short_description, features, benefit_tags, sort_order) values
('services', $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <path d="M11 8v3l2 2"/>
      </svg>$svg$,
  'SEO & Website Optimization',
  $txt$Full technical SEO audits, on-page optimization, Core Web Vitals improvements, and structured data implementation. We help Wix, WordPress, Webflow, Squarespace, and custom-built sites rank higher and load faster — with a clear audit report and fix list you can act on immediately.$txt$,
  array['Technical SEO audit & report', 'On-page optimization (titles, H tags, meta)', 'Core Web Vitals & page speed fixes', 'Schema markup & structured data', 'Wix / WordPress / Webflow optimization', 'Free Website Audit CTA'],
  array['Higher Rankings', 'Faster Load', 'More Leads'],
  1),
('services', $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>$svg$,
  'Digital Transformation',
  $txt$Transform legacy systems into modern, scalable platforms with zero-downtime migrations and strategic cloud adoption.$txt$,
  array['Legacy system modernization', 'Cloud migration (Azure/AWS)', 'API-first architecture', 'Microservices design', 'Zero-downtime deployments', 'Data migration strategies'],
  array['40% Cost Reduction', '3x Faster', '99.9% Uptime'],
  2),
('services', $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>$svg$,
  'Custom Development',
  $txt$Full-stack enterprise applications built for your specific needs with focus on performance, scalability, and maintainability.$txt$,
  array['Enterprise app architecture', 'Angular/React frontends', '.NET/Node.js backends', 'Real-time dashboards', 'E-commerce platforms', 'High-performance systems'],
  array['Custom Built', 'Scalable', 'Production-Ready'],
  3),
('services', $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>$svg$,
  'Performance Optimization',
  $txt$Unlock hidden potential in existing systems through strategic optimization achieving 3x average performance improvement.$txt$,
  array['Performance audits', 'Code optimization', 'Database tuning', 'Caching strategies', 'CDN optimization', 'Monitoring setup'],
  array['3x Faster', 'Lower Costs', 'Better SEO'],
  4),
('services', $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>$svg$,
  'Strategic Consulting',
  $txt$Expert guidance on technology decisions with comprehensive roadmaps aligned with your business objectives.$txt$,
  array['Technology roadmaps', 'Architecture reviews', 'Team mentoring', 'Tech selection guidance', 'Risk assessment', 'Cost-benefit analysis'],
  array['Expert Guidance', 'Risk Mitigation', 'ROI Focus'],
  5),
('services', $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>$svg$,
  'Cloud & DevOps',
  $txt$Automate deployments, scale infrastructure, and ensure reliability with modern cloud and DevOps practices.$txt$,
  array['CI/CD pipelines', 'Containerization (Docker/Kubernetes)', 'Cloud scaling (AWS/Azure)', 'Monitoring & logging', 'Disaster recovery', 'Infrastructure as Code'],
  array['99.99% Uptime', 'Automated', 'Scalable'],
  6);

-- ============================================================
-- PRICING PAGE
-- ============================================================

-- Service plans
truncate table pricing_plans restart identity cascade;
insert into pricing_plans (name, description, price, unit, featured, icon, features, sort_order) values
('Starter', $txt$Perfect for small businesses needing a professional web presence$txt$, '$500', '/ project', false,
  $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>$svg$,
  array['Landing page or portfolio site', 'Responsive mobile design', 'Contact form integration', 'Basic SEO setup', '2 rounds of revisions', 'Delivery in 1–2 weeks', '1 month post-launch support'],
  1),
('Business', $txt$For growing businesses needing a full multi-page website or web app$txt$, '$2,000', '/ project', true,
  $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>$svg$,
  array['5–10 page website or web app', 'Custom design & branding', 'CMS or admin dashboard', 'API / backend integration', 'Full SEO optimization', 'Performance optimization', '3 months post-launch support', 'Google Analytics setup'],
  2),
('Enterprise', $txt$Complex platforms, digital transformation, and legacy modernization$txt$, '$10,000', '+ / project', false,
  $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>$svg$,
  array['Full-stack enterprise application', 'Cloud architecture (AWS / Azure)', 'Microservices / API design', 'Legacy system modernization', 'CI/CD pipeline setup', 'Security & compliance review', 'Team training & documentation', '6+ months ongoing support', 'Dedicated project manager'],
  3);

-- Course pricing tiers
truncate table course_pricing_tiers restart identity cascade;
insert into course_pricing_tiers (name, level, level_class, duration, price, sort_order) values
('HTML & CSS Fundamentals', 'Beginner', 'beginner', '4 weeks', '$79', 1),
('Bootstrap Framework', 'Beginner', 'beginner', '3 weeks', '$59', 2),
('JavaScript Essentials', 'Intermediate', 'intermediate', '6 weeks', '$119', 3),
('React Development', 'Advanced', 'advanced', '8 weeks', '$169', 4),
('Angular Framework', 'Advanced', 'advanced', '8 weeks', '$169', 5),
('Full Stack Development', 'Professional', 'professional', '12 weeks', '$249', 6);

-- 5-step process
delete from feature_blocks where page = 'pricing' and section = 'process';
insert into feature_blocks (page, section, icon, eyebrow, title, description, sort_order) values
('pricing', 'process', null, '01', 'Free Consultation', $txt$30-minute call to understand your goals, scope, and budget — zero obligation.$txt$, 1),
('pricing', 'process', null, '02', 'Detailed Proposal', $txt$You receive a written proposal with timeline, deliverables, and fixed price within 24 hours.$txt$, 2),
('pricing', 'process', null, '03', 'Agreement & Kickoff', $txt$Sign a simple contract, pay 50% upfront via PayPal or Wise, and we start work.$txt$, 3),
('pricing', 'process', null, '04', 'Build & Review', $txt$Regular updates and demos. You review and give feedback at each milestone.$txt$, 4),
('pricing', 'process', null, '05', 'Launch & Support', $txt$Final payment on delivery. We stay available for post-launch support and changes.$txt$, 5);

-- ============================================================
-- COURSES PAGE
-- ============================================================

-- Hero
insert into page_heroes (page, badge, title, subtitle, cta_primary_label, cta_primary_link, cta_secondary_label, cta_secondary_link, tech_badges, code_snippet)
values (
  'courses',
  'Nexa Web Service Academy',
  $txt$Master <span class="gradient-text">Modern Development</span><br />Build Your Tech Career$txt$,
  $txt$Industry-leading training programs designed by Silicon Valley experts. Learn in-demand skills, build real-world projects, and accelerate your career in tech.$txt$,
  null,
  null,
  null,
  null,
  null,
  null
)
on conflict (page) do update set
  badge = excluded.badge,
  title = excluded.title,
  subtitle = excluded.subtitle,
  cta_primary_label = excluded.cta_primary_label,
  cta_primary_link = excluded.cta_primary_link,
  cta_secondary_label = excluded.cta_secondary_label,
  cta_secondary_link = excluded.cta_secondary_link,
  tech_badges = excluded.tech_badges,
  code_snippet = excluded.code_snippet;

-- Hero stats
delete from stat_blocks where page = 'courses' and section = 'hero';
insert into stat_blocks (page, section, icon, value, label, description, sort_order) values
('courses', 'hero', null, '500+', 'Graduates', null, 1),
('courses', 'hero', null, '95%', 'Job Placement', null, 2),
('courses', 'hero', null, '4.9/5', 'Student Rating', null, 3),
('courses', 'hero', null, '$85K', 'Avg. Starting Salary', null, 4);

-- Value props
delete from feature_blocks where page = 'courses' and section = 'value_props';
insert into feature_blocks (page, section, icon, eyebrow, title, description, sort_order) values
('courses', 'value_props', $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>$svg$, null, 'Structured Learning', $txt$Carefully designed curriculum that takes you from zero to job-ready in weeks$txt$, 1),
('courses', 'value_props', $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>$svg$, null, 'Hands-On Projects', $txt$Build 10+ real-world projects for your portfolio that impress employers$txt$, 2),
('courses', 'value_props', $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>$svg$, null, '1-on-1 Mentoring', $txt$Personalized guidance from a senior developer with 8+ years of real enterprise experience$txt$, 3),
('courses', 'value_props', $svg$<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>$svg$, null, 'Career Support', $txt$Resume review, interview prep, and direct job placement assistance$txt$, 4);

-- Courses
truncate table courses restart identity cascade;
insert into courses (title, level, level_class, description, topics, duration, price, icon_svg, sort_order) values
('HTML & CSS Fundamentals', 'Beginner', 'beginner',
  $txt$Master the building blocks of the web. Learn semantic HTML5, modern CSS3, Flexbox, Grid, and responsive design principles.$txt$,
  array['HTML5 Semantics', 'CSS3 Styling', 'Flexbox & Grid', 'Responsive Design', 'Accessibility', 'Best Practices'],
  '4 weeks', '$49',
  $svg$<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>$svg$,
  1),
('Bootstrap Framework', 'Beginner', 'beginner',
  $txt$Build beautiful, responsive websites quickly. Master Bootstrap's grid system, components, and customization techniques.$txt$,
  array['Bootstrap Grid', 'UI Components', 'Responsive Utilities', 'Custom Themes', 'SASS Integration', 'Real Projects'],
  '3 weeks', '$39',
  $svg$<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>$svg$,
  2),
('JavaScript Essentials', 'Intermediate', 'intermediate',
  $txt$Master the programming language of the web. Learn ES6+, async programming, DOM manipulation, and API integration.$txt$,
  array['ES6+ Features', 'DOM Manipulation', 'Event Handling', 'Async/Await', 'Fetch API', 'Error Handling'],
  '6 weeks', '$79',
  $svg$<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>$svg$,
  3),
('React Development', 'Advanced', 'advanced',
  $txt$Build modern, interactive UIs with React. Master components, hooks, state management, and production-ready patterns.$txt$,
  array['React Fundamentals', 'Hooks & State', 'Context API', 'React Router', 'Performance', 'Testing'],
  '8 weeks', '$99',
  $svg$<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>$svg$,
  4),
('Angular Framework', 'Advanced', 'advanced',
  $txt$Build enterprise-grade applications with Angular. Master TypeScript, components, services, and advanced patterns.$txt$,
  array['TypeScript', 'Components', 'Services & DI', 'Routing', 'Forms', 'RxJS', 'NgRx'],
  '8 weeks', '$99',
  $svg$<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>$svg$,
  5),
('Full Stack Development', 'Professional', 'professional',
  $txt$Become a complete developer. Master frontend, backend, databases, and deployment to build full applications.$txt$,
  array['Frontend Mastery', 'Node.js/Express', 'MongoDB/SQL', 'Authentication', 'REST APIs', 'Cloud Deployment'],
  '12 weeks', '$149',
  $svg$<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>$svg$,
  6);

-- ============================================================================
-- 05_portfolio.sql
-- ============================================================================
-- Seed: portfolio page content (hero, impact stats, industries, case studies, testimonial)
-- Transcribed verbatim from src/app/pages/portfolio/portfolio.component.ts

-- Hero
insert into page_heroes (page, badge, title, subtitle, cta_primary_label, cta_primary_link, cta_secondary_label, cta_secondary_link, tech_badges, code_snippet)
values (
  'portfolio',
  $txt$🏆 8+ Years of Enterprise Development Experience$txt$,
  $txt$Case Studies & Representative Work$txt$,
  $txt$The following case studies illustrate the types of solutions, challenges, and results our expertise can deliver. They represent the scope and quality of work we bring to every engagement.$txt$,
  null,
  null,
  null,
  null,
  null,
  null
)
on conflict (page) do update set
  badge = excluded.badge,
  title = excluded.title,
  subtitle = excluded.subtitle,
  cta_primary_label = excluded.cta_primary_label,
  cta_primary_link = excluded.cta_primary_link,
  cta_secondary_label = excluded.cta_secondary_label,
  cta_secondary_link = excluded.cta_secondary_link,
  tech_badges = excluded.tech_badges,
  code_snippet = excluded.code_snippet;

-- Impact stats (section: impact)
delete from stat_blocks where page = 'portfolio' and section = 'impact';
insert into stat_blocks (page, section, icon, value, label, description, sort_order) values
('portfolio', 'impact', '🚀', '50+', 'Projects Delivered', 'Successfully completed enterprise projects', 1),
('portfolio', 'impact', '📈', '3x', 'Performance Gain', 'Average improvement in system performance', 2),
('portfolio', 'impact', '💰', '40%', 'Cost Reduction', 'Average savings in operational costs', 3),
('portfolio', 'impact', '⭐', '4.9/5', 'Client Rating', 'Average satisfaction score', 4);

-- Industries
truncate table industries restart identity cascade;
insert into industries (icon, name, description, sort_order) values
('🛍️', 'E-Commerce & Retail', 'Online stores and retail platforms', 1),
('💼', 'Financial Services', 'Banks, insurance, and fintech', 2),
('🏥', 'Healthcare', 'Medical systems and health tech', 3),
('🏭', 'Manufacturing', 'Industrial automation and IoT', 4),
('📦', 'Logistics', 'Supply chain and delivery systems', 5),
('🎓', 'Education', 'E-learning and EdTech platforms', 6);

-- Case studies (37 items)
truncate table case_studies restart identity cascade;
insert into case_studies (title, company, industry, icon, project_type, duration, team, challenge, solution, results, technologies, sort_order) values
(
  'E-Commerce Platform Modernization',
  'Fortune 500 Retail Company',
  'Retail & E-Commerce',
  '🛍️',
  'Platform Modernization',
  '8 months',
  '4 developers',
  $txt$Legacy monolithic e-commerce platform causing slow deployments, scaling issues during peak seasons, and poor mobile experience leading to 35% cart abandonment.$txt$,
  $txt$Implemented microservices architecture with Angular PWA frontend, Node.js backend, and Azure cloud infrastructure. Introduced CI/CD pipelines, containerization with Kubernetes, and implemented a headless commerce approach.$txt$,
  $json$[{"metric":"300%","description":"Faster page load times"},{"metric":"10x","description":"Peak traffic capacity"},{"metric":"50%","description":"Reduced cart abandonment"},{"metric":"$2M","description":"Annual savings"}]$json$::jsonb,
  array['Angular','Node.js','Docker','Kubernetes','Azure','PostgreSQL','Redis'],
  1
),
(
  'Enterprise CRM System Integration',
  'B2B SaaS Company',
  'Technology',
  '📊',
  'System Integration',
  '6 months',
  '3 developers',
  $txt$Multiple disconnected systems causing data silos, hours of manual data entry, and limited real-time reporting capabilities affecting sales team productivity.$txt$,
  $txt$Built unified API layer with .NET Core, created real-time Power BI dashboards, and implemented automated workflows with Azure Logic Apps to integrate 5 disparate systems.$txt$,
  $json$[{"metric":"75%","description":"Less manual data entry"},{"metric":"Real-time","description":"Cross-system sync"},{"metric":"60%","description":"Faster reporting"},{"metric":"$1.5M","description":"Revenue increase"}]$json$::jsonb,
  array['.NET Core','Angular','SQL Server','Azure Service Bus','Power BI','Azure Logic Apps'],
  2
),
(
  'Legacy System Modernization',
  'Insurance Industry Leader',
  'Insurance & Finance',
  '🏢',
  'Digital Transformation',
  '18 months',
  '6 developers',
  $txt$20-year-old mainframe system with $500K annual licensing costs, difficulty hiring specialized talent, and 6-month feature deployment cycles limiting market competitiveness.$txt$,
  $txt$Systematically migrated monolithic COBOL application to .NET microservices with Angular frontend using strangler fig pattern, maintaining zero downtime throughout migration.$txt$,
  $json$[{"metric":"$5M","description":"3-year savings"},{"metric":"40x","description":"Faster deployments"},{"metric":"200+","description":"Dev talent pool access"},{"metric":"99.99%","description":"System uptime"}]$json$::jsonb,
  array['.NET Core','Angular','Azure','Docker','PostgreSQL','Event Sourcing','Kafka'],
  3
),
(
  'Real-Time Analytics Platform',
  'Financial Services Company',
  'Financial Services',
  '📈',
  'Data Platform',
  '10 months',
  '5 developers',
  $txt$Batch-based analytics system with 24-hour data lag causing delayed business insights, missed trading opportunities, and inability to detect fraud in real-time.$txt$,
  $txt$Built real-time streaming data pipeline with Apache Kafka, created interactive Angular dashboards, implemented ML-powered anomaly detection, and deployed on AWS for global scale.$txt$,
  $json$[{"metric":"100x","description":"Faster data processing"},{"metric":"Real-time","description":"Fraud detection"},{"metric":"$800K","description":"Infrastructure savings"},{"metric":"30%","description":"Revenue increase"}]$json$::jsonb,
  array['Node.js','Angular','Apache Kafka','Elasticsearch','AWS','Python','TensorFlow'],
  4
),
(
  'Healthcare Patient Portal',
  'Regional Hospital Network',
  'Healthcare',
  '🏥',
  'Patient Experience',
  '12 months',
  '5 developers',
  $txt$Fragmented patient experience with separate portals for appointments, records, and billing. Low patient engagement and high call center volumes for routine inquiries.$txt$,
  $txt$Built unified HIPAA-compliant patient portal with Angular frontend, secure .NET backend, integrated with Epic EHR via FHIR APIs, and added telehealth capabilities.$txt$,
  $json$[{"metric":"85%","description":"Patient adoption rate"},{"metric":"60%","description":"Fewer call center calls"},{"metric":"4.8/5","description":"Patient satisfaction"},{"metric":"50%","description":"Faster appointment booking"}]$json$::jsonb,
  array['Angular','.NET Core','Azure','FHIR APIs','Epic Integration','SQL Server','WebRTC'],
  5
),
(
  'Supply Chain Optimization',
  'Global Manufacturing Corp',
  'Manufacturing',
  '🏭',
  'IoT & Analytics',
  '14 months',
  '7 developers',
  $txt$No real-time visibility into supply chain, frequent stockouts and overstock situations, manual demand forecasting causing $3M annually in carrying costs.$txt$,
  $txt$Implemented IoT sensors across warehouses, built real-time tracking dashboard with Angular, deployed ML-based demand forecasting, and automated reorder processes.$txt$,
  $json$[{"metric":"35%","description":"Inventory reduction"},{"metric":"95%","description":"Order fulfillment rate"},{"metric":"$2.5M","description":"Annual savings"},{"metric":"Real-time","description":"Supply chain visibility"}]$json$::jsonb,
  array['Angular','Node.js','AWS IoT','Python','TensorFlow','PostgreSQL','Grafana'],
  6
),
(
  'EdTech Learning Platform',
  'Online Education Startup',
  'Education',
  '🎓',
  'Platform Development',
  '9 months',
  '4 developers',
  $txt$Needed to launch competitive online learning platform from scratch with live classes, course management, and progress tracking to compete with established players.$txt$,
  $txt$Built full-featured LMS with Angular frontend, Node.js backend, integrated video streaming, gamification features, and AI-powered personalized learning paths.$txt$,
  $json$[{"metric":"50K+","description":"Active students"},{"metric":"92%","description":"Course completion rate"},{"metric":"4.9/5","description":"App store rating"},{"metric":"$5M","description":"First-year revenue"}]$json$::jsonb,
  array['Angular','Node.js','MongoDB','AWS','WebRTC','Redis','Stripe'],
  7
),
(
  'Fintech Payment Gateway',
  'Digital Payments Startup',
  'Financial Services',
  '💳',
  'Payment Infrastructure',
  '11 months',
  '6 developers',
  $txt$Needed PCI-DSS compliant payment processing system to handle high transaction volumes with sub-second latency and 99.99% uptime requirements.$txt$,
  $txt$Architected microservices-based payment gateway with .NET Core, implemented distributed caching, built fraud detection ML models, and deployed multi-region on Azure.$txt$,
  $json$[{"metric":"10M+","description":"Monthly transactions"},{"metric":"99.99%","description":"System uptime"},{"metric":"<100ms","description":"Transaction latency"},{"metric":"0.01%","description":"Fraud rate"}]$json$::jsonb,
  array['.NET Core','Angular','Azure','Redis','Kafka','PostgreSQL','ML.NET'],
  8
),
(
  'Restaurant Chain POS System',
  'National Restaurant Group',
  'Hospitality',
  '🍽️',
  'Point of Sale',
  '10 months',
  '5 developers',
  $txt$Outdated POS system causing slow order processing, inventory discrepancies, and no integration with online ordering platforms.$txt$,
  $txt$Built cloud-based POS with real-time inventory sync, integrated with DoorDash/UberEats APIs, and implemented AI-driven demand forecasting.$txt$,
  $json$[{"metric":"40%","description":"Faster order processing"},{"metric":"25%","description":"Reduced food waste"},{"metric":"200+","description":"Locations deployed"},{"metric":"$3M","description":"Annual savings"}]$json$::jsonb,
  array['Angular','Node.js','MongoDB','AWS','Redis','GraphQL','React Native'],
  9
),
(
  'Insurance Claims Automation',
  'Top 10 Insurance Provider',
  'Insurance',
  '📋',
  'Process Automation',
  '12 months',
  '8 developers',
  $txt$Manual claims processing taking 15+ days on average, high error rates, and customer complaints about lack of transparency.$txt$,
  $txt$Implemented AI-powered claims assessment, automated document processing with OCR, and built customer self-service portal with real-time status tracking.$txt$,
  $json$[{"metric":"80%","description":"Faster claims processing"},{"metric":"95%","description":"Accuracy rate"},{"metric":"45%","description":"Cost reduction"},{"metric":"4.7/5","description":"Customer satisfaction"}]$json$::jsonb,
  array['.NET Core','Angular','Azure Cognitive Services','SQL Server','Power Automate','Cosmos DB'],
  10
),
(
  'Smart City Traffic Management',
  'Metropolitan City Government',
  'Government',
  '🚦',
  'IoT Platform',
  '18 months',
  '10 developers',
  $txt$Growing traffic congestion costing the city $50M annually in lost productivity, outdated traffic signal timing, and no real-time monitoring.$txt$,
  $txt$Deployed IoT sensors at 500+ intersections, built AI-driven traffic optimization, and created real-time monitoring dashboard for city operators.$txt$,
  $json$[{"metric":"30%","description":"Reduced congestion"},{"metric":"22%","description":"Lower emissions"},{"metric":"$15M","description":"Annual savings"},{"metric":"500+","description":"Connected intersections"}]$json$::jsonb,
  array['Python','Angular','TensorFlow','AWS IoT','Kafka','PostgreSQL','Grafana'],
  11
),
(
  'Telehealth Platform',
  'Healthcare Startup',
  'Healthcare',
  '👨‍⚕️',
  'Platform Development',
  '8 months',
  '6 developers',
  $txt$COVID-19 pandemic created urgent need for virtual care platform with video consultations, prescription management, and EHR integration.$txt$,
  $txt$Built HIPAA-compliant telehealth platform with WebRTC video, e-prescribing integration, and seamless Epic/Cerner EHR connectivity.$txt$,
  $json$[{"metric":"100K+","description":"Monthly consultations"},{"metric":"4.9/5","description":"Patient rating"},{"metric":"85%","description":"First-visit resolution"},{"metric":"$20M","description":"Series B funding"}]$json$::jsonb,
  array['Angular','Node.js','WebRTC','AWS','HL7 FHIR','PostgreSQL','Twilio'],
  12
),
(
  'Fleet Management System',
  'Logistics Enterprise',
  'Transportation',
  '🚛',
  'IoT & Analytics',
  '14 months',
  '7 developers',
  $txt$No real-time visibility into 2,000+ vehicle fleet, fuel theft issues, and inefficient route planning costing millions annually.$txt$,
  $txt$Implemented GPS tracking with telematics, built AI-powered route optimization, and created predictive maintenance system using vehicle sensor data.$txt$,
  $json$[{"metric":"18%","description":"Fuel savings"},{"metric":"25%","description":"More deliveries/day"},{"metric":"$4M","description":"Annual savings"},{"metric":"40%","description":"Less vehicle downtime"}]$json$::jsonb,
  array['Angular','.NET Core','Azure IoT','ML.NET','SQL Server','SignalR','Power BI'],
  13
),
(
  'Digital Banking Platform',
  'Regional Credit Union',
  'Banking',
  '🏦',
  'Digital Transformation',
  '16 months',
  '9 developers',
  $txt$Legacy core banking system limiting digital capabilities, losing younger customers to fintech competitors, and high operational costs.$txt$,
  $txt$Built modern digital banking platform with mobile-first design, integrated with core banking via APIs, and added features like instant transfers and budgeting tools.$txt$,
  $json$[{"metric":"150%","description":"Mobile adoption increase"},{"metric":"60%","description":"Fewer branch visits"},{"metric":"35K","description":"New accounts"},{"metric":"$2M","description":"Annual savings"}]$json$::jsonb,
  array['Angular','.NET Core','Azure','Plaid','SQL Server','Redis','Ionic'],
  14
),
(
  'HR & Talent Management System',
  'Fortune 100 Corporation',
  'Enterprise',
  '👥',
  'Enterprise Software',
  '20 months',
  '12 developers',
  $txt$Fragmented HR systems across 50+ countries, compliance challenges, and poor employee experience affecting talent retention.$txt$,
  $txt$Built unified global HR platform with localization for 30+ countries, integrated payroll systems, and implemented AI-powered talent matching.$txt$,
  $json$[{"metric":"200K+","description":"Employees onboarded"},{"metric":"50%","description":"Faster hiring"},{"metric":"30%","description":"Better retention"},{"metric":"$10M","description":"Annual savings"}]$json$::jsonb,
  array['Angular','.NET Core','Azure','Workday Integration','SQL Server','Power BI','Azure AD'],
  15
),
(
  'Property Management Platform',
  'Real Estate Investment Trust',
  'Real Estate',
  '🏢',
  'Platform Development',
  '11 months',
  '5 developers',
  $txt$Managing 500+ commercial properties with spreadsheets, tenant communication issues, and no visibility into maintenance requests.$txt$,
  $txt$Built comprehensive property management platform with tenant portal, automated rent collection, and IoT-enabled building management.$txt$,
  $json$[{"metric":"98%","description":"Rent collection rate"},{"metric":"60%","description":"Faster maintenance"},{"metric":"500+","description":"Properties managed"},{"metric":"$5M","description":"Revenue increase"}]$json$::jsonb,
  array['Angular','Node.js','PostgreSQL','AWS','Stripe','SendGrid','IoT sensors'],
  16
),
(
  'Legal Document Automation',
  'Top 50 Law Firm',
  'Legal',
  '⚖️',
  'AI Automation',
  '9 months',
  '4 developers',
  $txt$Associates spending 60% of time on document review, high billing disputes, and inconsistent contract quality across offices.$txt$,
  $txt$Implemented AI-powered contract analysis, built template-based document generation, and created automated billing reconciliation system.$txt$,
  $json$[{"metric":"70%","description":"Less review time"},{"metric":"99%","description":"Contract accuracy"},{"metric":"$8M","description":"Additional billable hours"},{"metric":"40%","description":"Faster turnaround"}]$json$::jsonb,
  array['Python','Angular','Azure OpenAI','Elasticsearch','.NET Core','SQL Server','DocuSign'],
  17
),
(
  'Energy Trading Platform',
  'Energy Trading Firm',
  'Energy',
  '⚡',
  'Trading System',
  '15 months',
  '8 developers',
  $txt$Legacy trading system couldn't handle market volatility, slow execution causing missed opportunities, and regulatory compliance gaps.$txt$,
  $txt$Built high-frequency trading platform with sub-millisecond latency, real-time risk management, and automated regulatory reporting.$txt$,
  $json$[{"metric":"<1ms","description":"Trade execution"},{"metric":"99.999%","description":"System uptime"},{"metric":"35%","description":"Trading volume increase"},{"metric":"$50M","description":"Annual profit increase"}]$json$::jsonb,
  array['.NET Core','Angular','Kafka','Redis','PostgreSQL','TimescaleDB','Kubernetes'],
  18
),
(
  'Pharmaceutical R&D Platform',
  'Biotech Company',
  'Pharmaceutical',
  '💊',
  'Research Platform',
  '18 months',
  '10 developers',
  $txt$Clinical trial data scattered across systems, slow drug discovery process, and difficulty meeting FDA submission requirements.$txt$,
  $txt$Built unified research platform with ML-powered drug candidate screening, automated FDA submission generation, and real-time trial monitoring.$txt$,
  $json$[{"metric":"40%","description":"Faster drug discovery"},{"metric":"100%","description":"FDA compliance"},{"metric":"3","description":"Drugs fast-tracked"},{"metric":"$100M+","description":"R&D savings"}]$json$::jsonb,
  array['Python','Angular','.NET Core','Azure','TensorFlow','PostgreSQL','Databricks'],
  19
),
(
  'Sports Betting Platform',
  'Gaming Startup',
  'Gaming',
  '🎰',
  'Platform Development',
  '12 months',
  '7 developers',
  $txt$Entering competitive sports betting market requiring real-time odds, high concurrency during events, and strict gaming compliance.$txt$,
  $txt$Built scalable betting platform with real-time odds engine, implemented responsible gaming features, and achieved multi-state licensing.$txt$,
  $json$[{"metric":"500K+","description":"Active users"},{"metric":"1M+","description":"Bets per day"},{"metric":"12","description":"States licensed"},{"metric":"$30M","description":"First-year GGR"}]$json$::jsonb,
  array['Node.js','Angular','Redis','Kafka','PostgreSQL','AWS','Terraform'],
  20
),
(
  'Agricultural IoT Platform',
  'AgTech Startup',
  'Agriculture',
  '🌾',
  'IoT Platform',
  '10 months',
  '5 developers',
  $txt$Farmers lacked data-driven insights, water waste in irrigation, and crop yield predictions were unreliable.$txt$,
  $txt$Deployed soil sensors and weather stations, built AI crop management platform, and implemented precision irrigation system.$txt$,
  $json$[{"metric":"30%","description":"Water savings"},{"metric":"25%","description":"Yield increase"},{"metric":"10K+","description":"Acres monitored"},{"metric":"$5M","description":"Farmer savings"}]$json$::jsonb,
  array['Python','Angular','AWS IoT','TensorFlow','PostgreSQL','Grafana','LoRaWAN'],
  21
),
(
  'Airline Operations System',
  'Regional Airline',
  'Aviation',
  '✈️',
  'Operations Platform',
  '14 months',
  '8 developers',
  $txt$Manual crew scheduling, flight disruption management causing delays, and no integrated view of operations.$txt$,
  $txt$Built integrated operations control center with AI crew optimization, real-time disruption management, and predictive maintenance.$txt$,
  $json$[{"metric":"35%","description":"Fewer delays"},{"metric":"$8M","description":"Annual savings"},{"metric":"15%","description":"Better fuel efficiency"},{"metric":"98%","description":"On-time performance"}]$json$::jsonb,
  array['.NET Core','Angular','Azure','ML.NET','SQL Server','SignalR','Power BI'],
  22
),
(
  'Subscription Box Platform',
  'D2C E-commerce Brand',
  'E-Commerce',
  '📦',
  'E-Commerce Platform',
  '7 months',
  '4 developers',
  $txt$High customer acquisition costs, poor retention rates, and fulfillment errors causing customer complaints.$txt$,
  $txt$Built personalized subscription platform with AI product recommendations, automated fulfillment integration, and customer engagement tools.$txt$,
  $json$[{"metric":"45%","description":"Better retention"},{"metric":"30%","description":"Higher AOV"},{"metric":"200K","description":"Subscribers"},{"metric":"99.5%","description":"Fulfillment accuracy"}]$json$::jsonb,
  array['Angular','Node.js','MongoDB','Stripe','ShipStation','Klaviyo','AWS'],
  23
),
(
  'Construction Project Management',
  'General Contractor',
  'Construction',
  '🏗️',
  'Project Management',
  '11 months',
  '6 developers',
  $txt$Projects consistently over budget, poor subcontractor coordination, and no real-time visibility into project status.$txt$,
  $txt$Built construction management platform with BIM integration, automated progress tracking using drone imagery, and predictive cost management.$txt$,
  $json$[{"metric":"20%","description":"Under budget"},{"metric":"30%","description":"Faster completion"},{"metric":"$50M+","description":"Projects managed"},{"metric":"Zero","description":"Safety incidents"}]$json$::jsonb,
  array['Angular','.NET Core','Azure','Autodesk APIs','Computer Vision','PostgreSQL','Power BI'],
  24
),
(
  'Nonprofit Donor Management',
  'National Charity Organization',
  'Nonprofit',
  '❤️',
  'CRM Platform',
  '8 months',
  '4 developers',
  $txt$Disconnected donor data, ineffective fundraising campaigns, and high administrative overhead limiting program spending.$txt$,
  $txt$Built unified donor platform with AI-powered giving predictions, automated campaign management, and integrated volunteer coordination.$txt$,
  $json$[{"metric":"50%","description":"More donations"},{"metric":"35%","description":"Lower admin costs"},{"metric":"2M+","description":"Donors managed"},{"metric":"85%","description":"Donor retention"}]$json$::jsonb,
  array['Angular','Node.js','Salesforce NPSP','AWS','Stripe','Mailchimp','PostgreSQL'],
  25
),
(
  'Gym & Fitness Platform',
  'Fitness Franchise',
  'Fitness',
  '💪',
  'Member Platform',
  '9 months',
  '5 developers',
  $txt$Member engagement dropping, no virtual class offerings, and each franchise location operating on different systems.$txt$,
  $txt$Built unified fitness platform with on-demand classes, wearable integration, and franchise-wide member management.$txt$,
  $json$[{"metric":"60%","description":"Member engagement up"},{"metric":"300+","description":"Locations unified"},{"metric":"40%","description":"Revenue increase"},{"metric":"4.8/5","description":"App store rating"}]$json$::jsonb,
  array['Angular','Node.js','AWS','React Native','Stripe','MongoDB','Wearable SDKs'],
  26
),
(
  'Hotel Revenue Management',
  'Boutique Hotel Chain',
  'Hospitality',
  '🏨',
  'Revenue Optimization',
  '10 months',
  '5 developers',
  $txt$Static pricing losing revenue, no competitive rate intelligence, and poor demand forecasting leading to empty rooms.$txt$,
  $txt$Built dynamic pricing engine with ML demand forecasting, competitor rate monitoring, and automated channel management.$txt$,
  $json$[{"metric":"25%","description":"RevPAR increase"},{"metric":"15%","description":"Higher occupancy"},{"metric":"$3M","description":"Additional revenue"},{"metric":"Real-time","description":"Rate optimization"}]$json$::jsonb,
  array['Python','Angular','.NET Core','Azure ML','PostgreSQL','Redis','OTA APIs'],
  27
),
(
  'Media Streaming Platform',
  'Sports Media Company',
  'Media',
  '📺',
  'Streaming Platform',
  '14 months',
  '9 developers',
  $txt$Needed to launch direct-to-consumer streaming service to compete with major platforms while maintaining broadcast quality.$txt$,
  $txt$Built scalable OTT platform with adaptive bitrate streaming, personalized content recommendations, and multi-device support.$txt$,
  $json$[{"metric":"2M+","description":"Subscribers"},{"metric":"99.9%","description":"Stream uptime"},{"metric":"4K HDR","description":"Quality delivered"},{"metric":"$50M","description":"Annual revenue"}]$json$::jsonb,
  array['Angular','Node.js','AWS MediaServices','CDN','MongoDB','Redis','Roku/Apple TV SDKs'],
  28
),
(
  'Warehouse Automation System',
  '3PL Provider',
  'Logistics',
  '📦',
  'Automation',
  '16 months',
  '8 developers',
  $txt$Manual picking processes causing errors, slow order fulfillment, and difficulty scaling during peak seasons.$txt$,
  $txt$Implemented automated picking with robotics, built WMS with real-time inventory, and deployed predictive demand planning.$txt$,
  $json$[{"metric":"300%","description":"Throughput increase"},{"metric":"99.9%","description":"Picking accuracy"},{"metric":"50%","description":"Labor cost reduction"},{"metric":"Same-day","description":"Shipping capability"}]$json$::jsonb,
  array['Python','Angular','.NET Core','ROS','AWS','PostgreSQL','Computer Vision'],
  29
),
(
  'Veterinary Practice Management',
  'Vet Clinic Chain',
  'Veterinary',
  '🐾',
  'Practice Management',
  '8 months',
  '4 developers',
  $txt$Paper-based records, double-booked appointments, and no integrated pharmacy or lab management.$txt$,
  $txt$Built cloud-based practice management with electronic records, online booking, integrated pharmacy, and client communication portal.$txt$,
  $json$[{"metric":"40%","description":"More appointments"},{"metric":"Zero","description":"Double bookings"},{"metric":"35%","description":"Revenue increase"},{"metric":"4.9/5","description":"Client satisfaction"}]$json$::jsonb,
  array['Angular','Node.js','MongoDB','AWS','Twilio','Stripe','Lab integrations'],
  30
),
(
  'Electric Vehicle Charging Network',
  'EV Infrastructure Company',
  'Energy',
  '🔌',
  'IoT Platform',
  '12 months',
  '7 developers',
  $txt$Managing 5,000+ charging stations, real-time availability updates needed, and complex billing for different rate structures.$txt$,
  $txt$Built charging network platform with real-time station monitoring, mobile app for drivers, and flexible billing engine.$txt$,
  $json$[{"metric":"5K+","description":"Stations managed"},{"metric":"99.5%","description":"Station uptime"},{"metric":"1M+","description":"Charging sessions/month"},{"metric":"Real-time","description":"Availability updates"}]$json$::jsonb,
  array['Angular','Node.js','OCPP','AWS IoT','PostgreSQL','Redis','React Native'],
  31
),
(
  'Fashion E-commerce Personalization',
  'Online Fashion Retailer',
  'Retail',
  '👗',
  'AI Personalization',
  '9 months',
  '5 developers',
  $txt$Low conversion rates, high return rates due to sizing issues, and generic product recommendations.$txt$,
  $txt$Implemented AI-powered virtual try-on, size recommendation engine, and personalized product discovery using computer vision.$txt$,
  $json$[{"metric":"45%","description":"Conversion increase"},{"metric":"35%","description":"Fewer returns"},{"metric":"60%","description":"Higher engagement"},{"metric":"$15M","description":"Additional revenue"}]$json$::jsonb,
  array['Python','Angular','TensorFlow','AWS','Computer Vision','PostgreSQL','Redis'],
  32
),
(
  'Museum Digital Experience',
  'National Museum',
  'Arts & Culture',
  '🏛️',
  'Digital Experience',
  '10 months',
  '5 developers',
  $txt$Declining visitor engagement, no digital presence for collections, and missed revenue opportunities from virtual visitors.$txt$,
  $txt$Built immersive digital platform with virtual tours, AR exhibit enhancement, online ticketing, and educational content portal.$txt$,
  $json$[{"metric":"500K+","description":"Virtual visitors"},{"metric":"45%","description":"More engagement"},{"metric":"$2M","description":"Digital revenue"},{"metric":"Global","description":"Audience reach"}]$json$::jsonb,
  array['Angular','Three.js','AR.js','Node.js','AWS','MongoDB','Stripe'],
  33
),
(
  'Insurance Underwriting AI',
  'Commercial Insurance Provider',
  'Insurance',
  '📊',
  'AI Platform',
  '14 months',
  '8 developers',
  $txt$Manual underwriting taking weeks, inconsistent risk assessment, and losing deals to faster competitors.$txt$,
  $txt$Built AI-powered underwriting platform with automated risk scoring, document analysis, and instant quote generation.$txt$,
  $json$[{"metric":"Minutes","description":"vs weeks for quotes"},{"metric":"30%","description":"Better loss ratios"},{"metric":"3x","description":"Quote volume"},{"metric":"$20M","description":"New premium"}]$json$::jsonb,
  array['.NET Core','Angular','Azure ML','Cosmos DB','Azure Cognitive Services','Power BI'],
  34
),
(
  'Concert Ticketing Platform',
  'Live Events Company',
  'Entertainment',
  '🎵',
  'E-Commerce',
  '8 months',
  '6 developers',
  $txt$Bot scalping causing customer frustration, payment failures during high-demand sales, and no secondary market control.$txt$,
  $txt$Built anti-bot ticketing platform with queue management, blockchain-verified tickets, and controlled resale marketplace.$txt$,
  $json$[{"metric":"95%","description":"Bot prevention"},{"metric":"Zero","description":"Payment failures"},{"metric":"5M+","description":"Tickets sold"},{"metric":"50%","description":"Scalping reduction"}]$json$::jsonb,
  array['Angular','Node.js','AWS','Redis','PostgreSQL','Blockchain','Stripe'],
  35
),
(
  'Clinical Laboratory System',
  'Diagnostic Lab Network',
  'Healthcare',
  '🔬',
  'LIS/LIMS',
  '15 months',
  '8 developers',
  $txt$Paper-based workflows, manual result entry causing errors, and slow turnaround times affecting patient care.$txt$,
  $txt$Built modern LIS with automated instrument integration, real-time result delivery, and patient portal access.$txt$,
  $json$[{"metric":"70%","description":"Faster turnaround"},{"metric":"99.9%","description":"Result accuracy"},{"metric":"10M+","description":"Tests/year processed"},{"metric":"Zero","description":"Critical result delays"}]$json$::jsonb,
  array['.NET Core','Angular','HL7','SQL Server','Azure','ASTM','Power BI'],
  36
),
(
  'Renewable Energy Trading',
  'Clean Energy Developer',
  'Energy',
  '🌱',
  'Trading Platform',
  '11 months',
  '6 developers',
  $txt$Complex REC trading requirements, manual tracking of renewable credits, and regulatory reporting burden.$txt$,
  $txt$Built renewable energy certificate trading platform with automated tracking, market integration, and compliance reporting.$txt$,
  $json$[{"metric":"$100M+","description":"Credits traded"},{"metric":"100%","description":"Compliance rate"},{"metric":"80%","description":"Less admin time"},{"metric":"Real-time","description":"Market access"}]$json$::jsonb,
  array['Angular','.NET Core','Azure','PostgreSQL','Blockchain','Power BI','RESTful APIs'],
  37
);

-- Portfolio testimonial (single client quote near top of page)
delete from testimonials where context = 'portfolio';
insert into testimonials (context, quote, author_name, author_title, company, sort_order) values
(
  'portfolio',
  $txt$Working with Nexa Web Service was a game-changer for our business. They transformed our legacy systems into a modern, scalable platform that reduced our operational costs by 40% and improved customer satisfaction scores dramatically.$txt$,
  'Representative Client Feedback',
  'Enterprise Digital Transformation Project',
  null,
  1
);

-- ============================================================================
-- 06_testimonials_faq.sql
-- ============================================================================
-- Seed: home testimonials, testimonials trust stats, and FAQ page
-- Transcribed verbatim from testimonials.component.ts / faq.component.ts

-- Scoped delete (not truncate): the `testimonials` table also holds
-- context='portfolio' rows owned by a different page's seed script.
delete from testimonials where context = 'home';
insert into testimonials (context, quote, author_name, author_title, company, sort_order) values
('home', $txt$Exceptional work. The modernization of our legacy system exceeded expectations. They delivered on time and under budget while maintaining zero downtime during the transition.$txt$, 'John Smith', 'Chief Technology Officer', 'Fortune 500 Tech Company', 1),
('home', $txt$A rare combination of technical expertise and business acumen. They understood our challenges and delivered solutions that drove real revenue growth of 40% in the first quarter.$txt$, 'Sarah Johnson', 'Founder & CEO', 'SaaS Startup', 2),
('home', $txt$Professional, responsive, and brilliant. They took our vague ideas and turned them into a scalable, high-performing system that handles 10x our previous traffic with ease.$txt$, 'Michael Chen', 'VP of Engineering', 'E-Commerce Leader', 3),
('home', $txt$The technical leadership and mentoring they provided transformed our entire engineering team. The knowledge transfer was exceptional and continues to benefit us.$txt$, 'Emily Rodriguez', 'Engineering Manager', 'Financial Services Corp', 4),
('home', $txt$Outstanding ROI on the investment. Not just good code, but strategic solutions that aligned perfectly with our business objectives and reduced operational costs by 60%.$txt$, 'David Park', 'Chief Strategy Officer', 'Insurance Corporation', 5),
('home', $txt$Rare to find someone with this depth of expertise across so many technologies and the wisdom to choose exactly the right tool for each problem we faced.$txt$, 'Lisa Martinez', 'Product Director', 'Healthcare Tech', 6);

-- Trust stats shown beneath the home testimonials carousel.
-- icon holds the raw inline SVG markup, rendered via [innerHTML] the same way header/footer icons are.
delete from stat_blocks where page = 'home' and section = 'testimonials_trust';
insert into stat_blocks (page, section, icon, value, label, sort_order) values
('home', 'testimonials_trust', $svg$<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>$svg$, '50+', 'Happy Clients', 1),
('home', 'testimonials_trust', $svg$<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>$svg$, '4.9', 'Avg. Rating', 2),
('home', 'testimonials_trust', $svg$<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12" /></svg>$svg$, '98%', 'Satisfaction', 3),
('home', 'testimonials_trust', $svg$<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" /></svg>$svg$, '24h', 'Response Time', 4);

-- FAQ categories: explicit ids so faq_items can reference them directly below.
truncate table faq_categories restart identity cascade;
insert into faq_categories (id, label, icon, sort_order) overriding system value values
(1, 'Working Internationally', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>$svg$, 1),
(2, 'Payments & Pricing', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>$svg$, 2),
(3, 'Projects & Process', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>$svg$, 3),
(4, 'Academy / Courses', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>$svg$, 4),
(5, 'Support & Maintenance', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>$svg$, 5);

select setval(pg_get_serial_sequence('faq_categories', 'id'), (select max(id) from faq_categories));

truncate table faq_items restart identity cascade;
insert into faq_items (category_id, question, answer, sort_order) values
(1, 'Do you work with US clients remotely?', $txt$Yes — absolutely. We work with US clients every day. Our team delivers US-level expertise at a competitive rate, with timezone flexibility to overlap with US business hours. We've successfully delivered projects for clients in New York, Texas, California, and across the US.$txt$, 1),
(1, 'How do you handle the timezone difference?', $txt$We operate on UTC+5, which overlaps with US Eastern mornings and US West Coast late evenings. We schedule all calls and standups to suit your timezone, typically at a time that works for you between 8am–12pm EST. Async communication via Slack/email handles the rest seamlessly.$txt$, 2),
(1, 'How do we communicate during the project?', $txt$We use whichever tools you prefer: <strong>Slack</strong> for daily communication, <strong>Zoom / Google Meet</strong> for calls, <strong>Notion or Linear</strong> for project tracking, and <strong>GitHub</strong> for code reviews. You'll always know the project status without needing to chase us.$txt$, 3),
(1, 'Have you worked with US clients before?', $txt$Yes. We have completed 50+ projects for international clients including US-based businesses across e-commerce, SaaS, healthcare, and finance. References are available upon request.$txt$, 4),
(1, 'Do I need to worry about language barriers?', $txt$Not at all. Kamran and the team are fully fluent in English — both written and spoken. All documentation, code comments, and communication are in English.$txt$, 5),

(2, 'How do I pay in USD from the US?', $txt$We accept payments via <strong>PayPal</strong>, <strong>Wise (TransferWise)</strong>, and <strong>direct bank wire transfer</strong>. All are safe, standard methods used by US clients daily. You'll receive a proper invoice in USD before any payment is due.$txt$, 1),
(2, 'What is the payment structure?', $txt$Standard structure: <strong>50% upfront</strong> to begin work, <strong>50% on delivery</strong>. For larger projects (over $5K), we use milestone-based payments — you pay per completed phase. We never ask for 100% upfront.$txt$, 2),
(2, 'Are your prices negotiable?', $txt$We price projects based on scope, not arbitrary numbers. During the free consultation, we'll understand exactly what you need and give you a fixed quote. If the scope changes, we discuss it openly — no surprise invoices.$txt$, 3),
(2, 'Do you charge by the hour or per project?', $txt$We prefer <strong>fixed-price projects</strong> — it protects you from runaway costs. For ongoing maintenance or consulting retainers, we offer hourly rates starting at $25/hr. Rates are clearly agreed before any work begins.$txt$, 4),
(2, 'Is there a refund policy?', $txt$Yes. If we fail to deliver what was agreed in the contract, you are entitled to a partial or full refund for undelivered work. We've never had to issue a refund — but the protection is there in writing.$txt$, 5),

(3, 'What types of projects do you take?', $txt$We specialize in web applications, business websites, e-commerce platforms, SaaS products, API development, and legacy system modernization. We also offer technical consulting and code reviews.$txt$, 1),
(3, 'How long does a project take?', $txt$A landing page: 1–2 weeks. A full business website: 3–6 weeks. A web application or SaaS: 2–4 months. Enterprise projects: 6–12 months. We give you a realistic timeline upfront — not one we can't keep.$txt$, 2),
(3, 'What do you need from me to start?', $txt$Just your goals, any existing brand assets (logo, colors), and examples of sites you like. We handle everything else — design, development, deployment. A 30-minute call is usually enough to get started.$txt$, 3),
(3, 'Do you sign NDAs?', $txt$Yes, without hesitation. We take confidentiality seriously. We're happy to sign your NDA before discussing any proprietary details of your project.$txt$, 4),
(3, 'Who owns the code after the project?', $txt$You do — 100%. On final payment, full ownership of all code, design assets, and intellectual property transfers to you. This is written into every contract.$txt$, 5),

(4, 'Are the courses self-paced or live?', $txt$Courses are taught with a mix of recorded content and live mentorship sessions. You can follow at your own pace, and weekly 1-on-1 mentor calls keep you on track.$txt$, 1),
(4, 'Do I get a certificate?', $txt$Yes. Every course includes a certificate of completion that you can add to your LinkedIn profile and resume.$txt$, 2),
(4, 'Is the academy only for beginners?', $txt$No. We offer courses from complete beginner (HTML & CSS) to professional full-stack development. There's a path for every level.$txt$, 3),
(4, 'What if I fall behind or need more help?', $txt$No problem. You get lifetime access to course materials. If you need extra help, just message your mentor on WhatsApp — we're responsive and want to see you succeed.$txt$, 4),
(4, 'Can international students enroll?', $txt$Yes — students from any country can enroll. Courses are taught in English and available online. Payment can be made via PayPal or Wise.$txt$, 5),

(5, 'What happens after the project launches?', $txt$All projects include a post-launch support period (1 month for Starter, 3 months for Business, 6+ months for Enterprise). During this time, we fix any bugs at no extra charge and answer questions.$txt$, 1),
(5, 'Do you offer ongoing maintenance?', $txt$Yes. We offer monthly maintenance retainers starting at $150/month, which includes updates, security patches, performance monitoring, and up to 5 hours of changes per month.$txt$, 2),
(5, 'What if I find a bug after support ends?', $txt$Bug fixes after the support period are billed at our hourly rate ($25/hr). Most fixes are quick and inexpensive. We never leave a client stranded.$txt$, 3);

-- Do NOT insert any rows into video_testimonials — left empty per project convention
-- (see memory note [[video-testimonials-restore]]).

-- ============================================================================
-- 07_blog.sql
-- ============================================================================
-- Blog content seed data
-- Generated from src/assets/articles/*.json (index.json + per-article files)

truncate table blog_articles restart identity cascade;
truncate table blog_categories restart identity cascade;
truncate table blog_topics restart identity cascade;

insert into blog_articles (id, title, excerpt, content, date, category, read_time, icon, tags, featured, author_name, author_role, author_avatar, sort_order) values
($id$featured-digital-transformation$id$, $title$The Complete Guide to Digital Transformation in 2024$title$, $excerpt$Discover the strategies, technologies, and best practices that are driving successful digital transformation initiatives across American businesses. Learn from real case studies and avoid common pitfalls.$excerpt$, $content$<h2>Introduction</h2><p>Digital transformation has become more than just a buzzword—it's a critical business imperative. In 2024, organizations that fail to adapt risk being left behind by more agile competitors. This comprehensive guide will walk you through everything you need to know about successfully navigating your digital transformation journey.</p><h2>What is Digital Transformation?</h2><p>Digital transformation is the process of using digital technologies to create new—or modify existing—business processes, culture, and customer experiences to meet changing business and market requirements. This reimagining of business in the digital age is digital transformation.</p><h3>Key Components of Digital Transformation</h3><ul><li><strong>Customer Experience:</strong> Using technology to improve how customers interact with your business</li><li><strong>Operational Agility:</strong> Streamlining processes and enabling faster decision-making</li><li><strong>Culture and Leadership:</strong> Building a digital-first mindset across the organization</li><li><strong>Workforce Enablement:</strong> Equipping employees with digital tools and skills</li><li><strong>Digital Technology Integration:</strong> Implementing cloud, AI, and automation solutions</li></ul><h2>The Business Case for Digital Transformation</h2><p>According to recent studies, companies that have embraced digital transformation are:</p><ul><li>26% more profitable than their industry peers</li><li>12% higher in market valuation</li><li>Achieving 23% higher revenue growth</li></ul><h2>Common Challenges and How to Overcome Them</h2><h3>1. Legacy System Integration</h3><p>Many organizations struggle with integrating new digital solutions with existing legacy systems. The key is to adopt an incremental approach, using APIs and middleware to bridge the gap between old and new systems.</p><h3>2. Cultural Resistance</h3><p>Change is hard, and digital transformation requires significant cultural shifts. Success requires buy-in from leadership and clear communication about the benefits of transformation at every level of the organization.</p><h3>3. Skill Gaps</h3><p>Digital transformation often requires skills that may not exist within your current workforce. Invest in training programs and consider strategic hiring to fill critical gaps.</p><h2>Best Practices for Success</h2><ol><li><strong>Start with a clear strategy:</strong> Define your goals and how digital transformation will help achieve them</li><li><strong>Focus on customer value:</strong> Every initiative should ultimately improve customer experience</li><li><strong>Embrace agile methodologies:</strong> Move fast, learn quickly, and iterate</li><li><strong>Measure and optimize:</strong> Establish KPIs and continuously improve based on data</li><li><strong>Build partnerships:</strong> Work with experienced technology partners who can accelerate your journey</li></ol><h2>Conclusion</h2><p>Digital transformation is not a destination but a continuous journey. Organizations that approach it strategically, with clear goals and a commitment to cultural change, will be best positioned to thrive in the digital economy. The time to start is now.</p>$content$, '2024-01-01', $cat$Digital Transformation$cat$, 15, $icon$🚀$icon$, '{"Strategy","Cloud","AI","Innovation"}', true, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 0),
($id$angular-ssr-seo$id$, $title$Why Angular SSR Beats React for SEO in 2024$title$, $excerpt$A comprehensive comparison of server-side rendering implementations and their impact on search engine optimization, performance, and user experience.$excerpt$, $content$<h2>The SEO Challenge</h2><p>Search engine optimization is crucial for any web application. While both Angular and React offer server-side rendering solutions, Angular's approach provides distinct advantages for SEO that are worth exploring.</p><h2>Understanding Server-Side Rendering</h2><p>Server-side rendering (SSR) pre-renders pages on the server before sending them to the client. This means search engine crawlers can index the full content without executing JavaScript, which is critical for SEO.</p><h3>Angular Universal vs Next.js</h3><p>Angular Universal is Angular's official SSR solution, while Next.js serves the same purpose for React. Here's how they compare:</p><h4>Angular Universal Advantages:</h4><ul><li><strong>Integrated Solution:</strong> Built directly into the Angular ecosystem with first-class support</li><li><strong>TransferState:</strong> Built-in mechanism for transferring server state to the client without duplication</li><li><strong>Automatic Route Discovery:</strong> Angular's router integrates seamlessly with SSR</li><li><strong>Enterprise Support:</strong> Google's backing ensures long-term stability</li></ul><h2>Performance Metrics</h2><p>In our benchmarks, Angular SSR applications showed:</p><ul><li>20% faster Time to First Byte (TTFB)</li><li>15% improvement in Largest Contentful Paint (LCP)</li><li>Consistent First Input Delay (FID) scores below 100ms</li></ul><h2>SEO Best Practices with Angular</h2><h3>1. Meta Tag Management</h3><p>Angular's Meta and Title services provide easy programmatic control over SEO tags:</p><pre><code>constructor(private meta: Meta, private title: Title) {
  this.title.setTitle('Page Title | Your Site');
  this.meta.updateTag({ name: 'description', content: 'Page description' });
}</code></pre><h3>2. Structured Data</h3><p>Implementing JSON-LD structured data in Angular is straightforward and can significantly improve search result appearance.</p><h3>3. Canonical URLs</h3><p>Proper canonical URL management prevents duplicate content issues across your application.</p><h2>Conclusion</h2><p>While both frameworks can achieve excellent SEO results, Angular's integrated approach and enterprise-grade tooling make it the superior choice for SEO-critical applications in 2024.</p>$content$, '2024-01-01', $cat$Architecture$cat$, 8, $icon$🅰️$icon$, '{"Angular","SEO","SSR","Performance"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 1),
($id$microservices-guide$id$, $title$Microservices: When to Use and When to Avoid$title$, $excerpt$Understanding the trade-offs of microservices architecture and making the right choice for your organization's scale, complexity, and team structure.$excerpt$, $content$<h2>The Microservices Hype</h2><p>Microservices have been touted as the solution to all architectural problems, but the reality is more nuanced. This article will help you understand when microservices make sense and when they might be overkill.</p><h2>What Are Microservices?</h2><p>Microservices architecture structures an application as a collection of loosely coupled, independently deployable services. Each service is small, focused on a specific business capability, and can be developed and deployed independently.</p><h2>When Microservices Make Sense</h2><h3>✅ Large, Complex Domains</h3><p>If your application spans multiple business domains with distinct bounded contexts, microservices can help maintain separation of concerns.</p><h3>✅ Multiple Development Teams</h3><p>When you have 3+ teams working on the same application, microservices allow teams to work independently without stepping on each other's toes.</p><h3>✅ Different Scaling Requirements</h3><p>If different parts of your application have vastly different scaling needs, microservices allow you to scale individual components independently.</p><h3>✅ Technology Diversity Requirements</h3><p>When different services would benefit from different technology stacks, microservices provide that flexibility.</p><h2>When to Avoid Microservices</h2><h3>❌ Small Teams or Startups</h3><p>The operational overhead of microservices can be crushing for small teams. Start with a well-designed monolith.</p><h3>❌ Unclear Domain Boundaries</h3><p>If you don't understand your domain well enough to define clear service boundaries, you'll end up with a distributed mess.</p><h3>❌ Limited DevOps Maturity</h3><p>Microservices require sophisticated CI/CD pipelines, monitoring, and observability. Without these, you're setting yourself up for failure.</p><h2>The "Modular Monolith" Alternative</h2><p>Consider starting with a modular monolith—a well-structured monolithic application with clear internal boundaries. This gives you:</p><ul><li>Simpler deployment and operations</li><li>Clear path to microservices if needed later</li><li>Better performance (no network calls between modules)</li><li>Easier debugging and development</li></ul><h2>Conclusion</h2><p>Microservices are a powerful tool, but they're not a silver bullet. Carefully evaluate your organization's needs, team structure, and operational capabilities before making the leap. Sometimes, the best architecture is the one you can actually manage effectively.</p>$content$, '2023-12-01', $cat$Architecture$cat$, 12, $icon$🔌$icon$, '{"Microservices","Architecture","Scalability","Design"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 2),
($id$system-architecture-design-patterns$id$, $title$Essential Design Patterns for Enterprise Systems$title$, $excerpt$Master the fundamental design patterns that every software architect should know for building scalable, maintainable enterprise applications.$excerpt$, $content$<h2>Introduction to Design Patterns</h2><p>Design patterns are reusable solutions to common problems in software design. They represent best practices evolved over time by experienced software developers. Understanding and applying these patterns is crucial for building robust enterprise systems.</p><h2>Creational Patterns</h2><h3>Singleton Pattern</h3><p>Ensures a class has only one instance and provides a global point of access to it. Use cases include configuration managers, logging services, and database connection pools.</p><pre><code>public class ConfigurationManager {
    private static ConfigurationManager instance;
    private ConfigurationManager() {}
    
    public static ConfigurationManager getInstance() {
        if (instance == null) {
            instance = new ConfigurationManager();
        }
        return instance;
    }
}</code></pre><h3>Factory Pattern</h3><p>Provides an interface for creating objects without specifying their concrete classes. Essential for dependency injection and creating families of related objects.</p><h3>Builder Pattern</h3><p>Separates the construction of complex objects from their representation. Perfect for objects with many optional parameters.</p><h2>Structural Patterns</h2><h3>Adapter Pattern</h3><p>Allows incompatible interfaces to work together. Commonly used when integrating legacy systems with modern applications.</p><h3>Facade Pattern</h3><p>Provides a simplified interface to a complex subsystem. Reduces coupling between clients and complex systems.</p><h3>Decorator Pattern</h3><p>Adds behavior to objects dynamically without affecting other objects of the same class. Used extensively in I/O streams and middleware.</p><h2>Behavioral Patterns</h2><h3>Observer Pattern</h3><p>Defines a one-to-many dependency between objects. When one object changes state, all dependents are notified automatically. Foundation for event-driven architectures.</p><h3>Strategy Pattern</h3><p>Defines a family of algorithms and makes them interchangeable. Clients can switch algorithms at runtime without modifying the context.</p><h3>Command Pattern</h3><p>Encapsulates a request as an object, allowing parameterization and queuing of requests. Essential for implementing undo/redo functionality.</p><h2>Enterprise Patterns</h2><h3>Repository Pattern</h3><p>Mediates between the domain and data mapping layers. Provides a collection-like interface for accessing domain objects.</p><h3>Unit of Work Pattern</h3><p>Maintains a list of objects affected by a business transaction and coordinates writing out changes.</p><h3>CQRS Pattern</h3><p>Separates read and write operations for a data store. Improves performance, scalability, and security.</p><h2>Best Practices</h2><ul><li>Don't force patterns where they don't fit</li><li>Understand the problem before applying a pattern</li><li>Consider the trade-offs of each pattern</li><li>Document pattern usage in your codebase</li><li>Combine patterns when appropriate</li></ul><h2>Conclusion</h2><p>Design patterns are powerful tools in a software architect's toolkit. Master these patterns, understand their trade-offs, and apply them judiciously to create maintainable, scalable enterprise systems.</p>$content$, '2024-01-01', $cat$System Architecture$cat$, 12, $icon$🏗️$icon$, '{"Design Patterns","Architecture","Enterprise","Best Practices"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 3),
($id$system-architecture-domain-driven-design$id$, $title$Domain-Driven Design: A Practical Guide$title$, $excerpt$Learn how to apply Domain-Driven Design principles to create software that truly reflects business requirements and scales with organizational complexity.$excerpt$, $content$<h2>What is Domain-Driven Design?</h2><p>Domain-Driven Design (DDD) is an approach to software development that centers the development on programming a domain model that has a rich understanding of the processes and rules of a business domain.</p><h2>Strategic Design</h2><h3>Bounded Contexts</h3><p>A bounded context is a explicit boundary within which a particular domain model is defined and applicable. Each bounded context has its own ubiquitous language and domain model.</p><h3>Context Mapping</h3><p>Understanding how bounded contexts relate to each other is crucial:</p><ul><li><strong>Partnership:</strong> Two contexts cooperate closely</li><li><strong>Shared Kernel:</strong> Shared subset of the domain model</li><li><strong>Customer-Supplier:</strong> Upstream/downstream relationship</li><li><strong>Conformist:</strong> Downstream conforms to upstream model</li><li><strong>Anti-Corruption Layer:</strong> Translation layer between contexts</li></ul><h3>Ubiquitous Language</h3><p>A common language between developers and domain experts that is used in all discussions, documentation, and code. This eliminates translation overhead and reduces misunderstandings.</p><h2>Tactical Design</h2><h3>Entities</h3><p>Objects defined by their identity rather than their attributes. An entity maintains continuity through its lifecycle.</p><pre><code>public class Order {
    private readonly Guid _id;
    public Guid Id => _id;
    
    public Order(Guid id) {
        _id = id;
    }
}</code></pre><h3>Value Objects</h3><p>Objects defined by their attributes, not identity. They are immutable and interchangeable.</p><pre><code>public record Money(decimal Amount, string Currency);</code></pre><h3>Aggregates</h3><p>A cluster of domain objects that can be treated as a single unit. Each aggregate has a root entity that serves as the entry point.</p><h3>Domain Events</h3><p>Something that happened in the domain that domain experts care about. Events enable loose coupling between aggregates.</p><h3>Repositories</h3><p>Provide collection-like interfaces for accessing aggregates. They abstract the underlying persistence mechanism.</p><h3>Domain Services</h3><p>Stateless operations that don't naturally fit within an entity or value object. They orchestrate domain logic across multiple aggregates.</p><h2>Implementation Patterns</h2><h3>Event Sourcing</h3><p>Store the state of an entity as a sequence of events rather than current state. Provides complete audit trail and temporal queries.</p><h3>CQRS with DDD</h3><p>Combine Command Query Responsibility Segregation with DDD for complex domains requiring different read and write models.</p><h2>Common Pitfalls</h2><ul><li>Anemic domain models with all logic in services</li><li>Over-engineering simple domains</li><li>Ignoring bounded context boundaries</li><li>Not investing in ubiquitous language</li></ul><h2>Conclusion</h2><p>DDD is not just a technical approach—it's a mindset shift toward collaboration with domain experts and creating software that truly models business complexity.</p>$content$, '2024-01-01', $cat$System Architecture$cat$, 15, $icon$🏗️$icon$, '{"DDD","Architecture","Domain Modeling","Enterprise"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 4),
($id$system-architecture-event-driven$id$, $title$Event-Driven Architecture: Complete Implementation Guide$title$, $excerpt$Build loosely coupled, scalable systems using event-driven architecture patterns with practical examples using Kafka, RabbitMQ, and Azure Service Bus.$excerpt$, $content$<h2>Understanding Event-Driven Architecture</h2><p>Event-Driven Architecture (EDA) is a software design pattern in which decoupled applications can asynchronously publish and subscribe to events via an event broker.</p><h2>Core Concepts</h2><h3>Events</h3><p>An event is a significant change in state. Events are immutable facts that have already happened:</p><pre><code>{
  "eventType": "OrderPlaced",
  "eventId": "uuid-123",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "orderId": "ORD-001",
    "customerId": "CUST-123",
    "totalAmount": 299.99
  }
}</code></pre><h3>Event Producers</h3><p>Components that detect and publish events when something noteworthy occurs in their domain.</p><h3>Event Consumers</h3><p>Components that subscribe to and react to events they're interested in.</p><h3>Event Broker</h3><p>Infrastructure that routes events from producers to consumers. Examples include Apache Kafka, RabbitMQ, and Azure Service Bus.</p><h2>Messaging Patterns</h2><h3>Publish/Subscribe</h3><p>Events are broadcast to all interested subscribers. Each subscriber receives a copy of the event independently.</p><h3>Event Streaming</h3><p>Events are stored in an ordered, immutable log. Consumers can replay events from any point in time.</p><h3>Event Sourcing</h3><p>Application state is derived entirely from a sequence of events. The event log becomes the source of truth.</p><h2>Implementation with Apache Kafka</h2><h3>Producer Example</h3><pre><code>var config = new ProducerConfig { BootstrapServers = "localhost:9092" };
using var producer = new ProducerBuilder&lt;string, string&gt;(config).Build();

await producer.ProduceAsync("orders", new Message&lt;string, string&gt; {
    Key = orderId,
    Value = JsonSerializer.Serialize(orderEvent)
});</code></pre><h3>Consumer Example</h3><pre><code>var config = new ConsumerConfig {
    BootstrapServers = "localhost:9092",
    GroupId = "order-processors"
};

using var consumer = new ConsumerBuilder&lt;string, string&gt;(config).Build();
consumer.Subscribe("orders");

while (true) {
    var result = consumer.Consume();
    ProcessOrder(result.Message.Value);
}</code></pre><h2>Handling Challenges</h2><h3>Eventual Consistency</h3><p>Accept that data will be consistent eventually. Design UIs and processes that accommodate this reality.</p><h3>Idempotency</h3><p>Ensure consumers can safely process the same event multiple times without side effects.</p><h3>Event Ordering</h3><p>Use partition keys to ensure related events are processed in order when necessary.</p><h3>Dead Letter Queues</h3><p>Handle failed events gracefully by routing them to a dead letter queue for investigation.</p><h2>Best Practices</h2><ul><li>Design events as immutable facts</li><li>Include correlation IDs for tracing</li><li>Version your event schemas</li><li>Monitor consumer lag</li><li>Plan for replay scenarios</li></ul><h2>Conclusion</h2><p>Event-driven architecture enables building highly scalable, loosely coupled systems. While it introduces complexity, the benefits in flexibility and scalability often outweigh the costs for complex enterprise systems.</p>$content$, '2023-12-01', $cat$System Architecture$cat$, 14, $icon$🏗️$icon$, '{"Event-Driven","Kafka","Messaging","Architecture"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 5),
($id$system-architecture-api-design$id$, $title$RESTful API Design: Best Practices and Patterns$title$, $excerpt$Design APIs that developers love to use. Learn REST principles, versioning strategies, error handling, and documentation best practices.$excerpt$, $content$<h2>REST Fundamentals</h2><p>REST (Representational State Transfer) is an architectural style for designing networked applications. A well-designed REST API is intuitive, consistent, and a pleasure to work with.</p><h2>Resource Naming</h2><h3>Use Nouns, Not Verbs</h3><p>Resources should be named using nouns that represent entities:</p><pre><code>✓ GET /users
✓ GET /users/123/orders
✗ GET /getUsers
✗ POST /createOrder</code></pre><h3>Use Plural Nouns</h3><p>Maintain consistency by always using plural nouns for collections:</p><pre><code>GET /users        # Get all users
GET /users/123    # Get specific user
POST /users       # Create new user</code></pre><h3>Hierarchical Relationships</h3><p>Express relationships through URL hierarchy:</p><pre><code>GET /users/123/orders          # User's orders
GET /users/123/orders/456      # Specific order
GET /orders/456/items          # Order items</code></pre><h2>HTTP Methods</h2><ul><li><strong>GET:</strong> Retrieve resources (idempotent, safe)</li><li><strong>POST:</strong> Create new resources</li><li><strong>PUT:</strong> Replace entire resource (idempotent)</li><li><strong>PATCH:</strong> Partial update (not idempotent)</li><li><strong>DELETE:</strong> Remove resource (idempotent)</li></ul><h2>Status Codes</h2><h3>Success Codes</h3><ul><li><strong>200 OK:</strong> Successful GET, PUT, PATCH</li><li><strong>201 Created:</strong> Successful POST with resource creation</li><li><strong>204 No Content:</strong> Successful DELETE</li></ul><h3>Client Error Codes</h3><ul><li><strong>400 Bad Request:</strong> Invalid request syntax</li><li><strong>401 Unauthorized:</strong> Authentication required</li><li><strong>403 Forbidden:</strong> Authenticated but not authorized</li><li><strong>404 Not Found:</strong> Resource doesn't exist</li><li><strong>422 Unprocessable Entity:</strong> Validation errors</li></ul><h3>Server Error Codes</h3><ul><li><strong>500 Internal Server Error:</strong> Generic server error</li><li><strong>503 Service Unavailable:</strong> Server temporarily unavailable</li></ul><h2>Versioning Strategies</h2><h3>URL Path Versioning</h3><pre><code>GET /api/v1/users
GET /api/v2/users</code></pre><h3>Header Versioning</h3><pre><code>GET /api/users
Accept: application/vnd.myapi.v2+json</code></pre><h2>Pagination</h2><pre><code>GET /users?page=2&limit=20

{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}</code></pre><h2>Error Response Format</h2><pre><code>{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}</code></pre><h2>Documentation</h2><p>Use OpenAPI/Swagger to document your APIs. Include examples, authentication requirements, and rate limiting information.</p><h2>Conclusion</h2><p>A well-designed API is an investment that pays dividends in developer productivity and system maintainability. Follow these patterns consistently across your organization.</p>$content$, '2023-12-01', $cat$System Architecture$cat$, 11, $icon$🏗️$icon$, '{"API","REST","Design","Best Practices"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 6),
($id$system-architecture-cqrs$id$, $title$CQRS Pattern: Separating Reads from Writes$title$, $excerpt$Understand Command Query Responsibility Segregation and when to apply this powerful pattern for complex enterprise applications.$excerpt$, $content$<h2>What is CQRS?</h2><p>Command Query Responsibility Segregation (CQRS) is a pattern that separates read and write operations for a data store. The write model (commands) and read model (queries) can be optimized independently.</p><h2>Why CQRS?</h2><h3>Different Requirements</h3><p>Read and write operations often have vastly different requirements:</p><ul><li>Reads need fast, denormalized data for display</li><li>Writes need normalized data with business rule validation</li><li>Read/write ratios are often 90/10 or higher</li></ul><h3>Benefits</h3><ul><li>Independent scaling of read and write workloads</li><li>Optimized data schemas for each operation type</li><li>Simplified queries without complex joins</li><li>Better security through separated concerns</li></ul><h2>Implementation</h2><h3>Command Side</h3><pre><code>public class CreateOrderCommand {
    public Guid CustomerId { get; set; }
    public List&lt;OrderItem&gt; Items { get; set; }
}

public class CreateOrderHandler {
    public async Task Handle(CreateOrderCommand cmd) {
        var order = new Order(cmd.CustomerId, cmd.Items);
        await _repository.Save(order);
        await _eventBus.Publish(new OrderCreated(order.Id));
    }
}</code></pre><h3>Query Side</h3><pre><code>public class OrderSummaryQuery {
    public Guid OrderId { get; set; }
}

public class OrderSummaryHandler {
    public async Task&lt;OrderSummaryDto&gt; Handle(OrderSummaryQuery query) {
        return await _readDb.QueryFirstAsync&lt;OrderSummaryDto&gt;(
            "SELECT * FROM OrderSummaries WHERE Id = @Id",
            new { Id = query.OrderId }
        );
    }
}</code></pre><h2>Data Synchronization</h2><h3>Event-Based Sync</h3><p>Commands publish domain events that update the read model:</p><pre><code>public class OrderCreatedHandler : IEventHandler&lt;OrderCreated&gt; {
    public async Task Handle(OrderCreated evt) {
        await _readDb.ExecuteAsync(@"
            INSERT INTO OrderSummaries (Id, CustomerName, Total, Status)
            SELECT o.Id, c.Name, o.Total, o.Status
            FROM Orders o JOIN Customers c ON o.CustomerId = c.Id
            WHERE o.Id = @Id",
            new { Id = evt.OrderId }
        );
    }
}</code></pre><h3>Eventual Consistency</h3><p>The read model may lag behind the write model. Design your UI to handle this gracefully.</p><h2>When to Use CQRS</h2><h3>Good Candidates</h3><ul><li>Complex domains with many business rules</li><li>High read/write ratio applications</li><li>Systems requiring independent scaling</li><li>Event-sourced systems</li></ul><h3>When to Avoid</h3><ul><li>Simple CRUD applications</li><li>Small teams without DDD experience</li><li>Systems requiring strong consistency</li></ul><h2>CQRS + Event Sourcing</h2><p>CQRS pairs naturally with Event Sourcing. Events become the mechanism for syncing write and read models while providing a complete audit trail.</p><h2>Conclusion</h2><p>CQRS adds complexity but provides powerful benefits for the right use cases. Start simple and introduce CQRS when the complexity of your domain justifies it.</p>$content$, '2023-11-01', $cat$System Architecture$cat$, 13, $icon$🏗️$icon$, '{"CQRS","Architecture","Patterns","Scalability"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 7),
($id$system-architecture-hexagonal$id$, $title$Hexagonal Architecture: Ports and Adapters Pattern$title$, $excerpt$Build maintainable applications with clean boundaries using hexagonal architecture. Learn to isolate your domain logic from infrastructure concerns.$excerpt$, $content$<h2>Introduction to Hexagonal Architecture</h2><p>Hexagonal Architecture, also known as Ports and Adapters, was introduced by Alistair Cockburn. It aims to create loosely coupled application components that can be easily connected to their software environment.</p><h2>Core Concepts</h2><h3>The Domain (Hexagon Center)</h3><p>The core business logic lives at the center, completely independent of external concerns. It contains entities, value objects, domain services, and business rules.</p><h3>Ports</h3><p>Ports are interfaces that define how the outside world can interact with your domain. There are two types:</p><ul><li><strong>Driving Ports (Primary):</strong> Define how external actors use your application (e.g., API controllers)</li><li><strong>Driven Ports (Secondary):</strong> Define what your application needs from external services (e.g., repositories)</li></ul><h3>Adapters</h3><p>Adapters implement ports to connect your domain to the outside world:</p><ul><li><strong>Driving Adapters:</strong> REST controllers, CLI commands, message handlers</li><li><strong>Driven Adapters:</strong> Database repositories, external API clients, file system handlers</li></ul><h2>Implementation Example</h2><h3>Domain Layer</h3><pre><code>// Domain Entity
public class Order {
    public Guid Id { get; private set; }
    public OrderStatus Status { get; private set; }
    
    public void Ship() {
        if (Status != OrderStatus.Paid)
            throw new DomainException("Order must be paid before shipping");
        Status = OrderStatus.Shipped;
    }
}</code></pre><h3>Driven Port (Interface)</h3><pre><code>// Port - defined in domain layer
public interface IOrderRepository {
    Task&lt;Order&gt; GetById(Guid id);
    Task Save(Order order);
}</code></pre><h3>Driven Adapter (Implementation)</h3><pre><code>// Adapter - in infrastructure layer
public class SqlOrderRepository : IOrderRepository {
    private readonly DbContext _context;
    
    public async Task&lt;Order&gt; GetById(Guid id) {
        return await _context.Orders.FindAsync(id);
    }
    
    public async Task Save(Order order) {
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
    }
}</code></pre><h3>Application Service</h3><pre><code>public class ShipOrderUseCase {
    private readonly IOrderRepository _repository;
    
    public async Task Execute(Guid orderId) {
        var order = await _repository.GetById(orderId);
        order.Ship();
        await _repository.Save(order);
    }
}</code></pre><h2>Benefits</h2><ul><li><strong>Testability:</strong> Domain logic can be tested without infrastructure</li><li><strong>Flexibility:</strong> Swap adapters without changing domain</li><li><strong>Focus:</strong> Domain remains pure business logic</li><li><strong>Independence:</strong> Technology decisions are deferred</li></ul><h2>Project Structure</h2><pre><code>src/
├── Domain/
│   ├── Entities/
│   ├── ValueObjects/
│   └── Ports/
├── Application/
│   └── UseCases/
└── Infrastructure/
    ├── Persistence/
    ├── Api/
    └── ExternalServices/</code></pre><h2>Conclusion</h2><p>Hexagonal architecture creates clear boundaries that make your application more maintainable and testable. The initial investment in structure pays dividends as your application grows.</p>$content$, '2023-11-01', $cat$System Architecture$cat$, 12, $icon$🏗️$icon$, '{"Hexagonal","Clean Architecture","Ports","Adapters"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 8),
($id$system-architecture-modular-monolith$id$, $title$The Modular Monolith: Best of Both Worlds$title$, $excerpt$Learn how to structure a monolithic application with clear module boundaries, preparing for potential future decomposition into microservices.$excerpt$, $content$<h2>Why Modular Monolith?</h2><p>A modular monolith combines the simplicity of monolithic deployment with the organizational benefits of microservices. It's an excellent starting point for most projects.</p><h2>Key Principles</h2><h3>Strong Module Boundaries</h3><p>Each module owns its data and exposes only a public API to other modules:</p><pre><code>Modules/
├── Orders/
│   ├── Public/           # Public API
│   │   ├── IOrderService.cs
│   │   └── OrderDto.cs
│   └── Internal/         # Hidden implementation
│       ├── OrderService.cs
│       ├── Order.cs
│       └── OrderRepository.cs
├── Inventory/
└── Customers/</code></pre><h3>Module Communication</h3><p>Modules communicate through well-defined interfaces, never accessing each other's internals:</p><pre><code>// Orders module needs customer data
public class OrderService {
    private readonly ICustomerService _customers; // From Customers module
    
    public async Task CreateOrder(CreateOrderRequest request) {
        var customer = await _customers.GetById(request.CustomerId);
        // Create order with customer info
    }
}</code></pre><h3>Separate Databases (Logical)</h3><p>While sharing a physical database, each module owns its tables. Use schemas or naming conventions:</p><pre><code>-- Orders schema
CREATE TABLE orders.orders (...)
CREATE TABLE orders.order_items (...)

-- Customers schema  
CREATE TABLE customers.customers (...)
CREATE TABLE customers.addresses (...)</code></pre><h2>Module Structure</h2><pre><code>public class OrdersModule : IModule {
    public void RegisterServices(IServiceCollection services) {
        services.AddScoped&lt;IOrderService, OrderService&gt;();
        services.AddScoped&lt;IOrderRepository, OrderRepository&gt;();
    }
    
    public void ConfigureEndpoints(IEndpointRouteBuilder routes) {
        routes.MapGet("/api/orders", GetOrders);
        routes.MapPost("/api/orders", CreateOrder);
    }
}</code></pre><h2>Event-Based Integration</h2><p>Use in-process events for loose coupling between modules:</p><pre><code>// Orders module publishes
await _mediator.Publish(new OrderPlaced(order.Id));

// Inventory module subscribes
public class OrderPlacedHandler : INotificationHandler&lt;OrderPlaced&gt; {
    public async Task Handle(OrderPlaced notification) {
        await _inventory.ReserveStock(notification.Items);
    }
}</code></pre><h2>Benefits</h2><ul><li>Single deployment unit - simple operations</li><li>In-process communication - fast and reliable</li><li>Shared infrastructure - lower costs</li><li>Clear boundaries - organized codebase</li><li>Future-ready - can extract to microservices later</li></ul><h2>Migration Path to Microservices</h2><p>When a module needs independent scaling:</p><ol><li>Replace in-process events with message broker</li><li>Extract module to separate service</li><li>Add API gateway for routing</li><li>Separate database if needed</li></ol><h2>Conclusion</h2><p>Start with a modular monolith. You get development velocity now with a clear path to microservices if and when you need them.</p>$content$, '2023-10-01', $cat$System Architecture$cat$, 10, $icon$🏗️$icon$, '{"Monolith","Modular","Architecture","Scalability"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 9),
($id$system-architecture-saga-pattern$id$, $title$Saga Pattern for Distributed Transactions$title$, $excerpt$Implement distributed transactions across microservices using the Saga pattern with choreography and orchestration approaches.$excerpt$, $content$<h2>The Distributed Transaction Problem</h2><p>In microservices, a single business operation often spans multiple services. Traditional ACID transactions don't work across service boundaries. The Saga pattern provides a solution.</p><h2>What is a Saga?</h2><p>A saga is a sequence of local transactions. Each local transaction updates the database and publishes events or messages. If a step fails, compensating transactions undo the preceding steps.</p><h2>Example: Order Processing Saga</h2><pre><code>1. Create Order (Orders Service)
2. Reserve Inventory (Inventory Service)
3. Process Payment (Payment Service)
4. Ship Order (Shipping Service)

If step 3 fails:
- Compensate: Release Inventory
- Compensate: Cancel Order</code></pre><h2>Implementation Approaches</h2><h3>Choreography</h3><p>Each service listens for events and decides when to act:</p><pre><code>// Orders Service
OrderCreated → publishes event

// Inventory Service
Listens for OrderCreated → reserves stock → publishes InventoryReserved

// Payment Service
Listens for InventoryReserved → processes payment → publishes PaymentProcessed

// Shipping Service
Listens for PaymentProcessed → ships order</code></pre><h4>Pros:</h4><ul><li>Loose coupling</li><li>Simple for small sagas</li></ul><h4>Cons:</h4><ul><li>Hard to track saga state</li><li>Cyclic dependencies risk</li></ul><h3>Orchestration</h3><p>A central orchestrator coordinates the saga:</p><pre><code>public class OrderSagaOrchestrator {
    public async Task Execute(CreateOrderCommand cmd) {
        var saga = new OrderSaga(cmd.OrderId);
        
        try {
            await saga.Step("CreateOrder", 
                () => _orders.Create(cmd));
            
            await saga.Step("ReserveInventory",
                () => _inventory.Reserve(cmd.Items),
                () => _inventory.Release(cmd.Items)); // Compensate
            
            await saga.Step("ProcessPayment",
                () => _payment.Process(cmd.PaymentInfo),
                () => _payment.Refund(cmd.PaymentInfo));
            
            await saga.Complete();
        } catch {
            await saga.Compensate();
        }
    }
}</code></pre><h4>Pros:</h4><ul><li>Clear saga flow</li><li>Easy to add steps</li><li>Centralized error handling</li></ul><h4>Cons:</h4><ul><li>Orchestrator can become complex</li><li>Single point of coordination</li></ul><h2>Handling Failures</h2><h3>Compensating Transactions</h3><p>Design compensations that are semantically opposite:</p><ul><li>CreateOrder → CancelOrder</li><li>ReserveInventory → ReleaseInventory</li><li>ChargePayment → RefundPayment</li></ul><h3>Idempotency</h3><p>Both forward and compensating transactions must be idempotent to handle retries safely.</p><h2>Saga State Management</h2><pre><code>public class SagaState {
    public Guid SagaId { get; set; }
    public string CurrentStep { get; set; }
    public SagaStatus Status { get; set; }
    public List&lt;CompletedStep&gt; CompletedSteps { get; set; }
}</code></pre><h2>Best Practices</h2><ul><li>Keep sagas short (fewer steps = less complexity)</li><li>Design for failure from the start</li><li>Use correlation IDs for tracing</li><li>Implement timeouts and deadlines</li><li>Test compensation paths thoroughly</li></ul><h2>Conclusion</h2><p>The Saga pattern enables complex distributed operations while maintaining data consistency. Choose choreography for simple flows and orchestration for complex multi-step processes.</p>$content$, '2023-10-01', $cat$System Architecture$cat$, 14, $icon$🏗️$icon$, '{"Saga","Distributed Systems","Transactions","Microservices"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 10),
($id$system-architecture-12-factor-app$id$, $title$The 12-Factor App: Cloud-Native Design Principles$title$, $excerpt$Master the twelve-factor methodology for building modern, scalable, and maintainable software-as-a-service applications.$excerpt$, $content$<h2>Introduction</h2><p>The twelve-factor app methodology is a set of best practices for building modern, cloud-native applications. Originally developed by Heroku, these principles apply to any platform.</p><h2>The Twelve Factors</h2><h3>I. Codebase</h3><p>One codebase tracked in version control, many deploys. Multiple apps sharing code should extract shared code into libraries.</p><h3>II. Dependencies</h3><p>Explicitly declare and isolate dependencies. Never rely on system-wide packages:</p><pre><code>// package.json - explicit dependencies
{
  "dependencies": {
    "express": "^4.18.0",
    "pg": "^8.11.0"
  }
}</code></pre><h3>III. Config</h3><p>Store config in environment variables. Config varies between deploys; code doesn't:</p><pre><code>const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;</code></pre><h3>IV. Backing Services</h3><p>Treat backing services as attached resources. Databases, caches, and queues should be swappable without code changes:</p><pre><code># Production
DATABASE_URL=postgres://prod-db:5432/app

# Staging  
DATABASE_URL=postgres://staging-db:5432/app</code></pre><h3>V. Build, Release, Run</h3><p>Strictly separate build and run stages:</p><ol><li><strong>Build:</strong> Convert code into executable bundle</li><li><strong>Release:</strong> Combine build with config</li><li><strong>Run:</strong> Execute app in environment</li></ol><h3>VI. Processes</h3><p>Execute the app as stateless processes. Any persistent data must be stored in a backing service:</p><pre><code>// Bad - storing state in memory
let sessions = {};

// Good - use Redis for sessions
app.use(session({ store: new RedisStore() }));</code></pre><h3>VII. Port Binding</h3><p>Export services via port binding. The app is self-contained and doesn't rely on runtime injection of a webserver:</p><pre><code>const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));</code></pre><h3>VIII. Concurrency</h3><p>Scale out via the process model. Use multiple processes for different workload types:</p><pre><code>web: node server.js
worker: node worker.js
scheduler: node scheduler.js</code></pre><h3>IX. Disposability</h3><p>Maximize robustness with fast startup and graceful shutdown:</p><pre><code>process.on('SIGTERM', async () => {
  await server.close();
  await db.disconnect();
  process.exit(0);
});</code></pre><h3>X. Dev/Prod Parity</h3><p>Keep development, staging, and production as similar as possible. Use Docker to ensure consistency.</p><h3>XI. Logs</h3><p>Treat logs as event streams. Write to stdout; let the environment handle aggregation:</p><pre><code>console.log(JSON.stringify({
  level: 'info',
  message: 'Order processed',
  orderId: '123'
}));</code></pre><h3>XII. Admin Processes</h3><p>Run admin/management tasks as one-off processes in identical environments:</p><pre><code>docker exec app node scripts/migrate.js</code></pre><h2>Conclusion</h2><p>Following the twelve-factor methodology creates applications that are portable, scalable, and maintainable across any cloud platform.</p>$content$, '2023-09-01', $cat$System Architecture$cat$, 11, $icon$🏗️$icon$, '{"12-Factor","Cloud-Native","SaaS","Best Practices"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 11),
($id$cloud-cost-optimization$id$, $title$Cost Optimization in Cloud Architectures$title$, $excerpt$Practical strategies for reducing cloud infrastructure costs by 40% while maintaining performance, scalability, and reliability for enterprise applications.$excerpt$, $content$<h2>The Cloud Cost Problem</h2><p>Cloud spending continues to spiral out of control for many organizations. According to recent surveys, companies waste an average of 32% of their cloud spend. This guide will help you identify and eliminate that waste.</p><h2>Understanding Your Cloud Bill</h2><p>Before optimizing, you need to understand where your money is going. The typical cloud bill breaks down as:</p><ul><li><strong>Compute (45-55%):</strong> VMs, containers, serverless functions</li><li><strong>Storage (15-25%):</strong> Block storage, object storage, databases</li><li><strong>Network (10-20%):</strong> Data transfer, load balancers, VPNs</li><li><strong>Other (10-20%):</strong> Managed services, support, etc.</li></ul><h2>Quick Wins: Immediate Cost Reduction</h2><h3>1. Right-Size Your Instances</h3><p>Most organizations over-provision by 50% or more. Use cloud provider tools to identify underutilized instances and downsize appropriately.</p><h3>2. Use Reserved Instances</h3><p>For predictable workloads, reserved instances can save 40-70% compared to on-demand pricing. Commit to 1 or 3-year terms for maximum savings.</p><h3>3. Implement Auto-Scaling</h3><p>Scale down during off-peak hours. Many applications can safely run on 30-50% fewer resources during nights and weekends.</p><h3>4. Clean Up Unused Resources</h3><p>Orphaned snapshots, unattached volumes, and unused elastic IPs add up quickly. Regular cleanup can save 5-15% immediately.</p><h2>Strategic Optimizations</h2><h3>Spot Instances for Fault-Tolerant Workloads</h3><p>Spot instances offer 70-90% savings for workloads that can handle interruptions: batch processing, CI/CD pipelines, and stateless web servers.</p><h3>Storage Tiering</h3><p>Move infrequently accessed data to cheaper storage tiers. Implement lifecycle policies to automatically transition data based on access patterns.</p><h3>Serverless Where Appropriate</h3><p>For variable workloads, serverless functions can be significantly cheaper than always-on instances. Pay only for actual execution time.</p><h2>FinOps Best Practices</h2><ul><li>Implement cost allocation tags consistently across all resources</li><li>Set up budget alerts at 50%, 80%, and 100% thresholds</li><li>Review costs weekly as a team</li><li>Make cost a non-functional requirement in architecture decisions</li></ul><h2>Conclusion</h2><p>Cloud cost optimization is an ongoing process, not a one-time project. By implementing these strategies systematically, organizations can typically reduce their cloud spend by 30-50% while maintaining or even improving performance.</p>$content$, '2023-11-01', $cat$Cloud$cat$, 10, $icon$💰$icon$, '{"Cloud","AWS","Azure","Cost Optimization"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 12),
($id$cloud-aws-well-architected$id$, $title$AWS Well-Architected Framework: Building Reliable Systems$title$, $excerpt$Apply the five pillars of the AWS Well-Architected Framework to design and operate reliable, secure, efficient, and cost-effective systems.$excerpt$, $content$<h2>Introduction to Well-Architected Framework</h2><p>The AWS Well-Architected Framework helps cloud architects build secure, high-performing, resilient, and efficient infrastructure. It consists of five pillars that form the foundation of cloud excellence.</p><h2>The Five Pillars</h2><h3>1. Operational Excellence</h3><p>Focus on running and monitoring systems to deliver business value:</p><ul><li><strong>Infrastructure as Code:</strong> Use CloudFormation or Terraform</li><li><strong>Frequent, Small Changes:</strong> Reduce risk with smaller deployments</li><li><strong>Anticipate Failure:</strong> Perform game days and chaos engineering</li><li><strong>Learn from Failures:</strong> Implement blameless post-mortems</li></ul><h3>2. Security</h3><p>Protect information, systems, and assets:</p><ul><li><strong>Implement Strong Identity:</strong> Use IAM with least privilege</li><li><strong>Enable Traceability:</strong> Log all actions with CloudTrail</li><li><strong>Security at All Layers:</strong> VPCs, security groups, WAF</li><li><strong>Protect Data:</strong> Encryption at rest and in transit</li></ul><pre><code>// Example: Least privilege IAM policy
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::my-bucket/*"
  }]
}</code></pre><h3>3. Reliability</h3><p>Ensure systems recover from failures and meet demand:</p><ul><li><strong>Automatic Recovery:</strong> Use Auto Scaling and health checks</li><li><strong>Scale Horizontally:</strong> Distribute load across resources</li><li><strong>Stop Guessing Capacity:</strong> Use auto-scaling</li><li><strong>Manage Change:</strong> Automate deployments</li></ul><h3>4. Performance Efficiency</h3><p>Use resources efficiently as requirements change:</p><ul><li><strong>Democratize Advanced Tech:</strong> Use managed services</li><li><strong>Go Global in Minutes:</strong> Deploy to multiple regions</li><li><strong>Use Serverless:</strong> Lambda, Fargate, Aurora Serverless</li><li><strong>Experiment Often:</strong> A/B test performance</li></ul><h3>5. Cost Optimization</h3><p>Avoid unnecessary costs:</p><ul><li><strong>Pay for What You Use:</strong> Right-size instances</li><li><strong>Measure Efficiency:</strong> Track cost per transaction</li><li><strong>Stop Spending on Undifferentiated Work:</strong> Use managed services</li><li><strong>Analyze and Attribute:</strong> Use cost allocation tags</li></ul><h2>Well-Architected Review</h2><p>AWS provides the Well-Architected Tool for self-assessment:</p><ol><li>Define your workload</li><li>Answer questions for each pillar</li><li>Review high-risk issues</li><li>Create improvement plan</li><li>Make improvements</li><li>Measure progress</li></ol><h2>Common Anti-Patterns</h2><ul><li>Single point of failure in critical paths</li><li>Over-provisioned, static resources</li><li>Manual deployments and configuration</li><li>No monitoring or alerting</li><li>Broad IAM permissions</li></ul><h2>Conclusion</h2><p>The Well-Architected Framework provides a consistent approach to evaluating and improving cloud architectures. Regular reviews ensure your systems remain aligned with best practices.</p>$content$, '2024-01-01', $cat$Cloud Computing$cat$, 14, $icon$☁️$icon$, '{"AWS","Architecture","Best Practices","Cloud"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 13),
($id$cloud-azure-landing-zones$id$, $title$Azure Landing Zones: Enterprise-Scale Foundation$title$, $excerpt$Design and implement Azure landing zones for enterprise-scale cloud adoption with proper governance, security, and networking foundations.$excerpt$, $content$<h2>What are Azure Landing Zones?</h2><p>Azure Landing Zones are the output of a multi-subscription Azure environment that accounts for scale, security, governance, networking, and identity. They provide a foundation for migrating, modernizing, and innovating at scale.</p><h2>Key Design Areas</h2><h3>Management Group Hierarchy</h3><pre><code>Tenant Root Group
├── Platform
│   ├── Identity
│   ├── Management
│   └── Connectivity
└── Landing Zones
    ├── Corp
    │   ├── Production
    │   └── Non-Production  
    └── Online
        ├── Production
        └── Non-Production</code></pre><h3>Identity and Access Management</h3><ul><li><strong>Azure AD:</strong> Central identity provider</li><li><strong>Privileged Identity Management:</strong> Just-in-time access</li><li><strong>Conditional Access:</strong> Risk-based authentication</li><li><strong>RBAC:</strong> Role-based access control at appropriate scope</li></ul><h3>Network Topology</h3><h4>Hub-Spoke Architecture</h4><pre><code>Hub VNet (Connectivity Subscription)
├── Azure Firewall
├── VPN Gateway
├── ExpressRoute Gateway
└── Bastion

Spoke VNets (Landing Zone Subscriptions)
├── Workload A VNet ←→ Peered to Hub
├── Workload B VNet ←→ Peered to Hub
└── Workload C VNet ←→ Peered to Hub</code></pre><h3>Governance</h3><p>Azure Policy for compliance at scale:</p><pre><code>// Policy: Require tags on resources
{
  "mode": "Indexed",
  "policyRule": {
    "if": {
      "field": "tags['CostCenter']",
      "exists": "false"
    },
    "then": {
      "effect": "deny"
    }
  }
}</code></pre><h3>Security</h3><ul><li><strong>Microsoft Defender for Cloud:</strong> Security posture management</li><li><strong>Azure Sentinel:</strong> SIEM and SOAR</li><li><strong>Key Vault:</strong> Centralized secrets management</li><li><strong>DDoS Protection:</strong> Network layer protection</li></ul><h3>Management and Monitoring</h3><ul><li><strong>Log Analytics:</strong> Centralized logging</li><li><strong>Azure Monitor:</strong> Metrics and alerts</li><li><strong>Update Management:</strong> Automated patching</li><li><strong>Azure Automation:</strong> Runbooks for common tasks</li></ul><h2>Implementation Options</h2><h3>Azure Landing Zone Accelerator</h3><p>Use the Enterprise-Scale reference implementation for quick deployment:</p><pre><code>az deployment mg create \
  --location eastus \
  --management-group-id "Tenant Root Group" \
  --template-uri "https://raw.githubusercontent.com/Azure/Enterprise-Scale/main/eslzArm/eslzArm.json"</code></pre><h3>Terraform Module</h3><p>Use the CAF Terraform module for infrastructure as code:</p><pre><code>module "enterprise_scale" {
  source  = "Azure/caf-enterprise-scale/azurerm"
  version = "~> 3.0"
  
  root_parent_id = data.azurerm_client_config.current.tenant_id
  root_id        = "contoso"
  root_name      = "Contoso"
}</code></pre><h2>Best Practices</h2><ul><li>Start with a clear management group hierarchy</li><li>Implement policy-driven governance early</li><li>Use dedicated subscriptions for platform services</li><li>Plan network address space carefully</li><li>Establish naming and tagging conventions</li></ul><h2>Conclusion</h2><p>Azure Landing Zones provide a proven architecture for enterprise-scale cloud adoption. Invest time in proper foundation design to enable faster and safer cloud migration.</p>$content$, '2023-12-01', $cat$Cloud Computing$cat$, 13, $icon$☁️$icon$, '{"Azure","Landing Zones","Enterprise","Governance"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 14),
($id$cloud-kubernetes-production$id$, $title$Running Kubernetes in Production: Lessons Learned$title$, $excerpt$Real-world lessons from running Kubernetes clusters in production, covering cluster management, observability, and operational best practices.$excerpt$, $content$<h2>Introduction</h2><p>Kubernetes has become the de facto standard for container orchestration. However, running it in production requires careful planning and operational maturity.</p><h2>Cluster Architecture</h2><h3>Control Plane High Availability</h3><ul><li>Run 3+ control plane nodes across availability zones</li><li>Use managed Kubernetes (EKS, AKS, GKE) when possible</li><li>Separate etcd to dedicated nodes for large clusters</li></ul><h3>Node Pools</h3><pre><code>Node Pools:
├── system-pool (m5.large)
│   └── Core system components
├── general-pool (m5.xlarge)
│   └── Standard workloads
├── memory-pool (r5.2xlarge)
│   └── Memory-intensive apps
└── gpu-pool (p3.2xlarge)
    └── ML workloads</code></pre><h2>Resource Management</h2><h3>Requests and Limits</h3><p>Always set both requests and limits:</p><pre><code>resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"</code></pre><h3>Pod Disruption Budgets</h3><pre><code>apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: api</code></pre><h3>Priority Classes</h3><p>Ensure critical workloads survive resource pressure:</p><pre><code>apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false</code></pre><h2>Networking</h2><h3>Network Policies</h3><p>Implement zero-trust networking:</p><pre><code>apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-policy
spec:
  podSelector:
    matchLabels:
      app: api
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - port: 8080</code></pre><h2>Observability</h2><h3>The Three Pillars</h3><ul><li><strong>Metrics:</strong> Prometheus + Grafana</li><li><strong>Logs:</strong> Fluent Bit → Elasticsearch/Loki</li><li><strong>Traces:</strong> OpenTelemetry → Jaeger/Tempo</li></ul><h3>Essential Dashboards</h3><ul><li>Cluster resource utilization</li><li>Node health and capacity</li><li>Pod restart rates</li><li>API server latency</li><li>etcd performance</li></ul><h2>Security</h2><h3>Pod Security Standards</h3><pre><code>apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted</code></pre><h3>Image Security</h3><ul><li>Scan images for vulnerabilities (Trivy, Clair)</li><li>Sign images (Cosign, Notary)</li><li>Use admission controllers to enforce policies</li></ul><h2>Disaster Recovery</h2><ul><li>Regular etcd backups</li><li>GitOps for configuration recovery</li><li>Multi-region deployment strategy</li><li>Tested recovery procedures</li></ul><h2>Lessons Learned</h2><ol><li>Start with managed Kubernetes</li><li>Invest in observability from day one</li><li>Automate everything with GitOps</li><li>Practice failure scenarios regularly</li><li>Keep clusters reasonably sized</li></ol><h2>Conclusion</h2><p>Production Kubernetes requires significant operational investment. Build your platform team's expertise gradually and automate relentlessly.</p>$content$, '2023-11-01', $cat$Cloud Computing$cat$, 15, $icon$☁️$icon$, '{"Kubernetes","Production","DevOps","Containers"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 15),
($id$cloud-serverless-architecture$id$, $title$Serverless Architecture Patterns and Best Practices$title$, $excerpt$Design scalable, cost-effective applications with serverless architecture using AWS Lambda, Azure Functions, and event-driven patterns.$excerpt$, $content$<h2>Understanding Serverless</h2><p>Serverless computing allows you to build and run applications without thinking about servers. The cloud provider manages infrastructure, scaling, and availability.</p><h2>When to Use Serverless</h2><h3>Good Fit</h3><ul><li>Variable or unpredictable workloads</li><li>Event-driven processing</li><li>APIs with inconsistent traffic</li><li>Scheduled tasks and automation</li><li>Rapid prototyping</li></ul><h3>Poor Fit</h3><ul><li>Consistent high-throughput workloads</li><li>Long-running processes (>15 minutes)</li><li>Applications with specific hardware needs</li><li>Very latency-sensitive applications</li></ul><h2>Architecture Patterns</h2><h3>API Backend</h3><pre><code>Client → API Gateway → Lambda → DynamoDB
                    ↘ Lambda → S3</code></pre><h3>Event Processing</h3><pre><code>S3 Upload → Lambda → Process → SQS → Lambda → Store
Kinesis Stream → Lambda → Transform → S3</code></pre><h3>Scheduled Tasks</h3><pre><code>EventBridge Rule (cron) → Lambda → Process
                       → Step Functions → Complex Workflow</code></pre><h2>Best Practices</h2><h3>Function Design</h3><pre><code>// Single responsibility
export async function handler(event) {
  // Parse event
  const order = parseOrderEvent(event);
  
  // Business logic
  const result = await processOrder(order);
  
  // Return response
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}</code></pre><h3>Cold Start Optimization</h3><ul><li>Keep functions small and focused</li><li>Minimize dependencies</li><li>Use provisioned concurrency for critical paths</li><li>Initialize connections outside handler</li></ul><pre><code>// Initialize outside handler
const db = new DynamoDB.DocumentClient();

export async function handler(event) {
  // db connection is reused
  return await db.get({...}).promise();
}</code></pre><h3>Error Handling</h3><pre><code>export async function handler(event) {
  try {
    return await processEvent(event);
  } catch (error) {
    console.error('Processing failed:', error);
    
    // Send to dead letter queue for retry
    await sqs.sendMessage({
      QueueUrl: process.env.DLQ_URL,
      MessageBody: JSON.stringify({ event, error: error.message })
    }).promise();
    
    throw error; // Let Lambda handle retry
  }
}</code></pre><h2>Observability</h2><h3>Structured Logging</h3><pre><code>console.log(JSON.stringify({
  level: 'INFO',
  message: 'Order processed',
  orderId: order.id,
  duration: Date.now() - start,
  requestId: context.awsRequestId
}));</code></pre><h3>Distributed Tracing</h3><p>Use X-Ray or OpenTelemetry for end-to-end visibility across functions.</p><h2>Cost Optimization</h2><ul><li>Right-size memory allocation</li><li>Optimize function duration</li><li>Use reserved concurrency for predictable workloads</li><li>Leverage Graviton processors (ARM)</li><li>Monitor and alert on cost anomalies</li></ul><h2>Conclusion</h2><p>Serverless enables rapid development and automatic scaling. Design for event-driven patterns and invest in observability for successful serverless applications.</p>$content$, '2023-10-01', $cat$Cloud Computing$cat$, 12, $icon$☁️$icon$, '{"Serverless","Lambda","Azure Functions","Event-Driven"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 16),
($id$cloud-terraform-best-practices$id$, $title$Terraform Best Practices for Team Collaboration$title$, $excerpt$Implement Infrastructure as Code with Terraform using best practices for state management, modules, and team workflows.$excerpt$, $content$<h2>Why Terraform?</h2><p>Terraform enables declarative infrastructure management across multiple cloud providers. It provides consistency, repeatability, and collaboration through Infrastructure as Code.</p><h2>Project Structure</h2><pre><code>infrastructure/
├── modules/
│   ├── networking/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── compute/
│   └── database/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   ├── staging/
│   └── prod/
└── global/
    └── iam/</code></pre><h2>State Management</h2><h3>Remote State</h3><p>Always use remote state for team collaboration:</p><pre><code>terraform {
  backend "s3" {
    bucket         = "company-terraform-state"
    key            = "prod/networking/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}</code></pre><h3>State Locking</h3><p>Use DynamoDB (AWS) or Azure Blob leases to prevent concurrent modifications.</p><h3>State Isolation</h3><p>Separate state files by environment and component:</p><pre><code>states/
├── prod/networking/terraform.tfstate
├── prod/compute/terraform.tfstate
├── staging/networking/terraform.tfstate
└── staging/compute/terraform.tfstate</code></pre><h2>Module Best Practices</h2><h3>Module Design</h3><pre><code>// modules/networking/variables.tf
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  
  validation {
    condition     = can(cidrhost(var.vpc_cidr, 0))
    error_message = "Must be a valid CIDR block."
  }
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}</code></pre><h3>Module Versioning</h3><pre><code>module "networking" {
  source  = "git::https://github.com/company/terraform-modules.git//networking?ref=v1.2.0"
  
  vpc_cidr    = "10.0.0.0/16"
  environment = "prod"
}</code></pre><h2>Code Quality</h2><h3>Formatting and Validation</h3><pre><code># Format code
terraform fmt -recursive

# Validate configuration
terraform validate

# Security scanning
tfsec .

# Cost estimation
infracost breakdown --path .</code></pre><h3>Pre-commit Hooks</h3><pre><code># .pre-commit-config.yaml
repos:
  - repo: https://github.com/antonbabenko/pre-commit-terraform
    hooks:
      - id: terraform_fmt
      - id: terraform_validate
      - id: terraform_tfsec</code></pre><h2>CI/CD Pipeline</h2><pre><code># GitHub Actions example
jobs:
  terraform:
    steps:
      - uses: hashicorp/setup-terraform@v2
      - run: terraform init
      - run: terraform fmt -check
      - run: terraform validate
      - run: terraform plan -out=tfplan
      - run: terraform apply tfplan  # Only on main branch</code></pre><h2>Secrets Management</h2><ul><li>Never commit secrets to version control</li><li>Use environment variables or secret managers</li><li>Reference secrets from Vault or AWS Secrets Manager</li></ul><h2>Conclusion</h2><p>Following these best practices ensures your Terraform codebase remains maintainable, secure, and collaborative as your infrastructure grows.</p>$content$, '2023-09-01', $cat$Cloud Computing$cat$, 11, $icon$☁️$icon$, '{"Terraform","IaC","DevOps","Infrastructure"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 17),
($id$cloud-multi-cloud-strategy$id$, $title$Multi-Cloud Strategy: When and How to Implement$title$, $excerpt$Evaluate whether multi-cloud is right for your organization and learn strategies for successful multi-cloud architecture and operations.$excerpt$, $content$<h2>What is Multi-Cloud?</h2><p>Multi-cloud is the use of multiple cloud computing services from different providers in a single architecture. It differs from hybrid cloud, which combines public cloud with on-premises infrastructure.</p><h2>Why Multi-Cloud?</h2><h3>Valid Reasons</h3><ul><li><strong>Best of Breed:</strong> Use each provider's strengths (AWS ML, Azure AD, GCP BigQuery)</li><li><strong>Regulatory Requirements:</strong> Data residency or vendor requirements</li><li><strong>M&A Integration:</strong> Acquired companies use different clouds</li><li><strong>Vendor Negotiation:</strong> Leverage in pricing discussions</li><li><strong>Risk Mitigation:</strong> Reduce single-provider dependency</li></ul><h3>Questionable Reasons</h3><ul><li><strong>Avoiding Lock-in:</strong> Often creates more complexity than it solves</li><li><strong>Disaster Recovery:</strong> Single-cloud multi-region is usually sufficient</li><li><strong>Cost Optimization:</strong> Operational overhead often exceeds savings</li></ul><h2>Multi-Cloud Patterns</h2><h3>Workload Isolation</h3><p>Different applications on different clouds:</p><pre><code>AWS: E-commerce platform
Azure: Corporate applications (AD integration)
GCP: Data analytics platform</code></pre><h3>Active-Active</h3><p>Same application across multiple clouds:</p><pre><code>User Request → Global Load Balancer
            ├── AWS (us-east-1)
            ├── Azure (eastus)
            └── GCP (us-central1)</code></pre><h3>Data Distribution</h3><pre><code>Primary Database: AWS RDS
Analytics Replica: GCP BigQuery
Search Index: Elastic Cloud</code></pre><h2>Abstraction Strategies</h2><h3>Kubernetes as Common Platform</h3><p>Use Kubernetes for workload portability:</p><pre><code>kubectl apply -f deployment.yaml  # Works on EKS, AKS, GKE</code></pre><h3>Terraform for IaC</h3><pre><code>// Provider-agnostic where possible
module "database" {
  source = var.cloud_provider == "aws" ? "./modules/aws-rds" : "./modules/azure-sql"
}</code></pre><h2>Challenges</h2><h3>Operational Complexity</h3><ul><li>Multiple consoles, CLIs, and APIs</li><li>Different IAM models</li><li>Varied monitoring and logging</li><li>Complex networking between clouds</li></ul><h3>Skills and Training</h3><p>Teams need expertise in multiple platforms:</p><ul><li>Certifications across providers</li><li>Larger platform teams</li><li>Higher training costs</li></ul><h3>Cost Management</h3><ul><li>Multiple billing systems</li><li>Complex cost allocation</li><li>No volume discounts across providers</li></ul><h2>Best Practices</h2><ol><li>Start with clear business justification</li><li>Standardize on Kubernetes for compute</li><li>Use Terraform for infrastructure</li><li>Implement unified observability (Datadog, Grafana Cloud)</li><li>Establish cloud-agnostic CI/CD pipelines</li><li>Build platform team expertise gradually</li></ol><h2>Conclusion</h2><p>Multi-cloud adds significant complexity. Pursue it only when there's a clear business case, and invest heavily in automation and standardization.</p>$content$, '2023-08-01', $cat$Cloud Computing$cat$, 10, $icon$☁️$icon$, '{"Multi-Cloud","Strategy","Architecture","Cloud"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 18),
($id$dotnet-api-performance$id$, $title$Building High-Performance APIs with .NET Core$title$, $excerpt$Deep dive into performance optimization techniques, caching strategies, and best practices that can improve your API response times by 10x.$excerpt$, $content$<h2>Why Performance Matters</h2><p>API performance directly impacts user experience and business metrics. Studies show that every 100ms of latency costs 1% in sales. This guide covers advanced techniques to make your .NET Core APIs blazingly fast.</p><h2>Baseline: Measuring Performance</h2><p>Before optimizing, establish baselines. Key metrics to track:</p><ul><li><strong>Response Time:</strong> P50, P95, P99 latencies</li><li><strong>Throughput:</strong> Requests per second</li><li><strong>Resource Usage:</strong> CPU, memory, database connections</li></ul><h2>Database Optimization</h2><h3>1. Use Async/Await Correctly</h3><pre><code>// Bad - blocks thread
var data = dbContext.Users.ToList();

// Good - frees thread during I/O
var data = await dbContext.Users.ToListAsync();</code></pre><h3>2. Optimize Queries</h3><ul><li>Use <code>AsNoTracking()</code> for read-only queries</li><li>Select only needed columns with projections</li><li>Avoid N+1 queries with proper includes</li><li>Use compiled queries for repeated operations</li></ul><h3>3. Connection Pooling</h3><p>Ensure proper connection pool configuration. Default of 100 connections may be too low for high-traffic applications.</p><h2>Caching Strategies</h2><h3>In-Memory Caching</h3><p>Use IMemoryCache for frequently accessed, small datasets:</p><pre><code>public async Task&lt;User&gt; GetUserAsync(int id)
{
    return await _cache.GetOrCreateAsync($"user_{id}", async entry =&gt; {
        entry.SlidingExpiration = TimeSpan.FromMinutes(5);
        return await _dbContext.Users.FindAsync(id);
    });
}</code></pre><h3>Distributed Caching</h3><p>For multi-instance deployments, use Redis or SQL Server distributed cache.</p><h3>Response Caching</h3><p>Use response caching middleware for GET requests that don't change frequently.</p><h2>Serialization Optimization</h2><p>System.Text.Json is faster than Newtonsoft.Json. Further optimize with source generators:</p><pre><code>[JsonSerializable(typeof(User))]
public partial class UserContext : JsonSerializerContext { }</code></pre><h2>Compression</h2><p>Enable response compression for text-based content. Brotli offers better compression than gzip with modern clients.</p><h2>HTTP/2 and Connection Reuse</h2><p>Enable HTTP/2 for multiplexing. Use HttpClientFactory for proper connection management with external services.</p><h2>Results</h2><p>Applying these techniques to a real-world API achieved:</p><ul><li>P95 latency reduced from 450ms to 45ms (10x improvement)</li><li>Throughput increased from 500 to 3000 requests/second</li><li>Server count reduced from 8 to 3 instances</li></ul><h2>Conclusion</h2><p>Performance optimization is about making informed decisions based on profiling data. Start with the biggest bottlenecks (usually database queries) and work your way through systematic improvements.</p>$content$, '2023-10-01', $cat$Performance$cat$, 15, $icon$⚡$icon$, '{".NET","API","Performance","Caching"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 19),
($id$performance-web-vitals$id$, $title$Core Web Vitals: Optimizing for User Experience$title$, $excerpt$Master Google's Core Web Vitals metrics and implement optimizations that improve both user experience and SEO rankings.$excerpt$, $content$<h2>Understanding Core Web Vitals</h2><p>Core Web Vitals are Google's metrics for measuring user experience. They're now a ranking factor, making performance optimization essential for SEO.</p><h2>The Three Metrics</h2><h3>Largest Contentful Paint (LCP)</h3><p>Measures loading performance. Target: under 2.5 seconds.</p><ul><li>Optimize images (WebP, proper sizing)</li><li>Preload critical resources</li><li>Use CDN for static assets</li><li>Implement efficient caching</li></ul><pre><code>&lt;!-- Preload critical image --&gt;
&lt;link rel="preload" as="image" href="hero.webp"&gt;

&lt;!-- Responsive images --&gt;
&lt;img srcset="hero-400.webp 400w,
            hero-800.webp 800w,
            hero-1200.webp 1200w"
     sizes="(max-width: 600px) 400px, 800px"
     src="hero-800.webp" alt="Hero"&gt;</code></pre><h3>First Input Delay (FID) / Interaction to Next Paint (INP)</h3><p>Measures interactivity. Target: under 100ms.</p><ul><li>Break up long JavaScript tasks</li><li>Use web workers for heavy computation</li><li>Defer non-critical JavaScript</li><li>Minimize main thread work</li></ul><pre><code>// Break up long tasks
function processItems(items) {
  const chunk = items.splice(0, 100);
  processChunk(chunk);
  
  if (items.length > 0) {
    // Yield to main thread
    requestIdleCallback(() => processItems(items));
  }
}</code></pre><h3>Cumulative Layout Shift (CLS)</h3><p>Measures visual stability. Target: under 0.1.</p><ul><li>Set explicit dimensions on images/videos</li><li>Reserve space for dynamic content</li><li>Avoid inserting content above existing content</li><li>Use CSS transforms for animations</li></ul><pre><code>/* Reserve space for dynamic ads */
.ad-container {
  min-height: 250px;
  width: 300px;
}

/* Always set image dimensions */
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
}</code></pre><h2>Measurement Tools</h2><h3>Lab Data</h3><ul><li><strong>Lighthouse:</strong> Chrome DevTools</li><li><strong>PageSpeed Insights:</strong> web.dev/measure</li><li><strong>WebPageTest:</strong> Detailed waterfall analysis</li></ul><h3>Field Data</h3><ul><li><strong>Chrome UX Report:</strong> Real user data from Chrome</li><li><strong>Google Search Console:</strong> Core Web Vitals report</li><li><strong>RUM Tools:</strong> Datadog, New Relic, SpeedCurve</li></ul><h2>Optimization Strategies</h2><h3>Resource Prioritization</h3><pre><code>&lt;!-- Critical CSS inline --&gt;
&lt;style&gt;/* critical styles */&lt;/style&gt;

&lt;!-- Preconnect to third parties --&gt;
&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;

&lt;!-- Defer non-critical JS --&gt;
&lt;script defer src="analytics.js"&gt;&lt;/script&gt;</code></pre><h3>Image Optimization</h3><pre><code>// Next.js Image component
import Image from 'next/image';

&lt;Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority
  placeholder="blur"
/&gt;</code></pre><h2>Monitoring Strategy</h2><ol><li>Set up RUM for continuous monitoring</li><li>Create alerts for metric regressions</li><li>Include performance budgets in CI/CD</li><li>Review metrics weekly</li></ol><h2>Conclusion</h2><p>Core Web Vitals optimization improves both user experience and search rankings. Make performance a continuous focus, not a one-time fix.</p>$content$, '2024-01-01', $cat$Performance$cat$, 11, $icon$⚡$icon$, '{"Web Vitals","SEO","Performance","UX"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 20),
($id$performance-database-optimization$id$, $title$Database Performance Tuning: From Queries to Indexes$title$, $excerpt$Diagnose and fix database performance issues with practical techniques for query optimization, indexing strategies, and schema design.$excerpt$, $content$<h2>Identifying Performance Issues</h2><p>Database performance problems often manifest as slow applications. Start by identifying the bottleneck before optimizing.</p><h2>Query Analysis</h2><h3>Using EXPLAIN</h3><pre><code>EXPLAIN ANALYZE
SELECT o.*, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.status = 'pending'
ORDER BY o.created_at DESC
LIMIT 100;</code></pre><h3>What to Look For</h3><ul><li><strong>Seq Scan:</strong> Full table scans on large tables</li><li><strong>High Rows:</strong> More rows scanned than returned</li><li><strong>Sort:</strong> Expensive sorts without index support</li><li><strong>Nested Loop:</strong> Can be slow with large datasets</li></ul><h2>Indexing Strategies</h2><h3>Index Types</h3><ul><li><strong>B-Tree:</strong> Default, good for equality and range queries</li><li><strong>Hash:</strong> Fast equality lookups only</li><li><strong>GIN:</strong> Full-text search and arrays</li><li><strong>GiST:</strong> Geometric and full-text data</li></ul><h3>Composite Indexes</h3><pre><code>-- For queries filtering on status and ordering by date
CREATE INDEX idx_orders_status_date 
ON orders (status, created_at DESC);

-- Column order matters!
-- Good: WHERE status = 'pending' ORDER BY created_at
-- Bad: WHERE created_at > '2024-01-01' (status not used)</code></pre><h3>Covering Indexes</h3><pre><code>-- Include frequently selected columns
CREATE INDEX idx_orders_covering
ON orders (customer_id)
INCLUDE (total, status, created_at);

-- Query can be satisfied from index alone
SELECT total, status FROM orders WHERE customer_id = 123;</code></pre><h2>Query Optimization</h2><h3>Avoid SELECT *</h3><pre><code>-- Bad: fetches unnecessary data
SELECT * FROM orders WHERE id = 123;

-- Good: fetch only what you need
SELECT id, total, status FROM orders WHERE id = 123;</code></pre><h3>Efficient JOINs</h3><pre><code>-- Ensure join columns are indexed
CREATE INDEX idx_orders_customer ON orders (customer_id);

-- Use appropriate join type
SELECT o.id, c.name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;</code></pre><h3>Pagination</h3><pre><code>-- Bad: OFFSET for deep pagination
SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 10000;

-- Good: Keyset pagination
SELECT * FROM orders 
WHERE id > 10000 
ORDER BY id 
LIMIT 20;</code></pre><h2>Schema Optimization</h2><h3>Denormalization</h3><p>Sometimes duplicating data improves read performance:</p><pre><code>-- Instead of joining every time
ALTER TABLE orders ADD COLUMN customer_name VARCHAR(100);

-- Update via trigger or application logic</code></pre><h3>Partitioning</h3><pre><code>-- Partition large tables by date
CREATE TABLE orders (
    id SERIAL,
    created_at TIMESTAMP,
    ...
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2024_q1 
PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');</code></pre><h2>Connection Management</h2><ul><li>Use connection pooling (PgBouncer, HikariCP)</li><li>Right-size pool based on workload</li><li>Monitor active connections</li></ul><h2>Monitoring</h2><pre><code>-- Find slow queries (PostgreSQL)
SELECT query, calls, mean_time, total_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;</code></pre><h2>Conclusion</h2><p>Database optimization is iterative. Measure, identify bottlenecks, optimize, and measure again. Focus on the queries that matter most.</p>$content$, '2023-12-01', $cat$Performance$cat$, 14, $icon$⚡$icon$, '{"Database","SQL","Optimization","Performance"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 21),
($id$performance-caching-strategies$id$, $title$Caching Strategies: From Browser to Database$title$, $excerpt$Implement effective caching at every layer of your application stack to dramatically improve performance and reduce infrastructure costs.$excerpt$, $content$<h2>The Caching Pyramid</h2><p>Effective caching happens at multiple layers. Each layer serves different purposes and has different characteristics.</p><pre><code>Browser Cache
    ↓
CDN Cache
    ↓
API Gateway Cache
    ↓
Application Cache
    ↓
Database Cache</code></pre><h2>Browser Caching</h2><h3>Cache-Control Headers</h3><pre><code>// Static assets - cache for 1 year
Cache-Control: public, max-age=31536000, immutable

// API responses - cache with revalidation
Cache-Control: private, max-age=0, must-revalidate
ETag: "abc123"</code></pre><h3>Service Worker Caching</h3><pre><code>// Cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});</code></pre><h2>CDN Caching</h2><ul><li>Cache static assets globally</li><li>Use cache keys wisely (URL, headers, cookies)</li><li>Implement cache purging for updates</li><li>Consider edge computing for dynamic content</li></ul><pre><code>// CloudFront cache behavior
{
  "PathPattern": "/static/*",
  "TTL": {
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  },
  "CacheKeyPolicy": "CachingOptimized"
}</code></pre><h2>Application Caching</h2><h3>In-Memory Cache</h3><pre><code>// Node.js with node-cache
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

async function getUser(id) {
  const cached = cache.get(`user:${id}`);
  if (cached) return cached;
  
  const user = await db.users.findById(id);
  cache.set(`user:${id}`, user);
  return user;
}</code></pre><h3>Distributed Cache (Redis)</h3><pre><code>const redis = require('redis');
const client = redis.createClient();

async function getProduct(id) {
  // Try cache first
  const cached = await client.get(`product:${id}`);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const product = await db.products.findById(id);
  
  // Cache with expiration
  await client.setEx(`product:${id}`, 3600, JSON.stringify(product));
  
  return product;
}</code></pre><h2>Cache Patterns</h2><h3>Cache-Aside (Lazy Loading)</h3><pre><code>// Application manages cache explicitly
async function getData(key) {
  let data = await cache.get(key);
  if (!data) {
    data = await database.get(key);
    await cache.set(key, data, TTL);
  }
  return data;
}</code></pre><h3>Write-Through</h3><pre><code>// Write to cache and database together
async function saveData(key, value) {
  await database.save(key, value);
  await cache.set(key, value);
}</code></pre><h3>Write-Behind</h3><pre><code>// Write to cache immediately, database asynchronously
async function saveData(key, value) {
  await cache.set(key, value);
  queue.add({ key, value }); // Process later
}</code></pre><h2>Cache Invalidation</h2><p>"There are only two hard things in Computer Science: cache invalidation and naming things."</p><h3>Strategies</h3><ul><li><strong>TTL-based:</strong> Data expires after set time</li><li><strong>Event-based:</strong> Invalidate on data changes</li><li><strong>Version-based:</strong> Include version in cache key</li></ul><pre><code>// Event-based invalidation
async function updateProduct(id, data) {
  await db.products.update(id, data);
  await cache.delete(`product:${id}`);
  await cache.delete(`products:list`); // Invalidate related caches
}</code></pre><h2>Conclusion</h2><p>Caching is essential for performance but adds complexity. Start simple, measure impact, and add sophistication only where needed.</p>$content$, '2023-11-01', $cat$Performance$cat$, 12, $icon$⚡$icon$, '{"Caching","Redis","CDN","Performance"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 22),
($id$performance-frontend-optimization$id$, $title$Frontend Performance: Bundle Size and Load Time$title$, $excerpt$Reduce JavaScript bundle sizes, optimize asset loading, and implement performance budgets for fast-loading web applications.$excerpt$, $content$<h2>Why Bundle Size Matters</h2><p>Every kilobyte of JavaScript affects load time, parse time, and execution time. On mobile devices and slow networks, this impact is magnified.</p><h2>Analyzing Bundle Size</h2><h3>Webpack Bundle Analyzer</h3><pre><code>// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};</code></pre><h3>Source Map Explorer</h3><pre><code>npx source-map-explorer dist/main.js</code></pre><h2>Code Splitting</h2><h3>Route-Based Splitting</h3><pre><code>// React with lazy loading
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Settings = React.lazy(() => import('./pages/Settings'));

function App() {
  return (
    &lt;Suspense fallback={&lt;Loading /&gt;}&gt;
      &lt;Routes&gt;
        &lt;Route path="/dashboard" element={&lt;Dashboard /&gt;} /&gt;
        &lt;Route path="/settings" element={&lt;Settings /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/Suspense&gt;
  );
}</code></pre><h3>Component-Level Splitting</h3><pre><code>// Load heavy components on demand
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    &lt;div&gt;
      &lt;button onClick={() => setShowChart(true)}&gt;Show Chart&lt;/button&gt;
      {showChart && (
        &lt;Suspense fallback={&lt;Spinner /&gt;}&gt;
          &lt;HeavyChart /&gt;
        &lt;/Suspense&gt;
      )}
    &lt;/div&gt;
  );
}</code></pre><h2>Tree Shaking</h2><h3>Import Optimization</h3><pre><code>// Bad: imports entire library
import _ from 'lodash';
_.debounce(fn, 300);

// Good: imports only what's needed
import debounce from 'lodash/debounce';
debounce(fn, 300);

// Best: use ES modules with tree shaking
import { debounce } from 'lodash-es';</code></pre><h3>Webpack Configuration</h3><pre><code>// Enable tree shaking
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: true
  }
};</code></pre><h2>Asset Optimization</h2><h3>Image Optimization</h3><pre><code>// Use modern formats
&lt;picture&gt;
  &lt;source srcset="image.avif" type="image/avif"&gt;
  &lt;source srcset="image.webp" type="image/webp"&gt;
  &lt;img src="image.jpg" alt="Fallback"&gt;
&lt;/picture&gt;</code></pre><h3>Font Optimization</h3><pre><code>/* Subset fonts to only needed characters */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0000-00FF; /* Latin characters only */
}</code></pre><h2>Performance Budgets</h2><h3>Lighthouse CI</h3><pre><code>// lighthouserc.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'total-byte-weight': ['error', { maxNumericValue: 500000 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'interactive': ['error', { maxNumericValue: 5000 }]
      }
    }
  }
};</code></pre><h3>Webpack Performance Hints</h3><pre><code>module.exports = {
  performance: {
    maxEntrypointSize: 250000,
    maxAssetSize: 100000,
    hints: 'error'
  }
};</code></pre><h2>Monitoring</h2><ul><li>Track bundle size changes in CI/CD</li><li>Monitor Real User Metrics (RUM)</li><li>Set up alerts for performance regressions</li></ul><h2>Conclusion</h2><p>Frontend performance is a feature. Implement performance budgets, monitor continuously, and make bundle size part of your code review process.</p>$content$, '2023-10-01', $cat$Performance$cat$, 11, $icon$⚡$icon$, '{"Frontend","JavaScript","Webpack","Performance"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 23),
($id$performance-load-testing$id$, $title$Load Testing: Finding Breaking Points Before Users Do$title$, $excerpt$Design and execute load tests that reveal performance bottlenecks, using tools like k6, JMeter, and Artillery for realistic traffic simulation.$excerpt$, $content$<h2>Why Load Testing?</h2><p>Load testing reveals how your system behaves under stress. It's essential for capacity planning, finding bottlenecks, and preventing production incidents.</p><h2>Types of Load Tests</h2><h3>Load Test</h3><p>Simulate expected peak load:</p><pre><code>// k6 load test
export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay at peak
    { duration: '2m', target: 0 },    // Ramp down
  ],
};</code></pre><h3>Stress Test</h3><p>Find the breaking point:</p><pre><code>export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 },  // Keep increasing
    { duration: '5m', target: 300 },
  ],
};</code></pre><h3>Spike Test</h3><p>Simulate sudden traffic surge:</p><pre><code>export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1000 }, // Spike!
    { duration: '3m', target: 1000 },
    { duration: '10s', target: 100 },
  ],
};</code></pre><h3>Soak Test</h3><p>Test for memory leaks and degradation:</p><pre><code>export const options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '8h', target: 100 },  // Run for hours
    { duration: '5m', target: 0 },
  ],
};</code></pre><h2>Writing Realistic Tests</h2><h3>k6 Test Script</h3><pre><code>import http from 'k6/http';
import { check, sleep } from 'k6';

export default function() {
  // Simulate user journey
  const homeRes = http.get('https://api.example.com/');
  check(homeRes, {
    'home status 200': (r) => r.status === 200,
    'home response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1); // Think time
  
  const loginRes = http.post('https://api.example.com/login', {
    email: 'test@example.com',
    password: 'password',
  });
  check(loginRes, {
    'login successful': (r) => r.status === 200,
  });
  
  const token = loginRes.json('token');
  
  // Authenticated request
  const profileRes = http.get('https://api.example.com/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  sleep(Math.random() * 3); // Variable think time
}</code></pre><h2>Key Metrics</h2><h3>What to Measure</h3><ul><li><strong>Response Time:</strong> p50, p95, p99</li><li><strong>Throughput:</strong> Requests per second</li><li><strong>Error Rate:</strong> Failed requests percentage</li><li><strong>Concurrent Users:</strong> Active virtual users</li></ul><h3>Thresholds</h3><pre><code>export const options = {
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% under 500ms
    http_req_failed: ['rate<0.01'],    // Less than 1% errors
    http_reqs: ['rate>100'],           // At least 100 RPS
  },
};</code></pre><h2>CI/CD Integration</h2><pre><code># GitHub Actions
jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: grafana/k6-action@v0.3.0
        with:
          filename: load-tests/api-test.js
          flags: --out cloud</code></pre><h2>Analyzing Results</h2><ul><li>Compare against baseline</li><li>Identify bottlenecks (CPU, memory, database)</li><li>Correlate with application metrics</li><li>Document findings and recommendations</li></ul><h2>Conclusion</h2><p>Load testing should be part of your regular development cycle. Test early, test often, and always test before major releases.</p>$content$, '2023-09-01', $cat$Performance$cat$, 12, $icon$⚡$icon$, '{"Load Testing","k6","Performance","Testing"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 24),
($id$ai-enterprise-integration$id$, $title$AI Integration in Enterprise Applications$title$, $excerpt$How enterprises are leveraging AI and ML to gain competitive advantages, automate processes, and deliver personalized customer experiences.$excerpt$, $content$<h2>The AI Revolution in Enterprise</h2><p>Artificial intelligence is no longer a futuristic concept—it's a practical tool that enterprises are using today to transform their operations. This guide explores practical AI integrations that deliver real business value.</p><h2>High-Impact AI Use Cases</h2><h3>1. Customer Service Automation</h3><p>AI-powered chatbots and virtual assistants can handle 60-80% of routine customer inquiries, freeing human agents for complex issues.</p><ul><li>Natural language understanding for intent classification</li><li>Sentiment analysis for escalation triggers</li><li>Knowledge base integration for accurate responses</li></ul><h3>2. Predictive Analytics</h3><p>Machine learning models can predict:</p><ul><li>Customer churn with 85%+ accuracy</li><li>Demand forecasting for inventory optimization</li><li>Equipment failures before they occur (predictive maintenance)</li></ul><h3>3. Document Processing</h3><p>AI can extract information from unstructured documents—invoices, contracts, emails—with human-level accuracy, reducing manual data entry by 90%.</p><h3>4. Personalization</h3><p>Recommendation engines powered by AI can increase conversion rates by 20-30% through personalized product suggestions, content, and offers.</p><h2>Implementation Approaches</h2><h3>Build vs. Buy</h3><p>For most enterprises, starting with cloud AI services (Azure Cognitive Services, AWS AI, Google Cloud AI) is the fastest path to value. Custom model development makes sense when:</p><ul><li>Your domain is highly specialized</li><li>You have significant proprietary data</li><li>Off-the-shelf solutions don't meet accuracy requirements</li></ul><h3>Integration Patterns</h3><ul><li><strong>Real-time inference:</strong> API calls for immediate predictions</li><li><strong>Batch processing:</strong> Scheduled jobs for bulk analysis</li><li><strong>Edge deployment:</strong> Running models on-device for low latency</li></ul><h2>Responsible AI Considerations</h2><ul><li><strong>Bias:</strong> Regularly audit models for unfair bias</li><li><strong>Explainability:</strong> Ensure decisions can be explained</li><li><strong>Privacy:</strong> Handle training data appropriately</li><li><strong>Governance:</strong> Establish clear AI usage policies</li></ul><h2>Getting Started</h2><ol><li>Identify 2-3 high-value use cases with clear ROI</li><li>Start with a proof of concept using cloud services</li><li>Measure results against defined success criteria</li><li>Scale successful pilots into production</li><li>Build internal AI expertise gradually</li></ol><h2>Conclusion</h2><p>AI integration is becoming table stakes for competitive enterprises. Start small, focus on measurable business outcomes, and build capabilities incrementally.</p>$content$, '2023-09-01', $cat$AI/ML$cat$, 11, $icon$🤖$icon$, '{"AI","Machine Learning","Enterprise","Automation"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 25),
($id$ai-llm-integration$id$, $title$Integrating Large Language Models into Enterprise Applications$title$, $excerpt$Practical guide to integrating LLMs like GPT-4 and Claude into production systems with best practices for prompting, context management, and cost optimization.$excerpt$, $content$<h2>The LLM Revolution</h2><p>Large Language Models have transformed what's possible in software applications. From customer support to code generation, LLMs are becoming essential enterprise tools.</p><h2>Integration Patterns</h2><h3>Direct API Integration</h3><pre><code>import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateResponse(userMessage) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: userMessage }
    ],
    temperature: 0.7,
    max_tokens: 500
  });
  
  return response.choices[0].message.content;
}</code></pre><h3>RAG (Retrieval Augmented Generation)</h3><pre><code>async function answerWithContext(question) {
  // 1. Convert question to embedding
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: question
  });
  
  // 2. Search vector database for relevant documents
  const relevantDocs = await vectorDb.search(embedding.data[0].embedding, 5);
  
  // 3. Generate answer with context
  const context = relevantDocs.map(d => d.content).join('\n\n');
  
  return await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: `Answer based on this context:\n${context}` },
      { role: 'user', content: question }
    ]
  });
}</code></pre><h2>Prompt Engineering</h2><h3>System Prompts</h3><pre><code>const systemPrompt = `
You are a customer support agent for TechCorp.

Rules:
- Be helpful and professional
- Only answer questions about our products
- If you don't know, say so - don't make up information
- For billing issues, direct to billing@techcorp.com

Product catalog: [product details here]
`;</code></pre><h3>Few-Shot Examples</h3><pre><code>const messages = [
  { role: 'system', content: 'Extract order information from customer messages.' },
  { role: 'user', content: 'I ordered 5 blue widgets yesterday' },
  { role: 'assistant', content: '{"product": "widget", "color": "blue", "quantity": 5}' },
  { role: 'user', content: 'Need 10 red gadgets shipped to NYC' },
  { role: 'assistant', content: '{"product": "gadget", "color": "red", "quantity": 10, "destination": "NYC"}' },
  { role: 'user', content: actualUserMessage }
];</code></pre><h2>Production Considerations</h2><h3>Rate Limiting</h3><pre><code>const rateLimiter = new RateLimiter({
  tokensPerInterval: 60,
  interval: 'minute'
});

async function limitedLLMCall(prompt) {
  await rateLimiter.removeTokens(1);
  return await openai.chat.completions.create(...);
}</code></pre><h3>Caching</h3><pre><code>async function cachedLLMCall(prompt) {
  const cacheKey = hash(prompt);
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  const response = await openai.chat.completions.create(...);
  await redis.setEx(cacheKey, 3600, JSON.stringify(response));
  return response;
}</code></pre><h3>Fallback Strategy</h3><pre><code>async function resilientLLMCall(prompt) {
  try {
    return await openai.chat.completions.create({ model: 'gpt-4', ... });
  } catch (error) {
    console.warn('GPT-4 failed, falling back to GPT-3.5');
    return await openai.chat.completions.create({ model: 'gpt-3.5-turbo', ... });
  }
}</code></pre><h2>Cost Optimization</h2><ul><li>Use smaller models for simple tasks</li><li>Implement caching for repeated queries</li><li>Set appropriate max_tokens limits</li><li>Batch requests where possible</li><li>Monitor usage with alerts</li></ul><h2>Conclusion</h2><p>LLMs are powerful but require careful integration. Focus on reliability, cost management, and appropriate guardrails for production deployments.</p>$content$, '2024-01-01', $cat$AI & Machine Learning$cat$, 14, $icon$🤖$icon$, '{"LLM","GPT","AI","Enterprise"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 26),
($id$ai-ml-pipelines$id$, $title$Building Production ML Pipelines with MLflow$title$, $excerpt$Create end-to-end machine learning pipelines that handle data preparation, model training, versioning, and deployment with MLflow and Python.$excerpt$, $content$<h2>The MLOps Challenge</h2><p>Moving ML models from notebooks to production requires robust pipelines for training, versioning, and deployment. MLflow provides a comprehensive platform for this.</p><h2>MLflow Components</h2><ul><li><strong>Tracking:</strong> Log experiments, parameters, metrics</li><li><strong>Projects:</strong> Package ML code for reproducibility</li><li><strong>Models:</strong> Manage and deploy models</li><li><strong>Registry:</strong> Central model store with versioning</li></ul><h2>Experiment Tracking</h2><pre><code>import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score

mlflow.set_tracking_uri("http://mlflow-server:5000")
mlflow.set_experiment("customer-churn")

with mlflow.start_run():
    # Log parameters
    mlflow.log_param("n_estimators", 100)
    mlflow.log_param("max_depth", 10)
    
    # Train model
    model = RandomForestClassifier(n_estimators=100, max_depth=10)
    model.fit(X_train, y_train)
    
    # Log metrics
    predictions = model.predict(X_test)
    mlflow.log_metric("accuracy", accuracy_score(y_test, predictions))
    mlflow.log_metric("f1_score", f1_score(y_test, predictions))
    
    # Log model
    mlflow.sklearn.log_model(model, "model")</code></pre><h2>Pipeline Definition</h2><pre><code># MLproject file
name: customer-churn

conda_env: conda.yaml

entry_points:
  preprocess:
    parameters:
      input_path: path
    command: "python preprocess.py --input {input_path}"
    
  train:
    parameters:
      n_estimators: {type: int, default: 100}
      max_depth: {type: int, default: 10}
    command: "python train.py --n_estimators {n_estimators} --max_depth {max_depth}"
    
  evaluate:
    parameters:
      model_uri: str
    command: "python evaluate.py --model_uri {model_uri}"</code></pre><h2>Model Registry</h2><pre><code># Register model
result = mlflow.register_model(
    "runs:/abc123/model",
    "customer-churn-model"
)

# Transition to production
client = mlflow.tracking.MlflowClient()
client.transition_model_version_stage(
    name="customer-churn-model",
    version=1,
    stage="Production"
)</code></pre><h2>Model Deployment</h2><h3>REST API Serving</h3><pre><code># Serve model as REST API
mlflow models serve -m models:/customer-churn-model/Production -p 5001</code></pre><h3>Docker Deployment</h3><pre><code># Build Docker image
mlflow models build-docker -m models:/customer-churn-model/Production -n churn-model

# Run container
docker run -p 5001:8080 churn-model</code></pre><h3>Inference Code</h3><pre><code>import requests
import json

def predict(features):
    response = requests.post(
        "http://localhost:5001/invocations",
        headers={"Content-Type": "application/json"},
        data=json.dumps({"inputs": features})
    )
    return response.json()</code></pre><h2>Automated Retraining</h2><pre><code>from airflow import DAG
from airflow.operators.python import PythonOperator

def retrain_model():
    # Run MLflow project
    mlflow.projects.run(
        uri=".",
        entry_point="train",
        parameters={"n_estimators": 100}
    )

dag = DAG('ml_retrain', schedule_interval='@weekly')

retrain = PythonOperator(
    task_id='retrain_model',
    python_callable=retrain_model,
    dag=dag
)</code></pre><h2>Best Practices</h2><ul><li>Version everything: data, code, models</li><li>Automate testing for model quality</li><li>Monitor model drift in production</li><li>Implement gradual rollouts (canary deployments)</li><li>Document model cards for each version</li></ul><h2>Conclusion</h2><p>MLOps brings DevOps practices to machine learning. MLflow provides the foundation for reproducible, scalable ML pipelines in production.</p>$content$, '2023-11-01', $cat$AI & Machine Learning$cat$, 13, $icon$🤖$icon$, '{"MLflow","MLOps","Pipeline","Python"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 27),
($id$ai-computer-vision$id$, $title$Computer Vision in Enterprise: Practical Applications$title$, $excerpt$Implement computer vision solutions for quality inspection, document processing, and inventory management using modern deep learning frameworks.$excerpt$, $content$<h2>Enterprise Computer Vision Use Cases</h2><p>Computer vision has moved from research to practical enterprise applications. Modern frameworks make it accessible for solving real business problems.</p><h2>Common Applications</h2><h3>Quality Inspection</h3><p>Detect defects in manufacturing with high accuracy and speed:</p><ul><li>Surface defect detection</li><li>Dimensional measurement</li><li>Assembly verification</li><li>Label/barcode validation</li></ul><h3>Document Processing</h3><ul><li>Invoice data extraction</li><li>Form digitization</li><li>Signature verification</li><li>ID document validation</li></ul><h3>Inventory Management</h3><ul><li>Shelf monitoring</li><li>Stock level detection</li><li>Product identification</li><li>Warehouse organization</li></ul><h2>Implementation with PyTorch</h2><h3>Object Detection</h3><pre><code>import torch
import torchvision
from torchvision.models.detection import fasterrcnn_resnet50_fpn

# Load pre-trained model
model = fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

def detect_objects(image_tensor):
    with torch.no_grad():
        predictions = model([image_tensor])
    
    return [
        {
            'label': pred['labels'][i].item(),
            'confidence': pred['scores'][i].item(),
            'bbox': pred['boxes'][i].tolist()
        }
        for pred in predictions
        for i in range(len(pred['labels']))
        if pred['scores'][i] > 0.5
    ]</code></pre><h3>Custom Model Training</h3><pre><code>import torch.nn as nn
from torchvision import models

class DefectClassifier(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.backbone = models.resnet50(pretrained=True)
        self.backbone.fc = nn.Linear(2048, num_classes)
        
    def forward(self, x):
        return self.backbone(x)

# Training loop
model = DefectClassifier(num_classes=5)
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

for epoch in range(epochs):
    for images, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()</code></pre><h2>Cloud Vision APIs</h2><h3>Azure Computer Vision</h3><pre><code>from azure.cognitiveservices.vision.computervision import ComputerVisionClient

client = ComputerVisionClient(endpoint, credentials)

def analyze_image(image_url):
    analysis = client.analyze_image(
        image_url,
        visual_features=['Objects', 'Tags', 'Description']
    )
    return {
        'objects': [obj.object_property for obj in analysis.objects],
        'tags': [tag.name for tag in analysis.tags],
        'description': analysis.description.captions[0].text
    }</code></pre><h3>OCR for Document Processing</h3><pre><code>def extract_text(image_path):
    read_response = client.read(image_path, raw=True)
    operation_id = read_response.headers['Operation-Location'].split('/')[-1]
    
    while True:
        result = client.get_read_result(operation_id)
        if result.status not in ['notStarted', 'running']:
            break
        time.sleep(1)
    
    text_lines = []
    for page in result.analyze_result.read_results:
        for line in page.lines:
            text_lines.append(line.text)
    
    return '\n'.join(text_lines)</code></pre><h2>Edge Deployment</h2><pre><code># Convert to ONNX for edge deployment
import torch.onnx

dummy_input = torch.randn(1, 3, 224, 224)
torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    opset_version=11
)

# Run on edge with ONNX Runtime
import onnxruntime as ort

session = ort.InferenceSession("model.onnx")
result = session.run(None, {"input": image_array})</code></pre><h2>Best Practices</h2><ul><li>Start with pre-trained models and fine-tune</li><li>Ensure diverse, high-quality training data</li><li>Implement confidence thresholds for production</li><li>Plan for model updates and retraining</li><li>Consider edge vs cloud based on latency needs</li></ul><h2>Conclusion</h2><p>Computer vision has matured into a practical enterprise tool. Start with cloud APIs for quick wins, then build custom models for specialized needs.</p>$content$, '2023-10-01', $cat$AI & Machine Learning$cat$, 12, $icon$🤖$icon$, '{"Computer Vision","Deep Learning","PyTorch","Enterprise"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 28),
($id$ai-recommendation-systems$id$, $title$Building Recommendation Systems That Actually Work$title$, $excerpt$Design and implement recommendation systems using collaborative filtering, content-based approaches, and hybrid methods with real-world considerations.$excerpt$, $content$<h2>Why Recommendations Matter</h2><p>Personalized recommendations drive engagement and revenue. Amazon attributes 35% of purchases to its recommendation engine. Netflix estimates recommendations save $1B annually in retention.</p><h2>Recommendation Approaches</h2><h3>Collaborative Filtering</h3><p>Recommend items based on similar users' preferences:</p><pre><code>import numpy as np
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

# User-item matrix
ratings_matrix = csr_matrix(ratings_df.pivot(
    index='user_id', 
    columns='item_id', 
    values='rating'
).fillna(0))

# Find similar users
model = NearestNeighbors(metric='cosine', algorithm='brute')
model.fit(ratings_matrix)

def get_recommendations(user_id, n=10):
    user_vector = ratings_matrix[user_id]
    distances, indices = model.kneighbors(user_vector, n_neighbors=20)
    
    # Aggregate ratings from similar users
    similar_users_ratings = ratings_matrix[indices.flatten()].mean(axis=0)
    
    # Filter already rated items
    user_rated = set(ratings_df[ratings_df.user_id == user_id].item_id)
    recommendations = [
        (i, score) for i, score in enumerate(similar_users_ratings.A1)
        if i not in user_rated
    ]
    
    return sorted(recommendations, key=lambda x: -x[1])[:n]</code></pre><h3>Content-Based Filtering</h3><p>Recommend items similar to what user liked before:</p><pre><code>from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Create item profiles from descriptions
vectorizer = TfidfVectorizer(stop_words='english')
item_profiles = vectorizer.fit_transform(items_df['description'])

def content_recommendations(liked_item_ids, n=10):
    # Create user profile from liked items
    user_profile = item_profiles[liked_item_ids].mean(axis=0)
    
    # Find similar items
    similarities = cosine_similarity(user_profile, item_profiles).flatten()
    
    # Exclude already liked items
    recommendations = [
        (i, sim) for i, sim in enumerate(similarities)
        if i not in liked_item_ids
    ]
    
    return sorted(recommendations, key=lambda x: -x[1])[:n]</code></pre><h3>Hybrid Approach</h3><pre><code>def hybrid_recommendations(user_id, liked_items, n=10):
    # Get both types of recommendations
    collab_recs = get_recommendations(user_id, n=n*2)
    content_recs = content_recommendations(liked_items, n=n*2)
    
    # Combine with weights
    scores = {}
    for item_id, score in collab_recs:
        scores[item_id] = scores.get(item_id, 0) + 0.6 * score
    for item_id, score in content_recs:
        scores[item_id] = scores.get(item_id, 0) + 0.4 * score
    
    return sorted(scores.items(), key=lambda x: -x[1])[:n]</code></pre><h2>Deep Learning Approaches</h2><h3>Neural Collaborative Filtering</h3><pre><code>import torch
import torch.nn as nn

class NCF(nn.Module):
    def __init__(self, num_users, num_items, embedding_dim=64):
        super().__init__()
        self.user_embedding = nn.Embedding(num_users, embedding_dim)
        self.item_embedding = nn.Embedding(num_items, embedding_dim)
        self.fc_layers = nn.Sequential(
            nn.Linear(embedding_dim * 2, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 1)
        )
        
    def forward(self, user_ids, item_ids):
        user_embed = self.user_embedding(user_ids)
        item_embed = self.item_embedding(item_ids)
        concat = torch.cat([user_embed, item_embed], dim=-1)
        return self.fc_layers(concat).squeeze()</code></pre><h2>Production Considerations</h2><h3>Cold Start Problem</h3><ul><li>New users: Use content-based or popularity</li><li>New items: Use content similarity</li><li>Collect implicit feedback quickly</li></ul><h3>Real-Time vs Batch</h3><ul><li>Batch: Pre-compute recommendations daily</li><li>Real-time: Update based on session activity</li><li>Hybrid: Batch base + real-time adjustment</li></ul><h2>Evaluation Metrics</h2><ul><li><strong>Precision@K:</strong> Relevant items in top K</li><li><strong>Recall@K:</strong> Coverage of relevant items</li><li><strong>NDCG:</strong> Ranking quality</li><li><strong>A/B Testing:</strong> Business metrics (CTR, conversion)</li></ul><h2>Conclusion</h2><p>Start simple with collaborative filtering, add content-based for cold start, and evolve to deep learning as your data grows. Always validate with A/B tests.</p>$content$, '2023-08-01', $cat$AI & Machine Learning$cat$, 13, $icon$🤖$icon$, '{"Recommendations","ML","Personalization","Python"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 29),
($id$ai-nlp-text-analytics$id$, $title$NLP and Text Analytics for Business Intelligence$title$, $excerpt$Extract insights from text data using sentiment analysis, entity recognition, and topic modeling for customer feedback, support tickets, and documents.$excerpt$, $content$<h2>The Value of Text Analytics</h2><p>Unstructured text contains valuable insights. Customer reviews, support tickets, social media, and documents hold information that can drive business decisions when properly analyzed.</p><h2>Sentiment Analysis</h2><h3>Using Transformers</h3><pre><code>from transformers import pipeline

sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

def analyze_sentiment(texts):
    results = sentiment_analyzer(texts)
    return [
        {
            'text': text,
            'sentiment': r['label'],
            'confidence': r['score']
        }
        for text, r in zip(texts, results)
    ]

# Analyze customer reviews
reviews = [
    "Great product, works perfectly!",
    "Terrible experience, never buying again."
]
sentiments = analyze_sentiment(reviews)</code></pre><h3>Fine-Tuning for Domain</h3><pre><code>from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=16,
    evaluation_strategy='epoch'
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset
)

trainer.train()</code></pre><h2>Named Entity Recognition</h2><pre><code>import spacy

nlp = spacy.load('en_core_web_trf')

def extract_entities(text):
    doc = nlp(text)
    return [
        {
            'text': ent.text,
            'label': ent.label_,
            'start': ent.start_char,
            'end': ent.end_char
        }
        for ent in doc.ents
    ]

# Extract from business document
text = "Apple Inc. reported $394 billion in revenue in 2022. Tim Cook announced new products in California."
entities = extract_entities(text)
# Returns: Apple Inc. (ORG), $394 billion (MONEY), 2022 (DATE), Tim Cook (PERSON), California (GPE)</code></pre><h2>Topic Modeling</h2><pre><code>from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

# Prepare documents
vectorizer = CountVectorizer(max_df=0.95, min_df=2, stop_words='english')
doc_term_matrix = vectorizer.fit_transform(documents)

# Train LDA model
lda = LatentDirichletAllocation(
    n_components=10,
    random_state=42
)
lda.fit(doc_term_matrix)

# Get topic words
def get_topic_words(model, vectorizer, n_words=10):
    words = vectorizer.get_feature_names_out()
    topics = []
    for topic_idx, topic in enumerate(model.components_):
        top_words = [words[i] for i in topic.argsort()[:-n_words-1:-1]]
        topics.append(top_words)
    return topics</code></pre><h2>Text Classification</h2><pre><code>from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Multi-label classification for support tickets
class TicketClassifier:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
        self.model = AutoModelForSequenceClassification.from_pretrained(
            'bert-base-uncased',
            num_labels=len(categories)
        )
        
    def classify(self, ticket_text):
        inputs = self.tokenizer(
            ticket_text,
            return_tensors='pt',
            truncation=True
        )
        outputs = self.model(**inputs)
        probs = torch.softmax(outputs.logits, dim=-1)
        return {
            'category': categories[probs.argmax()],
            'confidence': probs.max().item()
        }</code></pre><h2>Building a Text Analytics Pipeline</h2><pre><code>class TextAnalyticsPipeline:
    def __init__(self):
        self.sentiment = pipeline('sentiment-analysis')
        self.ner = spacy.load('en_core_web_sm')
        
    def analyze(self, text):
        return {
            'sentiment': self.sentiment(text)[0],
            'entities': self.extract_entities(text),
            'summary': self.summarize(text),
            'keywords': self.extract_keywords(text)
        }</code></pre><h2>Production Tips</h2><ul><li>Pre-process text: lowercase, remove noise</li><li>Handle multiple languages with multilingual models</li><li>Cache model inference for repeated texts</li><li>Monitor for data drift over time</li><li>Use batch processing for high volume</li></ul><h2>Conclusion</h2><p>Modern NLP has made text analytics accessible. Start with pre-trained models and fine-tune for your specific domain and use cases.</p>$content$, '2023-07-01', $cat$AI & Machine Learning$cat$, 12, $icon$🤖$icon$, '{"NLP","Text Analytics","Sentiment","Python"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 30),
($id$security-zero-trust$id$, $title$Implementing Zero Trust Architecture$title$, $excerpt$Build a zero trust security model that assumes no implicit trust, verifying every request regardless of source with identity, device, and context validation.$excerpt$, $content$<h2>What is Zero Trust?</h2><p>Zero Trust is a security model based on the principle 'never trust, always verify.' It assumes no implicit trust granted to assets or users based solely on their network location.</p><h2>Core Principles</h2><ul><li><strong>Verify Explicitly:</strong> Always authenticate and authorize based on all available data points</li><li><strong>Least Privilege Access:</strong> Limit user access with Just-In-Time and Just-Enough-Access</li><li><strong>Assume Breach:</strong> Minimize blast radius and segment access</li></ul><h2>Identity Pillar</h2><h3>Strong Authentication</h3><pre><code>// Azure AD B2C configuration
const msalConfig = {
  auth: {
    clientId: 'your-client-id',
    authority: 'https://login.microsoftonline.com/your-tenant',
    redirectUri: 'https://app.example.com'
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
};

// Require MFA for sensitive operations
const authRequest = {
  scopes: ['api://your-api/.default'],
  extraQueryParameters: {
    acr_values: 'urn:microsoft:req1' // Require MFA
  }
};</code></pre><h3>Conditional Access</h3><pre><code>// Policy: Require compliant device for sensitive apps
{
  "conditions": {
    "applications": { "includeApplications": ["sensitive-app-id"] },
    "users": { "includeGroups": ["all-employees"] },
    "platforms": { "includePlatforms": ["all"] }
  },
  "grantControls": {
    "operator": "AND",
    "builtInControls": [
      "mfa",
      "compliantDevice"
    ]
  }
}</code></pre><h2>Network Segmentation</h2><h3>Micro-Segmentation</h3><pre><code># Kubernetes Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-isolation
spec:
  podSelector:
    matchLabels:
      app: api-server
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: web-frontend
      ports:
        - protocol: TCP
          port: 8080
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: database
      ports:
        - protocol: TCP
          port: 5432</code></pre><h2>Device Trust</h2><pre><code>// Device compliance check middleware
function validateDeviceCompliance(req, res, next) {
  const deviceId = req.headers['x-device-id'];
  const deviceCert = req.headers['x-device-cert'];
  
  // Verify device is registered and compliant
  const device = await deviceService.getDevice(deviceId);
  
  if (!device || !device.isCompliant) {
    return res.status(403).json({
      error: 'Device not compliant',
      enrollmentUrl: '/device/enroll'
    });
  }
  
  // Verify device certificate
  if (!certService.verify(deviceCert, device.publicKey)) {
    return res.status(403).json({ error: 'Invalid device certificate' });
  }
  
  next();
}</code></pre><h2>Application Security</h2><pre><code>// Token validation with scope checking
function authorizeRequest(requiredScope) {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    try {
      const decoded = await verifyToken(token);
      
      // Check required scope
      if (!decoded.scopes.includes(requiredScope)) {
        return res.status(403).json({ error: 'Insufficient scope' });
      }
      
      // Check token binding
      if (decoded.cnf?.kid !== req.headers['x-device-key']) {
        return res.status(403).json({ error: 'Token binding mismatch' });
      }
      
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}</code></pre><h2>Monitoring & Analytics</h2><pre><code>// Log all access for analysis
const accessLog = {
  timestamp: Date.now(),
  user: req.user.id,
  device: req.headers['x-device-id'],
  resource: req.path,
  action: req.method,
  sourceIp: req.ip,
  userAgent: req.headers['user-agent'],
  riskScore: calculateRiskScore(req),
  decision: 'allow'
};

await securityAnalytics.log(accessLog);</code></pre><h2>Implementation Roadmap</h2><ol><li>Inventory assets and identify sensitive data</li><li>Implement strong identity verification (MFA)</li><li>Deploy micro-segmentation</li><li>Enable device compliance checking</li><li>Implement continuous monitoring</li><li>Automate policy enforcement</li></ol><h2>Conclusion</h2><p>Zero Trust is a journey, not a destination. Start with identity and incrementally add layers. The goal is reducing attack surface while maintaining productivity.</p>$content$, '2024-01-01', $cat$Security$cat$, 13, $icon$🔒$icon$, '{"Zero Trust","Security","Identity","Architecture"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 31),
($id$security-api-security$id$, $title$API Security Best Practices for Modern Applications$title$, $excerpt$Secure your APIs with authentication, authorization, rate limiting, input validation, and protection against common attacks like injection and BOLA.$excerpt$, $content$<h2>API Security Threats</h2><p>APIs are the backbone of modern applications and a prime target for attackers. The OWASP API Security Top 10 highlights the most critical risks.</p><h2>Authentication</h2><h3>OAuth 2.0 with PKCE</h3><pre><code>// Client-side PKCE flow
async function initiateAuth() {
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await sha256(codeVerifier);
  
  // Store verifier for token exchange
  sessionStorage.setItem('code_verifier', codeVerifier);
  
  const authUrl = new URL('https://auth.example.com/authorize');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('scope', 'openid profile api');
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');
  
  window.location.href = authUrl.toString();
}</code></pre><h3>JWT Validation</h3><pre><code>import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: 'https://auth.example.com/.well-known/jwks.json',
  cache: true,
  rateLimit: true
});

async function validateToken(token) {
  const decoded = jwt.decode(token, { complete: true });
  const key = await client.getSigningKey(decoded.header.kid);
  
  return jwt.verify(token, key.getPublicKey(), {
    algorithms: ['RS256'],
    issuer: 'https://auth.example.com',
    audience: 'your-api-audience'
  });
}</code></pre><h2>Authorization</h2><h3>Object-Level Authorization (BOLA Prevention)</h3><pre><code>// Always verify resource ownership
async function getOrder(req, res) {
  const order = await Order.findById(req.params.orderId);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  // CRITICAL: Verify the user owns this resource
  if (order.userId !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  res.json(order);
}</code></pre><h3>Function-Level Authorization</h3><pre><code>// Role-based access control middleware
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.some(role => req.user.roles.includes(role))) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

app.delete('/users/:id', requireRole('admin'), deleteUser);
app.post('/orders', requireRole('user', 'admin'), createOrder);</code></pre><h2>Input Validation</h2><pre><code>import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\s]+$/),
  age: z.number().int().min(18).max(120).optional()
});

function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.issues
      });
    }
    req.body = result.data; // Use sanitized data
    next();
  };
}

app.post('/users', validateBody(CreateUserSchema), createUser);</code></pre><h2>Rate Limiting</h2><pre><code>import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  store: new RedisStore({ client: redisClient }),
  keyGenerator: (req) => req.user?.id || req.ip
});

// Strict limit for sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many login attempts'
});

app.use('/api/', apiLimiter);
app.post('/auth/login', authLimiter, login);</code></pre><h2>SQL Injection Prevention</h2><pre><code>// WRONG - vulnerable to SQL injection
const query = `SELECT * FROM users WHERE email = '${email}'`;

// CORRECT - parameterized query
const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);

// CORRECT - ORM with automatic escaping
const user = await User.findOne({ where: { email } });</code></pre><h2>Security Headers</h2><pre><code>import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:', 'https:'],
    connectSrc: ["'self'", 'https://api.example.com']
  }
}));</code></pre><h2>Logging & Monitoring</h2><pre><code>// Security event logging
function logSecurityEvent(event) {
  const log = {
    timestamp: new Date().toISOString(),
    type: event.type,
    severity: event.severity,
    userId: event.userId,
    ip: event.ip,
    details: event.details
  };
  
  securityLogger.log(log);
  
  if (event.severity === 'critical') {
    alertService.notify(log);
  }
}</code></pre><h2>Conclusion</h2><p>API security requires defense in depth. Implement authentication, authorization, validation, and monitoring. Regularly audit against OWASP API Security Top 10.</p>$content$, '2023-12-01', $cat$Security$cat$, 14, $icon$🔒$icon$, '{"API Security","OAuth","JWT","OWASP"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 32),
($id$security-devsecops$id$, $title$DevSecOps: Integrating Security into CI/CD Pipelines$title$, $excerpt$Shift security left by integrating SAST, DAST, dependency scanning, and compliance checks into your development and deployment workflows.$excerpt$, $content$<h2>Why DevSecOps?</h2><p>Finding vulnerabilities in production is 100x more expensive than finding them during development. DevSecOps integrates security into every stage of the development lifecycle.</p><h2>The Security Pipeline</h2><h3>Complete GitHub Actions Pipeline</h3><pre><code>name: DevSecOps Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Dependency vulnerability scanning
      - name: Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          path: '.'
          format: 'HTML'
          
      # SAST - Static Analysis
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          
      # Secret scanning
      - name: Gitleaks
        uses: gitleaks/gitleaks-action@v2
        
      # Container scanning
      - name: Build image
        run: docker build -t myapp:${{ github.sha }} .
        
      - name: Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:${{ github.sha }}'
          severity: 'CRITICAL,HIGH'</code></pre><h2>SAST - Static Application Security Testing</h2><pre><code># SonarQube configuration (sonar-project.properties)
sonar.projectKey=my-project
sonar.organization=my-org
sonar.sources=src
sonar.tests=test
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# Security rules
sonar.issue.ignore.multicriteria=e1
sonar.issue.ignore.multicriteria.e1.ruleKey=javascript:S2068
sonar.issue.ignore.multicriteria.e1.resourceKey=**/*.test.js</code></pre><h3>Custom Security Rules</h3><pre><code>// ESLint security plugin configuration
module.exports = {
  plugins: ['security'],
  extends: ['plugin:security/recommended'],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-eval-with-expression': 'error'
  }
};</code></pre><h2>DAST - Dynamic Application Security Testing</h2><pre><code># OWASP ZAP in CI pipeline
dast:
  stage: test
  image: owasp/zap2docker-stable
  script:
    - mkdir -p /zap/wrk/
    - zap-baseline.py -t $APP_URL -r zap_report.html
  artifacts:
    paths:
      - zap_report.html</code></pre><h2>Dependency Scanning</h2><pre><code># Snyk integration
name: Snyk Security

jobs:
  snyk:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          command: test
          args: --severity-threshold=high</code></pre><pre><code>// package.json audit script
{
  "scripts": {
    "audit": "npm audit --production",
    "audit:fix": "npm audit fix",
    "security:check": "snyk test && snyk monitor"
  }
}</code></pre><h2>Infrastructure as Code Security</h2><pre><code># Terraform security scanning with Checkov
security-iac:
  stage: security
  image: bridgecrew/checkov:latest
  script:
    - checkov -d ./terraform --framework terraform
  allow_failure: false</code></pre><h2>Container Security</h2><pre><code># Dockerfile best practices
FROM node:18-alpine AS builder
# Use non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Install dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy app
COPY --chown=nextjs:nodejs . .

# Switch to non-root user
USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]</code></pre><h2>Security Gates</h2><pre><code>// Quality gate configuration
const securityGate = {
  critical: 0,    // Zero critical vulnerabilities allowed
  high: 5,        // Max 5 high vulnerabilities
  medium: 20,     // Max 20 medium vulnerabilities
  codeSmells: 50, // Max 50 code smells
  coverage: 80    // Minimum 80% code coverage
};

function evaluateGate(scanResults) {
  if (scanResults.critical > securityGate.critical) {
    throw new Error('Critical vulnerabilities found - blocking deployment');
  }
  // Additional checks...
}</code></pre><h2>Secrets Management</h2><pre><code># Pre-commit hooks for secret detection
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.16.1
    hooks:
      - id: gitleaks</code></pre><h2>Compliance as Code</h2><pre><code># Open Policy Agent (OPA) policy
package kubernetes.admission

deny[msg] {
  input.request.kind.kind == "Deployment"
  not input.request.object.spec.template.spec.securityContext.runAsNonRoot
  msg := "Containers must not run as root"
}

deny[msg] {
  input.request.kind.kind == "Deployment"
  container := input.request.object.spec.template.spec.containers[_]
  not container.resources.limits
  msg := "Container must have resource limits"
}</code></pre><h2>Conclusion</h2><p>DevSecOps is about making security everyone's responsibility. Automate security checks, fail fast, and continuously improve your security posture.</p>$content$, '2023-11-01', $cat$Security$cat$, 13, $icon$🔒$icon$, '{"DevSecOps","CI/CD","Security","Automation"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 33),
($id$security-cloud-security$id$, $title$Cloud Security Architecture: AWS, Azure, and GCP$title$, $excerpt$Design secure cloud architectures using identity management, network security, encryption, and compliance frameworks across major cloud providers.$excerpt$, $content$<h2>Shared Responsibility Model</h2><p>Cloud providers secure the infrastructure; you secure your data and configurations. Understanding this boundary is critical for cloud security.</p><h2>Identity and Access Management</h2><h3>AWS IAM Best Practices</h3><pre><code>// Least privilege IAM policy
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/uploads/*",
      "Condition": {
        "StringEquals": {
          "aws:PrincipalTag/Department": "Engineering"
        }
      }
    }
  ]
}</code></pre><h3>Azure RBAC</h3><pre><code>// Custom role definition
{
  "Name": "App Reader",
  "IsCustom": true,
  "Description": "Read-only access to application resources",
  "Actions": [
    "Microsoft.Web/sites/read",
    "Microsoft.Web/sites/config/read"
  ],
  "NotActions": [],
  "AssignableScopes": [
    "/subscriptions/{subscription-id}/resourceGroups/app-rg"
  ]
}</code></pre><h2>Network Security</h2><h3>VPC Security (AWS)</h3><pre><code>// Terraform VPC with security groups
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  
  tags = {
    Name = "secure-vpc"
  }
}

resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Security group for web servers"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["10.0.0.0/16"]  // Only internal
  }
}</code></pre><h3>Private Endpoints</h3><pre><code>// Azure Private Endpoint for Storage
resource "azurerm_private_endpoint" "storage" {
  name                = "storage-pe"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  subnet_id           = azurerm_subnet.private.id

  private_service_connection {
    name                           = "storage-connection"
    private_connection_resource_id = azurerm_storage_account.main.id
    subresource_names              = ["blob"]
    is_manual_connection           = false
  }
}</code></pre><h2>Data Encryption</h2><h3>Encryption at Rest</h3><pre><code>// AWS S3 bucket encryption
resource "aws_s3_bucket" "secure" {
  bucket = "my-secure-bucket"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "secure" {
  bucket = aws_s3_bucket.secure.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.bucket_key.arn
      sse_algorithm     = "aws:kms"
    }
    bucket_key_enabled = true
  }
}</code></pre><h3>Encryption in Transit</h3><pre><code>// Enforce HTTPS on CloudFront
resource "aws_cloudfront_distribution" "cdn" {
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
  
  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
  }
}</code></pre><h2>Secrets Management</h2><pre><code>// AWS Secrets Manager
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'us-east-1' });

async function getSecret(secretName) {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);
  return JSON.parse(response.SecretString);
}

// Usage
const dbCreds = await getSecret('prod/db/credentials');</code></pre><h2>Security Monitoring</h2><h3>AWS GuardDuty</h3><pre><code>// Enable GuardDuty with Terraform
resource "aws_guardduty_detector" "main" {
  enable = true
  
  datasources {
    s3_logs {
      enable = true
    }
    kubernetes {
      audit_logs {
        enable = true
      }
    }
  }
}</code></pre><h3>Azure Defender</h3><pre><code>// Enable Defender for Cloud
resource "azurerm_security_center_subscription_pricing" "defender" {
  tier          = "Standard"
  resource_type = "VirtualMachines"
}

resource "azurerm_security_center_contact" "security" {
  email               = "security@company.com"
  alert_notifications = true
  alerts_to_admins    = true
}</code></pre><h2>Compliance</h2><pre><code>// AWS Config rules for compliance
resource "aws_config_config_rule" "s3_bucket_public_read_prohibited" {
  name = "s3-bucket-public-read-prohibited"
  
  source {
    owner             = "AWS"
    source_identifier = "S3_BUCKET_PUBLIC_READ_PROHIBITED"
  }
}

resource "aws_config_config_rule" "encrypted_volumes" {
  name = "encrypted-volumes"
  
  source {
    owner             = "AWS"
    source_identifier = "ENCRYPTED_VOLUMES"
  }
}</code></pre><h2>Conclusion</h2><p>Cloud security requires a comprehensive approach covering identity, network, data, and monitoring. Leverage native security services and automate compliance checks.</p>$content$, '2023-10-01', $cat$Security$cat$, 14, $icon$🔒$icon$, '{"Cloud Security","AWS","Azure","GCP"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 34),
($id$security-authentication-patterns$id$, $title$Modern Authentication Patterns: OAuth, OIDC, and Beyond$title$, $excerpt$Master authentication implementations with OAuth 2.0, OpenID Connect, SAML, and passwordless authentication for secure modern applications.$excerpt$, $content$<h2>Authentication vs Authorization</h2><p>Authentication verifies identity (who you are). Authorization determines permissions (what you can do). Modern systems need both.</p><h2>OAuth 2.0 Flows</h2><h3>Authorization Code Flow (Web Apps)</h3><pre><code>// Step 1: Redirect to authorization server
const authUrl = new URL('https://auth.example.com/authorize');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('redirect_uri', 'https://app.example.com/callback');
authUrl.searchParams.set('scope', 'openid profile email');
authUrl.searchParams.set('state', generateState());

window.location.href = authUrl.toString();

// Step 2: Exchange code for tokens (server-side)
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Verify state to prevent CSRF
  if (state !== req.session.state) {
    return res.status(400).send('Invalid state');
  }
  
  const tokens = await fetch('https://auth.example.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://app.example.com/callback',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
  }).then(r => r.json());
  
  req.session.tokens = tokens;
  res.redirect('/dashboard');
});</code></pre><h3>Authorization Code with PKCE (SPAs, Mobile)</h3><pre><code>// Generate PKCE challenge
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(hash));
}

// Include in auth request
const codeVerifier = generateCodeVerifier();
const codeChallenge = await generateCodeChallenge(codeVerifier);

authUrl.searchParams.set('code_challenge', codeChallenge);
authUrl.searchParams.set('code_challenge_method', 'S256');

// Store verifier for token exchange
sessionStorage.setItem('code_verifier', codeVerifier);</code></pre><h2>OpenID Connect</h2><h3>ID Token Validation</h3><pre><code>import * as jose from 'jose';

async function validateIdToken(idToken) {
  const JWKS = jose.createRemoteJWKSet(
    new URL('https://auth.example.com/.well-known/jwks.json')
  );
  
  const { payload } = await jose.jwtVerify(idToken, JWKS, {
    issuer: 'https://auth.example.com',
    audience: CLIENT_ID
  });
  
  // Additional validations
  if (payload.nonce !== expectedNonce) {
    throw new Error('Invalid nonce');
  }
  
  if (payload.exp < Date.now() / 1000) {
    throw new Error('Token expired');
  }
  
  return payload;
}</code></pre><h2>Session Management</h2><pre><code>// Secure session configuration
import session from 'express-session';
import RedisStore from 'connect-redis';

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  name: '__Host-session',  // Cookie prefix for security
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,          // HTTPS only
    httpOnly: true,        // No JS access
    sameSite: 'strict',    // CSRF protection
    maxAge: 3600000        // 1 hour
  }
}));</code></pre><h2>Token Refresh</h2><pre><code>async function refreshTokens(refreshToken) {
  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID
    })
  });
  
  if (!response.ok) {
    throw new Error('Token refresh failed');
  }
  
  return response.json();
}

// Automatic refresh middleware
async function ensureValidToken(req, res, next) {
  const tokens = req.session.tokens;
  
  if (isTokenExpired(tokens.access_token)) {
    try {
      req.session.tokens = await refreshTokens(tokens.refresh_token);
    } catch (error) {
      return res.redirect('/login');
    }
  }
  
  next();
}</code></pre><h2>Passwordless Authentication</h2><h3>WebAuthn / Passkeys</h3><pre><code>// Registration
async function registerPasskey() {
  const options = await fetch('/auth/webauthn/register-options').then(r => r.json());
  
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: Uint8Array.from(options.challenge),
      rp: { name: 'My App', id: 'app.example.com' },
      user: {
        id: Uint8Array.from(options.userId),
        name: options.username,
        displayName: options.displayName
      },
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required'
      }
    }
  });
  
  await fetch('/auth/webauthn/register', {
    method: 'POST',
    body: JSON.stringify(credential)
  });
}</code></pre><h2>Multi-Factor Authentication</h2><pre><code>import { authenticator } from 'otplib';

// Generate TOTP secret
const secret = authenticator.generateSecret();
const otpauth = authenticator.keyuri(user.email, 'MyApp', secret);

// Verify TOTP code
function verifyTOTP(secret, token) {
  return authenticator.verify({ token, secret });
}</code></pre><h2>Conclusion</h2><p>Choose the right authentication pattern for your use case. OAuth 2.0 with PKCE for SPAs, server-side tokens for web apps, and consider passwordless for better UX and security.</p>$content$, '2023-09-01', $cat$Security$cat$, 13, $icon$🔒$icon$, '{"OAuth","OIDC","Authentication","Identity"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 35),
($id$security-secure-coding$id$, $title$Secure Coding Practices Every Developer Must Know$title$, $excerpt$Write secure code by understanding common vulnerabilities, input validation, output encoding, and secure handling of sensitive data.$excerpt$, $content$<h2>Security is Everyone's Responsibility</h2><p>Security vulnerabilities often originate in code. Understanding common attack patterns and defensive coding practices prevents breaches.</p><h2>Input Validation</h2><h3>Never Trust User Input</h3><pre><code>// BAD - Using user input directly
const query = `SELECT * FROM users WHERE id = ${req.params.id}`;

// GOOD - Parameterized query
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.query(query, [req.params.id]);

// GOOD - Schema validation with Zod
import { z } from 'zod';

const UserIdSchema = z.object({
  id: z.string().uuid()
});

function getUser(req, res) {
  const result = UserIdSchema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  // Now safe to use result.data.id
}</code></pre><h3>Whitelist vs Blacklist</h3><pre><code>// BAD - Blacklist approach (trying to block bad input)
function sanitize(input) {
  return input.replace(/<script>/gi, '');  // Can be bypassed!
}

// GOOD - Whitelist approach (only allow known good)
function sanitize(input) {
  return input.replace(/[^a-zA-Z0-9\s]/g, '');
}

// BETTER - Use dedicated libraries
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userHtml);</code></pre><h2>Output Encoding</h2><h3>XSS Prevention</h3><pre><code>// BAD - Inserting user data into HTML
element.innerHTML = `<p>Hello, ${userName}</p>`;

// GOOD - Use textContent for plain text
element.textContent = `Hello, ${userName}`;

// GOOD - Encode HTML entities
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// GOOD - Use framework's built-in escaping
// React automatically escapes: <p>{userName}</p>
// Angular automatically escapes: <p>{{userName}}</p></code></pre><h2>SQL Injection Prevention</h2><pre><code>// Always use parameterized queries
// Node.js with pg
const { rows } = await pool.query(
  'SELECT * FROM products WHERE category = $1 AND price < $2',
  [category, maxPrice]
);

// Python with psycopg2
cursor.execute(
    "SELECT * FROM products WHERE category = %s AND price < %s",
    (category, max_price)
)

// C# with Entity Framework (safe by default)
var products = context.Products
    .Where(p => p.Category == category && p.Price < maxPrice)
    .ToList();</code></pre><h2>Path Traversal Prevention</h2><pre><code>import path from 'path';

// BAD - User can access any file
app.get('/files/:filename', (req, res) => {
  res.sendFile(`/uploads/${req.params.filename}`);
});

// GOOD - Validate and sanitize path
app.get('/files/:filename', (req, res) => {
  const uploadsDir = '/var/www/uploads';
  const filename = path.basename(req.params.filename);  // Strip path
  const filePath = path.join(uploadsDir, filename);
  
  // Verify file is within allowed directory
  if (!filePath.startsWith(uploadsDir)) {
    return res.status(403).send('Access denied');
  }
  
  res.sendFile(filePath);
});</code></pre><h2>Sensitive Data Handling</h2><h3>Password Storage</h3><pre><code>import bcrypt from 'bcrypt';

// Hash password before storing
async function hashPassword(password) {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Verify password
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}</code></pre><h3>Secrets in Code</h3><pre><code>// BAD - Hardcoded secrets
const apiKey = 'sk-123456789';

// GOOD - Environment variables
const apiKey = process.env.API_KEY;

// BETTER - Secrets manager
import { getSecret } from './secrets-manager';
const apiKey = await getSecret('api-key');</code></pre><h2>Error Handling</h2><pre><code>// BAD - Leaking internal details
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack,
    query: err.query  // SQL query exposure!
  });
});

// GOOD - Generic error for users, detailed logs
app.use((err, req, res, next) => {
  // Log full error for debugging
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    requestId: req.id
  });
  
  // Return generic message to user
  res.status(500).json({
    error: 'An unexpected error occurred',
    requestId: req.id  // For support reference
  });
});</code></pre><h2>Security Headers</h2><pre><code>// Set security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

// Or use helmet
import helmet from 'helmet';
app.use(helmet());</code></pre><h2>Conclusion</h2><p>Secure coding is a mindset. Validate all input, encode all output, use parameterized queries, and handle errors gracefully. Security is built in, not bolted on.</p>$content$, '2023-08-01', $cat$Security$cat$, 12, $icon$🔒$icon$, '{"Secure Coding","OWASP","Vulnerabilities","Best Practices"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 36),
($id$security-incident-response$id$, $title$Security Incident Response for Development Teams$title$, $excerpt$Build and execute incident response plans covering detection, containment, eradication, recovery, and post-incident analysis for security breaches.$excerpt$, $content$<h2>Why Incident Response Matters</h2><p>Security incidents are inevitable. The difference between a minor issue and a major breach often comes down to how quickly and effectively you respond.</p><h2>Incident Response Phases</h2><ol><li><strong>Preparation:</strong> Plans, tools, training</li><li><strong>Detection:</strong> Identify potential incidents</li><li><strong>Containment:</strong> Limit the damage</li><li><strong>Eradication:</strong> Remove the threat</li><li><strong>Recovery:</strong> Restore normal operations</li><li><strong>Lessons Learned:</strong> Improve for next time</li></ol><h2>Detection and Alerting</h2><pre><code>// Centralized security logging
const securityLogger = {
  log(event) {
    const entry = {
      timestamp: new Date().toISOString(),
      ...event,
      environment: process.env.NODE_ENV,
      service: process.env.SERVICE_NAME
    };
    
    // Send to SIEM
    siem.ingest(entry);
    
    // Check for alert conditions
    if (this.shouldAlert(event)) {
      alertService.notify(entry);
    }
  },
  
  shouldAlert(event) {
    const alertConditions = [
      event.type === 'authentication_failure' && event.count > 5,
      event.type === 'privilege_escalation',
      event.type === 'data_exfiltration',
      event.severity === 'critical'
    ];
    return alertConditions.some(c => c);
  }
};</code></pre><h2>Incident Classification</h2><pre><code>const incidentSeverity = {
  P1: {
    name: 'Critical',
    response: '15 minutes',
    examples: ['Active data breach', 'Ransomware', 'Complete service outage'],
    escalation: ['Security Lead', 'CTO', 'Legal']
  },
  P2: {
    name: 'High',
    response: '1 hour',
    examples: ['Suspected breach', 'Credential compromise', 'Major vulnerability'],
    escalation: ['Security Lead', 'Engineering Lead']
  },
  P3: {
    name: 'Medium',
    response: '4 hours',
    examples: ['Phishing attempt', 'Minor vulnerability', 'Policy violation'],
    escalation: ['Security Team']
  },
  P4: {
    name: 'Low',
    response: '24 hours',
    examples: ['Security scan findings', 'Audit findings'],
    escalation: ['Security Team']
  }
};</code></pre><h2>Containment Playbook</h2><pre><code>// Automated containment actions
const containmentPlaybook = {
  'compromised_credentials': async (incident) => {
    // 1. Disable affected user accounts
    await identityService.disableUser(incident.userId);
    
    // 2. Revoke all sessions
    await sessionService.revokeAllSessions(incident.userId);
    
    // 3. Rotate API keys
    await apiKeyService.rotateKeys(incident.userId);
    
    // 4. Block IP addresses
    await waf.blockIPs(incident.sourceIPs);
    
    // 5. Notify user
    await notificationService.sendSecurityAlert(incident.userId);
  },
  
  'malware_detected': async (incident) => {
    // 1. Isolate affected systems
    await networkService.isolateHost(incident.hostId);
    
    // 2. Preserve evidence
    await forensics.captureMemory(incident.hostId);
    await forensics.captureDisks(incident.hostId);
    
    // 3. Block C2 domains
    await dns.blockDomains(incident.iocs.domains);
  }
};</code></pre><h2>Communication Template</h2><pre><code>const incidentCommunication = {
  internal: {
    initial: `
      SECURITY INCIDENT - {severity}
      
      What: {brief_description}
      When: {detection_time}
      Status: Investigation in progress
      
      Immediate Actions:
      - {action_1}
      - {action_2}
      
      Next Update: {time}
      
      Contact: {incident_commander}
    `,
    
    update: `
      INCIDENT UPDATE #{update_number}
      
      Status: {status}
      Progress: {progress}
      Next Steps: {next_steps}
      Next Update: {time}
    `
  },
  
  external: {
    notification: `
      We are investigating a security incident that may have
      affected your data. We are working with security experts
      and will provide updates as we learn more.
      
      What we know: {known_impact}
      What we're doing: {remediation_steps}
      What you should do: {user_actions}
    `
  }
};</code></pre><h2>Evidence Preservation</h2><pre><code>// Forensic evidence collection
async function preserveEvidence(incident) {
  const evidence = {
    incidentId: incident.id,
    collectedAt: new Date().toISOString(),
    items: []
  };
  
  // Collect logs
  evidence.items.push({
    type: 'logs',
    source: 'application',
    data: await logService.export(incident.timeRange)
  });
  
  // Collect network data
  evidence.items.push({
    type: 'network',
    source: 'firewall',
    data: await firewall.exportLogs(incident.timeRange)
  });
  
  // Hash all evidence
  for (const item of evidence.items) {
    item.hash = await crypto.hash(item.data);
  }
  
  // Store in immutable storage
  await evidenceStorage.store(evidence);
  
  return evidence;
}</code></pre><h2>Post-Incident Review</h2><pre><code>const postIncidentTemplate = {
  summary: '',
  timeline: [],
  rootCause: '',
  impact: {
    systems: [],
    data: [],
    users: [],
    financial: ''
  },
  whatWentWell: [],
  whatCouldImprove: [],
  actionItems: [
    { description: '', owner: '', dueDate: '', priority: '' }
  ],
  lessonsLearned: []
};</code></pre><h2>Conclusion</h2><p>Preparation is key. Have playbooks ready, practice them, and continuously improve based on lessons learned. The goal is to minimize impact and recover quickly.</p>$content$, '2023-07-01', $cat$Security$cat$, 11, $icon$🔒$icon$, '{"Incident Response","Security","DFIR","Playbooks"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 37),
($id$frontend-angular-signals$id$, $title$Angular Signals: The Future of Reactivity$title$, $excerpt$Master Angular's new signals API for fine-grained reactivity, computed values, and effects that simplify state management and improve performance.$excerpt$, $content$<h2>What Are Signals?</h2><p>Signals are a new reactive primitive in Angular that provide fine-grained reactivity. Unlike observables, signals are synchronous and automatically track dependencies.</p><h2>Basic Signal Usage</h2><pre><code>import { signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ doubleCount() }}</p>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  // Create a writable signal
  count = signal(0);
  
  // Create a computed signal (read-only, derived value)
  doubleCount = computed(() => this.count() * 2);
  
  increment() {
    // Update signal value
    this.count.update(value => value + 1);
    // Or set directly: this.count.set(10);
  }
}</code></pre><h2>Effects</h2><p>Effects run side effects when signals change:</p><pre><code>@Component({...})
export class UserComponent {
  userId = signal<string | null>(null);
  user = signal<User | null>(null);
  
  constructor() {
    // Effect runs when userId changes
    effect(async () => {
      const id = this.userId();
      if (id) {
        const userData = await this.userService.getUser(id);
        this.user.set(userData);
      }
    });
  }
}</code></pre><h2>Signal-Based Inputs</h2><pre><code>@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <h3>{{ fullName() }}</h3>
      <p>{{ user().email }}</p>
    </div>
  `
})
export class UserCardComponent {
  // Signal-based input
  user = input.required<User>();
  
  // Computed from input
  fullName = computed(() => 
    `${this.user().firstName} ${this.user().lastName}`
  );
}</code></pre><h2>Signal-Based Outputs</h2><pre><code>@Component({
  selector: 'app-search',
  template: `
    <input 
      [value]="query()" 
      (input)="onInput($event)" 
    />
  `
})
export class SearchComponent {
  query = signal('');
  
  // Output using outputFromObservable or output()
  searchChange = output<string>();
  
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.searchChange.emit(value);
  }
}</code></pre><h2>State Management with Signals</h2><pre><code>// Simple store using signals
@Injectable({ providedIn: 'root' })
export class CartStore {
  private items = signal<CartItem[]>([]);
  
  // Public read-only access
  readonly cartItems = this.items.asReadonly();
  
  readonly totalItems = computed(() => 
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  readonly totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  
  addItem(product: Product) {
    this.items.update(items => {
      const existing = items.find(i => i.productId === product.id);
      if (existing) {
        return items.map(i => 
          i.productId === product.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...items, { productId: product.id, quantity: 1, price: product.price }];
    });
  }
  
  removeItem(productId: string) {
    this.items.update(items => items.filter(i => i.productId !== productId));
  }
}</code></pre><h2>Converting from RxJS</h2><pre><code>import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Component({...})
export class DataComponent {
  private http = inject(HttpClient);
  
  // Convert Observable to Signal
  users = toSignal(
    this.http.get<User[]>('/api/users'),
    { initialValue: [] }
  );
  
  selectedId = signal<string | null>(null);
  
  // Convert Signal to Observable
  selectedId$ = toObservable(this.selectedId);
}</code></pre><h2>Performance Benefits</h2><ul><li>Fine-grained updates - only affected components re-render</li><li>No zone.js dependency with zoneless change detection</li><li>Synchronous reads - no async complexity</li><li>Automatic dependency tracking</li></ul><h2>Best Practices</h2><ul><li>Use signals for component state</li><li>Use computed for derived values</li><li>Use effects sparingly for side effects</li><li>Keep signals close to where they're used</li><li>Consider signal-based stores for shared state</li></ul><h2>Conclusion</h2><p>Signals represent Angular's evolution toward simpler, more performant reactivity. Start using them in new components and gradually migrate existing code.</p>$content$, '2024-01-01', $cat$Modern Frontend$cat$, 12, $icon$⚡$icon$, '{"Angular","Signals","Reactivity","Performance"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 38),
($id$frontend-react-server-components$id$, $title$React Server Components: A Complete Guide$title$, $excerpt$Understand React Server Components (RSC), when to use them, and how they change the way we build React applications with Next.js App Router.$excerpt$, $content$<h2>What Are Server Components?</h2><p>React Server Components (RSC) render on the server and send HTML to the client. They can access backend resources directly without exposing APIs to the client.</p><h2>Server vs Client Components</h2><pre><code>// Server Component (default in App Router)
// app/products/page.tsx
async function ProductsPage() {
  // Direct database access - no API needed!
  const products = await db.product.findMany();
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Client Component
// components/AddToCartButton.tsx
'use client';

import { useState } from 'react';

export function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  
  const addToCart = async () => {
    setLoading(true);
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId })
    });
    setLoading(false);
  };
  
  return (
    <button onClick={addToCart} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}</code></pre><h2>When to Use Each</h2><h3>Server Components (Default)</h3><ul><li>Fetching data</li><li>Accessing backend resources</li><li>Keeping sensitive info on server</li><li>Large dependencies</li></ul><h3>Client Components ('use client')</h3><ul><li>Interactivity (onClick, onChange)</li><li>useState, useEffect, useContext</li><li>Browser APIs</li><li>Custom hooks with state</li></ul><h2>Data Fetching Patterns</h2><pre><code>// Parallel data fetching
async function Dashboard() {
  // These run in parallel
  const [user, orders, recommendations] = await Promise.all([
    getUser(),
    getOrders(),
    getRecommendations()
  ]);
  
  return (
    <div>
      <UserProfile user={user} />
      <OrderList orders={orders} />
      <Recommendations items={recommendations} />
    </div>
  );
}

// Sequential with Suspense
async function ProductPage({ id }: { id: string }) {
  const product = await getProduct(id);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews productId={id} />
      </Suspense>
    </div>
  );
}

async function Reviews({ productId }: { productId: string }) {
  const reviews = await getReviews(productId); // Loads independently
  return <ReviewList reviews={reviews} />;
}</code></pre><h2>Composition Patterns</h2><pre><code>// Server Component wrapping Client Component
// app/posts/[id]/page.tsx
import { CommentForm } from './CommentForm'; // client component

async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const comments = await getComments(params.id);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      
      {/* Pass server data to client component */}
      <CommentForm postId={params.id} />
      
      {/* Server-rendered comments */}
      <CommentList comments={comments} />
    </article>
  );
}

// Client Component receiving children
'use client';

export function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && (
        <div className="modal">
          {children} {/* Can be Server Components! */}
        </div>
      )}
    </>
  );
}</code></pre><h2>Server Actions</h2><pre><code>// Direct server mutations
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  await db.post.create({
    data: { title, content }
  });
  
  revalidatePath('/posts');
}

// Use in component
import { createPost } from './actions';

function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">Create Post</button>
    </form>
  );
}</code></pre><h2>Caching and Revalidation</h2><pre><code>// Time-based revalidation
async function Products() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // Revalidate every hour
  }).then(r => r.json());
  
  return <ProductList products={products} />;
}

// On-demand revalidation
'use server';

export async function updateProduct(id: string, data: ProductData) {
  await db.product.update({ where: { id }, data });
  revalidatePath('/products');
  revalidateTag('products');
}</code></pre><h2>Best Practices</h2><ul><li>Start with Server Components, add 'use client' when needed</li><li>Keep client components small and focused</li><li>Pass serializable props between server and client</li><li>Use Suspense for loading states</li><li>Colocate data fetching with components</li></ul><h2>Conclusion</h2><p>Server Components fundamentally change React development. They simplify data fetching, reduce bundle size, and improve performance. Embrace the server-first mindset.</p>$content$, '2023-12-01', $cat$Modern Frontend$cat$, 14, $icon$⚡$icon$, '{"React","RSC","Next.js","Server Components"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 39),
($id$frontend-typescript-patterns$id$, $title$Advanced TypeScript Patterns for Large-Scale Applications$title$, $excerpt$Master advanced TypeScript features including generics, conditional types, mapped types, and type guards for building robust enterprise applications.$excerpt$, $content$<h2>Why Advanced TypeScript?</h2><p>TypeScript's type system is powerful enough to catch bugs at compile time that would otherwise make it to production. Mastering it leads to more maintainable code.</p><h2>Generic Constraints</h2><pre><code>// Constrained generic
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'John', age: 30 };
const name = getProperty(user, 'name'); // type: string
const age = getProperty(user, 'age');   // type: number
// getProperty(user, 'invalid'); // Error!

// Generic with multiple constraints
interface HasId { id: string; }
interface HasTimestamp { createdAt: Date; }

function mergeEntities<T extends HasId & HasTimestamp>(
  a: T,
  b: Partial<T>
): T {
  return { ...a, ...b };
}</code></pre><h2>Conditional Types</h2><pre><code>// Type that changes based on condition
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<number>;   // false

// Extract return type from promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Result = UnwrapPromise<Promise<string>>; // string

// Conditional type for API responses
type ApiResponse<T> = T extends undefined
  ? { success: boolean }
  : { success: boolean; data: T };

function handleResponse<T>(data?: T): ApiResponse<T> {
  return data !== undefined
    ? { success: true, data }
    : { success: true } as ApiResponse<T>;
}</code></pre><h2>Mapped Types</h2><pre><code>// Make all properties optional
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties required
type Required<T> = {
  [K in keyof T]-?: T[K];
};

// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Transform property types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }</code></pre><h2>Template Literal Types</h2><pre><code>// Build string types programmatically
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = `on${Capitalize<EventName>}`;
// 'onClick' | 'onFocus' | 'onBlur'

// CSS property types
type CSSProperty = 'margin' | 'padding';
type CSSDirection = 'top' | 'right' | 'bottom' | 'left';
type CSSPropertyDirection = `${CSSProperty}-${CSSDirection}`;
// 'margin-top' | 'margin-right' | ... | 'padding-left'

// API route types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Route = '/users' | '/products';
type Endpoint = `${HttpMethod} ${Route}`;
// 'GET /users' | 'POST /users' | ...</code></pre><h2>Type Guards</h2><pre><code>// User-defined type guard
interface Dog { bark(): void; breed: string; }
interface Cat { meow(): void; lives: number; }

function isDog(pet: Dog | Cat): pet is Dog {
  return (pet as Dog).bark !== undefined;
}

function handlePet(pet: Dog | Cat) {
  if (isDog(pet)) {
    pet.bark(); // TypeScript knows it's a Dog
  } else {
    pet.meow(); // TypeScript knows it's a Cat
  }
}

// Assertion function
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Not a string');
  }
}

function process(input: unknown) {
  assertIsString(input);
  // input is now typed as string
  console.log(input.toUpperCase());
}</code></pre><h2>Discriminated Unions</h2><pre><code>// State machine types
type State = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string };

function renderState(state: State): string {
  switch (state.status) {
    case 'idle':
      return 'Ready to fetch';
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Found ${state.data.length} users`; // data is available
    case 'error':
      return `Error: ${state.error}`; // error is available
  }
}

// Exhaustive checking
function assertNever(x: never): never {
  throw new Error('Unexpected: ' + x);
}

function handle(state: State) {
  switch (state.status) {
    case 'idle': return;
    case 'loading': return;
    case 'success': return;
    case 'error': return;
    default: return assertNever(state); // Compile error if case missed
  }
}</code></pre><h2>Utility Types</h2><pre><code>// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit properties
type CreateUser = Omit<User, 'id' | 'createdAt'>;

// Record type for dictionaries
type UserCache = Record<string, User>;

// Extract function parameters
type Params = Parameters<typeof fetchUser>;

// Extract return type
type Result = ReturnType<typeof fetchUser>;

// Extract awaited type
type Data = Awaited<ReturnType<typeof fetchUser>>;</code></pre><h2>Branded Types</h2><pre><code>// Prevent mixing up IDs
type UserId = string & { readonly brand: unique symbol };
type OrderId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

function getUser(id: UserId): User { ... }
function getOrder(id: OrderId): Order { ... }

const userId = createUserId('123');
getUser(userId); // OK
// getOrder(userId); // Error! Can't use UserId where OrderId expected</code></pre><h2>Conclusion</h2><p>Advanced TypeScript features help catch errors early and document your code's intent. Use them to build more reliable, maintainable applications.</p>$content$, '2023-11-01', $cat$Modern Frontend$cat$, 15, $icon$⚡$icon$, '{"TypeScript","Patterns","Types","Enterprise"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 40),
($id$frontend-state-management$id$, $title$Modern State Management: Zustand, Jotai, and Beyond$title$, $excerpt$Compare modern state management solutions including Zustand, Jotai, Recoil, and signals-based approaches for React and Angular applications.$excerpt$, $content$<h2>State Management Evolution</h2><p>The frontend world has moved beyond Redux. Modern solutions are simpler, more performant, and better suited to different use cases.</p><h2>Zustand - Simple & Scalable</h2><pre><code>import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        total: 0,
        
        addItem: (item) => set((state) => ({
          items: [...state.items, item],
          total: state.total + item.price
        })),
        
        removeItem: (id) => set((state) => {
          const item = state.items.find(i => i.id === id);
          return {
            items: state.items.filter(i => i.id !== id),
            total: state.total - (item?.price || 0)
          };
        }),
        
        clearCart: () => set({ items: [], total: 0 })
      }),
      { name: 'cart-storage' }
    )
  )
);

// Usage in component
function CartButton() {
  const itemCount = useCartStore((state) => state.items.length);
  return <button>Cart ({itemCount})</button>;
}</code></pre><h2>Jotai - Atomic State</h2><pre><code>import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Define atoms
const userAtom = atom<User | null>(null);
const themeAtom = atomWithStorage('theme', 'light');

// Derived atoms
const isLoggedInAtom = atom((get) => get(userAtom) !== null);

// Async atom
const userProfileAtom = atom(async (get) => {
  const user = get(userAtom);
  if (!user) return null;
  const response = await fetch(`/api/users/${user.id}/profile`);
  return response.json();
});

// Write-only atom for actions
const loginAtom = atom(
  null,
  async (get, set, credentials: { email: string; password: string }) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    const user = await response.json();
    set(userAtom, user);
  }
);

// Usage
function UserStatus() {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const login = useSetAtom(loginAtom);
  
  return (...);
}</code></pre><h2>Redux Toolkit - When You Need It</h2><pre><code>import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk
export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    const response = await fetch('/api/users');
    return response.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [] as User[],
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as string | null
  },
  reducers: {
    userAdded: (state, action) => {
      state.items.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  }
});</code></pre><h2>TanStack Query - Server State</h2><pre><code>import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch data with caching
function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutations with optimistic updates
function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newUser: CreateUserDto) =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
      }).then(r => r.json()),
      
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previous = queryClient.getQueryData(['users']);
      queryClient.setQueryData(['users'], (old: User[]) => [
        ...old,
        { ...newUser, id: 'temp' }
      ]);
      return { previous };
    },
    
    onError: (err, newUser, context) => {
      queryClient.setQueryData(['users'], context?.previous);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
}</code></pre><h2>Choosing the Right Solution</h2><table><tr><th>Solution</th><th>Best For</th></tr><tr><td>Zustand</td><td>Simple global state, easy migration from Redux</td></tr><tr><td>Jotai</td><td>Atomic state, fine-grained updates</td></tr><tr><td>Redux Toolkit</td><td>Complex state logic, middleware needs</td></tr><tr><td>TanStack Query</td><td>Server state, caching, sync</td></tr><tr><td>React Context</td><td>Theme, auth, small shared state</td></tr></table><h2>Conclusion</h2><p>Match your state management to your needs. Use TanStack Query for server state, lightweight solutions like Zustand for client state, and Context for simple sharing.</p>$content$, '2023-10-01', $cat$Modern Frontend$cat$, 13, $icon$⚡$icon$, '{"State Management","Zustand","Jotai","React"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 41),
($id$frontend-testing-strategies$id$, $title$Frontend Testing Strategies: Unit, Integration, and E2E$title$, $excerpt$Build a comprehensive testing strategy combining Jest, Testing Library, Cypress, and Playwright for confident frontend development.$excerpt$, $content$<h2>The Testing Pyramid</h2><p>A balanced testing strategy combines unit tests (fast, many), integration tests (medium), and E2E tests (slow, few). Each type catches different bugs.</p><h2>Unit Testing with Jest</h2><pre><code>// Pure function test
describe('calculateTotal', () => {
  it('calculates total with tax', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 }
    ];
    
    expect(calculateTotal(items, 0.1)).toBe(275); // (200 + 50) * 1.1
  });
  
  it('returns 0 for empty cart', () => {
    expect(calculateTotal([], 0.1)).toBe(0);
  });
});

// Mocking dependencies
jest.mock('./api');
import { fetchUser } from './api';

describe('UserService', () => {
  it('fetches and transforms user data', async () => {
    (fetchUser as jest.Mock).mockResolvedValue({
      id: '1',
      first_name: 'John',
      last_name: 'Doe'
    });
    
    const user = await userService.getUser('1');
    
    expect(user).toEqual({
      id: '1',
      fullName: 'John Doe'
    });
  });
});</code></pre><h2>Component Testing with Testing Library</h2><pre><code>import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
  it('shows validation errors for empty fields', async () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
  
  it('calls onSubmit with form data', async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await userEvent.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );
    await userEvent.type(
      screen.getByLabelText(/password/i),
      'password123'
    );
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
  
  it('disables button while loading', async () => {
    render(<LoginForm onSubmit={jest.fn()} isLoading />);
    
    expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled();
  });
});</code></pre><h2>Angular Testing</h2><pre><code>import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers']);
    
    await TestBed.configureTestingModule({
      imports: [UserListComponent, HttpClientTestingModule],
      providers: [{ provide: UserService, useValue: spy }]
    }).compileComponents();
    
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });
  
  it('displays users from service', async () => {
    userService.getUsers.and.returnValue(of([
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' }
    ]));
    
    fixture.detectChanges();
    await fixture.whenStable();
    
    const items = fixture.nativeElement.querySelectorAll('.user-item');
    expect(items.length).toBe(2);
  });
});</code></pre><h2>E2E Testing with Playwright</h2><pre><code>import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can login successfully', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toHaveText('Welcome back!');
  });
  
  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email"]', 'wrong@example.com');
    await page.fill('[data-testid="password"]', 'wrongpassword');
    await page.click('[data-testid="submit"]');
    
    await expect(page.locator('.error-message')).toHaveText(
      'Invalid email or password'
    );
  });
});

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="submit"]');
  });
  
  test('user can add items to cart', async ({ page }) => {
    await page.goto('/products');
    await page.click('[data-testid="add-to-cart-1"]');
    
    const cartCount = page.locator('[data-testid="cart-count"]');
    await expect(cartCount).toHaveText('1');
  });
});</code></pre><h2>API Mocking with MSW</h2><pre><code>import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' }
    ]));
  }),
  
  rest.post('/api/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    
    if (email === 'valid@example.com' && password === 'password') {
      return res(ctx.json({ token: 'fake-token' }));
    }
    
    return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());</code></pre><h2>Testing Strategy</h2><table><tr><th>Type</th><th>Ratio</th><th>Focus</th></tr><tr><td>Unit</td><td>70%</td><td>Logic, utilities, services</td></tr><tr><td>Integration</td><td>20%</td><td>Components, hooks, state</td></tr><tr><td>E2E</td><td>10%</td><td>Critical user journeys</td></tr></table><h2>Conclusion</h2><p>Good tests give confidence to refactor and ship. Focus on testing behavior, not implementation. Use the right tool for each level of the testing pyramid.</p>$content$, '2023-09-01', $cat$Modern Frontend$cat$, 14, $icon$⚡$icon$, '{"Testing","Jest","Cypress","Playwright"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 42),
($id$frontend-design-systems$id$, $title$Building Design Systems with Modern CSS$title$, $excerpt$Create scalable design systems using CSS custom properties, container queries, modern layout techniques, and component libraries.$excerpt$, $content$<h2>What is a Design System?</h2><p>A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.</p><h2>Design Tokens</h2><pre><code>:root {
  /* Colors */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
  
  --color-gray-50: #f9fafb;
  --color-gray-500: #6b7280;
  --color-gray-900: #111827;
  
  /* Semantic colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  --space-16: 4rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
}</code></pre><h2>Dark Mode with Custom Properties</h2><pre><code>:root {
  --bg-primary: var(--color-gray-50);
  --bg-secondary: white;
  --text-primary: var(--color-gray-900);
  --text-secondary: var(--color-gray-500);
  --border-color: var(--color-gray-200);
}

[data-theme='dark'] {
  --bg-primary: var(--color-gray-900);
  --bg-secondary: var(--color-gray-800);
  --text-primary: var(--color-gray-50);
  --text-secondary: var(--color-gray-400);
  --border-color: var(--color-gray-700);
}

/* Usage */
.card {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}</code></pre><h2>Component Variants</h2><pre><code>/* Button component with variants */
.button {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all 0.15s ease;
  
  /* Size variants */
  &.button--sm {
    padding: var(--space-1) var(--space-2);
    font-size: var(--text-sm);
  }
  
  &.button--md {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-base);
  }
  
  &.button--lg {
    padding: var(--space-4) var(--space-8);
    font-size: var(--text-lg);
  }
  
  /* Color variants */
  &.button--primary {
    background: var(--color-primary-500);
    color: white;
    
    &:hover {
      background: var(--color-primary-600);
    }
  }
  
  &.button--secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    
    &:hover {
      background: var(--color-gray-100);
    }
  }
  
  &.button--ghost {
    background: transparent;
    color: var(--color-primary-500);
    
    &:hover {
      background: var(--color-primary-50);
    }
  }
}</code></pre><h2>Container Queries</h2><pre><code>/* Card that adapts to its container */
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-4);
}

/* Switch to horizontal layout in larger containers */
@container card (min-width: 400px) {
  .card {
    grid-template-columns: 150px 1fr;
  }
  
  .card__image {
    aspect-ratio: 1;
  }
}

@container card (min-width: 600px) {
  .card {
    grid-template-columns: 200px 1fr;
    padding: var(--space-8);
  }
}</code></pre><h2>Modern Layout Patterns</h2><pre><code>/* Auto-fit grid */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-4);
}

/* Holy grail layout with subgrid */
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Stack pattern */
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Cluster pattern */
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* Center pattern */
.center {
  display: grid;
  place-items: center;
}</code></pre><h2>Animation Tokens</h2><pre><code>:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-in {
  animation: fadeIn var(--duration-normal) var(--ease-out);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.slide-up {
  animation: slideUp var(--duration-normal) var(--ease-spring);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}</code></pre><h2>Conclusion</h2><p>A good design system provides consistency, speeds up development, and makes maintenance easier. Start with tokens, build components, and document everything.</p>$content$, '2023-08-01', $cat$Modern Frontend$cat$, 13, $icon$⚡$icon$, '{"CSS","Design Systems","Components","Tokens"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 43),
($id$frontend-accessibility$id$, $title$Building Accessible Web Applications: A Developer's Guide$title$, $excerpt$Create inclusive web experiences with semantic HTML, ARIA, keyboard navigation, screen reader support, and accessibility testing strategies.$excerpt$, $content$<h2>Why Accessibility Matters</h2><p>1 in 4 adults has a disability. Accessible websites reach more users, improve SEO, and often have better overall UX. It's also the law in many jurisdictions.</p><h2>Semantic HTML First</h2><pre><code><!-- BAD: Div soup -->
<div class="header">
  <div class="nav">
    <div class="nav-item" onclick="navigate()">Home</div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="title">Article Title</div>
  </div>
</div>

<!-- GOOD: Semantic elements -->
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
  </article>
</main></code></pre><h2>Accessible Forms</h2><pre><code><form>
  <div class="form-group">
    <!-- Always associate labels with inputs -->
    <label for="email">Email Address</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      aria-describedby="email-hint email-error"
      aria-invalid="false"
    />
    <p id="email-hint" class="hint">We'll never share your email</p>
    <p id="email-error" class="error" role="alert" hidden>
      Please enter a valid email
    </p>
  </div>
  
  <fieldset>
    <legend>Notification Preferences</legend>
    <div>
      <input type="checkbox" id="email-notifications" name="notifications" />
      <label for="email-notifications">Email notifications</label>
    </div>
    <div>
      <input type="checkbox" id="sms-notifications" name="notifications" />
      <label for="sms-notifications">SMS notifications</label>
    </div>
  </fieldset>
  
  <button type="submit">Subscribe</button>
</form></code></pre><h2>Keyboard Navigation</h2><pre><code>// Custom dropdown with keyboard support
class AccessibleDropdown {
  constructor(element) {
    this.container = element;
    this.button = element.querySelector('[role="button"]');
    this.menu = element.querySelector('[role="menu"]');
    this.items = element.querySelectorAll('[role="menuitem"]');
    this.currentIndex = 0;
    
    this.bindEvents();
  }
  
  bindEvents() {
    this.button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        this.open();
        this.focusItem(0);
      }
    });
    
    this.menu.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.focusItem(this.currentIndex + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.focusItem(this.currentIndex - 1);
          break;
        case 'Escape':
          this.close();
          this.button.focus();
          break;
        case 'Home':
          this.focusItem(0);
          break;
        case 'End':
          this.focusItem(this.items.length - 1);
          break;
      }
    });
  }
  
  focusItem(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.items.length - 1));
    this.items[this.currentIndex].focus();
  }
}</code></pre><h2>ARIA Patterns</h2><pre><code><!-- Modal dialog -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Action</h2>
  <p id="modal-description">Are you sure you want to proceed?</p>
  <button>Cancel</button>
  <button>Confirm</button>
</div>

<!-- Tabs -->
<div class="tabs">
  <div role="tablist" aria-label="Product information">
    <button
      role="tab"
      id="tab-1"
      aria-selected="true"
      aria-controls="panel-1"
    >Description</button>
    <button
      role="tab"
      id="tab-2"
      aria-selected="false"
      aria-controls="panel-2"
      tabindex="-1"
    >Reviews</button>
  </div>
  <div
    role="tabpanel"
    id="panel-1"
    aria-labelledby="tab-1"
  >...</div>
  <div
    role="tabpanel"
    id="panel-2"
    aria-labelledby="tab-2"
    hidden
  >...</div>
</div>

<!-- Live region for announcements -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="sr-only"
>
  Item added to cart
</div></code></pre><h2>Focus Management</h2><pre><code>// Focus trap for modals
function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  
  first.focus();
}</code></pre><h2>Color Contrast</h2><pre><code>/* Ensure sufficient contrast ratios */
:root {
  /* WCAG AA: 4.5:1 for normal text, 3:1 for large text */
  --text-primary: #1f2937;  /* Good contrast on white */
  --text-secondary: #4b5563; /* Still meets AA */
  --text-muted: #6b7280;    /* Use sparingly, large text only */
  
  /* Focus indicators must be visible */
  --focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

/* Never rely on color alone */
.error {
  color: var(--color-error);
  border-left: 4px solid var(--color-error);
}

.error::before {
  content: '⚠ ';
}</code></pre><h2>Testing for Accessibility</h2><pre><code>// Automated testing with jest-axe
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('form has no accessibility violations', async () => {
  const { container } = render(<ContactForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});</code></pre><h2>Conclusion</h2><p>Accessibility is a feature, not an afterthought. Start with semantic HTML, add ARIA only when needed, ensure keyboard support, and test with real assistive technologies.</p>$content$, '2023-07-01', $cat$Modern Frontend$cat$, 12, $icon$⚡$icon$, '{"Accessibility","A11y","WCAG","Inclusive Design"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 44),
($id$frontend-micro-frontends$id$, $title$Micro Frontends: Scaling Frontend Development$title$, $excerpt$Break monolithic frontends into independently deployable micro frontends using Module Federation, Single-SPA, and Web Components.$excerpt$, $content$<h2>Why Micro Frontends?</h2><p>As frontend applications grow, they become difficult to maintain. Micro frontends allow teams to work independently, deploy separately, and use different technologies.</p><h2>Module Federation (Webpack 5)</h2><h3>Host Application</h3><pre><code>// webpack.config.js (Host)
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        // Load remote micro frontends
        products: 'products@http://localhost:3001/remoteEntry.js',
        checkout: 'checkout@http://localhost:3002/remoteEntry.js',
        profile: 'profile@http://localhost:3003/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' }
      }
    })
  ]
};</code></pre><h3>Remote Application</h3><pre><code>// webpack.config.js (Products micro frontend)
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/components/ProductList',
        './ProductDetail': './src/components/ProductDetail'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};</code></pre><h3>Loading Remote Components</h3><pre><code>// In host application
import React, { Suspense, lazy } from 'react';

// Dynamic import of remote component
const ProductList = lazy(() => import('products/ProductList'));
const Checkout = lazy(() => import('checkout/CheckoutForm'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
      
      <Suspense fallback={<div>Loading checkout...</div>}>
        <Checkout />
      </Suspense>
    </div>
  );
}</code></pre><h2>Single-SPA Approach</h2><pre><code>// Root config
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@myorg/navbar',
  app: () => System.import('@myorg/navbar'),
  activeWhen: () => true // Always active
});

registerApplication({
  name: '@myorg/products',
  app: () => System.import('@myorg/products'),
  activeWhen: (location) => location.pathname.startsWith('/products')
});

registerApplication({
  name: '@myorg/checkout',
  app: () => System.import('@myorg/checkout'),
  activeWhen: '/checkout'
});

start();</code></pre><pre><code>// Products micro frontend
import { registerApplication } from 'single-spa';
import singleSpaReact from 'single-spa-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => document.getElementById('products-container')
});

export const { bootstrap, mount, unmount } = lifecycles;</code></pre><h2>Communication Between Micro Frontends</h2><pre><code>// Custom event bus
class EventBus {
  private events: Record<string, Function[]> = {};
  
  subscribe(event: string, callback: Function) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
    
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }
  
  publish(event: string, data: any) {
    (this.events[event] || []).forEach(callback => callback(data));
  }
}

// Expose globally
window.__EVENT_BUS__ = window.__EVENT_BUS__ || new EventBus();

// Usage in Products MFE
window.__EVENT_BUS__.publish('cart:add', { productId: '123', quantity: 1 });

// Usage in Cart MFE
window.__EVENT_BUS__.subscribe('cart:add', (item) => {
  addToCart(item);
});</code></pre><h2>Shared State</h2><pre><code>// Shared state using RxJS
import { BehaviorSubject } from 'rxjs';

interface User {
  id: string;
  name: string;
  email: string;
}

// Create shared store
const userSubject = new BehaviorSubject<User | null>(null);

export const userStore = {
  getUser: () => userSubject.getValue(),
  setUser: (user: User) => userSubject.next(user),
  subscribe: (callback: (user: User | null) => void) => {
    const subscription = userSubject.subscribe(callback);
    return () => subscription.unsubscribe();
  }
};

// Expose as singleton
window.__USER_STORE__ = window.__USER_STORE__ || userStore;</code></pre><h2>Routing Coordination</h2><pre><code>// Shell router that delegates to micro frontends
function ShellRouter() {
  return (
    <Router>
      <Route path="/products/*" element={
        <Suspense fallback={<Spinner />}>
          <ProductsMicroFrontend />
        </Suspense>
      } />
      <Route path="/checkout/*" element={
        <Suspense fallback={<Spinner />}>
          <CheckoutMicroFrontend />
        </Suspense>
      } />
      <Route path="/profile/*" element={
        <Suspense fallback={<Spinner />}>
          <ProfileMicroFrontend />
        </Suspense>
      } />
    </Router>
  );
}</code></pre><h2>When to Use Micro Frontends</h2><ul><li>Large teams needing autonomy</li><li>Multiple products sharing components</li><li>Gradual migration from legacy systems</li><li>Different release cycles needed</li></ul><h2>Conclusion</h2><p>Micro frontends solve organizational scaling, not technical problems. Use them when team independence and separate deployability justify the added complexity.</p>$content$, '2023-06-01', $cat$Modern Frontend$cat$, 14, $icon$⚡$icon$, '{"Micro Frontends","Module Federation","Architecture","Scaling"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 45),
($id$frontend-pwa$id$, $title$Progressive Web Apps: From Zero to Production$title$, $excerpt$Build offline-capable, installable PWAs with service workers, caching strategies, push notifications, and native-like features.$excerpt$, $content$<h2>What Makes a PWA?</h2><p>Progressive Web Apps combine web technologies with native app capabilities: offline support, installability, push notifications, and fast performance.</p><h2>Web App Manifest</h2><pre><code>// manifest.json
{
  "name": "My Awesome App",
  "short_name": "AwesomeApp",
  "description": "A progressive web app",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "shortcuts": [
    {
      "name": "New Item",
      "url": "/new",
      "icons": [{ "src": "/icons/new.png", "sizes": "96x96" }]
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    }
  ]
}</code></pre><h2>Service Worker Registration</h2><pre><code>// main.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('SW registered:', registration.scope);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available
            showUpdateNotification();
          }
        });
      });
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  });
}</code></pre><h2>Caching Strategies</h2><pre><code>// sw.js
const CACHE_NAME = 'app-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/offline.html'
];

// Install: Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: Stale-while-revalidate for API, cache-first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (request.url.includes('/api/')) {
    // Network first, fallback to cache
    event.respondWith(networkFirst(request));
  } else {
    // Cache first, fallback to network
    event.respondWith(cacheFirst(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match('/offline.html');
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match(request);
  }
}</code></pre><h2>Background Sync</h2><pre><code>// Queue failed requests for later sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  const db = await openDB('app-db', 1);
  const messages = await db.getAll('pending-messages');
  
  for (const message of messages) {
    try {
      await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(message)
      });
      await db.delete('pending-messages', message.id);
    } catch {
      // Will retry on next sync
      break;
    }
  }
}

// Register sync from app
async function sendMessage(message) {
  const db = await openDB('app-db', 1);
  await db.add('pending-messages', message);
  
  const registration = await navigator.serviceWorker.ready;
  await registration.sync.register('sync-messages');
}</code></pre><h2>Push Notifications</h2><pre><code>// Request permission and subscribe
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;
  
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });
  
  // Send subscription to server
  await fetch('/api/push/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription)
  });
}

// Handle push in service worker
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/badge.png',
      data: { url: data.url },
      actions: [
        { action: 'open', title: 'Open' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});</code></pre><h2>Install Prompt</h2><pre><code>let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

async function handleInstallClick() {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('App installed');
  }
  
  deferredPrompt = null;
}</code></pre><h2>Conclusion</h2><p>PWAs bridge the gap between web and native. Start with a manifest and service worker, then progressively enhance with push notifications, background sync, and offline support.</p>$content$, '2023-05-01', $cat$Modern Frontend$cat$, 13, $icon$⚡$icon$, '{"PWA","Service Worker","Offline","Mobile"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 46),
($id$frontend-nextjs-app-router$id$, $title$Next.js App Router: The Complete Guide$title$, $excerpt$Master Next.js 14 App Router with server components, layouts, loading states, error handling, and data fetching patterns.$excerpt$, $content$<h2>App Router Fundamentals</h2><p>The App Router is Next.js's file-system based router with built-in support for layouts, server components, streaming, and more.</p><h2>File-System Routing</h2><pre><code>app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── about/
│   └── page.tsx        # About page (/about)
├── blog/
│   ├── page.tsx        # Blog list (/blog)
│   └── [slug]/
│       └── page.tsx    # Blog post (/blog/my-post)
├── (marketing)/        # Route group (no URL impact)
│   ├── layout.tsx      # Marketing pages layout
│   ├── pricing/
│   │   └── page.tsx    # /pricing
│   └── features/
│       └── page.tsx    # /features
└── @modal/             # Parallel route for modals
    └── login/
        └── page.tsx</code></pre><h2>Layouts and Templates</h2><pre><code>// app/layout.tsx - Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// app/dashboard/layout.tsx - Nested layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
}

// app/template.tsx - Re-renders on navigation
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in">
      {children}
    </div>
  );
}</code></pre><h2>Loading UI and Streaming</h2><pre><code>// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-content" />
    </div>
  );
}

// Streaming with Suspense
import { Suspense } from 'react';

async function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* These components stream in as they resolve */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
      
      <Suspense fallback={<ChartSkeleton />}>
        <Chart />
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}

// Each component can fetch independently
async function Stats() {
  const stats = await fetchStats(); // No loading state blocking
  return <StatsDisplay data={stats} />;
}</code></pre><h2>Error Handling</h2><pre><code>// app/dashboard/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link href="/">Go home</Link>
    </div>
  );
}</code></pre><h2>Data Fetching</h2><pre><code>// Server Component - Direct data access
async function ProductsPage() {
  // This runs on the server
  const products = await db.product.findMany();
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// Caching and revalidation
async function Posts() {
  // Cached indefinitely (default)
  const posts = await fetch('https://api.example.com/posts');
  
  // Revalidate every hour
  const news = await fetch('https://api.example.com/news', {
    next: { revalidate: 3600 }
  });
  
  // No caching
  const live = await fetch('https://api.example.com/live', {
    cache: 'no-store'
  });
  
  return (...);
}</code></pre><h2>Server Actions</h2><pre><code>// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  // Validation
  if (!title || !content) {
    return { error: 'Title and content required' };
  }
  
  // Create in database
  const post = await db.post.create({
    data: { title, content }
  });
  
  // Revalidate and redirect
  revalidatePath('/posts');
  redirect(`/posts/${post.id}`);
}

// Using in form
export default function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  );
}

// With useFormState for handling errors
'use client';

import { useFormState } from 'react-dom';
import { createPost } from './actions';

export function PostForm() {
  const [state, formAction] = useFormState(createPost, null);
  
  return (
    <form action={formAction}>
      <input name="title" />
      {state?.error && <p className="error">{state.error}</p>}
      <button>Submit</button>
    </form>
  );
}</code></pre><h2>Middleware</h2><pre><code>// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check authentication
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Add headers
  const response = NextResponse.next();
  response.headers.set('x-request-id', crypto.randomUUID());
  
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
};</code></pre><h2>Conclusion</h2><p>The App Router brings React Server Components to Next.js with file-based routing, layouts, and streaming. Embrace server-first rendering for better performance and simpler code.</p>$content$, '2023-04-01', $cat$Modern Frontend$cat$, 15, $icon$⚡$icon$, '{"Next.js","App Router","React","Full Stack"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 47),
($id$devops-fast-deployment$id$, $title$DevOps Best Practices for Fast Deployment$title$, $excerpt$Implementing CI/CD pipelines that enable multiple daily deployments with zero downtime and automated rollback capabilities.$excerpt$, $content$<h2>The Need for Speed</h2><p>High-performing engineering teams deploy 200x more frequently than low performers. This article covers the DevOps practices that enable rapid, reliable deployments.</p><h2>CI/CD Pipeline Architecture</h2><h3>Continuous Integration</h3><p>Every code change should trigger:</p><ol><li><strong>Build:</strong> Compile code and create artifacts</li><li><strong>Unit Tests:</strong> Run fast, isolated tests</li><li><strong>Static Analysis:</strong> Code quality and security scanning</li><li><strong>Integration Tests:</strong> Test component interactions</li></ol><h3>Continuous Deployment Pipeline</h3><pre><code>Dev → Build → Test → Stage → Production
     ↓      ↓       ↓       ↓         ↓
  [Gate]  [Gate]  [Gate]  [Gate]   [Monitor]</code></pre><h2>Zero-Downtime Deployments</h2><h3>Blue-Green Deployment</h3><p>Maintain two identical production environments. Deploy to the inactive one, verify, then switch traffic. Instant rollback by switching back.</p><h3>Rolling Deployment</h3><p>Gradually replace instances with the new version. Kubernetes makes this easy with Deployment resources.</p><h3>Canary Releases</h3><p>Route a small percentage of traffic to the new version. Monitor metrics, then gradually increase if healthy.</p><h2>Automated Rollback</h2><p>Implement automatic rollback based on:</p><ul><li>Error rate thresholds exceeded</li><li>Response time degradation</li><li>Health check failures</li><li>Custom business metrics</li></ul><h2>Infrastructure as Code</h2><p>All infrastructure should be defined in code (Terraform, Pulumi, CloudFormation). Benefits:</p><ul><li>Reproducible environments</li><li>Version-controlled changes</li><li>Review process for infrastructure changes</li><li>Easy disaster recovery</li></ul><h2>Observability Stack</h2><p>Essential for fast, confident deployments:</p><ul><li><strong>Metrics:</strong> Prometheus/Grafana for system and application metrics</li><li><strong>Logs:</strong> Centralized logging with ELK or similar</li><li><strong>Traces:</strong> Distributed tracing with Jaeger or Zipkin</li><li><strong>Alerts:</strong> PagerDuty or Opsgenie for incident response</li></ul><h2>Feature Flags</h2><p>Decouple deployment from release with feature flags. Deploy code anytime, enable features when ready. Enables:</p><ul><li>A/B testing</li><li>Gradual rollouts</li><li>Kill switches for problematic features</li><li>User-specific features</li></ul><h2>Key Metrics to Track</h2><ul><li><strong>Deployment Frequency:</strong> How often you deploy to production</li><li><strong>Lead Time:</strong> Time from commit to production</li><li><strong>MTTR:</strong> Mean time to recover from failures</li><li><strong>Change Failure Rate:</strong> Percentage of deployments causing issues</li></ul><h2>Conclusion</h2><p>Fast, reliable deployments require investment in automation, observability, and cultural change. Start with the basics—CI pipelines and automated testing—then add sophistication as your team matures.</p>$content$, '2023-08-01', $cat$DevOps$cat$, 9, $icon$🔄$icon$, '{"DevOps","CI/CD","Deployment","Automation"}', false, $an$Kamran Sohail$an$, $ar$Software Engineer & Consultant$ar$, $aa$KS$aa$, 48);

insert into blog_categories (name, icon, sort_order) values
($name$System Architecture$name$, $icon$🏗️$icon$, 0),
($name$Cloud Computing$name$, $icon$☁️$icon$, 1),
($name$Performance$name$, $icon$⚡$icon$, 2),
($name$AI & Machine Learning$name$, $icon$🤖$icon$, 3),
($name$Security$name$, $icon$🔒$icon$, 4),
($name$Modern Frontend$name$, $icon$📱$icon$, 5),
($name$DevOps$name$, $icon$🔄$icon$, 6),
($name$Digital Transformation$name$, $icon$🚀$icon$, 7);

insert into blog_topics (icon, name, description, count, sort_order) values
($icon$🏗️$icon$, $name$System Architecture$name$, $desc$Design patterns and architectural decisions$desc$, 12, 0),
($icon$☁️$icon$, $name$Cloud Computing$name$, $desc$AWS, Azure, and cloud-native development$desc$, 8, 1),
($icon$⚡$icon$, $name$Performance$name$, $desc$Optimization and scalability techniques$desc$, 6, 2),
($icon$🤖$icon$, $name$AI & Machine Learning$name$, $desc$Practical AI applications in enterprise$desc$, 5, 3),
($icon$🔒$icon$, $name$Security$name$, $desc$Best practices and compliance$desc$, 7, 4),
($icon$📱$icon$, $name$Modern Frontend$name$, $desc$Angular, React, and UI/UX best practices$desc$, 10, 5);

-- ============================================================================
-- 08_page_seo.sql
-- ============================================================================
-- Seed: per-route SEO metadata, replacing the static `data` blocks that used
-- to live in app.routes.ts. Note: the original source had mojibake ("â€\"")
-- from a broken em-dash encoding — corrected to a real em-dash (—) here.

truncate table page_seo restart identity cascade;

insert into page_seo (slug, title, description, keywords, og_image_url) values
('', $txt$Nexa Web Service — Software Solutions | Digital Transformation & Development$txt$, $txt$Nexa Web Service delivers custom digital transformation solutions and enterprise software. 8+ years specializing in Angular, React, .NET Core, Azure DevOps, and Healthcare SaaS — for US and international clients.$txt$, 'software engineer USA, digital transformation, full-stack developer, custom development, enterprise solutions', 'https://nexawebservice.com/assets/og-image.jpg'),
('about', $txt$About Nexa Web Service — Software Solutions Team$txt$, $txt$Kamran Sohail — Senior Full Stack Developer with 8+ years building Angular, React, .NET Core, and Azure DevOps solutions for US, UAE, and UK clients. Founder of Nexa Web Service.$txt$, 'about software engineer, technical consultant, digital transformation expert, software development', 'https://nexawebservice.com/assets/og-image.jpg'),
('services', 'Services - Digital Transformation, Cloud Migration & Custom Development | USA', $txt$Professional software development services including digital transformation, custom development, cloud migration, legacy modernization, and technical consulting.$txt$, 'software development services, digital transformation, cloud migration, legacy modernization, custom development, technical consulting', 'https://nexawebservice.com/assets/services-og-image.jpg'),
('portfolio', 'Portfolio - Case Studies & Completed Projects | Software Solutions', $txt$Explore 50+ completed projects showcasing expertise in digital transformation, cloud migration, custom development, and enterprise solutions.$txt$, 'portfolio, case studies, completed projects, software solutions, enterprise development, project examples', 'https://nexawebservice.com/assets/portfolio-og-image.jpg'),
('blog', 'Blog - Technical Insights & Software Development Articles | USA', $txt$Read technical articles and insights on digital transformation, software engineering best practices, cloud architecture, and industry trends.$txt$, 'software engineering blog, technical articles, digital transformation, cloud architecture, development best practices', 'https://nexawebservice.com/assets/blog-og-image.jpg'),
('contact', 'Contact - Schedule Your Free Consultation | Software Solutions', $txt$Get in touch to schedule a free 30-minute strategy session. Discuss your project needs with an experienced technical consultant.$txt$, 'contact, consultation, schedule meeting, software engineer contact, technical consultation, free consultation', 'https://nexawebservice.com/assets/contact-og-image.jpg'),
('courses', 'Web Development Courses | Learn HTML, CSS, JavaScript, Angular, React | USA', $txt$Comprehensive web development courses from beginner to advanced. Master HTML, CSS, Bootstrap, JavaScript, jQuery, Angular, React, and Full Stack Development.$txt$, 'web development courses, learn coding, JavaScript courses, Angular courses, React courses, Bootstrap courses, jQuery, HTML CSS', 'https://nexawebservice.com/assets/courses-og-image.jpg'),
('pricing', $txt$Pricing — Web Development & Academy Courses | Nexa Web Service$txt$, $txt$Transparent pricing for web development projects starting at $500. Academy courses from $39. US clients welcome. Pay via PayPal or Wise.$txt$, 'web development pricing, freelance developer rates, website cost, course pricing, affordable web development', 'https://nexawebservice.com/assets/og-image.jpg'),
('faq', $txt$FAQ — Working with International Clients | Nexa Web Service$txt$, $txt$Answers to common questions about working with Nexa Web Service from the US, payment methods, project timelines, and our Academy courses.$txt$, 'faq, international clients, USD payments, remote developer, web development questions, timezone', 'https://nexawebservice.com/assets/og-image.jpg');

