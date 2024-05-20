import { NgIf, formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SleepLogForm, SleepLog, forbiddenDateValidator } from '../../models/sleep-logs';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-sleep-log-details-admin',
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
  templateUrl: './sleep-log-details-admin.component.html',
  styleUrl: './sleep-log-details-admin.component.css'
})
export class SleepLogDetailsAdminComponent implements OnInit{

  form : FormGroup<SleepLogForm> = new FormGroup<SleepLogForm>({
    id: new FormControl<number>(0, {nonNullable: true, validators: [
      Validators.required, Validators.min(1), Validators.max(2147483647), Validators.pattern("^[0-9]*$")
    ]} ),
    startDate: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    endDate: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    comments: new FormControl<string | undefined>('', {nonNullable: true}),
    userName: new FormControl<string | undefined>(' ', {nonNullable: true}),
  }, {validators: forbiddenDateValidator()} );

  constructor (
    private sleepLogService : SleepLogsService,
    @Inject(MAT_DIALOG_DATA) public sleepLog : SleepLog,
    public dialogRef: MatDialogRef<SleepLogDetailsAdminComponent>
  ) {}

  submitForm(){
    if(this.form.valid){
      this.sleepLog = Object.assign(this.form.value);
      this.sleepLogService.putLog(this.sleepLog).subscribe( res => {
        if( res != null){
          this.sleepLog = res;
          this.dialogRef.close();
        }
      })
    }
  }

  ngOnInit(): void {
    this.setForm();
  }

  delete() {
    if(this.sleepLog.id != undefined){
      this.sleepLogService.deleteLog(this.sleepLog.id).subscribe( (resp) => {
        if(resp == true){
          this.dialogRef.close();
        }
      })
    }
  }

  setForm() {
    if (this.sleepLog != undefined){
      this.form.controls.id!.setValue(this.sleepLog.id!)
      this.form.controls.startDate.setValue(formatDate(this.sleepLog.startDate!, 'yyyy-MM-ddTHH:mm', 'en'))
      this.form.controls.endDate.setValue(formatDate(this.sleepLog.endDate!, 'yyyy-MM-ddTHH:mm', 'en'))
      this.form.controls.comments.setValue(this.sleepLog.comments)
      this.form.controls.userName?.setValue(this.sleepLog.userName)
    }  
  }
}
