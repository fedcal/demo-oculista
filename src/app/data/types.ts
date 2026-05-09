// Tipi TypeScript per i dati mock del centro oculistico

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  email: string;
  pec: string;
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziStudio {
  accessibileDisabili: boolean;
  parcheggioVicino: boolean;
  wifiGratuito: boolean;
  refertazioneOnline: boolean;
  telemedicina: boolean;
  pagamentoElettronico: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  alboProfessionale: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziStudio;
  metaSeo: MetaSeo;
}

export interface ServizioOculistico {
  id: number;
  categoria: string;
  nome: string;
  descrizione: string;
  durata: string;
  prezzo: number;
  prezzoNote?: string;
  featured?: boolean;
}

export interface CategoriaServizi {
  id: string;
  nome: string;
  ordine: number;
}

export interface ServiziData {
  categorie: CategoriaServizi[];
  servizi: ServizioOculistico[];
}

export interface InterventiChirurgici {
  id: number;
  tipo: string;
  nome: string;
  descrizione: string;
  indicazioni: string[];
  controindicazioni: string[];
  prezzo: number;
  prezzoNote: string;
  durata: string;
  recupero: string;
}

export interface ChirurgiaData {
  interventi: InterventiChirurgici[];
}

export interface Membro {
  id: number;
  nome: string;
  titolo: string;
  ruolo: string;
  specializzazione: string;
  bio: string;
  anniEsperienza: number;
  albo: string;
  competenze: string[];
}

export interface Team {
  team: Membro[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
  categoria?: string;
}

export interface Faq {
  faq: FaqItem[];
}
