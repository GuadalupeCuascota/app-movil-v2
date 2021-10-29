import { Component, OnInit, ViewChild } from '@angular/core';
import { TestAptitudService } from '../../../Services/test-aptitud.service';
import { testAptitud } from 'src/app/Models/testAptitud';
@Component({
  selector: 'app-test-aptitud',
  templateUrl: './test-aptitud.page.html',
  styleUrls: ['./test-aptitud.page.scss'],
})
export class TestAptitudPage implements OnInit {
  @ViewChild('slides') slides: any;
  test: testAptitud[] = [];

  option_selected: 0;
  sumT = 0;
  testCarrera = '';
  const = 0;
  constElec = 0;
  pregunta: testAptitud[] = [];

  opciones = [
    {
      opcion: '',
    },
  ];
  preguntas = '';

  constructor(private testAptitud: TestAptitudService) {}

  ngOnInit() {
    console.log('pasa test aptitud');
    // this.getTestAptitud();
    this.test = this.testAptitud.getTest();
    console.log('test:', this.test);
  }

  // selectRes(event: any) {
  //   console.log(event);
  //   this.option_selected = event.detail.value

  //   console.log(this.sumT=this.sumT+1)

  // }
  hasAnswered: boolean = false;
  textil: number = 0;
  electricidad:number = 0;
  industrial:number = 0;
  software:number = 0;
  telecomunicaciones:number = 0;
  mecatronica:number = 0;
  automotriz:number = 0;
  selectAnswer(answer, question) {

 console.log("el tamaño",this.test.length)
  //  for(let i=0;this.test.length; i++){
    if (question == 'Textil') {  
      this.textil = this.textil + answer.puntos;
     
    }
    if(question == 'Automotriz'){
      this.automotriz=this.automotriz+answer.puntos;
      
    }
    if(question == 'Industrial'){
      this.industrial=this.industrial+answer.puntos;
      
    if(question == 'Mecatrónica'){
      this.mecatronica=this.mecatronica+answer.puntos;
      
    }
    if(question == 'Software'){
      this.software=this.software+answer.puntos;
      
    }
    if(question == 'Telecomunicaciones'){
      this.telecomunicaciones=this.telecomunicaciones+answer.puntos;
      
    }
    if(question == 'Electricidad'){
      this.electricidad=this.electricidad+answer.puntos;
      
    }
   }
   
  // } 
  console.log('los puntos', this.textil);

  console.log('los puntos', this.automotriz);
  console.log('los puntos', this.industrial);
  console.log('los puntos', this.mecatronica);
  console.log('los puntos', this.software);
  console.log('los puntos', this.telecomunicaciones);
  console.log('los puntos', this.electricidad);
  }
  // getTestAptitud() {
  //   var con = [];
  //   console.log('pasa test');
  //   this.testAptitud.gettest().subscribe((res: any) => {
  //     for (let c of res) {
  //       const op = c.opcion;

  //       let opciones = {
  //         opcion: op,
  //       };
  //       con.push(opciones);
  //     }
  //     this.opciones = con;
  //     console.log('op', this.opciones);
  //     this.pregunta = res;
  //     console.log('las opciones', this.pregunta);
  //   });
  // }
  siguiente() {
    console.log(this.test.length);
    this.const = this.const + 1;
    if (this.const < this.test.length) {
    }
  }
  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
}
