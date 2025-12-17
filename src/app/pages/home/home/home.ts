// src/app/pages/home/home.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Carrusel (ya existente)
  images = [
    { src: '/assets/exibir1.jpg', alt: 'Exhibición 1', caption: 'Ventana al Andén' },
    { src: '/assets/especial.jpg', alt: 'Exhibición especial', caption: 'Especial' },
    { src: '/assets/exibir3.jpg', alt: 'Exhibición 3', caption: 'Ritmo de la Ciudad' },
    // Si el fichero tiene acentos/ñ renómbralo a 'comun.jpg' y actualiza la ruta:
    { src: '/assets/comun.jpg', alt: 'Exhibición común', caption: 'Producto en Escena' }
  ];

  // Galería de miniaturas que aparecen en la sección "Avance del portafolio"
  galleryImages: string[] = [
    '/assets/exibir1.jpg',
    '/assets/especial.jpg',
    '/assets/exibir3.jpg',
    '/assets/comun.jpg' // cambiar a 'común.jpg' solo si tu sistema lo soporta
  ];

  // Fallback local (ruta en tu entorno, imagen que subiste al contenedor)
  fallbackImage = '/mnt/data/Captura de pantalla 2025-11-18 180606.png';

  // Carrusel automático
  currentIndex = 0;
  autoplayMs = 3000; // 3 segundos
  private intervalId: any = null;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.stopAutoplay();
    this.intervalId = setInterval(() => this.next(), this.autoplayMs);
  }

  stopAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goTo(i: number): void {
    this.currentIndex = i;
    this.restartAutoplay();
  }

  restartAutoplay(): void {
    this.stopAutoplay();
    setTimeout(() => this.startAutoplay(), 1000);
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.restartAutoplay();
  }

  // Handler para reemplazar la imagen si falla la carga
  onImageError(event: Event, fallback?: string) {
    const img = event.target as HTMLImageElement;
    if (!img) return;
    img.src = fallback ?? this.fallbackImage;
    img.onerror = null; // prevenir loop si fallback también falla
  }
}
