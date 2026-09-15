-- Seed: site-wide nav, footer, and site_info
-- Transcribed verbatim from header.component.ts / footer.component.ts

truncate table nav_items restart identity cascade;
insert into nav_items (label, path, icon_svg, exact_match, visible, sort_order) values
('Home', '/', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>$svg$, true, true, 1),
('Services', '/services', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>$svg$, false, true, 2),
('Case Studies', '/portfolio', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>$svg$, false, true, 3),
('Insights', '/blog', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>$svg$, false, true, 4),
('Academy', '/courses', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>$svg$, false, true, 5),
('Pricing', '/pricing', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>$svg$, false, true, 6),
('FAQ', '/faq', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>$svg$, false, true, 7),
('About Us', '/about', $svg$<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>$svg$, false, true, 8);

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
  $svg$<span class="logo-plate" style="display:inline-block;background:#FEFDFD;border-radius:10px;padding:6px 10px;line-height:0"><img src="/assets/brand/nexaweb-logo-640.png" width="290" height="55" alt="NexaWeb Service - Build, Launch, Grow" class="logo-svg responsive-logo" decoding="async" fetchpriority="high" style="display:block;width:100%;height:auto;max-width:290px"></span>$svg$,
  $svg$<span class="logo-plate" style="display:inline-block;background:#FEFDFD;border-radius:10px;padding:6px 10px;line-height:0"><img src="/assets/brand/nexaweb-logo-640.png" width="270" height="52" alt="NexaWeb Service - Build, Launch, Grow" class="logo-svg" decoding="async" loading="lazy" style="display:block;width:100%;height:auto;max-width:270px"></span>$svg$,
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
