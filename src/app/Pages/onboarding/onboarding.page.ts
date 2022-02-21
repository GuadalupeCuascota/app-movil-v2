import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
@ViewChild(IonSlides) slides:IonSlides
  constructor(private router: Router) { }

  ngOnInit() {

  }

  next(){
this.slides.slideNext();
  }
  skip(){
    this.slides.slideTo(200, 0);
    // this.slides.slidePrev();
  }
  iniciarSesion(){
    this.router.navigate(['/login']);
  }
  registrarse(){
    this.router.navigate(['/registro-usuario']);
  }
}
