import { TestBed } from '@angular/core/testing';

import { SleepHttpService } from './sleep-http.service';

describe('SleepHttpService', () => {
  let service: SleepHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
