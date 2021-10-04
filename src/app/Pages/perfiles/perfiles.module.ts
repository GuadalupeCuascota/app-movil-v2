import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilesPageRoutingModule } from './perfiles-routing.module';

import { PerfilesPage } from './perfiles.page';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilesPageRoutingModule,
     PipesModule

   
  ],
  declarations: [PerfilesPage]
})
export class PerfilesPageModule {}
