// src/app/shared/shared-module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Componentes standalone: NO van en declarations, se importan en imports
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';

@NgModule({
  // No declarar componentes standalone
  declarations: [
    // (vacío)
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // IMPORTA aquí los componentes standalone para que el NgModule los use
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    // Re-exporta los componentes para que otros módulos puedan usarlos
    HeaderComponent,
    FooterComponent,
    // opcional: re-exporta utilidades si quieres
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
