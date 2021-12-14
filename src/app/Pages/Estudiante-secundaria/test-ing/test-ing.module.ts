import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestIngPageRoutingModule } from './test-ing-routing.module';

import { TestIngPage } from './test-ing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestIngPageRoutingModule
  ],
  declarations: [TestIngPage]
})
export class TestIngPageModule {}
