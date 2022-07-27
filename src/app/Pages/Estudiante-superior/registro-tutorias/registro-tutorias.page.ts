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
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
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
    private registroTemaMateria: RegistroTemaMateriaService,
    private so: ScreenOrientation,
  ) {}

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.doRefresh();
    this.getMaterias();
    this.getMentorasRegistro();
    this.getSolicitudesMentoria();
    this.datos = JSON.parse(localStorage.getItem('payload'));
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

  }

  async presentAlertSolicitudMentoria(id: number) {

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

          },
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {

            this.deleteSolicitud(id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
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

    setTimeout(() => {

      event.target.complete();
      if (this.registroMentorias.length == 9) {
        event.target.disabled = true;
      }
    }, 500);
  }

  buscarDisponibilidad() {
    const id = this.option_selected;
    this.option_selected;

    this.router.navigate(['/tabs/agendar-mentoria/' + id]);

  }

  getMaterias() {  ///obtener materias disponibles a ser agendadas
    var UsuMat = [];
    this.registroMateria.getMaterias().subscribe(
      (res) => {
        for (let mat of res) {

          // if (this.datos.id_carrera == mat.id_carrera && mat.id_estado_materia== 1 ) {
            if (mat.id_estado_materia== 1 ) {
            UsuMat.push(mat)
            this.materias = res;
          }
          this.materias=UsuMat
        }
      },
      (err) => {

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

      }
    );
  }

  getMateriasCarrera() {
    this.registroCarrera.getMateriaEstudiante(this.datos.carrera).subscribe(
      (res) => {
        this.materiasC = res;
      },
      (err) => {

      }
    );
  }
  selectRes(event: any) {

    this.option_selected = event.detail.value;

  }
  getMentorasRegistro() {

    var UsuMentoria = [];
    this.regitroMentoriasService.getMentorasRegistro().subscribe(
      (res) => {

        for (let usu1 of res) {
          // if (usu1.id_carrera == this.datos.id_carrera ||usu1.id_carrera==12) {
            UsuMentoria.push(usu1);

        }
        if (UsuMentoria.length > 0) {
          this.registroMentorias = UsuMentoria;
        } else {
          this.mensaje = 'No existe mentorias disponibles';
          this.altert = true;
        }
      },
      (err) => {

      }
    );
  }

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

          },
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {

            this.detalle(this.registroM.id_registro_mentoria);
            this.getSolicitudesMentoria();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }

  async getMentoria(id: number) {
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();

    this.regitroMentoriasService.getRegistroMentoria(id).subscribe(
      (res) => {
        this.registroM = res;
        this.localTime = moment(this.registroM.fecha).format('DD/MM/YYYY');
        this.presentAlert();
      },
      () => {}
    );
  }
  async detalle(id: number) {

    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.agendarMentoria.id_registro_mentoria = id;
    this.agendarMentoria.id_usuario = this.datos.id_usuario;
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
        },
        (err: any) => {
          this.solicitudesEst = this.AnySolicitudes;

        }
      );
  }

  async getTemaMateria(id: number) {

    this.registroTemaMateria.getTemasMateria(id).subscribe(
      (res) => {
        this.tema = res;

      },
      (err) => {}
    );
  }

  public optionsFn(event) {

    const id = event.target.value;
    this.getTemaMateria(id);
  }
}
