import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogSessionComponent } from './sleep-log-session.component';

describe('SleepLogSessionComponent', () => {
  let component: SleepLogSessionComponent;
  let fixture: ComponentFixture<SleepLogSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepLogSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
