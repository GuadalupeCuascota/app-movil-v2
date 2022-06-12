import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPrincipalPage } from './menu-principal.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalPage,
    children: [

      {
        path: 'home-secundaria',
        loadChildren: () =>
          import(
            '../../Estudiante-secundaria/home-secundaria/home-secundaria.module'
          ).then((m) => m.HomeSecundariaPageModule),
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
        path: 'carreras-fica',
        loadChildren: () =>
          import('../../Estudiante-secundaria/carreras-fica/carreras-fica.module').then(
            (m) => m.CarrerasFicaPageModule
          ),
      },

      {
        path: 'home-test-aptitud',
        loadChildren: () => import('../../Estudiante-secundaria/home-test-aptitud/home-test-aptitud.module').then( m => m.HomeTestAptitudPageModule)
      },
      {
        path: '',
        redirectTo:'home-secundaria',
        pathMatch: 'full'
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
        path: 'detalle-oferta-academica/:id',
        loadChildren: () => import('../../Estudiante-secundaria/detalle-oferta-academica/detalle-oferta-academica.module').then( m => m.DetalleOfertaAcademicaPageModule)
      },
      {
        path: 'oferta-academica/:id/:nombre_carrera',
        loadChildren: () => import('../../Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPrincipalPageRoutingModule {}
