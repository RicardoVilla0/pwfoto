// src/app/pages/portfolio/portafolio/portafolio.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Photo {
  src: string;
  title?: string;
  alt?: string;
}

interface Album {
  id: number;
  title: string;
  year?: string;
  category?: string;
  description?: string;
  cover: string;
  photos: Photo[];
  tags?: string[];
  featured?: boolean;
}

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.css']
})
export class PortafolioComponent {
  // fallback local upload (imagen que subiste en el contenedor)
  fallbackImage = '/mnt/data/Captura de pantalla 2025-11-18 180606.png';

  // filtros y búsqueda
  filters: string[] = ['Todos', 'Retratos', 'Eventos', 'Comercial'];
  activeFilter = 'Todos';
  search = '';

  // Álbums usando exibir1..6 (coloca los jpg en /assets/)
  albums: Album[] = [
    {
      id: 1,
      title: 'Retratos — Serie íntima',
      year: '2024',
      category: 'Retratos',
      description: 'Sesiones de retrato que exploran luz natural y conexión con el sujeto.',
      cover: '/assets/exibir1.jpg',
      photos: [
        { src: '/assets/exibir1.jpg', title: 'Ventana al Andén' },
        { src: '/assets/exibir2.jpg', title: 'Mirada' },
        { src: '/assets/exibir3.jpg', title: 'Claroscuro' }
      ],
      tags: ['retratos', 'luz', 'emocion'],
      featured: true
    },
    {
      id: 2,
      title: 'Eventos — Documental',
      year: '2023',
      category: 'Eventos',
      description: 'Cobertura documental para eventos: momentos naturales y espontáneos.',
      cover: '/assets/exibir4.jpg',
      photos: [
        { src: '/assets/exibir4.jpg', title: 'Momento 1' },
        { src: '/assets/exibir5.jpg', title: 'Celebración' },
        { src: '/assets/exibir6.jpg', title: 'Detalle' }
      ],
      tags: ['evento', 'documental']
    },
    {
      id: 3,
      title: 'Comercial — Producto & Marca',
      year: '2025',
      category: 'Comercial',
      description: 'Dirección visual para marcas: producto, estilo de vida y editorial.',
      cover: '/assets/exibir5.jpg',
      photos: [
        { src: '/assets/exibir5.jpg', title: 'Producto 1' },
        { src: '/assets/exibir6.jpg', title: 'Producto 2' }
      ],
      tags: ['comercial', 'producto']
    }
  ];

  // Álbum abierto en el panel (detalle)
  openAlbum: Album | null = null;

  // Lightbox dentro del álbum abierto: índice de la foto (si hay album abierto)
  lightboxIndex: number | null = null;

  // Computed: albums filtrados por categoría + búsqueda
  get filteredAlbums() {
    const q = this.search.trim().toLowerCase();
    return this.albums.filter(a => {
      const passFilter = this.activeFilter === 'Todos' || a.category === this.activeFilter;
      const passSearch = !q || (
        (a.title && a.title.toLowerCase().includes(q)) ||
        (a.description && a.description.toLowerCase().includes(q)) ||
        (a.tags && a.tags.join(' ').toLowerCase().includes(q))
      );
      return passFilter && passSearch;
    });
  }

  setFilter(f: string) {
    this.activeFilter = f;
  }

  clearSearch() {
    this.search = '';
  }

  // Abre panel con thumbnails del álbum
  openAlbumPanel(album: Album) {
    this.openAlbum = album;
    this.lightboxIndex = null;
    // aseguramos foco/scroll al panel para accesibilidad
    setTimeout(() => {
      const el = document.querySelector('.album-panel .panel-inner');
      if (el) (el as HTMLElement).focus({ preventScroll: false });
    }, 80);
  }

  closeAlbumPanel() {
    this.openAlbum = null;
    this.lightboxIndex = null;
  }

  // Abre lightbox con foto individual
  openLightbox(index: number) {
    this.lightboxIndex = index;
    // focusear (opcional)
    setTimeout(() => {
      const el = document.querySelector('.lightbox-inner');
      if (el) (el as HTMLElement).focus({ preventScroll: false });
    }, 20);
  }

  closeLightbox() {
    this.lightboxIndex = null;
  }

  prevPhoto() {
    if (this.openAlbum == null || this.lightboxIndex == null) return;
    const len = this.openAlbum.photos.length;
    this.lightboxIndex = (this.lightboxIndex - 1 + len) % len;
  }

  nextPhoto() {
    if (this.openAlbum == null || this.lightboxIndex == null) return;
    const len = this.openAlbum.photos.length;
    this.lightboxIndex = (this.lightboxIndex + 1) % len;
  }

  // fallback cuando una imagen falla
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (!img) return;
    img.src = this.fallbackImage;
    img.onerror = null;
  }
}
