import { TestBed } from '@angular/core/testing';

import { NiveauMecanicienService } from './niveau-mecanicien.service';

describe('NiveauMecanicienService', () => {
  let service: NiveauMecanicienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiveauMecanicienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
