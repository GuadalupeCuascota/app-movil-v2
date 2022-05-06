import { Component, OnInit ,ViewChild } from '@angular/core';
import { IonTabs, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {
  selectedTab: any;
  @ViewChild('tabs',{static: false}) tabs: IonTabs;

  constructor(private menuCtrl: MenuController,
    private router: Router,private so: ScreenOrientation,) { }
  datos: any = {};
  errorstatus: boolean = true;

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.datos=JSON.parse(localStorage.getItem('payload'));
    console.log("pasa aqui el usuario",this.datos)

  }
  setCurrentTab(){
    this.selectedTab=this.tabs.getSelected();
    console.log("ES",this.selectedTab)
  }

  openMenu(){

 this.datos=JSON.parse(localStorage.getItem('payload'));
 console.log("pasa aqui el usuario",this.datos)
 console.log("Openmenu ")


//  this.menuCtrl.enable(true);
 this.menuCtrl.toggle("first")


  }


}
