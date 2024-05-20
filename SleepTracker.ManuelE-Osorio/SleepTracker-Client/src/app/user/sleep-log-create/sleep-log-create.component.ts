import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SleepLog, SleepLogForm, forbiddenDateValidator } from '../../models/sleep-logs';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sleep-log-create',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent
  ],
  templateUrl: './sleep-log-create.component.html',
  styleUrl: './sleep-log-create.component.css'
})
export class SleepLogCreateComponent{
  @Output() closed = new EventEmitter();

  sleepLog: SleepLog = {};
  
  form : FormGroup<SleepLogForm> = new FormGroup<SleepLogForm>({
    startDate: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    endDate: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    comments: new FormControl<string | undefined>(' ', {nonNullable: true})
  }, {validators: forbiddenDateValidator()} );

  constructor(
    private sleeplogService : SleepLogsService,
    public dialogRef: MatDialogRef<SleepLogCreateComponent>
  ) {}

  submitForm(){
    if(this.form.valid){
      this.sleepLog = Object.assign(this.form.value);
      this.sleeplogService.postLog(this.sleepLog).subscribe( (resp) => {
        if(resp != null){
          this.dialogRef.close();
        }  
      }); 
    }
  }
}
