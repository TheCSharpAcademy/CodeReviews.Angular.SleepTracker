import { Component} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatDialogClose],
  providers: [  
    MatDatepickerModule,  
  ],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.css'
})
export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>){}
}
