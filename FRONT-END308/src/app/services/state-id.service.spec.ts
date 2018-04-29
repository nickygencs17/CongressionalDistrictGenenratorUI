import { inject, TestBed } from '@angular/core/testing';

import { StateIdService } from './state-id.service';

describe('StateIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateIdService]
    });
  });

  it('should be created', inject([StateIdService], (service: StateIdService) => {
    expect(service).toBeTruthy();
  }));
});
