// src/app/app.routes.ts
import type { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // componentes standalone por loadComponent
  { path: 'home', loadComponent: () => import('./pages/home/home/home').then(m => m.HomeComponent) },
  { path: 'portfolio', loadComponent: () => import('./pages/portfolio/portfolio/portfolio').then(m => m.PortafolioComponent) },
  { path: 'packages', loadComponent: () => import('./pages/packages/packages/packages').then(m => m.PackagesComponent) },
  { path: 'exhibition', loadComponent: () => import('./pages/exhibition/exhibition/exhibition').then(m => m.ExhibitionComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact/contact').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent) },
  { path: 'photographer', loadChildren: () => import('./photographer-panel/photographer-panel-module').then(m => m.PhotographerPanelModule) },
  { path: 'client', loadChildren: () => import('./client-panel/client-panel-module').then(m => m.ClientPanelModule) },


  { path: '**', redirectTo: 'home' }
];
