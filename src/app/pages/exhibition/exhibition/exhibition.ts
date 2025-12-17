// src/app/pages/exhibition/exhibition/exhibition.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PhotoExhibit {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  medio: string;
  dimensiones: string;
  imagen: string;
  etiquetas?: string[];
}

@Component({
  selector: 'app-exhibition',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exhibition.html',
  styleUrls: ['./exhibition.css']
})
export class ExhibitionComponent {
  exposiciones: PhotoExhibit[] = [
    {
      id: 1,
      titulo: 'Ventana al Andén',
      descripcion: 'Retrato urbano que captura una pausa íntima en medio del ruido de la ciudad. Contraste entre la luz fría del exterior y la calidez de la expresión.',
      fecha: '12 Noviembre 2025',
      lugar: 'Galería Central',
      medio: 'Blanco y negro — película analógica',
      dimensiones: '40 x 60 cm',
      imagen: '/assets/exibir1.jpg',
      etiquetas: ['urbano', 'retrato', 'analógico']
    },
    {
      id: 2,
      titulo: 'Ritmo de la Ciudad',
      descripcion: 'Serie de largas exposiciones que transforman el movimiento en trazos de luz. Exploración del tiempo y la memoria en espacios públicos.',
      fecha: '05 Diciembre 2025',
      lugar: 'Espacio Arte Contemporáneo',
      medio: 'Larga exposición digital',
      dimensiones: '80 x 120 cm',
      imagen: '/assets/exibir2.jpg',
      etiquetas: ['larga-exposición', 'abstracto']
    },
    {
      id: 3,
      titulo: 'Producto en Escena',
      descripcion: 'Dirección visual para marcas locales: minimalismo, textura y atención al detalle en la presentación de producto.',
      fecha: '15 Enero 2026',
      lugar: 'Sala B',
      medio: 'Fotografía digital — estudio',
      dimensiones: '50 x 70 cm',
      imagen: '/assets/exibir3.jpg',
      etiquetas: ['comercial', 'producto']
    },
    {
      id: 4,
      titulo: 'Siluetas de Marca',
      descripcion: 'Interpretación editorial del producto: juego de siluetas, contraste y uso del color para enfatizar forma y logo.',
      fecha: '03 Marzo 2025',
      lugar: 'Estudio Principal',
      medio: 'Fotografía digital — luz continua',
      dimensiones: '40 x 60 cm',
      imagen: '/assets/exibir4.jpg',
      etiquetas: ['editorial', 'producto', 'contraste']
    },
    {
      id: 5,
      titulo: 'Texturas en Caja',
      descripcion: 'Serie de imágenes aplicada a packaging: macro texturas y materiales combinados con montaje minimalista y escala táctil.',
      fecha: '21 Julio 2025',
      lugar: 'Sala C',
      medio: 'Collage digital — impresión fine art',
      dimensiones: '30 x 45 cm',
      imagen: '/assets/exibir5.jpg',
      etiquetas: ['producto', 'packaging', 'textura', 'minimalismo']
    },
    {
      id: 6,
      titulo: 'Escena Cotidiana',
      descripcion: 'Estudio narrativo del producto en contexto: iluminación ambiente, accesorios y composición cinematográfica para storytelling de marca.',
      fecha: '10 Octubre 2024',
      lugar: 'Estudio Móvil',
      medio: 'Fotografía y video — set on-location',
      dimensiones: '70 x 50 cm',
      imagen: '/assets/exibir6.jpg',
      etiquetas: ['comercial', 'producto', 'ambiental', 'narrativa']
    }
  ];

  selected: PhotoExhibit | null = null;
  selectedIndex: number | null = null;

  verDetalle(e: PhotoExhibit, index: number) {
    this.selected = e;
    this.selectedIndex = index;
    // opcional: scroll a detalle
    setTimeout(() => {
      const el = document.querySelector('.expo-detail');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  }

  cerrarDetalle() {
    this.selected = null;
    this.selectedIndex = null;
  }

  prev() {
    if (this.selectedIndex === null) return;
    const i = (this.selectedIndex - 1 + this.exposiciones.length) % this.exposiciones.length;
    this.verDetalle(this.exposiciones[i], i);
  }

  next() {
    if (this.selectedIndex === null) return;
    const i = (this.selectedIndex + 1) % this.exposiciones.length;
    this.verDetalle(this.exposiciones[i], i);
  }
}
