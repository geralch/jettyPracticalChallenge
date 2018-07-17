import { TestBed, inject } from '@angular/core/testing';

import { HTTPCallsService } from './httpcalls.service';

describe('HTTPCallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HTTPCallsService]
    });
  });

  it('should be created', inject([HTTPCallsService], (service: HTTPCallsService) => {
    expect(service).toBeTruthy();
  }));
});
