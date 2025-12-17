// src/app/pages/packages/packages/packages.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PhotoPackage {
  id: number;
  nombre: string;
  precio: string;
  duracion: string;
  descripcion: string;
  caracteristicas: string[];
  imagen?: string;
}

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './packages.html',
  styleUrls: ['./packages.css']
})
export class PackagesComponent {
  paquetes: PhotoPackage[] = [
    {
      id: 1,
      nombre: 'Retrato Básico',
      precio: '$1,200 MXN',
      duracion: '30 min',
      descripcion: 'Sesión rápida en estudio ideal para retratos personales o CV.',
      caracteristicas: ['1 fondo', '5 fotos editadas', '1 cambio de vestuario'],
      imagen: '/assets/comun.jpg'
    },
    {
      id: 2,
      nombre: 'Evento Estándar',
      precio: '$6,500 MXN',
      duracion: '4 hrs',
      descripcion: 'Cobertura para eventos sociales pequeños: cumpleaños, reuniones.',
      caracteristicas: ['Cobertura hasta 4 hrs', '50 fotos editadas', 'Galería online'],
      imagen: '/assets/especial.jpg'
    },
    {
      id: 3,
      nombre: 'Paquete Comercial',
      precio: '$9,800 MXN',
      duracion: 'Sesión de 2 hrs',
      descripcion: 'Fotografía de producto y comercial para marcas pequeñas.',
      caracteristicas: ['Iluminación profesional', '10 fotos editadas', 'Entrega en RAW/JPEG'],
      imagen: '/assets/epico.jpg'
    }
  ];

  selectedPackage: PhotoPackage | null = null;

  seleccionarPaquete(p: PhotoPackage) {
    this.selectedPackage = p;
    // Aquí podrías abrir un modal real; por simplicidad mostramos sección detalle.
  }

  cerrarDetalle() {
    this.selectedPackage = null;
  }

  reservarAhora() {
    // Ejemplo: redirigir al formulario de contacto para reservar
    // Usamos routerLink en plantilla; si prefieres navegación programática inyecta Router.
    // Aquí dejamos la acción simple para que el usuario vaya a Contacto.
  }
}
