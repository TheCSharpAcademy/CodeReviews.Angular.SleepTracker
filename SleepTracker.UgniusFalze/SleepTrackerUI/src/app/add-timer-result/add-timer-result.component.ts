import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-add-timer-result',
  standalone: true,
  imports: [
    MatInputModule, 
    MatButtonModule, 
    MatDialogClose, 
  ],
  templateUrl: './add-timer-result.component.html',
  styleUrl: './add-timer-result.component.css'
})

export class AddTimerResultComponent {

  constructor() {
  }
}
