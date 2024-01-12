import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TopNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SleepTrackerUI';
}
