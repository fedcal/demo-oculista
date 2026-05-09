import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Il nostro team</h1>
        <p>3 oculisti specialisti e 1 ortottista — oltre 45 anni di esperienza combinata in oculistica clinica e chirurgica.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="storia">
        <h2>Centro Oculistico Sguardo, Milano</h2>
        <p>
          Fondato nel 2002 dal Dott. Marco Ferretti, il Centro Oculistico Sguardo nasce con l'obiettivo di portare
          a Milano una realtà ambulatoriale privata con standard ospedalieri di diagnostica strumentale e chirurgia
          refrattiva. In oltre vent'anni di attività abbiamo visitato più di 18.000 pazienti ed eseguito oltre 4.500
          interventi chirurgici tra LASIK, PRK e cataratta.
        </p>
        <p>
          Nel 2015 si è unita la Dott.ssa Laura Conti, specialista in patologie retiniche, che ha introdotto l'OCT
          angiography e il percorso integrato per la retinopatia diabetica. Il Dott. Stefano Russo, referente per il
          glaucoma, ha completato l'équipe nel 2018. Silvia Moretti, ortottista dalla professionalità riconosciuta,
          coordina la sala diagnostica e il percorso pediatrico.
        </p>
      </section>

      <section class="valori">
        <h2>I nostri valori</h2>
        <ul class="valori-grid">
          <li>
            <h3>Eccellenza clinica</h3>
            <p>Aggiornamento continuo, letteratura scientifica, partecipazione a congressi SOI e ESCRS ogni anno.</p>
          </li>
          <li>
            <h3>Tecnologia avanzata</h3>
            <p>OCT di ultima generazione, femtolaser, topografo corneale — strumentazione rinnovata ogni 5 anni.</p>
          </li>
          <li>
            <h3>Trasparenza</h3>
            <p>Prezzi chiari, referti digitali entro 48h, seconda opinione sempre disponibile senza pressione.</p>
          </li>
          <li>
            <h3>Cura del paziente</h3>
            <p>Slot urgenze dedicati ogni mattina, risposta email entro 24h, follow-up post-chirurgico incluso.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as teamData">
        <h2>Il team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of teamData.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">
              {{ m.nome.split(' ').pop()?.charAt(0) ?? 'M' }}
            </div>
            <h3>{{ m.titolo ? m.titolo + ' ' + m.nome : m.nome }}</h3>
            <p class="team-card__ruolo">{{ m.ruolo }}</p>
            <p class="team-card__spec">{{ m.specializzazione }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__albo">{{ m.albo }}</p>
            <ul class="team-card__competenze">
              <li *ngFor="let c of m.competenze">{{ c }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq" *ngIf="faq$ | async as faqData">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of faqData.faq" class="faq-item">
            <h3>{{ item.domanda }}</h3>
            <p>{{ item.risposta }}</p>
          </li>
        </ul>
      </section>
    </article>
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
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
      }
      .content {
        padding: 3rem 1rem;
      }
      .storia {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .storia h2 {
        margin-bottom: 1rem;
      }
      .storia p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .valori {
        margin-bottom: 4rem;
      }
      .valori h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .valori-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .valori-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .valori-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
        font-size: 1rem;
      }
      .valori-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.5;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.2rem;
        font-size: 1rem;
      }
      .team-card__ruolo {
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.85rem;
        margin: 0 0 0.25rem;
      }
      .team-card__spec {
        color: var(--color-fg-muted);
        font-size: 0.82rem;
        font-style: italic;
        margin: 0 0 0.75rem;
      }
      .team-card__bio {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        text-align: left;
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }
      .team-card__albo {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.75rem;
        text-align: left;
      }
      .team-card__competenze {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__competenze li {
        font-size: 0.72rem;
        background: var(--color-bg-subtle);
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
        border: 1px solid var(--color-border);
      }
      .faq h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 720px;
        margin-left: auto;
        margin-right: auto;
      }
      .faq-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .faq-item h3 {
        margin: 0 0 0.5rem;
        font-size: 0.95rem;
        color: var(--color-accent);
      }
      .faq-item p {
        margin: 0;
        font-size: 0.88rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
