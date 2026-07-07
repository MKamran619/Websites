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
