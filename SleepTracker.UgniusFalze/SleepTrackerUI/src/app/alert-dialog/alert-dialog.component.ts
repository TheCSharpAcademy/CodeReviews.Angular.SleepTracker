import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatButtonModule, MatDialogContent, MatDialogClose],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css'
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public message: string){}
}
