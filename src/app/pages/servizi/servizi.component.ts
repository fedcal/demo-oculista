import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { ServizioOculistico } from '../../data/types';

interface CategoriaView {
  id: string;
  nome: string;
  servizi: ServizioOculistico[];
}

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Servizi oculistici</h1>
        <p>12 prestazioni specialistiche — dalla visita di base all'imaging retinico avanzato.</p>
      </div>
    </section>

    <article class="demo-container" *ngIf="view$ | async as view">
      <section *ngFor="let cat of view" class="servizi-categoria" [id]="cat.id">
        <h2>{{ cat.nome }}</h2>
        <ul class="servizi-list">
          <li *ngFor="let s of cat.servizi" class="servizio-item">
            <div class="servizio-item__head">
              <h3>{{ s.nome }}</h3>
              <span class="servizio-item__price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
            </div>
            <p class="servizio-item__desc">{{ s.descrizione }}</p>
            <div class="servizio-item__meta">
              <span class="meta-badge">{{ s.durata }}</span>
              <span *ngIf="s.prezzoNote" class="meta-note">{{ s.prezzoNote }}</span>
            </div>
          </li>
        </ul>
      </section>

      <p class="disclaimer">
        I prezzi sono indicativi e possono variare in base alla complessità clinica. IVA esente ex Art. 10 c. 18 DPR 633/72 (prestazioni sanitarie).
        Ricevuta fiscale rilasciata per ogni prestazione. Spese detraibili al 19% nella dichiarazione dei redditi (franchigia €129,11).
      </p>
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
      }
      .servizi-categoria {
        padding: 3rem 1rem 1.5rem;
      }
      .servizi-categoria h2 {
        font-size: 1.4rem;
        margin: 0 0 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 1.25rem;
      }
      .servizio-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .servizio-item__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 0.5rem;
      }
      .servizio-item__head h3 {
        margin: 0;
        font-size: 1rem;
        flex: 1;
      }
      .servizio-item__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
      }
      .servizio-item__desc {
        color: var(--color-fg-muted);
        font-size: 0.88rem;
        margin: 0 0 0.75rem;
        line-height: 1.6;
      }
      .servizio-item__meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .meta-badge {
        font-size: 0.75rem;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        background: var(--color-bg-subtle);
        color: var(--color-fg-muted);
        border: 1px solid var(--color-border);
      }
      .meta-note {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
      }
      .disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
        margin: 3rem 1rem;
        padding: 1rem;
        border: 1px dashed var(--color-border);
        border-radius: var(--radius-md);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiziComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.servizi$.pipe(
    map((data) =>
      data.categorie
        .sort((a, b) => a.ordine - b.ordine)
        .map((cat): CategoriaView => ({
          id: cat.id,
          nome: cat.nome,
          servizi: data.servizi.filter((s) => s.categoria === cat.id)
        }))
    )
  );
}
