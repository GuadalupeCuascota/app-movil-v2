import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { testIng } from 'src/app/Models/testIng';
import { TestAptitudService } from 'src/app/Services/test-aptitud.service';
interface ButtonStyle {
  fill: string;
  color: string;
}
@Component({
  selector: 'app-test-ing',
  templateUrl: './test-ing.page.html',
  styleUrls: ['./test-ing.page.scss'],
})
export class TestIngPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  TestIng: testIng[] = [];
  constructor(private testAptitud: TestAptitudService) { }

  ngOnInit() {
    this.getTestAptitudIng();
  }
  getTestAptitudIng() {
    console.log('pasa test');
    this.testAptitud.getTestIng().subscribe((res: any) => {
      console.log(res);
      this.TestIng = res;
    });
  }
  nextSlide() {
    // this.resetButtonStyles();
    // this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    // this.slides.lockSwipeToNext(true);
   
  }

}
