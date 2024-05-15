import { TestBed } from '@angular/core/testing';

import { SleeptrackerService } from './sleeptracker.service';

describe('SleeptrackerService', () => {
  let service: SleeptrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleeptrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
