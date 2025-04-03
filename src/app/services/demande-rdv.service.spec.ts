import { TestBed } from '@angular/core/testing';

import { DemandeRdvService } from './demande-rdv.service';

describe('DemandeRdvService', () => {
  let service: DemandeRdvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeRdvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
