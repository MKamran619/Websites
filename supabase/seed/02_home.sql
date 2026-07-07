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
