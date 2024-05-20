import { TestBed } from '@angular/core/testing';

import { SleepLogSessionService } from './sleep-log-session.service';

describe('SleepLogSessionService', () => {
  let service: SleepLogSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepLogSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
