import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-faq",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero -->
    <section class="faq-hero">
      <div class="container">
        <span class="hero-badge">FAQ</span>
        <h1>Frequently Asked <span class="gradient-text">Questions</span></h1>
        <p>Everything you need to know about working with us — especially from the US as an international client</p>
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="faq-content">
      <div class="container">
        <div class="faq-layout">

          <!-- Category Nav -->
          <aside class="faq-nav">
            <h3>Categories</h3>
            <ul>
              <li *ngFor="let cat of categories; let i = index">
                <button
                  [class.active]="activeCategory === i"
                  (click)="activeCategory = i"
                >
                  <span [innerHTML]="cat.icon"></span>
                  {{ cat.label }}
                </button>
              </li>
            </ul>
          </aside>

          <!-- Questions -->
          <div class="faq-questions">
            <div class="category-block" *ngFor="let cat of categories; let ci = index" [class.hidden]="activeCategory !== ci">
              <h2 class="cat-title">
                <span [innerHTML]="cat.icon"></span>
                {{ cat.label }}
              </h2>
              <div class="accordion">
                <div
                  class="accordion-item"
                  *ngFor="let item of cat.items; let i = index"
                  [class.open]="openItem === ci + '-' + i"
                >
                  <button class="accordion-q" (click)="toggle(ci + '-' + i)">
                    <span>{{ item.q }}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline [attr.points]="openItem === ci + '-' + i ? '18 15 12 9 6 15' : '6 9 12 15 18 9'"/>
                    </svg>
                  </button>
                  <div class="accordion-a" *ngIf="openItem === ci + '-' + i">
                    <p [innerHTML]="item.a"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="faq-cta">
      <div class="container">
        <div class="cta-card">
          <h3>Still have questions?</h3>
          <p>Send us a message and we'll respond within 24 hours.</p>
          <div class="cta-buttons">
            <a routerLink="/contact" class="btn-primary">Contact Us</a>
            <a href="https://wa.me/923447510711" target="_blank" rel="noopener" class="btn-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./faq.component.scss"],
})
export class FaqComponent {
  activeCategory = 0;
  openItem: string = "0-0";

  toggle(key: string) {
    this.openItem = this.openItem === key ? "" : key;
  }

  categories = [
    {
      label: "Working Internationally",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      items: [
        {
          q: "Do you work with US clients remotely?",
          a: "Yes — absolutely. We work with US clients every day. Our team delivers US-level expertise at a competitive rate, with timezone flexibility to overlap with US business hours. We've successfully delivered projects for clients in New York, Texas, California, and across the US.",
        },
        {
          q: "How do you handle the timezone difference?",
          a: "We operate on UTC+5, which overlaps with US Eastern mornings and US West Coast late evenings. We schedule all calls and standups to suit your timezone, typically at a time that works for you between 8am–12pm EST. Async communication via Slack/email handles the rest seamlessly.",
        },
        {
          q: "How do we communicate during the project?",
          a: "We use whichever tools you prefer: <strong>Slack</strong> for daily communication, <strong>Zoom / Google Meet</strong> for calls, <strong>Notion or Linear</strong> for project tracking, and <strong>GitHub</strong> for code reviews. You'll always know the project status without needing to chase us.",
        },
        {
          q: "Have you worked with US clients before?",
          a: "Yes. We have completed 50+ projects for international clients including US-based businesses across e-commerce, SaaS, healthcare, and finance. References are available upon request.",
        },
        {
          q: "Do I need to worry about language barriers?",
          a: "Not at all. Kamran and the team are fully fluent in English — both written and spoken. All documentation, code comments, and communication are in English.",
        },
      ],
    },
    {
      label: "Payments & Pricing",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      items: [
        {
          q: "How do I pay in USD from the US?",
          a: "We accept payments via <strong>PayPal</strong>, <strong>Wise (TransferWise)</strong>, and <strong>direct bank wire transfer</strong>. All are safe, standard methods used by US clients daily. You'll receive a proper invoice in USD before any payment is due.",
        },
        {
          q: "What is the payment structure?",
          a: "Standard structure: <strong>50% upfront</strong> to begin work, <strong>50% on delivery</strong>. For larger projects (over $5K), we use milestone-based payments — you pay per completed phase. We never ask for 100% upfront.",
        },
        {
          q: "Are your prices negotiable?",
          a: "We price projects based on scope, not arbitrary numbers. During the free consultation, we'll understand exactly what you need and give you a fixed quote. If the scope changes, we discuss it openly — no surprise invoices.",
        },
        {
          q: "Do you charge by the hour or per project?",
          a: "We prefer <strong>fixed-price projects</strong> — it protects you from runaway costs. For ongoing maintenance or consulting retainers, we offer hourly rates starting at $25/hr. Rates are clearly agreed before any work begins.",
        },
        {
          q: "Is there a refund policy?",
          a: "Yes. If we fail to deliver what was agreed in the contract, you are entitled to a partial or full refund for undelivered work. We've never had to issue a refund — but the protection is there in writing.",
        },
      ],
    },
    {
      label: "Projects & Process",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
      items: [
        {
          q: "What types of projects do you take?",
          a: "We specialize in web applications, business websites, e-commerce platforms, SaaS products, API development, and legacy system modernization. We also offer technical consulting and code reviews.",
        },
        {
          q: "How long does a project take?",
          a: "A landing page: 1–2 weeks. A full business website: 3–6 weeks. A web application or SaaS: 2–4 months. Enterprise projects: 6–12 months. We give you a realistic timeline upfront — not one we can't keep.",
        },
        {
          q: "What do you need from me to start?",
          a: "Just your goals, any existing brand assets (logo, colors), and examples of sites you like. We handle everything else — design, development, deployment. A 30-minute call is usually enough to get started.",
        },
        {
          q: "Do you sign NDAs?",
          a: "Yes, without hesitation. We take confidentiality seriously. We're happy to sign your NDA before discussing any proprietary details of your project.",
        },
        {
          q: "Who owns the code after the project?",
          a: "You do — 100%. On final payment, full ownership of all code, design assets, and intellectual property transfers to you. This is written into every contract.",
        },
      ],
    },
    {
      label: "Academy / Courses",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
      items: [
        {
          q: "Are the courses self-paced or live?",
          a: "Courses are taught with a mix of recorded content and live mentorship sessions. You can follow at your own pace, and weekly 1-on-1 mentor calls keep you on track.",
        },
        {
          q: "Do I get a certificate?",
          a: "Yes. Every course includes a certificate of completion that you can add to your LinkedIn profile and resume.",
        },
        {
          q: "Is the academy only for beginners?",
          a: "No. We offer courses from complete beginner (HTML & CSS) to professional full-stack development. There's a path for every level.",
        },
        {
          q: "What if I fall behind or need more help?",
          a: "No problem. You get lifetime access to course materials. If you need extra help, just message your mentor on WhatsApp — we're responsive and want to see you succeed.",
        },
        {
          q: "Can international students enroll?",
          a: "Yes — students from any country can enroll. Courses are taught in English and available online. Payment can be made via PayPal or Wise.",
        },
      ],
    },
    {
      label: "Support & Maintenance",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
      items: [
        {
          q: "What happens after the project launches?",
          a: "All projects include a post-launch support period (1 month for Starter, 3 months for Business, 6+ months for Enterprise). During this time, we fix any bugs at no extra charge and answer questions.",
        },
        {
          q: "Do you offer ongoing maintenance?",
          a: "Yes. We offer monthly maintenance retainers starting at $150/month, which includes updates, security patches, performance monitoring, and up to 5 hours of changes per month.",
        },
        {
          q: "What if I find a bug after support ends?",
          a: "Bug fixes after the support period are billed at our hourly rate ($25/hr). Most fixes are quick and inexpensive. We never leave a client stranded.",
        },
      ],
    },
  ];
}
