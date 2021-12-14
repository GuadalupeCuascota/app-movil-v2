import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleOfertaAcademicaPageRoutingModule } from './detalle-oferta-academica-routing.module';

import { DetalleOfertaAcademicaPage } from './detalle-oferta-academica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleOfertaAcademicaPageRoutingModule
  ],
  declarations: [DetalleOfertaAcademicaPage]
})
export class DetalleOfertaAcademicaPageModule {}
