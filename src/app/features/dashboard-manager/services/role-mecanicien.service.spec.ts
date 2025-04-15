import { TestBed } from '@angular/core/testing';

import { RoleMecanicienService } from './role-mecanicien.service';

describe('RoleMecanicienService', () => {
  let service: RoleMecanicienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleMecanicienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
