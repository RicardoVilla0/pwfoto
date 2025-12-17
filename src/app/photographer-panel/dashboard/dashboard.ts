// src/app/photographer-panel/dashboard/dashboard.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Booking {
  id: string;
  client: string;
  date: string;
  type: string;
  status: 'Pendiente' | 'Confirmado' | 'Completado' | 'Cancelado';
}

@Component({
  selector: 'app-photographer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class PhotographerDashboardComponent {
  // Datos simulados (reemplaza por llamadas reales)
  stats = {
    sesionesEsteMes: 8,
    ingresosMes: 12400,
    pendientes: 3,
    resenas: 24   // <- renombrado (sin ñ)
  };

  bookings: Booking[] = [
    { id: 'B-1001', client: 'Ana López', date: '2025-11-28', type: 'Boda', status: 'Confirmado' },
    { id: 'B-1002', client: 'Juan Pérez', date: '2025-12-03', type: 'Retrato', status: 'Pendiente' },
    { id: 'B-1003', client: 'Empresa X', date: '2025-12-10', type: 'Comercial', status: 'Confirmado' }
  ];

  // Álbumes/miniaturas de ejemplo (usas exibir1..6 en assets)
  albums = [
    { id: 1, title: 'Retratos 2025', cover: '/assets/exibir1.jpg', count: 12 },
    { id: 2, title: 'Bodas & Eventos', cover: '/assets/exibir4.jpg', count: 28 },
    { id: 3, title: 'Comercial', cover: '/assets/exibir5.jpg', count: 9 }
  ];

  // Lightbox simple
  lightboxOpen = false;
  lightboxSrc = '';

  constructor(private router: Router) {}

  openAlbum(albumId: number) {
    const alb = this.albums.find(a => a.id === albumId);
    if (alb) {
      this.openLightbox(alb.cover);
    }
  }

  openLightbox(src: string) {
    this.lightboxSrc = src;
    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
    this.lightboxSrc = '';
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    try { localStorage.removeItem('isLoggedIn'); localStorage.removeItem('userRole'); } catch {}
    this.router.navigate(['/']);
  }
}
