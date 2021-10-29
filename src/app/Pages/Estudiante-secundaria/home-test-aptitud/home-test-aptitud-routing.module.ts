import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTestAptitudPage } from './home-test-aptitud.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTestAptitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTestAptitudPageRoutingModule {}
