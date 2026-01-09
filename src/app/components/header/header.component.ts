import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <nav class="navbar">
        <div class="container">
          <div class="nav-brand">
            <a routerLink="/" class="logo">
              <img
                src="assets/ApnaKam.png"
                alt="ApnaKam"
                width="170"
                height="50"
              />
            </a>
          </div>
          <button
            class="hamburger"
            (click)="toggleMenu()"
            [class.active]="menuOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul class="nav-menu" [class.open]="menuOpen">
            <li>
              <a
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="closeMenu()"
                >Home</a
              >
            </li>
            <li>
              <a
                routerLink="/about"
                routerLinkActive="active"
                (click)="closeMenu()"
                >About</a
              >
            </li>
            <li>
              <a
                routerLink="/services"
                routerLinkActive="active"
                (click)="closeMenu()"
                >Services</a
              >
            </li>
            <li>
              <a
                routerLink="/portfolio"
                routerLinkActive="active"
                (click)="closeMenu()"
                >Portfolio</a
              >
            </li>
            <li>
              <a
                routerLink="/blog"
                routerLinkActive="active"
                (click)="closeMenu()"
                >Blog</a
              >
            </li>
            <li>
              <a
                routerLink="/contact"
                routerLinkActive="active"
                class="cta-btn"
                (click)="closeMenu()"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
