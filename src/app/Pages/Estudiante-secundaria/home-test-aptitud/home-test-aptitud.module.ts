import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTestAptitudPageRoutingModule } from './home-test-aptitud-routing.module';

import { HomeTestAptitudPage } from './home-test-aptitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTestAptitudPageRoutingModule
  ],
  declarations: [HomeTestAptitudPage]
})
export class HomeTestAptitudPageModule {}
