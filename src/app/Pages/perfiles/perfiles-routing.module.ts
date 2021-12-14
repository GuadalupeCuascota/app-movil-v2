import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilesPage } from './perfiles.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilesPage,
  },
  {
    path: '',
    component: PerfilesPage,
    children: [
      {
        path: 'detalle-perfil/:id',
        loadChildren: () =>
          import('../detalle-perfil/detalle-perfil.module').then(
            (m) => m.DetallePerfilPageModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilesPageRoutingModule {}
