import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/Models/publicacion';
// import 'rxjs/add/operator/map';

import { NavController } from '@ionic/angular';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { RegistroPublicacionService } from '../../Services/registro-publicacion.service';
import {
  StreamingMedia,
  StreamingVideoOptions,
  StreamingAudioOptions,
} from '@ionic-native/streaming-media/ngx';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { YoutubeApiService } from 'src/app/Services/youtube-api.service';
import { ObjectUnsubscribedError } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.page.html',
  styleUrls: ['./perfiles.page.scss'],
})
export class PerfilesPage implements OnInit {
  isSeeMore: boolean = false;
  id_perfil = 0;
  perfiles: Publicacion[] = [];
  textoBuscar = '';
  tipoarchivo = false;
  tipovideo = 'video/mp4';
  tipoimagen = 'imagen/jpeg';
  datos: any = {};
  valueSelected: string = 'perfiles';

  /////YOUTUBE-API/////
  idcanal: string = 'UCS1EzRQqzi03AEYWSFMER_Q';

  maxRes: string = '70+30';
  googleToken: string = 'AIzaSyAIyv-RhbPIbXTIZrhA-aMR-4OsRBgFRTk'; //api key
  post: any = [];
  posts: any = [];
  search: string = 'Women in STEM';
  playlistId = 'PLlV71HhUrs0orVDEiAlidNWsfmf4OIQkQ';
  MQcI6zKT7S8;

  constructor(
    private regitroPublicacion: RegistroPublicacionService,
    private streamingMedia: StreamingMedia,
    private router: Router,
    private yotubeapi: YoutubeApiService,
    private youtube: YoutubeVideoPlayer,
    private loadinServices: LoadingService,
    private so: ScreenOrientation
  ) {

  } //inyecto el servicio importado

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.getPerfiles();
    this.doRefresh();
    this.getPlayList();
    this.datos = JSON.parse(localStorage.getItem('payload'));

  }

  getPlayList() {
    this.yotubeapi.getListVideos(this.playlistId).subscribe(
      (res) => {
        this.post = res;

        this.posts = this.post.items;
      },
      (err) => {

      }
    );
  }

  openVideo(video) {
    this.youtube.openVideo(video);
  }
  buscar(event) {
    this.textoBuscar = event.detail.value;

  }
  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.getPerfiles();
    if ($event) {
      $event.target.complete();
    }
  }
  segmenntChange(event: any) {
    this.valueSelected = event.detail.value;

  }

  playVideo(url: any) {

    var options: StreamingVideoOptions = {
      successCallback: () => {

      },
      errorCallback: (e) => {

      },
      orientation: 'portrait', //fuerza una orientacion del video
      controls: true, //el video debe tener controles
      shouldAutoClose: true, //cierra el video despues de que termine
    };

    this.streamingMedia.playVideo('http://192.168.100.45:3000/' + url, options);

  }


  stopPlayingVideo() {
    this.streamingMedia.pauseAudio();
  }

  perfil: Publicacion;

  loadData(event) {

    setTimeout(() => {

      event.target.complete();

      if (this.perfiles.length == 9) {
        event.target.disabled = true;

      }
    }, 500);
  }
  async getPerfiles() {
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();
    var auxper = [];
    this.regitroPublicacion.getpublicaciones().subscribe(
      (res) => {

        for (let aux of res) {

          if (aux.id_tipo_publicacion == 1) {
            auxper.push(aux);
          }
        }

        this.perfiles = auxper;
      },
      (err) => {

      }
    );
  }

  startAudio() {}
  stopAudio() {}
  mostrar(id: number) {

    if (this.datos.id_rol == 5) {
      this.router.navigate(['/tabs/detalle-perfil/', id]);
    } else {
      if (this.datos.id_rol == 4) {
        this.router.navigate(['/menu-principal/detalle-perfil/', id]);
      }
    }
  }
}
