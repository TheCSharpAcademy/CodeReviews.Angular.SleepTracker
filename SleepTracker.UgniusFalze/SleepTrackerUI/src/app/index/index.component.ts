import { Component } from '@angular/core';
import { TopNavComponent } from '../top-nav/top-nav.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TopNavComponent, MatButtonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
