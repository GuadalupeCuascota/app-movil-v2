import { Component, OnInit } from '@angular/core';
import { AgendarMentoriaService } from 'src/app/Services/agendar-mentoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { LoadingService } from 'src/app/Services/loading.service';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { AgendarMentoria } from 'src/app/Models/agendarMentoria';
import { AlertController, NavController } from '@ionic/angular';
import { RegistroMentoriasService } from 'src/app/Services/registro-mentorias.service';
import { RegistroMentorias } from 'src/app/Models/registro-mentorias';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-agendar-mentoria',
  templateUrl: './agendar-mentoria.page.html',
  styleUrls: ['./agendar-mentoria.page.scss'],
})
export class AgendarMentoriaPage implements OnInit {
  datos: any = {};
  registroM: RegistroMentorias;
  Horarios: any[] = [];
  localTime = moment().utc().format('DD/MM/YYYY');
  datosM: any = {
    id_estado_mentoria: 2,
  };
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
  params = this.actRoute.snapshot.params.id;
  constructor(
    private actRoute: ActivatedRoute,
    private mensajeServices: MensajesService,
    private loadinServices: LoadingService,
    private router: Router,
    private navController: NavController,
    private regitroMentoriasService: RegistroMentoriasService,
    private regitroAgendarMentoriaService: AgendarMentoriaService,
    public alertController: AlertController,
    private so: ScreenOrientation
  ) {}

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.buscarHorario();
    this.datos = JSON.parse(localStorage.getItem('payload'));
  }
  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.buscarHorario();
    if ($event) {
      $event.target.complete();
    }
  }
  async buscarHorario() {
    var f;
    var RegistroHorario = [];
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();
    this.regitroMentoriasService
      .getRegistrohorarioMentoria(this.params)
      .subscribe(
        (res: any) => {
          for (let horario of res) {
            if (
              horario.id_estado_mentoria == 1 ||
              horario.id_estado_mentoria == 2
            ) {
              this.localTime = moment(horario.fecha).format('DD/MM/YYYY');
              horario.fecha = this.localTime;

              var hInicio = horario.hora_inicio;
              var hFin = horario.hora_fin;
              var elem = hInicio.split(':');
              var elem1= hFin.split(':');
              var h = elem[0];
              var hF = elem1[0];
              if (h >= 12) {
               horario.hora_inicio=hInicio+" PM"

              } else {
                horario.hora_inicio=hInicio+" AM"
              }
              if (hF >= 12) {
                horario.hora_fin=hFin+" PM"

               } else {
                 horario.hora_fin=hFin+" AM"
               }

              RegistroHorario.push(horario);
            }
          }

          this.Horarios = RegistroHorario;
        },
        (err) => {

        }
      );
  }
  async getMentoria(id: number) {

    this.regitroMentoriasService.getRegistroMentoria(id).subscribe(
      (res) => {
        this.registroM = res;
        this.localTime = moment(this.registroM.fecha).format('DD/MM/YYYY');

        this.presentAlert();
      },
      () => {}
    );
  }
  async presentAlert() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mentoria Seleccionada',
      subHeader:
        'Una vez confirmada la solicitud solo podra cancelar hasta antes de 1 hora de la hora seleccionada ',
      message: '¿Decea confir mar la solicitud?',
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
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
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
          this.regitroAgendarMentoriaService
            .updateEstadoAgendarMentoria(id, this.datosM)
            .subscribe((res) => {

            });
          this.router.navigate(['/menu-opciones/tabs/home-superior']);
        },
        (err) => {
          loading.dismiss();
          this.mensajeServices.presentAlert(
            'Error',
            'La mentoria ya ha sido agendada!!'
          );
        }
      );
    //  this.router.navigate(['/agendar-mentoria/',id]);
  }
  updateEstadoRegistroMentoria() {}
}
