import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleOfertaAcademicaPage } from './detalle-oferta-academica.page';

describe('DetalleOfertaAcademicaPage', () => {
  let component: DetalleOfertaAcademicaPage;
  let fixture: ComponentFixture<DetalleOfertaAcademicaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleOfertaAcademicaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleOfertaAcademicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
