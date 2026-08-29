import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
  signal,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

interface Cta {
  label: string;
  path: string;
}

interface ChatTurn {
  role: "user" | "assistant";
  text: string;
  cta?: Cta | null;
}

interface ChatResponse {
  conversationId?: string | null;
  reply?: string;
  cta?: Cta | null;
  intent?: string | null;
  suggestions?: string[];
  saved?: boolean;
  error?: string;
}

const ENDPOINT = "/.netlify/functions/chat";

@Component({
  selector: "app-chat-widget",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <button
      type="button"
      class="chat-launcher"
      [class.open]="open()"
      (click)="toggle()"
      [attr.aria-expanded]="open()"
      aria-controls="chat-panel"
      [attr.aria-label]="open() ? 'Close chat' : 'Open chat'"
    >
      @if (open()) {
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      } @else {
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      }
    </button>

    @if (open()) {
      <section id="chat-panel" class="chat-panel" role="dialog" aria-label="Chat with NexaWeb Services">
        <header class="chat-head">
          <span class="chat-mark" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </span>
          <span class="chat-title">
            <strong>NexaWeb Services</strong>
            <small>Ask about services, pricing or past work</small>
          </span>
          <button type="button" class="chat-close" (click)="toggle()" aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div class="chat-log" #log role="log" aria-live="polite">
          @for (turn of turns(); track $index) {
            <div class="turn" [class.mine]="turn.role === 'user'">
              <p>{{ turn.text }}</p>
              @if (turn.cta) {
                <a class="turn-cta" [routerLink]="turn.cta.path" (click)="close()">{{ turn.cta.label }}</a>
              }
            </div>
          }
          @if (thinking()) {
            <div class="turn typing" aria-label="Assistant is replying">
              <span></span><span></span><span></span>
            </div>
          }
        </div>

        @if (showLeadForm()) {
          <form class="lead-form" (ngSubmit)="submitLead()">
            <p class="lead-intro">Leave your details and the team will follow up.</p>
            <input type="text" name="name" placeholder="Your name" [(ngModel)]="leadName" autocomplete="name" />
            <input type="email" name="email" placeholder="Email address" [(ngModel)]="leadEmail" autocomplete="email" required />
            <label class="lead-consent">
              <input type="checkbox" name="consent" [(ngModel)]="leadConsent" />
              <span>I agree to be contacted about my enquiry.</span>
            </label>
            @if (leadError()) { <p class="lead-error">{{ leadError() }}</p> }
            <div class="lead-actions">
              <button type="submit" class="lead-send" [disabled]="leadSending()">
                {{ leadSending() ? "Sending..." : "Send" }}
              </button>
              <button type="button" class="lead-skip" (click)="dismissLead()">No thanks</button>
            </div>
          </form>
        } @else {
          @if (suggestions().length) {
            <div class="chips">
              @for (s of suggestions(); track s) {
                <button type="button" (click)="send(s)">{{ s }}</button>
              }
            </div>
          }
          <form class="chat-input" (ngSubmit)="send(draft)">
            <input
              type="text"
              name="message"
              [(ngModel)]="draft"
              placeholder="Type your question..."
              autocomplete="off"
              maxlength="1000"
              aria-label="Your message"
            />
            <button type="submit" [disabled]="thinking() || !draft.trim()" aria-label="Send message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        }
      </section>
    }
  `,
  styleUrls: ["./chat-widget.component.scss"],
})
export class ChatWidgetComponent {
  @ViewChild("log") private logEl?: ElementRef<HTMLElement>;

  private readonly isBrowser: boolean;

  readonly open = signal(false);
  readonly turns = signal<ChatTurn[]>([]);
  readonly suggestions = signal<string[]>([]);
  readonly thinking = signal(false);
  readonly showLeadForm = signal(false);
  readonly leadSending = signal(false);
  readonly leadError = signal("");

  draft = "";
  leadName = "";
  leadEmail = "";
  leadConsent = false;

  private conversationId: string | null = null;
  private leadDismissed = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggle(): void {
    const next = !this.open();
    this.open.set(next);
    if (next && !this.turns().length) this.greet();
  }

  close(): void {
    this.open.set(false);
  }

  /** Opening state comes from the function so the copy lives in one place. */
  private async greet(): Promise<void> {
    if (!this.isBrowser) return;
    try {
      const res = await fetch(ENDPOINT);
      const data = await res.json();
      this.turns.set([{ role: "assistant", text: data?.greeting?.text ?? "Hello. How can I help?" }]);
      this.suggestions.set(data?.greeting?.suggestions ?? []);
    } catch {
      this.turns.set([
        { role: "assistant", text: "Hello. Ask me about NexaWeb's services, pricing or past work." },
      ]);
    }
  }

  async send(text: string): Promise<void> {
    const message = (text || "").trim();
    if (!message || this.thinking() || !this.isBrowser) return;

    this.draft = "";
    this.suggestions.set([]);
    this.turns.update((t) => [...t, { role: "user", text: message }]);
    this.thinking.set(true);
    this.scroll();

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "message",
          conversationId: this.conversationId,
          message,
          page: location.pathname,
        }),
      });
      const data: ChatResponse = await res.json();

      if (data.conversationId) this.conversationId = data.conversationId;
      this.turns.update((t) => [
        ...t,
        {
          role: "assistant",
          text: data.reply ?? data.error ?? "Sorry, I could not answer that.",
          cta: data.cta ?? null,
        },
      ]);
      this.suggestions.set(data.suggestions ?? []);

      // The answer engine flags turns that look like buying intent.
      if (data.intent === "lead" && !this.leadDismissed) this.showLeadForm.set(true);
    } catch {
      this.turns.update((t) => [
        ...t,
        {
          role: "assistant",
          text: "I could not reach the server. You can email contact@nexawebservice.com.",
          cta: { label: "Contact the team", path: "/contact" },
        },
      ]);
    } finally {
      this.thinking.set(false);
      this.scroll();
    }
  }

  async submitLead(): Promise<void> {
    this.leadError.set("");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.leadEmail.trim())) {
      this.leadError.set("Enter a valid email address.");
      return;
    }
    if (!this.leadConsent) {
      this.leadError.set("Please tick the consent box so we can reply.");
      return;
    }

    this.leadSending.set(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "lead",
          conversationId: this.conversationId,
          name: this.leadName,
          email: this.leadEmail,
          consent: true,
          page: location.pathname,
        }),
      });
      const data: ChatResponse = await res.json();
      if (!res.ok) {
        this.leadError.set(data.error ?? "Could not send that. Try the contact form instead.");
        return;
      }
      this.showLeadForm.set(false);
      this.leadDismissed = true;
      this.turns.update((t) => [
        ...t,
        {
          role: "assistant",
          text: data.reply ?? "Thanks - the team will be in touch.",
          cta: data.cta ?? null,
        },
      ]);
      this.scroll();
    } catch {
      this.leadError.set("Could not send that. Try the contact form instead.");
    } finally {
      this.leadSending.set(false);
    }
  }

  dismissLead(): void {
    this.showLeadForm.set(false);
    this.leadDismissed = true;
  }

  private scroll(): void {
    if (!this.isBrowser) return;
    setTimeout(() => {
      const el = this.logEl?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 0);
  }
}
