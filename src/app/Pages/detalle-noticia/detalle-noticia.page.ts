
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/Models/publicacion';
import { Evento } from 'src/app/Models/evento';

import { RegistroPublicacionService } from '../../Services/registro-publicacion.service';
import { RegistroEventoService } from 'src/app/Services/registro-evento.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { SocialsharePage } from '../socialshare/socialshare.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
})
export class DetalleNoticiaPage implements OnInit {
  constructor(

    private regitroPublicacion: RegistroPublicacionService,
    private actRoute: ActivatedRoute,
    private registroEvento: RegistroEventoService,
    private socialSharing: SocialSharing,
    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    private browser: InAppBrowser,
    private so: ScreenOrientation,


  ) {}
  id = 0;
  API_URI = '';
  descripcion = '';
  noticia: Publicacion;
  enlace = '';
  tipo_archivo = '';
  id_publicacion=0;
  titulo = '';
  selectedTab = '';
  evento: Evento = {
    id_evento: 0,
    id_tipo_evento: 0,
    id_publicacion: 0,
    id_usuario: 0,
    fecha_evento: new Date(),
  };
  datos: any = {};
  respuesta: any = {};

  CimgUrl;

  ////SHARE//
  // link: string = 'https://link.medium.com/JA4amAHFJ5';
  // text: string = 'Flamenco';
 imgurl: string =
   'https://dametresminutos.files.wordpress.com/2018/11/nick-fewings-532590-unsplash.jpg?w=584';
  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.datos = JSON.parse(localStorage.getItem('payload'));
    // this.regitroPublicacion.getPublicacion()
    const params = this.actRoute.snapshot.params;
    this.id = params.id;
    this.regitroPublicacion.getPublicacion(params.id).subscribe((res) => {
      this.noticia = res;
      this.API_URI = this.noticia.ruta_archivo;
      this.descripcion = this.noticia.descripcion;
      this.enlace = this.noticia.enlace;
      this.tipo_archivo = this.noticia.tipo_archivo;
      this.titulo = this.noticia.titulo;
      this.id_publicacion=this.noticia.id_publicacion
    });

    this.evento.id_usuario = this.datos.id_usuario;
    this.registroEvento
      .getEvento(this.id, this.datos.id_usuario)
      .subscribe((res) => {
        if (res) {
          this.respuesta = res;
          if (this.respuesta.text == 'ya existe') {
            this.selectedTab = 'heart';
          } else {
            if (this.respuesta.text == 'No existe') {
              this.selectedTab = 'heart-outline';
            }
          }
        }
      });
  }
  socialS(imgUrl) {
    this.evento.id_tipo_evento = 3;
    this.evento.id_publicacion = this.id_publicacion;
    this.evento.id_usuario = this.datos.id_usuario;
    var options = {
      tittle: this.titulo,
      message: this.descripcion,
      url: imgUrl,
    };
    var onSuccess=function(result){
      console.log("Guardado Completado"+result);
    };
    var onError=function(msg){
      console.log("Guardado Completado"+msg);
    };
    this.socialSharing.shareWithOptions(options);
    this.registroEvento.saveEvento(this.id_publicacion, this.datos.id_usuario, this.evento).subscribe(
      (res) => {

      },
      (err) => {
      }
    );
  }

  async showShareOptions() {
    //modal para compartir con redes sociales seleccionadas

    const modal = await this.modalCtrl.create({
      component: SocialsharePage,
      cssClass: 'backTransparent',
      backdropDismiss: true,
    });
    return modal.present();
  }

  buscar(id_publicacion) {
    this.evento.id_tipo_evento = 1;
    this.evento.id_publicacion = id_publicacion;
    this.evento.id_usuario = this.datos.id_usuario;
    this.registroEvento
      .getEvento(id_publicacion, this.datos.id_usuario)
      .subscribe(
        (res) => {
          if (res) {
            this.respuesta = res;
            if (this.respuesta.text == 'ya existe') {
              this.selectedTab = 'heart-outline';
              this.registroEvento
                .deleteEvento(id_publicacion, this.datos.id_usuario)
                .subscribe(
                  (res) => {
                    this.selectedTab = 'heart-outline';
                    if (res) {
                    }
                  },
                  () => {
                  }
                );
            } else {
              this.registroEvento
                .saveEvento(id_publicacion, this.datos.id_usuario, this.evento)
                .subscribe(
                  (res) => {
                    if (res) {
                      this.selectedTab = 'heart';
                    }
                  },
                  () => {
                  }
                );
            }
          }
        },
        (err) => {

        }
      );
  }


  openUrl(url){
    this.browser.create(url,'_self')
  }

}
