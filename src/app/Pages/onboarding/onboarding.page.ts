import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
@ViewChild(IonSlides) slides:IonSlides
  constructor(private router: Router,private so: ScreenOrientation) { }

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);

  }

  next(){
this.slides.slideNext();
this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
  }
  skip(){
    this.slides.slideTo(200, 0);
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
  }
  iniciarSesion(){
    this.router.navigate(['/login']);
  }
  registrarse(){
    this.router.navigate(['/registro-usuario']);
  }
  lockToPortrait(){
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
  }
}
