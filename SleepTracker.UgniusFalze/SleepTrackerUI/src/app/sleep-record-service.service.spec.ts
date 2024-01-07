import { TestBed } from '@angular/core/testing';

import { SleepRecordServiceService } from './sleep-record-service.service';

describe('SleepRecordServiceService', () => {
  let service: SleepRecordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepRecordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
