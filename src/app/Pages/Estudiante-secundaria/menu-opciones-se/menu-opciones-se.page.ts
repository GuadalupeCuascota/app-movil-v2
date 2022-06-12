import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { LoadingService } from 'src/app/Services/loading.service';
import {AutenticacionService} from '../../../Services/autenticacion.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-menu-opciones-se',
  templateUrl: './menu-opciones-se.page.html',
  styleUrls: ['./menu-opciones-se.page.scss'],
})
export class MenuOpcionesSePage implements OnInit {
  datos: any = {};
  constructor(private autenticacion:AutenticacionService,public menuCtrl: MenuController,
    private loadinServices: LoadingService,private so: ScreenOrientation,public alertController: AlertController,private platform: Platform,private appAvailability: AppAvailability, private inAppBrowser: InAppBrowser) { }

  ngOnInit() {

    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.datos=JSON.parse(localStorage.getItem('payload'));

  }
  async logout(){
    this.presentAlert();
  }
  async presentAlert() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrando sesión',

      message: '¿Está seguro que desea cerrar sesión?',
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
          handler: async () => {

            const loading = await this.loadinServices.presentLoading("Cargando...");
            await loading.present();
            this.autenticacion.logOut();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }
  socialMedia(type) {
    switch (type) {
      case 'FACEBOOK': {
        this.openFacebook('FICA-STEM-542882706252025', 'https://www.facebook.com/FICA-STEM-542882706252025/');
        break;
      }

      case 'TWITTER': {
        this.openTwitter('StemFica');
        break;
      }

    }
  }
  openInApp(url) {
    this.inAppBrowser.create(url, '_system')
  }
  openFacebook(name, url) {
    let app;
    if (this.platform.is('ios')) {
      app = 'fb://';
    } else if (this.platform.is('android')) {
      app = 'com.facebook.katana';
    } else {
      this.openInApp('https://www.facebook.com/' + name);
      return;
    }
    this.appAvailability.check(app)
      .then(res => {

        const fbUrl = 'fb://facewebmodal/f?href=' + url;
        this.openInApp(fbUrl);
      }
      ).catch(() => {
        this.openInApp('https://www.facebook.com/' + name);
      });
  }
  openTwitter(name) {
    let app;
    if (this.platform.is('ios')) {
      app = 'twitter://';
    } else if (this.platform.is('android')) {
      app = 'com.twitter.android';
    } else {
      this.openInApp('https://twitter.com/' + name);
      return;
    }
    this.appAvailability.check(app)
      .then((res) => {
        const data = 'twitter://user?screen_name=' + name;
        this.openInApp(data);
      }
      ).catch(err => {
        this.openInApp('https://twitter.com/' + name);
});
  }


}
