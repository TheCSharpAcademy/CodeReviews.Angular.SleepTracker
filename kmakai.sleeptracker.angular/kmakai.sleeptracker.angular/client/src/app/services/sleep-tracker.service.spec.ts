import { TestBed } from '@angular/core/testing';

import { SleepTrackerService } from './sleep-tracker.service';

describe('SleepTrackerService', () => {
  let service: SleepTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
