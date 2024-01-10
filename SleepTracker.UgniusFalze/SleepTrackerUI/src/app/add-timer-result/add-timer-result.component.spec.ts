import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimerResultComponent } from './add-timer-result.component';

describe('AddTimerResultComponent', () => {
  let component: AddTimerResultComponent;
  let fixture: ComponentFixture<AddTimerResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTimerResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTimerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
