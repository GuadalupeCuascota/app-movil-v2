import { TestBed } from '@angular/core/testing';

import { RegistroTemaMateriaService } from './registro-tema-materia.service';

describe('RegistroTemaMateriaService', () => {
  let service: RegistroTemaMateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroTemaMateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
