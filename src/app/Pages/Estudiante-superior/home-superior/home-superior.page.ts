import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home-superior',
  templateUrl: './home-superior.page.html',
  styleUrls: ['./home-superior.page.scss'],
})
export class HomeSuperiorPage implements OnInit {

  datos: any = {};
  constructor(public storage: Storage) { }

  ngOnInit() {
    this.datos=JSON.parse(localStorage.getItem('payload'));
    console.log("hola estudiante secundaria",this.datos)
  }
}
