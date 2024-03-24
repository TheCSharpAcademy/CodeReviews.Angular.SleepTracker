import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepHomeComponent } from './sleep-home.component';

describe('SleepHomeComponent', () => {
  let component: SleepHomeComponent;
  let fixture: ComponentFixture<SleepHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SleepHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
