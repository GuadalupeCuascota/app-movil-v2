import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoadingService } from 'src/app/Services/loading.service';
import {AutenticacionService} from '../../../Services/autenticacion.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-menu-opciones-se',
  templateUrl: './menu-opciones-se.page.html',
  styleUrls: ['./menu-opciones-se.page.scss'],
})
export class MenuOpcionesSePage implements OnInit {
  datos: any = {};
  constructor(private autenticacion:AutenticacionService,public menuCtrl: MenuController,
    private loadinServices: LoadingService,private so: ScreenOrientation,) { }

  ngOnInit() {

    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.datos=JSON.parse(localStorage.getItem('payload'));

  }
  async logout(){
    const loading = await this.loadinServices.presentLoading("Cargando...");
    await loading.present();
    this.autenticacion.logOut();
  }


}
