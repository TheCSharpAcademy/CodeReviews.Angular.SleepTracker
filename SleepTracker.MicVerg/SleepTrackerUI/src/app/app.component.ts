import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SleeptrackerComponent } from './sleeptracker/sleeptracker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SleeptrackerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SleepTrackerUI';
}
