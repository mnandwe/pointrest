import { TestBed } from '@angular/core/testing';

import { MarkedpointService } from './markedpoint.service';

describe('MarkedpointService', () => {
  let service: MarkedpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkedpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
