import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogsListAdminComponent } from './sleep-logs-list-admin.component';

describe('SleepLogsListAdminComponent', () => {
  let component: SleepLogsListAdminComponent;
  let fixture: ComponentFixture<SleepLogsListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogsListAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepLogsListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
