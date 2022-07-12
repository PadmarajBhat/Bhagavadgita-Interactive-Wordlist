import { TestBed } from '@angular/core/testing';

import { FbaseService } from './fbase.service';

describe('FbaseService', () => {
  let service: FbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
