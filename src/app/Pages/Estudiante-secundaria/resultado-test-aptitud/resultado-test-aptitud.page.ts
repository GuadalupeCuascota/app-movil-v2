import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-resultado-test-aptitud',
  templateUrl: './resultado-test-aptitud.page.html',
  styleUrls: ['./resultado-test-aptitud.page.scss'],
})
export class ResultadoTestAptitudPage implements OnInit {

  constructor(private so: ScreenOrientation,) { }

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
  }

}
