import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogsListComponent } from './sleep-logs-list.component';

describe('SleepLogsListComponent', () => {
  let component: SleepLogsListComponent;
  let fixture: ComponentFixture<SleepLogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepLogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
