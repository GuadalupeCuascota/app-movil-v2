import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleOfertaAcademicaPage } from './detalle-oferta-academica.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleOfertaAcademicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleOfertaAcademicaPageRoutingModule {}
