import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroMentorias } from 'src/app/Models/registro-mentorias';
import { RegistroMentoriasService } from 'src/app/Services/registro-mentorias.service';
import { UsuarioService } from '../../../Services/usuario.service';
import * as moment from 'moment';
import { AlertController, NavController } from '@ionic/angular';
import { AgendarMentoria } from 'src/app/Models/agendarMentoria';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { AgendarMentoriaService } from 'src/app/Services/agendar-mentoria.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { RegistroCarrerasService } from 'src/app/Services/registro-carreras.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SolicitudMentoria } from 'src/app/Models/solicitudMentoria';
import { SolicitudMentoriaService } from 'src/app/Services/solicitud-mentoria.service';

import { Materia } from 'src/app/Models/materias';
import { RegistroMateriaService } from 'src/app/Services/registro-materia.service';
import { RegistroTemaMateriaService } from 'src/app/Services/registro-tema-materia.service';
import { NumberSymbol } from '@angular/common';
import { TemaMateria } from 'src/app/Models/temaMateria';
@Component({
  selector: 'app-registro-tutorias',
  templateUrl: './registro-tutorias.page.html',
  styleUrls: ['./registro-tutorias.page.scss'],
})
export class RegistroTutoriasPage implements OnInit {
  valueSelected: string = '1';
  registroMentorias: any[] = [];
  registroM: RegistroMentorias;
  usuariosM: any[] = [];
  materiasC: any[] = [];
  solicitudesEst: any[] = [];
  AnySolicitudes: any[] = [];
  solicitudM: SolicitudMentoria;
  datos: any = {};
  materias: Materia[] = [];

  localTime = moment().format();
  mensaje = '';
  agendarMentoria: AgendarMentoria = {
    id_registro_mentoria: 0,
    observacion: '',
    id_estado_agen_mentoria: 1,
    id_usuario: 0,
    fecha: '',
    nombre: '',
    apellido: '',
    hora_inicio: '',
    hora_fin: '',
  };

  tema: TemaMateria[] = [];
  id_registro_mentoria = 0;
  altert: boolean = false;
  formSolicitudM: FormGroup;
  formGroup: FormGroup;
  option_selected: string = '';
  estado: boolean;
  materia = '';
  constructor(
    private regitroMentoriasService: RegistroMentoriasService,
    private router: Router,
    private usuarioServices: UsuarioService,
    public alertController: AlertController,
    private mensajeServices: MensajesService,
    private regitroAgendarMentoriaService: AgendarMentoriaService,
    private loadinServices: LoadingService,
    private registroCarrera: RegistroCarrerasService,
    private formBuilder: FormBuilder,
    private solicitudMentoriaSerive: SolicitudMentoriaService,
    private navController: NavController,
    private registroMateria: RegistroMateriaService,
    private registroTemaMateria: RegistroTemaMateriaService
  ) {}

  ngOnInit() {
    this.doRefresh();
    this.getMaterias();
    this.getMentorasRegistro();
    // this.getRegistroMentorias();
    this.getSolicitudesMentoria();
    this.datos = JSON.parse(localStorage.getItem('payload'));
    console.log('DATOS', this.datos);
    // this.getMateriasCarrera();
    this.formSolicitudM = this.formBuilder.group({
      id_materia: new FormControl('', Validators.required),
      id_tema_materia: new FormControl('', Validators.required),
    });

    this.solicitudM = new SolicitudMentoria();

    this.formGroup = this.formBuilder.group({
      nombre_mentor: new FormControl('', Validators.required),
    });
  }
  segmenntChange(event: any) {
    this.valueSelected = event.detail.value;
    console.log(this.valueSelected);
  }

  async presentAlertSolicitudMentoria(id: number) {
    console.log('solicitud mentoria', id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar',

      message: '¿Esta seguro que desea eliminar esto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {
            console.log('Confirmar');
            this.deleteSolicitud(id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.getMentorasRegistro();
    this.getSolicitudesMentoria();
   
    if ($event) {
      $event.target.complete();
    }
  }

  loadData(event) {
    console.log(event, 'el evento');
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.registroMentorias.length == 9) {
        event.target.disabled = true;
      }
    }, 500);
  }

  buscarDisponibilidad() {
    const id = this.option_selected;

    this.option_selected;
    console.log('el id', this.option_selected);
    this.router.navigate(['agendar-mentoria/' + id]);
  }

  getMaterias() {
    var UsuMat = [];
    this.registroMateria.getMaterias().subscribe(
      (res) => {
        for (let mat of res) {
          
          if (this.datos.id_carrera == mat.id_carrera && mat.id_estado_materia== 1 ) {

            UsuMat.push(mat)
            this.materias = res;
            console.log('las materias es', res);
          }
          this.materias=UsuMat
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteSolicitud(id: number) {
    this.solicitudMentoriaSerive.deleteSolicitudMentoria(id).subscribe(
      (res) => {
        this.mensajeServices.presentToast('Solicitud eliminada');
        this.getSolicitudesMentoria();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMateriasCarrera() {
    this.registroCarrera.getMateriaEstudiante(this.datos.carrera).subscribe(
      (res) => {
        this.materiasC = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  selectRes(event: any) {
    console.log(event);
    this.option_selected = event.detail.value;
    console.log('la opcion', this.option_selected);
  }
  getMentorasRegistro() {

    var UsuMentoria = [];
    this.regitroMentoriasService.getMentorasRegistro().subscribe(
      (res) => {

        console.log("mentoras",res)
        for (let usu1 of res) {
          if (usu1.id_carrera == this.datos.id_carrera ||usu1.id_carrera==12) {
            UsuMentoria.push(usu1);
          }
        }

        if (UsuMentoria.length > 0) {
          this.registroMentorias = UsuMentoria;
        } else {
          this.mensaje = 'No existe mentorias disponibles';
          this.altert = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // getRegistroMentorias() {

  //   var UsuMentoria = [];
  //   this.regitroMentoriasService.getRegistroMentorias().subscribe(
  //     (res) => {
  //       console.log('las mentorias', res);
  //       for (let usu1 of res) {
  //         this.localTime = moment(usu1.fecha).format('DD/MM/YYYY');
  //         if (usu1.carrera == this.datos.carrera) {
  //           usu1.fecha = this.localTime;
  //           UsuMentoria.push(usu1);
  //         }
  //       }

  //       if (UsuMentoria.length > 0) {
  //         this.registroMentorias = UsuMentoria;
  //       } else {
  //         this.mensaje = 'No existe mentorias disponibles';
  //         this.altert = true;
  //       }

  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mentoria Seleccionada',

      message: '¿Decea confirmar la solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {
            console.log('Confirmar');
            this.detalle(this.registroM.id_registro_mentoria);
            this.getSolicitudesMentoria();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async getMentoria(id: number) {
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();
    console.log('id_registro_mentoria ', id);
    this.regitroMentoriasService.getRegistroMentoria(id).subscribe(
      (res) => {
        this.registroM = res;
        this.localTime = moment(this.registroM.fecha).format('DD/MM/YYYY');
        console.log('el registro', this.registroM);

        this.presentAlert();
      },
      () => {}
    );
  }
  async detalle(id: number) {
    console.log('id_registro_mentoria ', id);
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();
    this.datos = JSON.parse(localStorage.getItem('payload'));
    console.log(this.datos.id_usuario);
    console.log(id);
    this.agendarMentoria.id_registro_mentoria = id;
    this.agendarMentoria.id_usuario = this.datos.id_usuario;

    console.log('el registro', this.agendarMentoria);
    this.regitroAgendarMentoriaService
      .saveAgendarMentoria(this.agendarMentoria)
      .subscribe(
        (res) => {
          this.mensajeServices.presentToast('Mentoria Agendada correctamente');
          this.router.navigate(['/menu-opciones/tabs/home-superior']);
        },
        () => {
          loading.dismiss();
          this.mensajeServices.presentAlert(
            'Error',
            'Hubo un problema al guardar'
          );
        }
      );
    //  this.router.navigate(['/agendar-mentoria/',id]);
  }

  async saveSolicitudMentoria() {
    (this.solicitudM.id_materia =
      this.formSolicitudM.controls['id_materia'].value),
      (this.solicitudM.id_tema_materia =
        this.formSolicitudM.controls['id_tema_materia'].value),
      (this.solicitudM.id_usuario = this.datos.id_usuario);

    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();

    this.solicitudMentoriaSerive
      .saveSolicitudMentoria(this.solicitudM)
      .subscribe(
        (res) => {
          loading.dismiss();
          if (res) {
            this.getSolicitudesMentoria();
            this.mensajeServices.presentToast('Solicitud enviada');
          }
        },
        () => {
          loading.dismiss();
          this.mensajeServices.presentAlert(
            'Error',
            'Hubo un problema al guardar'
          );
        }
      );
  }
  async getSolicitudesMentoria() {
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();

    this.solicitudMentoriaSerive
      .getSolicitudMentoria(this.datos.id_usuario)
      .subscribe(
        (res: any) => {
          for (let aux of res) {
            this.solicitudesEst = res;
          }

          console.log('obtiene respuesta', res);
        },
        (err: any) => {
          this.solicitudesEst = this.AnySolicitudes;
          console.log('no obtiene respuesta', err);
        }
      );
  }

  async getTemaMateria(id: number) {
    console.log('id_registro_mentoria ', id);
    this.registroTemaMateria.getTemasMateria(id).subscribe(
      (res) => {
        this.tema = res;
        console.log('el tema segun la materia', this.tema);
      },
      (err) => {}
    );
  }

  public optionsFn(event) {
    console.log('EL EVENTO ES', event.target.value);
    const id = event.target.value;
    this.getTemaMateria(id);
  }
}
