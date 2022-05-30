import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home-secundaria',
  templateUrl: './home-secundaria.page.html',
  styleUrls: ['./home-secundaria.page.scss'],
})
export class HomeSecundariaPage implements OnInit {
  datos: any = {};
  constructor(private so: ScreenOrientation,) { }

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.datos=JSON.parse(localStorage.getItem('payload'));
  }

}
