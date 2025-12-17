import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // ruta raíz del módulo -> carga el dashboard standalone
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.PhotographerDashboardComponent)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotographerPanelRoutingModule { }
