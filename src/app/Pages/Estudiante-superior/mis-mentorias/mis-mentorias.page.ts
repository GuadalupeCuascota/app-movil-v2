import { Component, OnInit } from '@angular/core';
import { AgendarMentoria } from 'src/app/Models/agendarMentoria';
import { AgendarMentoriaService } from 'src/app/Services/agendar-mentoria.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-mis-mentorias',
  templateUrl: './mis-mentorias.page.html',
  styleUrls: ['./mis-mentorias.page.scss'],
})
export class MisMentoriasPage implements OnInit {

  mentoriasAgendadas:any[] = [];
  constructor(private regitroAgendarMentoriaService: AgendarMentoriaService, private alertController: AlertController, private mensajeServices: MensajesService,private so: ScreenOrientation,) {}
  datos: any = {};
  datosM: any = {
    id_estado_agen_mentoria: 3,
    id_usuario: 0,
    id_registro_mentoria:0
  };
  localTime = moment().format();
  // time1 = moment().format('h:mm a');
  // time = moment().format('h:mm a');
  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.getAgedamiento();
    this.datos = JSON.parse(localStorage.getItem('payload'));


  }
  doRefresh($event?: any) {
    //envia un evento opcional de tipo any
    this.getAgedamiento();
    if ($event) {
      $event.target.complete();
    }
  }

  getAgedamiento(){


    var UsuMentoria = [];
    this.regitroAgendarMentoriaService.getAgendarMentorias().subscribe(
      (res) => {



        for (let aux of res) {

          if (aux.id_usuario == this.datos.id_usuario && aux.id_estado_agen_mentoria==1)
           {

            this.localTime = moment(aux.fecha).format('DD/MM/YYYY');
            aux.fecha=this.localTime;

            UsuMentoria.push(aux);




          }
        }
        this.mentoriasAgendadas = UsuMentoria;

      },
      (err) => {

      }
    );
  }
  async presentAlert(id,id_registro_mentoria) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Anular solicitud de agendamiento',

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

            this.cancelarAgendamiento(id,id_registro_mentoria)
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }
  cancelarAgendamiento(id:number, id_registro_mentoria:number){

    this.datosM.id_registro_mentoria=id_registro_mentoria
    this.datosM.id_usuario=this.datos.id_usuario

    this.regitroAgendarMentoriaService.cancelarMentoria(id,this.datosM).subscribe(
      (res) => {
        this.mensajeServices.presentToast('Mentoria anulada correctamente');
        this.getAgedamiento();

      },
      (err)=>{

      this.mensajeServices.presentAlert('',err.error.text)
      }

    )

  }


  deleteAgendamiento(id:number,){
    this.regitroAgendarMentoriaService.deleteAgendarMentoria(id).subscribe(
      (res) => {
        this.mensajeServices.presentToast('Mentoria anulada correctamente');
        this.getAgedamiento();

      },
      (err)=>{

      }
    )

  }
}
