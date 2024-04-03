import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainViewComponent } from './Components/main-view/main-view.component';

import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainViewComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_sleep_tracker';
  
  constructor() {
  }
}
