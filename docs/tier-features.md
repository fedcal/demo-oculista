# Funzionalità per Tier — Centro Sguardo Milano Oftalmologia

Tre livelli di template per oculista, dalla gestione prenotazioni base al miopia tracker con LASIK simulator.

## Tier Base — €500-800 (consegna 2-3 settimane)

**Per chi**: Studio oculistico che vuole trasformare booking da carta a digitale.  
**Sforzo stimato**: ~100h.

### Funzionalità incluse

- **Home Hero** con foto studio + CTA "Prenota Visita"
- **Booking Prenotazioni**
  - Calendario visita realtime
  - Slot 30min selezionabili
  - Conferma email + SMS
  
- **Profilo Medico**
  - Laurea + specializzazione + iscrizione FNOMCeO
  - Curriculum + premi
  - Subspecialità (glaucoma, retina, LASIK, lenti contatto)
  
- **Menu Prestazioni**
  - Visita oculistica €60-100
  - LASIK €1800/occhio
  - OCT retina €80
  - Prescrizione lenti contatto €40
  - Misurazione pressione oculare IOP €30
  
- **Contact Form** + WhatsApp booking
- **GDPR Compliance** (sensibilità dati Art.9)
- **Schema MedicalBusiness JSON-LD** per SEO
- **Mobile-first responsive** (LCP <2.5s)
- **HTTPS + SSL certificate** gratis Let's Encrypt

### Cosa NON è incluso

- Miopia tracker
- IOP monitoring
- OCT photo management
- LASIK simulator
- Prescrizione auto-generator
- Contatti lenti fitting tracker

---

## Tier Intermedio — €1.500-2.200 (consegna 4-6 settimane)

**Per chi**: Studio oculistico consolidato che vuole tracciamento miopia e OCT management.  
**Sforzo stimato**: ~280h.

### Funzionalità incluse (oltre al Base)

- **Miopia Progression Tracker**
  - Registra diottrie per OD/OS per anno
  - Trend visualization (linea progr. diottrie)
  - AI predice LASIK timing (quando stabile)
  - Alert genitori se progr. >0.5D/anno (screening)
  - Correlazione stili vita (tempo schermo, outdoor)
  
- **IOP Tracking Glaucoma**
  - Registra pressione mmHg per visita
  - Trend tracking su 12/24 mesi
  - Alert >21 mmHg (glaucoma suspect)
  - Risk progression calcolato da trend
  - Compliance reminder therapy antiglaucoma
  
- **OCT Photo Management**
  - DICOM viewer integrato per immagini retina
  - Annotazione edema/drusen/neovascolarizzazione
  - Before/after (cataract, retina surgery)
  - Archive cronologico per evoluzione
  
- **Prescrizione Occhiali Generator**
  - Sfera/cilindro/asse IAPB standard PDF
  - QR code per ottico (leggibile in laboratorio)
  - Alert prescrizione scaduta (validità 2 anni)
  
- **Multi-lingua IT/EN** (pazienti EU)
- **Admin Dashboard** modifica orari/prezzi
- **Newsletter opt-in** consigli vista

### Integrazioni disponibili

| Stack | Costo/anno | Note |
|-------|-----------|------|
| Stripe | 1.4% + €0.30 per transazione | Payment processor |
| SendGrid Email | Free (100/giorno) | Newsletter |
| Zoom API | €229/anno | Telemedicina (limitato FNOMCeO) |
| DICOM Server | €0 | Open-source viewer DICOM.web |

---

## Tier Avanzato — €4.000-5.500 (consegna 10-12 settimane)

**Per chi**: Studio oculistico specializzato (LASIK, glaucoma, retina) con volume 1000+ pazienti/anno.  
**Sforzo stimato**: ~440h.

### Funzionalità incluse (oltre all'Intermedio)

- **LASIK Simulation Interattivo**
  - Topografia cornea input (file .map dalla macchina)
  - AI slider morphing: "quanto miope desideri correggere"
  - Before/after foto virtuale facciale
  - Stima refrazione post-LASIK
  - Stripe quotation integrato (click "prenota LASIK")
  
- **Presbiopia Adaptive Prescription**
  - 3-mode selection: computer (near 40cm) / reading (25cm) / driving (distance)
  - Multi-focus calc (progressive lens coord)
  - Export prescrizione multi-zona
  - A/B test pricing (standard vs premium lense)
  
- **Contatti Lenti Fitting Tracker**
  - Storico fitting per materiale (Silicone Hydrogel vs Hydrogel)
  - Comfort comparison A vs B (patient feedback)
  - Wear schedule tracking (dailies/bi-weekly/monthly)
  - Re-order reminders (cadenza consumo)
  
- **Retina AI Analysis**
  - LLaVA detection edema/drusen/neovascolarizzazione in OCT
  - Diabetic retinopathy staging (ETDRS)
  - Risk scoring per consultazione retinologo
  - Trend comparison 6-12 mesi
  
- **Patient Education Portal**
  - Video explainer condizioni oculari (cataratta, LASIK, glaucoma)
  - Pre/post-surgery checklist
  - Download PDF prescrizione + consigli
  
- **Advanced Analytics**
  - Revenue per prestazione (LASIK €1800 vs OCT €80)
  - LASIK success rate (refractive outcome ±0.5D target)
  - Patient retention (follow-up compliance)
  - Glaucoma management effectiveness

### Integrazioni Enterprise

| Stack | Costo/anno | Note |
|-------|-----------|------|
| Ollama AI (on-prem) | €0 | LLaVA retina analysis |
| Stripe | 1.4% + €0.30 | Payment + LASIK quotation |
| SendGrid | Free tier | Newsletter bulk |
| DICOM Server | €0 | Enterprise DICOM.web |
| Topografia Cornea API | Variable | Integrazione OCT/topografia |

---

## Confronto Tier

| Funzionalità | Base | Intermedio | Avanzato |
|---|:---:|:---:|:---:|
| Booking Prenotazioni | ✓ | ✓ | ✓ |
| Profilo Medico | ✓ | ✓ | ✓ |
| Menu Prestazioni | ✓ | ✓ | ✓ |
| **Miopia Tracker** | — | ✓ | ✓ |
| **IOP Tracking** | — | ✓ | ✓ |
| **OCT Management** | — | ✓ | ✓ |
| **Prescrizione Auto** | — | ✓ | ✓ |
| **LASIK Simulator** | — | — | ✓ |
| **Presbiopia Calc** | — | — | ✓ |
| **Contatti Tracker** | — | — | ✓ |
| **Retina AI** | — | — | ✓ |

---

## Manutenzione Ricorrente

| Piano | €/mese | Incluso |
|-------|---------|---------|
| **Basic** | €50 | Hosting + SSL + backup + email support |
| **Standard** | €100 | Basic + 4h modifiche/mese + monitoring + phone support |
| **Premium** | €200 | Standard + 12h modifiche/mese + CDN + AI updates + FNOMCeO compliance |

---

## Partnership & Supporto

**Hosting** — Hetzner VPS (EU-based, GDPR compliant)  
**SSL/CDN** — Cloudflare free tier  
**Payment** — Stripe + Pagamenti italiani  
**Support** — Federico Calò, email + Telegram

**Normativa**: GDPR Art.9 (dati sensibili), FNOMCeO telemedicina limitata, detraibilità 19%, SIAE foto

---

**Scegli il tier adatto. Contatta Federico per quotazione personalizzata.**
