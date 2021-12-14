import { TestBed } from '@angular/core/testing';

import { RegistroMateriaService } from './registro-materia.service';

describe('RegistroMateriaService', () => {
  let service: RegistroMateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroMateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
