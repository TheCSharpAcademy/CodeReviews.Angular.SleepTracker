import { Component, Input} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ISleepInput } from '../ISleepInput';
import { AbstractControl, FormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InvalidInputDateDirective } from './invalid-date.directive';
import { InvalidWakeUpDateDirective } from './invalid-wake-up-date.directive';

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDialogClose, 
    FormsModule,
    DatePipe, 
    InvalidInputDateDirective,
    InvalidWakeUpDateDirective
  ],
  providers: [  
    MatDatepickerModule,  
  ],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.css'
})
export class AddDialogComponent {
  @Input() dialogData: ISleepInput = {RecordStart: new Date, RecordEnd: new Date}
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>){}
}