import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Centro Oculistico Sguardo — Oculistica, OCT, LASIK Milano'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
    title: 'Servizi — Centro Oculistico Sguardo'
  },
  {
    path: 'chirurgia',
    loadComponent: () => import('./pages/chirurgia/chirurgia.component').then((m) => m.ChirurgiaComponent),
    title: 'Chirurgia Refrattiva e Cataratta — Centro Oculistico Sguardo'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Centro Oculistico Sguardo'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti e Prenotazioni — Centro Oculistico Sguardo'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
