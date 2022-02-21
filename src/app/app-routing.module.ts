import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './Services/auth.guard'
import { LoggedInGuard } from './Services/guards/logged-in.guard';
import{LoggedOutGuard} from './Services/guards/logged-out.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },

  {
    path: 'menu-opciones',
    loadChildren: () => import('./Pages/Estudiante-superior/menu-opciones/menu-opciones.module').then( m => m.MenuOpcionesPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./Pages/Estudiante-superior/menu-tabs1/menu-tabs1.module').then( m => m.MenuTabs1PageModule)
  },

  {
    path: 'mi-perfil/:id',
    loadChildren: () => import('./Pages/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule),canActivate:[LoggedOutGuard]
  },

  {
    path: 'registro-usuario',
    loadChildren: () => import('./Pages/registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule),
  },

  {
    path: 'test-aptitud',
    loadChildren: () => import('./Pages/Estudiante-secundaria/test-aptitud/test-aptitud.module').then( m => m.TestAptitudPageModule)
  },

  {
    path: 'menu-opciones-se',
    loadChildren: () => import('./Pages/Estudiante-secundaria/menu-opciones-se/menu-opciones-se.module').then( m => m.MenuOpcionesSePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'menu-principal',
    loadChildren: () => import('./Pages/Estudiante-secundaria/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule),
    canActivate:[AuthGuard]

  },

  {
    path: 'perfiles',
    loadChildren: () => import('./Pages/perfiles/perfiles.module').then( m => m.PerfilesPageModule),
  },

  {
    path: 'oferta-academica',
    loadChildren: () => import('./Pages/Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
  },
  {
    path: 'oferta-academica/:id/:nombre_carrera',
    loadChildren: () => import('./Pages/Estudiante-secundaria/oferta-academica/oferta-academica.module').then( m => m.OfertaAcademicaPageModule)
  },

  {
    path: 'mi-perfil',
    loadChildren: () => import('./Pages/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
  },
  {
    path: 'carreras-fica',
    loadChildren: () => import('./Pages/Estudiante-secundaria/carreras-fica/carreras-fica.module').then( m => m.CarrerasFicaPageModule)
  },

  {
    path: 'detalle-noticia/:id',
    loadChildren: () => import('./Pages/detalle-noticia/detalle-noticia.module').then( m => m.DetalleNoticiaPageModule)
  },

  {
    path: 'registro-tutorias',
    loadChildren: () => import('./Pages/Estudiante-superior/registro-tutorias/registro-tutorias.module').then( m => m.RegistroTutoriasPageModule)
  },
  {
    path: 'detalle-mentoria/:id',
    loadChildren: () => import('./Pages/Estudiante-superior/detalle-mentoria/detalle-mentoria.module').then( m => m.DetalleMentoriaPageModule)
  },
  {
    path: 'agendar-mentoria/:id',
    loadChildren: () => import('./Pages/Estudiante-superior/agendar-mentoria/agendar-mentoria.module').then( m => m.AgendarMentoriaPageModule)
  },
  {
    path: 'mis-mentorias',
    loadChildren: () => import('./Pages/Estudiante-superior/mis-mentorias/mis-mentorias.module').then( m => m.MisMentoriasPageModule)
  },
  {
    path: 'recuperar-contrasenia',
    loadChildren: () => import('./Pages/recuperar-contrasenia/recuperar-contrasenia.module').then( m => m.RecuperarContraseniaPageModule)
  },

  {
    path: 'cambiar-contrasenia/:id',
    loadChildren: () => import('./Pages/cambiar-contrasenia/cambiar-contrasenia.module').then( m => m.CambiarContraseniaPageModule)
  },
  {
    path: 'publicar-contenido',
    loadChildren: () => import('./Pages/publicar-contenido/publicar-contenido.module').then( m => m.PublicarContenidoPageModule)
  },
  {
    path: 'socialshare',
    loadChildren: () => import('./Pages/socialshare/socialshare.module').then( m => m.SocialsharePageModule)
  },
  {
    path: 'detalle-perfil/:id',
    loadChildren: () => import('./Pages/detalle-perfil/detalle-perfil.module').then( m => m.DetallePerfilPageModule)
  },

  {
    path: 'resultado-test-aptitud',
    loadChildren: () => import('./Pages/Estudiante-secundaria/resultado-test-aptitud/resultado-test-aptitud.module').then( m => m.ResultadoTestAptitudPageModule)
  },
  {
    path: 'home-test-aptitud',
    loadChildren: () => import('./Pages/Estudiante-secundaria/home-test-aptitud/home-test-aptitud.module').then( m => m.HomeTestAptitudPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./Pages/onboarding/onboarding.module').then( m => m.OnboardingPageModule ),canActivate:[LoggedOutGuard]
  },
  {
    path: 'test-ing',
    loadChildren: () => import('./Pages/Estudiante-secundaria/test-ing/test-ing.module').then( m => m.TestIngPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./Pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'ayuda-soporte',
    loadChildren: () => import('./Pages/ayuda-soporte/ayuda-soporte.module').then( m => m.AyudaSoportePageModule)
  },

  {
    path: 'detalle-oferta-academica/:id',
    loadChildren: () => import('./Pages/Estudiante-secundaria/detalle-oferta-academica/detalle-oferta-academica.module').then( m => m.DetalleOfertaAcademicaPageModule)
  },










];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
