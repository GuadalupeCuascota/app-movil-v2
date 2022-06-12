import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTabs1Page } from './menu-tabs1.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home-superior',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuTabs1Page,
    children: [
      {
        path: 'home-superior',
        loadChildren: () =>
          import(
            '../../Estudiante-superior/home-superior/home-superior.module'
          ).then((m) => m.HomeSuperiorPageModule),
      },

      {
        path: 'perfiles',
        loadChildren: () =>
          import('../../perfiles/perfiles.module').then(
            (m) => m.PerfilesPageModule
          ),
      },
      {
        path: 'noticias',
        loadChildren: () =>
          import('../../noticias/noticias.module').then(
            (m) => m.NoticiasPageModule
          ),
      },
      {
        path: 'registro-tutorias',
        loadChildren: () =>
          import('../../../Pages/Estudiante-superior/registro-tutorias/registro-tutorias.module').then(
            (m) => m.RegistroTutoriasPageModule
          ),
      },
      {
        path: 'mis-mentorias',
        loadChildren: () =>
          import('../../../Pages/Estudiante-superior/mis-mentorias/mis-mentorias.module').then(
            (m) => m.MisMentoriasPageModule
          ),
      },
      {
        path: 'detalle-perfil/:id',
        loadChildren: () => import('../../detalle-perfil/detalle-perfil.module').then( m => m.DetallePerfilPageModule)
      },

      {
        path: 'detalle-noticia/:id',
        loadChildren: () => import('../../detalle-noticia/detalle-noticia.module').then( m => m.DetalleNoticiaPageModule)
      },
      {
        path: 'mi-perfil/:id',
        loadChildren: () => import('../../mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
      },
      {
        path: 'contacto',
        loadChildren: () => import('../../contacto/contacto.module').then( m => m.ContactoPageModule)
      },
      {
        path: 'agendar-mentoria/:id',
        loadChildren: () => import('../../Estudiante-superior/agendar-mentoria/agendar-mentoria.module').then( m => m.AgendarMentoriaPageModule)
      },

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTabs1PageRoutingModule {}
