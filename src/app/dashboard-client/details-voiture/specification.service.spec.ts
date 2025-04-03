import { TestBed } from '@angular/core/testing';

import { SpecificationService } from '../../services/specification.service';

describe('SpecificationService', () => {
  let service: SpecificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
