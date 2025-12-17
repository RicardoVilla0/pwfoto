// src/app/pages/home/home-module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing-module';
import { SharedModule } from '../../shared/shared-module';

// Componente standalone: se importa (no se declara)
import { HomeComponent } from './home/home';

@NgModule({
  declarations: [
    // componentes no-standalone irían aquí
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    // IMPORTAR componente standalone
    HomeComponent
  ]
})
export class HomeModule { }
