import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home-superior',
  templateUrl: './home-superior.page.html',
  styleUrls: ['./home-superior.page.scss'],
})
export class HomeSuperiorPage implements OnInit {

  datos: any = {};
  constructor(public storage: Storage,private so: ScreenOrientation,) { }

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.datos=JSON.parse(localStorage.getItem('payload'));

  }
}
