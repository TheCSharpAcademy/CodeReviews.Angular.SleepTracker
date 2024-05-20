import { TestBed } from '@angular/core/testing';

import { SleepLogsService } from './sleep-logs.service';

describe('SleepLogsService', () => {
  let service: SleepLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
