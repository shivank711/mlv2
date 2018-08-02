import { TestBed, inject } from '@angular/core/testing';

import { DataprepService } from './dataprep.service';

describe('DataprepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataprepService]
    });
  });

  it('should be created', inject([DataprepService], (service: DataprepService) => {
    expect(service).toBeTruthy();
  }));
});
