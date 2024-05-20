import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogDetailsAdminComponent } from './sleep-log-details-admin.component';

describe('SleepLogDetailsAdminComponent', () => {
  let component: SleepLogDetailsAdminComponent;
  let fixture: ComponentFixture<SleepLogDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogDetailsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepLogDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
