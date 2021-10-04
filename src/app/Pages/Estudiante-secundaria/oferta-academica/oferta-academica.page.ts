import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/Models/publicacion';
import { Carreras } from 'src/app/Models/carreras-fica';
import { RegistroPublicacionService } from '../../../Services/registro-publicacion.service';
import { RegistroCarrerasService } from 'src/app/Services/registro-carreras.service';

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
  constructor(
    private resgitroPublicacion: RegistroPublicacionService,
    private actRoute: ActivatedRoute, // recibir parametros en la ruta,
    private registroCarreras: RegistroCarrerasService
  ) {}

  ngOnInit() {
    const params = this.actRoute.snapshot.params;
    this.id = params.id;
    this.Carrera=params.nombre_carrera;
    console.log('el id es', this.id);
    this.datos = JSON.parse(localStorage.getItem('payload'));
    // this.getPublicacionesCarrera();
    
    this.getPublicacionesCarrera();
  }
  // getCarrera() {
  //   this.registroCarreras.getCarrera(this.id).subscribe((res) => {
      
  //     console.log('la res', res);
  //   });
  // }
  
  getPublicacionesCarrera() {
    console.log('pasa c');
    this.resgitroPublicacion
      .getPublicacionesCarrera(this.id)
      .subscribe((res: any) => {
        console.log(res);

        for (let n of res) {
          this.Carrera = n.nombre_carrera;
          console.log('la carrera', this.Carrera);
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

  //   loadData(event) {
  //     console.log(event,"el evento")
  //    setTimeout(() => {
  //      console.log('Done');
  //      event.target.complete();

  //      if (this.ofertaAcademica.length ==9) {
  //        event.target.disabled = true;
  //        console.log("es igual")
  //      }
  //    }, 500);
  //  }
}
