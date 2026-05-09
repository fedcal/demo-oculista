import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chirurgia',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chirurgia refrattiva e cataratta</h1>
        <p>LASIK, PRK e facoemulsificazione — oltre 4.500 interventi eseguiti dal nostro team.</p>
      </div>
    </section>

    <article class="demo-container" *ngIf="refrattiva$ | async as refrattiva">
      <section class="chirurgia-sezione">
        <h2>Chirurgia refrattiva laser</h2>
        <p class="sezione-intro">
          La chirurgia refrattiva corregge in modo permanente miopia, ipermetropia e astigmatismo eliminando o riducendo
          la dipendenza dagli occhiali. La valutazione pre-chirurgica (visita dedicata) determina quale tecnica è più
          adatta al tuo occhio.
        </p>
        <ul class="interventi-list">
          <li *ngFor="let i of refrattiva" class="intervento-card">
            <div class="intervento-card__header">
              <h3>{{ i.nome }}</h3>
              <span class="intervento-card__price">
                {{ i.prezzo | currency: 'EUR':'symbol':'1.0-0' }}
                <small>per occhio</small>
              </span>
            </div>
            <p class="intervento-card__desc">{{ i.descrizione }}</p>
            <div class="intervento-card__details">
              <div class="detail-col">
                <h4>Indicazioni</h4>
                <ul class="detail-list detail-list--green">
                  <li *ngFor="let ind of i.indicazioni">{{ ind }}</li>
                </ul>
              </div>
              <div class="detail-col">
                <h4>Controindicazioni</h4>
                <ul class="detail-list detail-list--red">
                  <li *ngFor="let c of i.controindicazioni">{{ c }}</li>
                </ul>
              </div>
            </div>
            <div class="intervento-card__meta">
              <span class="meta-item"><strong>Durata:</strong> {{ i.durata }}</span>
              <span class="meta-item"><strong>Recupero:</strong> {{ i.recupero }}</span>
            </div>
            <p *ngIf="i.prezzoNote" class="meta-note">{{ i.prezzoNote }}</p>
          </li>
        </ul>
      </section>
    </article>

    <article class="demo-container" *ngIf="cataratta$ | async as cataratta">
      <section class="chirurgia-sezione">
        <h2>Chirurgia della cataratta</h2>
        <p class="sezione-intro">
          L'intervento di cataratta è uno dei più sicuri ed efficaci in medicina. Il cristallino opacizzato viene
          sostituito con una lente intraoculare artificiale (IOL) che può anche correggere la refrazione.
        </p>
        <ul class="interventi-list">
          <li *ngFor="let i of cataratta" class="intervento-card">
            <div class="intervento-card__header">
              <h3>{{ i.nome }}</h3>
              <span class="intervento-card__price">
                {{ i.prezzo | currency: 'EUR':'symbol':'1.0-0' }}
              </span>
            </div>
            <p class="intervento-card__desc">{{ i.descrizione }}</p>
            <div class="intervento-card__details" *ngIf="i.indicazioni.length > 0">
              <div class="detail-col">
                <h4>Indicazioni</h4>
                <ul class="detail-list detail-list--green">
                  <li *ngFor="let ind of i.indicazioni">{{ ind }}</li>
                </ul>
              </div>
            </div>
            <div class="intervento-card__meta" *ngIf="i.recupero !== 'Non applicabile'">
              <span class="meta-item"><strong>Durata:</strong> {{ i.durata }}</span>
              <span class="meta-item"><strong>Recupero:</strong> {{ i.recupero }}</span>
            </div>
            <p *ngIf="i.prezzoNote" class="meta-note">{{ i.prezzoNote }}</p>
          </li>
        </ul>
      </section>
    </article>

    <section class="cta-section demo-container">
      <div class="cta-box">
        <h2>Vuoi sapere se sei candidabile?</h2>
        <p>La visita pre-chirurgica è l'unico modo per valutare con certezza la candidatura. Dura circa 90 minuti, include biometria e topografia corneale, e il costo (€200) è deducibile dall'intervento.</p>
        <a routerLink="/contatti" class="btn btn-primary">Prenota la visita pre-chirurgica</a>
      </div>
    </section>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .chirurgia-sezione {
        padding: 3rem 1rem 2rem;
      }
      .chirurgia-sezione h2 {
        font-size: 1.5rem;
        margin: 0 0 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .sezione-intro {
        color: var(--color-fg-muted);
        max-width: 720px;
        margin: 1rem 0 2rem;
        line-height: 1.7;
      }
      .interventi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .intervento-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        background: #ffffff;
      }
      .intervento-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 0.75rem;
      }
      .intervento-card__header h3 {
        margin: 0;
        font-size: 1.15rem;
      }
      .intervento-card__price {
        color: var(--color-accent);
        font-weight: 700;
        font-size: 1.1rem;
        flex-shrink: 0;
        text-align: right;
      }
      .intervento-card__price small {
        display: block;
        font-size: 0.75rem;
        font-weight: 400;
        color: var(--color-fg-muted);
      }
      .intervento-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.92rem;
        line-height: 1.65;
        margin: 0 0 1.25rem;
      }
      .intervento-card__details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.25rem;
        margin-bottom: 1.25rem;
      }
      .detail-col h4 {
        margin: 0 0 0.5rem;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-fg-muted);
      }
      .detail-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }
      .detail-list li {
        font-size: 0.88rem;
        padding-left: 1.1rem;
        position: relative;
      }
      .detail-list li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.45em;
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
      .detail-list--green li::before {
        background: var(--color-success);
      }
      .detail-list--red li::before {
        background: var(--color-danger);
      }
      .intervento-card__meta {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        padding: 0.75rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        margin-bottom: 0.75rem;
      }
      .meta-item {
        font-size: 0.88rem;
        color: var(--color-fg-muted);
      }
      .meta-item strong {
        color: var(--color-fg-default);
      }
      .meta-note {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin: 0;
      }
      .cta-section {
        padding: 2rem 1rem 4rem;
      }
      .cta-box {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2.5rem;
        text-align: center;
      }
      .cta-box h2 {
        margin: 0 0 0.75rem;
      }
      .cta-box p {
        color: var(--color-fg-muted);
        max-width: 640px;
        margin: 0 auto 1.5rem;
        line-height: 1.65;
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChirurgiaComponent {
  private readonly mockData = inject(MockDataService);

  readonly refrattiva$ = this.mockData.chirurgia$.pipe(
    map((data) => data.interventi.filter((i) => i.tipo === 'refrattiva'))
  );

  readonly cataratta$ = this.mockData.chirurgia$.pipe(
    map((data) => data.interventi.filter((i) => i.tipo === 'cataratta'))
  );
}
