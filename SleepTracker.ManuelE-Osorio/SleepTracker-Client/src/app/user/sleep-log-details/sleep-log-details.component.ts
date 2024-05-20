import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SleepLogsListComponent } from '../sleep-logs-list/sleep-logs-list.component';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { SleepLog, SleepLogForm, forbiddenDateValidator } from '../../models/sleep-logs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, formatDate } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sleep-log-details',
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
  templateUrl: './sleep-log-details.component.html',
  styleUrl: './sleep-log-details.component.css'
})
export class SleepLogDetailsComponent implements OnInit {

  form : FormGroup<SleepLogForm> = new FormGroup<SleepLogForm>({
    id: new FormControl<number>(0, {nonNullable: true, validators: [
      Validators.required, Validators.min(1), Validators.max(2147483647), Validators.pattern("^[0-9]*$")
    ]} ),
    startDate: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    endDate: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    comments: new FormControl<string | undefined>('', {nonNullable: true})
  }, {validators: forbiddenDateValidator()} );

  constructor (
    private sleepLogService : SleepLogsService,
    @Inject(MAT_DIALOG_DATA) public sleepLog : SleepLog,
    public dialogRef: MatDialogRef<SleepLogDetailsComponent>
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
    }  
  }
}
