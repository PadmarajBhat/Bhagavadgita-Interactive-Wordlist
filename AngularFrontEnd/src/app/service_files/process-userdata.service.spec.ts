import { TestBed } from '@angular/core/testing';

import { ProcessUserdataService } from './process-userdata.service';

describe('ProcessUserdataService', () => {
  let service: ProcessUserdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessUserdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
