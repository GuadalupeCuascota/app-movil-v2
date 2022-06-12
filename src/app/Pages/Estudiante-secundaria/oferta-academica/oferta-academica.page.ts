import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacion } from 'src/app/Models/publicacion';
import { Carreras } from 'src/app/Models/carreras-fica';
import { RegistroPublicacionService } from '../../../Services/registro-publicacion.service';
import { RegistroCarrerasService } from 'src/app/Services/registro-carreras.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-oferta-academica',
  templateUrl: './oferta-academica.page.html',
  styleUrls: ['./oferta-academica.page.scss'],
})
export class OfertaAcademicaPage implements OnInit {
  Carrera = '';
  ofertaAcademica: Publicacion | any = [];
  carrera:Carreras
  datos: any = {};
  id = 0;
  valueSelected: string = 'noticias';
  constructor(
    private resgitroPublicacion: RegistroPublicacionService,
    private actRoute: ActivatedRoute, // recibir parametros en la ruta,
    private router: Router,
    private registroCarreras: RegistroCarrerasService,
    private so: ScreenOrientation,
  ) {}

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    const params = this.actRoute.snapshot.params;
    this.id = params.id;
    this.Carrera=params.nombre_carrera;

    this.datos = JSON.parse(localStorage.getItem('payload'));
    // this.getPublicacionesCarrera();

    this.getPublicacionesCarrera();
  }


  segmenntChange(event: any) {
    this.valueSelected = event.detail.value;

  }
  getPublicacionesCarrera() {

    this.resgitroPublicacion
      .getPublicacionesCarrera(this.id)
      .subscribe((res: any) => {


        for (let n of res) {
          this.Carrera = n.nombre_carrera;

        }
        this.ofertaAcademica = res;
      });
  }
  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.getPublicacionesCarrera();
    if ($event) {
      $event.target.complete();
    }
  }
  detalle(id: number) {

    this.router.navigate(['/menu-principal/detalle-oferta-academica/', id]);
  }


}
