import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepOverviewComponent } from './sleep-overview.component';

describe('SleepOverviewComponent', () => {
  let component: SleepOverviewComponent;
  let fixture: ComponentFixture<SleepOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SleepOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
