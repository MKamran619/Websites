import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";

/**
 * Privacy Policy and Terms of Service.
 *
 * These pages exist because the cookie banner and the footer both linked to
 * them and neither had a target: footer_links stored href="#", and /privacy
 * returned the app shell with HTTP 200. Under UK PECR / UK GDPR a consent
 * banner must link to an accessible privacy notice, so the missing page was a
 * compliance gap, not just a broken link.
 *
 * The content below is FACTUAL - it describes the data flows that actually
 * exist in this codebase: EmailJS for form delivery, Supabase for page
 * content, Netlify for hosting, and GA4 + the Meta Pixel behind consent.
 *
 * ---------------------------------------------------------------------------
 * BEFORE RELYING ON THIS COMMERCIALLY the owner must set the constants below
 * and have the result reviewed by a solicitor for the UK and by local counsel
 * for the UAE. Trading entity and governing law cannot be inferred from code.
 * ---------------------------------------------------------------------------
 */
const LEGAL_ENTITY = "Nexa Web Service";
const CONTACT_EMAIL = "contact@nexawebservice.com";
/** TODO(owner): set to the jurisdiction the business is actually registered in. */
const GOVERNING_LAW =
  "the laws of the jurisdiction in which Nexa Web Service is registered";

@Component({
  selector: "app-legal",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="legal">
      <div class="container">
        <h1>{{ isPrivacy ? "Privacy Policy" : "Terms of Service" }}</h1>
        <p class="updated">Last updated: {{ lastUpdated }}</p>

        <ng-container *ngIf="isPrivacy; else terms">
          <p>
            This notice explains what personal data {{ entity }} collects through
            this website, why, and what rights you have. It covers visitors in
            the United Kingdom, the United States, the United Arab Emirates and
            Pakistan.
          </p>

          <h2>Who we are</h2>
          <p>
            {{ entity }} is the controller of personal data collected through
            this site. You can reach us at
            <a [href]="'mailto:' + email">{{ email }}</a>.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Enquiries.</strong> When you submit the contact, enrolment
              or subscription form we collect the name, email address, phone
              number, company and message you provide. Submissions are delivered
              to us by EmailJS, a third-party email delivery provider.
            </li>
            <li>
              <strong>Analytics and advertising.</strong> If, and only if, you
              press "Accept" on the cookie banner, we load Google Analytics 4 and
              the Meta (Facebook) Pixel. These set cookies and collect usage data
              such as pages viewed, approximate location, device and referrer. If
              you press "Reject", neither is loaded and no such cookie is set.
            </li>
            <li>
              <strong>Technical logs.</strong> Our host, Netlify, processes IP
              addresses and request metadata to serve and secure the site.
            </li>
          </ul>
          <p>
            Page content is delivered from Supabase. We do not sell personal
            data, and we do not carry out automated decision-making or profiling
            that produces legal effects.
          </p>

          <h2>Why we are allowed to use it</h2>
          <ul>
            <li>
              <strong>Your enquiry</strong> - to answer you and, where relevant,
              to take steps before entering a contract. Under UK GDPR this is
              Article 6(1)(b), together with our legitimate interest in
              responding to business enquiries, Article 6(1)(f).
            </li>
            <li>
              <strong>Analytics and advertising cookies</strong> - your consent,
              UK GDPR Article 6(1)(a) and regulation 6 of PECR. You can withdraw
              it at any time.
            </li>
            <li>
              <strong>Security and delivery</strong> - our legitimate interest in
              running the site safely.
            </li>
          </ul>

          <h2>Who we share it with</h2>
          <p>
            Only the processors that make the site work: EmailJS (form delivery),
            Netlify (hosting), Supabase (content), and - with your consent -
            Google and Meta. Several are based in the United States, so your data
            may be transferred outside the UK and the UAE. Those transfers rely
            on the providers' standard contractual clauses and, for UK data, the
            UK International Data Transfer Addendum.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiry correspondence is kept for up to 24 months after our last
            contact with you, unless we are in an ongoing engagement. Analytics
            data is retained for the period configured in Google Analytics. Your
            cookie choice stays in your browser until you clear it.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live you may have the right to access,
            correct, delete, restrict or object to our use of your personal data,
            to receive a copy in a portable format, and to withdraw consent. To
            exercise any of these, email
            <a [href]="'mailto:' + email">{{ email }}</a>.
          </p>
          <ul>
            <li>
              <strong>United Kingdom.</strong> These rights come from the UK
              GDPR. If you are unhappy with our response you can complain to the
              Information Commissioner's Office at ico.org.uk.
            </li>
            <li>
              <strong>United Arab Emirates.</strong> Federal Decree-Law No. 45 of
              2021 (PDPL) gives comparable rights, including the right to
              complain to the UAE Data Office.
            </li>
            <li>
              <strong>United States.</strong> Residents of states with
              comprehensive privacy laws, such as California, may request access
              to or deletion of their personal information and may opt out of
              sharing for cross-context behavioural advertising.
            </li>
            <li>
              <strong>Pakistan.</strong> We handle your data in line with this
              notice and with applicable Pakistani law.
            </li>
          </ul>

          <h2>Changing your cookie choice</h2>
          <p>
            Your choice is stored in this browser under
            <code>cookieConsent</code>. Clearing this site's data in your browser
            will bring the banner back so you can change it.
          </p>
        </ng-container>

        <ng-template #terms>
          <p>
            These terms govern your use of this website and any proposal that
            references them. By using the site you accept them.
          </p>

          <h2>Services</h2>
          <p>
            {{ entity }} provides software development, digital transformation,
            cloud and training services. Prices shown on this site are indicative
            and are not an offer capable of acceptance. The scope, fee, timeline
            and deliverables of any engagement are fixed only in a written
            proposal or statement of work agreed by both parties, which prevails
            over anything stated here.
          </p>

          <h2>Quotes, currency and tax</h2>
          <p>
            Indicative prices may be shown in your local currency for
            convenience. Where a local figure is not available the equivalent US
            dollar figure is shown instead. Currency conversion, bank charges and
            any applicable VAT or sales tax are your responsibility unless the
            proposal states otherwise.
          </p>

          <h2>Payment</h2>
          <p>
            Invoices are payable on the terms stated in the relevant proposal. We
            may suspend work on overdue accounts.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Site content, branding and code are owned by {{ entity }} or its
            licensors. Ownership of work produced for a client transfers as set
            out in that client's proposal, normally on full payment. We retain
            ownership of pre-existing tools, libraries and know-how.
          </p>

          <h2>Training and course enrolments</h2>
          <p>
            Course places are confirmed only once we acknowledge your enrolment
            in writing. Schedules and syllabuses may change.
          </p>

          <h2>Disclaimer and liability</h2>
          <p>
            The site is provided "as is". We do not warrant that it will be
            uninterrupted or error free, and content here is general information
            rather than professional advice. Nothing in these terms limits
            liability for death or personal injury caused by negligence, for
            fraud, or for anything else that cannot lawfully be limited. Subject
            to that, our total liability arising out of an engagement is limited
            to the fees paid for that engagement.
          </p>

          <h2>Third-party links</h2>
          <p>
            We are not responsible for the content of external sites we link to.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms. The version in force is the one published
            here at the time you use the site.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by {{ governingLaw }}.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms:
            <a [href]="'mailto:' + email">{{ email }}</a>.
          </p>
        </ng-template>

        <p class="back"><a routerLink="/">&larr; Back to home</a></p>
      </div>
    </section>
  `,
  styles: [
    `
      .legal {
        padding: 8rem 0 5rem;
        background: var(--background);
        color: var(--text);
      }
      .container {
        max-width: 780px;
        margin: 0 auto;
        padding: 0 1.25rem;
      }
      h1 {
        font-size: clamp(1.9rem, 4vw, 2.75rem);
        margin-bottom: 0.5rem;
      }
      .updated {
        color: var(--text-muted);
        font-size: 0.9rem;
        margin-bottom: 2.5rem;
      }
      h2 {
        font-size: 1.25rem;
        margin: 2.25rem 0 0.75rem;
        color: var(--text);
      }
      p,
      li {
        color: var(--text-muted);
        line-height: 1.75;
      }
      ul {
        padding-left: 1.25rem;
        margin: 0.5rem 0 1rem;
      }
      li {
        margin-bottom: 0.6rem;
      }
      a {
        color: var(--primary);
      }
      code {
        background: var(--surface);
        padding: 0.1rem 0.35rem;
        border-radius: 4px;
        font-size: 0.9em;
      }
      .back {
        margin-top: 3rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border);
      }
    `,
  ],
})
export class LegalComponent implements OnInit {
  isPrivacy = true;
  readonly entity = LEGAL_ENTITY;
  readonly email = CONTACT_EMAIL;
  readonly governingLaw = GOVERNING_LAW;
  /** Static so SSR output and the browser agree; bump when the text changes. */
  readonly lastUpdated = "15 September 2026";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isPrivacy = this.route.snapshot.data["doc"] !== "terms";
  }
}
