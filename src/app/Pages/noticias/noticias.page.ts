import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/Models/publicacion';
import { RegistroPublicacionService } from '../../Services/registro-publicacion.service';
import { RegistroEventoService } from '../../Services/registro-evento.service';
import { Evento } from 'src/app/Models/evento';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/Services/loading.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  isSeeMore:boolean=false;
  noticias: Publicacion[] = [];
  evento: Evento = {
    id_evento: 0,
    id_tipo_evento: 0,
    id_publicacion: 0,
    id_usuario: 0,
    fecha_evento: new Date(),
  };
  id_tipo_evento = 2;
  datos: any = {};
  selectedTab = '';
  constructor(
    private regitroPublicacion: RegistroPublicacionService,
    private registroEvento: RegistroEventoService,
    private router: Router,
    private navCtrl: NavController,
    private loadinServices: LoadingService,
    private so: ScreenOrientation,

  ) {}

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.selectedTab = 'heart-outline';
    this.getNoticias();
    this.doRefresh();
    this.datos = JSON.parse(localStorage.getItem('payload'));
  }
  // sShare(){
  //   var options={
  //     message:'Ionic shre',
  //     url:'https://ionicframework.com/docs/v3/native/social-sharing/#shareViaWhatsAppToReceiver'

  //   };
  //   this.socialSharing.shareWithOptions(options)

  // }
  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.getNoticias();
    if ($event) {
      $event.target.complete();
    }
  }

  loadData(event) {

    setTimeout(() => {

      event.target.complete();

      if (this.noticias.length == 9) {
        event.target.disabled = true;

      }
    }, 500);
  }
  detalle(id: number) {

    if (this.datos.id_rol == 5) {
      this.router.navigate(['/tabs/detalle-noticia/', id]);
    } else {
      if (this.datos.id_rol == 4) {
        this.router.navigate(['/menu-principal/detalle-noticia/', id]);
      }
    }

  }
  async getNoticias() {
    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();
    var auxnot = [];
    this.regitroPublicacion.getpublicaciones().subscribe(
      (res) => {

        for (let aux of res) {
          if (aux.id_tipo_publicacion == 2) {
            auxnot.push(aux);
          }
        }

        this.noticias = auxnot;

      },
      (err) => {

      }
    );
  }


  onclick(){
    this.router.navigate(['/publicar-contenido']);
  }

}
