import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../Services/autenticacion.service';
import { Usuario } from '../../Models/usuario';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MensajesService } from 'src/app/Services/mensajes.service';

import {StorageService}from '../../Services/storage.service'
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/Services/loading.service';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordIcon = 'eye-off';
  formLogin: FormGroup;
  resp: any = {};
  errorstatus: boolean = true;

  constructor(
    private authServices: AutenticacionService,
    private formBuilder:FormBuilder,
    private mensajeServices: MensajesService,
    public storage: Storage,
    private so: ScreenOrientation,
    // private storage:StorageService,
    private router: Router,

    private loadinServices: LoadingService,
    private menuCtrl: MenuController,
    private platform: Platform,
    private inAppBrowser: InAppBrowser,
    private appAvailability: AppAvailability,


  ) {}
  usuario: Usuario;

  async ngOnInit() {

    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.formLogin=this.formBuilder.group({
      correo_electronico: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required),
    })

    this.usuario = new Usuario();

  }

  toggleShow(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordIcon == 'eye-off') {
      this.passwordIcon = 'eye';
    } else {
      this.passwordIcon = 'eye-off';
    }
  }

 async login() {
    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();
    this.usuario.correo_electronico = this.formLogin.controls['correo_electronico'].value;
    this.usuario.contrasenia = this.formLogin.controls['contrasenia'].value;

    this.authServices.login(this.usuario).subscribe(
      async (res) => {
        if (res) {
          this.resp = res;

          // await this.storage.create();
          // await this.storage.set("Token", this.resp.Token);
          // await this.storage.set('payload',JSON.stringify(this.resp.payload))

          localStorage.setItem('Token',this.resp.Token)
          localStorage.setItem('payload',JSON.stringify(this.resp.payload))

          const id_rol = this.resp.payload.id_rol;
          const nivel_academico = this.resp.payload.nivel_academico;
          if (id_rol == 4 ){
            console.log("estudiante secundaria")
            this.router.navigate(['/menu-opciones-se/menu-principal']);

          }
            if (id_rol == 5){
              console.log("pasa aqui estudiante superior")
              this.router.navigate(['/menu-opciones/tabs']);
          }


        }
      },
      (err) => {

        this.mensajeServices.presentAlert('Error', err.error.text)
      }
    );
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

}
