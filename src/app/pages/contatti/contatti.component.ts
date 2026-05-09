import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

const MOTIVI_CONTATTO = [
  'Visita oculistica completa',
  'OCT (tomografia retinica)',
  'Valutazione LASIK / chirurgia refrattiva',
  'Controllo glaucoma',
  'Urgenza oculistica',
  'Visita pediatrica',
  'Contattologia / lenti a contatto',
  'Secondo parere',
  'Altro'
] as const;

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti e prenotazioni</h1>
        <p>Prenota una visita o richiedi informazioni. Risposta entro 24h lavorative.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <section class="info-block">
          <h2>Dove siamo</h2>
          <p>
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.indirizzo.regione }}
          </p>

          <h2>Contatti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
            <li>
              <strong>PEC:</strong>
              <a [href]="'mailto:' + info.contatti.pec">{{ info.contatti.pec }}</a>
            </li>
          </ul>

          <h2>Orari di apertura</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ info.orari.domenica }}</span></li>
          </ul>

          <div class="urgenza-box">
            <h3>Urgenze oculistiche</h3>
            <p>
              Corpi estranei, trauma, occhio rosso acuto, abbassamento improvviso della vista:
              chiamare mattina (lun-ven 08:30-10:00). Per emergenze recarsi al Pronto Soccorso oculistico.
            </p>
          </div>
        </section>

        <section class="form-block">
          <h2>Richiedi appuntamento</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome *</label>
              <input id="nome" type="text" formControlName="nome" required autocomplete="name" />
            </div>
            <div class="row">
              <div class="field">
                <label for="email">Email *</label>
                <input id="email" type="email" formControlName="email" required autocomplete="email" />
              </div>
              <div class="field">
                <label for="telefono">Telefono *</label>
                <input id="telefono" type="tel" formControlName="telefono" required autocomplete="tel" />
              </div>
            </div>
            <div class="field">
              <label for="motivo">Motivo della visita *</label>
              <select id="motivo" formControlName="motivo" required>
                <option value="">Seleziona...</option>
                <option *ngFor="let m of motivi" [value]="m">{{ m }}</option>
              </select>
            </div>
            <div class="field">
              <label for="note">Note aggiuntive (sintomi, urgenza, ecc.)</label>
              <textarea id="note" formControlName="note" rows="3"></textarea>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Acconsento al trattamento dei dati personali, inclusi i dati sanitari (Art. 9 GDPR),
                per la finalità di prenotazione e cura medica. *
              </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia richiesta</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato viene trasmesso. I dati sanitari ex Art. 9 GDPR sono trattati
              esclusivamente per finalità di cura. Privacy policy completa disponibile in reception.
            </p>
          </form>
          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou__icon" aria-hidden="true">✅</span>
              <h3>Richiesta inviata, {{ form.value.nome }}!</h3>
              <p>
                Abbiamo ricevuto la tua richiesta per <em>{{ form.value.motivo }}</em>.
                Ti contatteremo al numero {{ form.value.telefono }} entro la prossima giornata lavorativa per confermare l'appuntamento.
              </p>
              <p class="disclaimer-small">
                In un sito reale la richiesta verrebbe inviata allo staff del centro via email/CRM.
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
      </div>
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
      .content {
        padding: 3rem 1rem;
      }
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.1rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .info-block p {
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.92rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .urgenza-box {
        margin-top: 1.5rem;
        padding: 1rem;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: var(--radius-md);
      }
      .urgenza-box h3 {
        margin: 0 0 0.5rem;
        font-size: 0.95rem;
        color: var(--color-danger);
      }
      .urgenza-box p {
        margin: 0;
        font-size: 0.85rem;
        color: #b91c1c;
        line-height: 1.5;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.92rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        line-height: 1.4;
      }
      .row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.75rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
        width: 100%;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-primary:not(:disabled):hover {
        background: #0369a1;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
        line-height: 1.4;
      }
      .thankyou {
        text-align: center;
      }
      .thankyou__icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin-bottom: 0.75rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }
      .disclaimer-small {
        font-size: 0.78rem;
        font-style: italic;
        margin-bottom: 1.5rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);
  readonly motivi = MOTIVI_CONTATTO;

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    motivo: ['', Validators.required],
    note: [''],
    privacy: [false, Validators.requiredTrue]
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false });
    this.submitted.set(false);
  }
}
