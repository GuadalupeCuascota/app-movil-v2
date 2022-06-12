import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import {
  StreamingMedia,
  StreamingVideoOptions,

} from '@ionic-native/streaming-media/ngx';

import { Carreras } from 'src/app/Models/carreras-fica';
import { RegistroCarrerasService } from '../../../Services/registro-carreras.service';
@Component({
  selector: 'app-carreras-fica',
  templateUrl: './carreras-fica.page.html',
  styleUrls: ['./carreras-fica.page.scss'],
})
export class CarrerasFicaPage implements OnInit {
  carreras: Carreras[] = [];
  textoBuscar = '';
  tipoarchivo=false;
  isLoaded=false;
  carrera: Carreras;
  datos: any = {};
  constructor(private registroCarreras: RegistroCarrerasService, private streamingMedia: StreamingMedia,private so: ScreenOrientation) { }

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.datos=JSON.parse(localStorage.getItem('payload'));
    this.getCarreras();
    this.doRefresh();
  }
  buscar(event) {
    this.textoBuscar = event.detail.value;

  }
  loadData(event) {
    setTimeout(() => {

      event.target.complete();

      if (this.carreras.length == 9) {
        event.target.disabled = true;
      }
    }, 500);
  }
  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.getCarreras();
    if ($event) {
      $event.target.complete();
    }
  }

 async playVideo(url:any) {
    var options:StreamingVideoOptions = {
      successCallback: () => {

      },
      errorCallback: (e) => {

      },
      orientation: 'portrait', //fuerza una orientacion del video
      controls: true, //el video debe tener controles
      shouldAutoClose: true, //cierra el video despues de que termine
    };

    this.streamingMedia.playVideo('http://192.168.100.10:3000/' + url, options);
  }

  stopPlayingVideo() {
    this.streamingMedia.pauseAudio();
  }




  getCarreras() {
    var auxper = [];
    this.registroCarreras.getCarreras().subscribe(
      (res) => {
        for (let aux of res) {
          if (aux.id_carrera != 1 && aux.id_carrera!=12) {
            auxper.push(aux);
          }
        }
        this.carreras =auxper;

        this.isLoaded=true;

      },
      (err) => {

      }
    );
  }

  startAudio() {}
  stopAudio() {}
}
