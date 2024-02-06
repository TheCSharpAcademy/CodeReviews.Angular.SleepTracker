import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSleepComponent } from './add-sleep.component';

describe('AddSleepComponent', () => {
  let component: AddSleepComponent;
  let fixture: ComponentFixture<AddSleepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSleepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSleepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
