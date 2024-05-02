import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogCreateAdminComponent } from './sleep-log-create-admin.component';

describe('SleepLogCreateAdminComponent', () => {
  let component: SleepLogCreateAdminComponent;
  let fixture: ComponentFixture<SleepLogCreateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogCreateAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepLogCreateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
