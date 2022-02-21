import { Component, OnInit, ViewChild } from '@angular/core';
import { TestAptitudService } from '../../../Services/test-aptitud.service';
import { testAptitud } from 'src/app/Models/testAptitud';
import { IonSlides } from '@ionic/angular';
interface ButtonStyle {
  fill: string;
  color: string;
}
@Component({
  selector: 'app-test-aptitud',
  templateUrl: './test-aptitud.page.html',
  styleUrls: ['./test-aptitud.page.scss'],
})
export class TestAptitudPage implements OnInit {
  // @ViewChild('slides') slides: any;
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  hasAnswered: boolean = false;
  textil: number = 0;
  electricidad: number = 0;
  industrial: number = 0;
  software: number = 0;
  telecomunicaciones: number = 0;
  mecatronica: number = 0;
  automotriz: number = 0;
  test: testAptitud[] = [];
  const = 0;
  si = 20;
  carrera={
    nombre_carrera:'',
    puntos:0,
  }

  constructor(private testAptitud: TestAptitudService) {}

  button1: ButtonStyle = {
    fill: 'outline',
    color: 'secondary',
  };
  button2: ButtonStyle = {
    fill: 'outline',
    color: 'secondary',
  };

  ngOnInit() {
    this.slides.slideTo(0, 100);
    this.slides.lockSwipeToNext(true);
    //deshabilitar el deslizar si no responde una pregunta
    this.getTestAptitud();
    // this.test = this.testAptitud.getTest();
    // console.log('test:', this.test);
  }

  public optionsFn(event) {
    //here item is an object
    console.log(event);
  }
  resetButtonStyles() {
    this.button1 = {
      fill: 'outline',
      color: 'secondary',
    };
    this.button2 = {
      fill: 'outline',
      color: 'secondary',
    };
  }
  applyButtonSelectedStyle(buttonSelect: number) {
    switch (buttonSelect) {
      case 1:
        this.button1 = {
          fill: 'solid',
          color: 'primary',
        };

        break;
      case 2:
        this.button2 = {
          fill: 'solid',
          color: 'primary',
        };

        break;
    }
  }
  respondPoll(buttonSelect: number, question) {
  this.hasAnswered = true;
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
      this.nextSlide();
    }, 1200);
  }
  restartQuiz() {
    this.textil = 0;
  this.electricidad= 0;
  this.industrial= 0;
  this.software= 0;
  this.telecomunicaciones= 0;
  this.mecatronica= 0;
  this.automotriz= 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 700);
    this.slides.lockSwipes(true);
}
 
  resultado(){
   
  }

  getTestAptitud() {
    console.log('pasa test');
    this.testAptitud.gettest().subscribe((res: any) => {
      console.log(res);
      this.test = res;
    });
  }
  siguiente() {
    console.log(this.test.length);
    this.const = this.const + 1;
    if (this.const < this.test.length) {
    }
  }
  nextSlide() {
    this.resetButtonStyles();
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
   
  }
}
