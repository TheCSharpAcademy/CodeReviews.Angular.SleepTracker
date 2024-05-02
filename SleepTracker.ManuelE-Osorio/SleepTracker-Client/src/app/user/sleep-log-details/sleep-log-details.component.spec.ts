import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogDetailsComponent } from './sleep-log-details.component';

describe('SleepLogDetailsComponent', () => {
  let component: SleepLogDetailsComponent;
  let fixture: ComponentFixture<SleepLogDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
