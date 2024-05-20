import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogCreateComponent } from './sleep-log-create.component';

describe('SleepLogCreateComponent', () => {
  let component: SleepLogCreateComponent;
  let fixture: ComponentFixture<SleepLogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepLogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
