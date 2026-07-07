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
