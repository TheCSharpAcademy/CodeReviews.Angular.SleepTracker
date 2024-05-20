import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SleepLog, SleepLogForm, forbiddenDateValidator } from '../../models/sleep-logs';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sleep-log-create-admin',
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
  templateUrl: './sleep-log-create-admin.component.html',
  styleUrl: './sleep-log-create-admin.component.css',
  
})
export class SleepLogCreateAdminComponent {

  sleepLog: SleepLog = {};
  
  form : FormGroup<SleepLogForm> = new FormGroup<SleepLogForm>({
    startDate: new FormControl<string>('', {nonNullable: true, validators: Validators.required }),
    endDate: new FormControl<string>('', {nonNullable: true, validators: Validators.required }),
    comments: new FormControl<string | undefined>(' ', {nonNullable: true}),
    userName: new FormControl<string | undefined>(' ', {nonNullable: true}),
  }, {validators: forbiddenDateValidator()} );

  constructor(
    private sleeplogService : SleepLogsService,
    public dialogRef: MatDialogRef<SleepLogCreateAdminComponent>
  ) {}

  submitForm(){
    if(this.form.valid){
      this.sleepLog = Object.assign(this.form.value);
      this.sleeplogService.postLog(this.sleepLog, this.sleepLog.userName).subscribe( (resp) => {
        if(resp != null){
          this.dialogRef.close()
        }
      }); 
    }
  }
}
