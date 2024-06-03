import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleeptrackerComponent } from './sleeptracker.component';

describe('SleeptrackerComponent', () => {
  let component: SleeptrackerComponent;
  let fixture: ComponentFixture<SleeptrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleeptrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleeptrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
