import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Oculistica clinica e chirurgia refrattiva a Milano</h1>
        <p class="hero-tagline">Centro OCT, LASIK e intervento cataratta. 3 oculisti specialisti + ortottista. Albo Medici Milano.</p>
        <div class="hero-actions">
          <a routerLink="/servizi" class="btn btn-primary">Scopri i servizi</a>
          <a routerLink="/contatti" class="btn btn-secondary">Prenota una visita</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere il Centro Sguardo</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">👁️</span>
          <h3>3 Oculisti specialisti</h3>
          <p>Equipe con oltre 40 anni di esperienza combinata in chirurgia refrattiva, retina e glaucoma.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🔬</span>
          <h3>Diagnostica avanzata</h3>
          <p>OCT di ultima generazione, topografia corneale, fluorangiografia e perimetria computerizzata.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">💡</span>
          <h3>LASIK & PRK</h3>
          <p>Chirurgia refrattiva laser con femtosecondo. Oltre 4.500 interventi eseguiti dal Dott. Ferretti.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🏥</span>
          <h3>Urgenze mattutine</h3>
          <p>Slot dedicati ogni mattina (lun-ven) per traumi, corpi estranei, occhio rosso acuto.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredServizi$ | async as servizi">
      <div class="section-header">
        <h2>Servizi in evidenza</h2>
        <a routerLink="/servizi" class="link-more">Tutti i servizi →</a>
      </div>
      <ul class="servizi-grid">
        <li *ngFor="let s of servizi" class="servizio-card">
          <div class="servizio-card__head">
            <h3>{{ s.nome }}</h3>
            <span class="servizio-card__price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
          </div>
          <p class="servizio-card__desc">{{ s.descrizione }}</p>
          <p class="servizio-card__meta">
            <span class="meta-badge">{{ s.durata }}</span>
          </p>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Prenota la tua visita oculistica</h2>
        <p>Primo appuntamento disponibile entro 7 giorni. Referti digitali disponibili entro 48h dalla visita.</p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Prenota ora</a>
          <a routerLink="/chirurgia" class="btn btn-secondary">Chirurgia refrattiva</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(1.8rem, 4.5vw, 3rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #0369a1;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-subtle);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
        color: var(--color-accent);
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .featured {
        padding: 4rem 1rem;
        margin: 0 0 2rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .servizio-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .servizio-card__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
      }
      .servizio-card__head h3 {
        margin: 0;
        font-size: 1rem;
        flex: 1;
      }
      .servizio-card__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
        white-space: nowrap;
      }
      .servizio-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.88rem;
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .servizio-card__meta {
        margin: 0;
      }
      .meta-badge {
        font-size: 0.75rem;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        background: var(--color-bg-subtle);
        color: var(--color-fg-muted);
        border: 1px solid var(--color-border);
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredServizi$ = this.mockData.servizi$.pipe(
    map((data) => data.servizi.filter((s) => s.featured).slice(0, 3))
  );
}
