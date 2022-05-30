import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IonSlides } from '@ionic/angular';
import { testAptitud } from 'src/app/Models/testAptitud';
import { testIng } from 'src/app/Models/testIng';
import { TestAptitudService } from 'src/app/Services/test-aptitud.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
interface ButtonStyle {
  fill: string;
  color: string;
}

@Component({
  selector: 'app-home-test-aptitud',
  templateUrl: './home-test-aptitud.page.html',
  styleUrls: ['./home-test-aptitud.page.scss'],
})
export class HomeTestAptitudPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  hasAnswered: boolean = false;
  hasAnswered1: boolean = false;
  datos: any = {};
  totalQuizz = 0;
  TestIng: testIng[] = [];

  ////////
  test: testAptitud[] = [];
  textil: number = 0;
  electricidad: number = 0;
  industrial: number = 0;
  software: number = 0;
  telecomunicaciones: number = 0;
  mecatronica: number = 0;
  automotriz: number = 0;
  constructor(
    private router: Router,
    private testAptitud: TestAptitudService,
    private so: ScreenOrientation,
  ) {}
  button1: ButtonStyle = {
    fill: 'outline',
    color: 'primary',
  };
  button2: ButtonStyle = {
    fill: 'outline',
    color: 'primary',
  };

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.datos=JSON.parse(localStorage.getItem('payload'));
    this.slides.slideTo(0, 100);
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);  // deshabilitar el deslizar si no responde una pregunta
    this.getTestAptitudIng();
    this.getTestAptitud();
  }
  getTestAptitudIng() {
    this.testAptitud.getTestIng().subscribe((res: any) => {
      this.TestIng = res;
    });
  }
  getTestAptitud() {
    this.testAptitud.gettest().subscribe((res: any) => {
      this.test = res;
    });
  }
  respondPollTest2(buttonSelect: number, question) {

    if (buttonSelect == 1) {
      if (question == '7') {
        this.textil = this.textil + 20;
      }
      if (question == '10') {
        this.automotriz = this.automotriz + 20;
      }
      if (question == '6') {
        this.industrial = this.industrial + 20;
      }
      if (question == '2') {
        this.mecatronica = this.mecatronica + 20;
      }
      if (question == '5') {
        this.software = this.software + 20;
      }
      if (question == '3') {
        this.telecomunicaciones = this.telecomunicaciones + 20;
      }
      if (question == '11') {
        this.electricidad = this.electricidad + 20;
      }
    }

    this.applyButtonSelectedStyle(buttonSelect);
    setTimeout(() => {
      this.hasAnswered = false;
      this.hasAnswered1=false;
      this.nextSlide();
    }, 500);
  }

  respondPoll(buttonSelect: number, question) {
    if (buttonSelect == 1) {
      this.totalQuizz = this.totalQuizz + 33;
    }
    this.applyButtonSelectedStyle(buttonSelect);
    setTimeout(() => {
      this.hasAnswered = false;
      this.hasAnswered1 = false;
      this.nextSlide();
    }, 500);

  }
  applyButtonSelectedStyle(buttonSelect: number) {
    switch (buttonSelect) {
      case 1:
        this.button1 = {
          fill: 'solid',
          color: 'primary',
        };
        this.hasAnswered = true;
        break;
      case 2:
        this.button2 = {
          fill: 'solid',
          color: 'primary',
        };
        this.hasAnswered1 = true;
        break;
    }
  }

  resetButtonStyles() {
    this.button1 = {
      fill: 'outline',
      color: 'primary',
    };
    this.button2 = {
      fill: 'outline',
      color: 'primary',
    };
  }

  regresar() {
    this.router.navigate(['menu-opciones-se/menu-principal/home-secundaria']);
  }
  testVocacional() {
    this.router.navigate(['/test-aptitud']);
  }
  nextSlide() {
    this.resetButtonStyles();
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
  }
  restartQuiz() {
    this.textil = 0;
    this.electricidad = 0;
    this.industrial = 0;
    this.software = 0;
    this.telecomunicaciones = 0;
    this.mecatronica = 0;
    this.automotriz = 0;
    this.totalQuizz = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 700);
    this.slides.lockSwipes(true);
  }

}
