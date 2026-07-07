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
