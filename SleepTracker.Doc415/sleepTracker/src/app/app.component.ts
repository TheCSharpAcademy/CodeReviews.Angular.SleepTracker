import { Component,signal } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TimerComponent } from "./timer/timer.component";
import { InputFormComponent } from "./input-form/input-form.component";
import { HeaderComponent } from "./header/header.component";
import { SleepRecordsComponent } from "./sleep-records/sleep-records.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimerComponent, InputFormComponent, HeaderComponent, SleepRecordsComponent,MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sleepTracker';
  sleepTime=signal<number>(0);

  recordSleep(time:number){
    this.sleepTime.set(time)
    console.log(time);
  }
}
