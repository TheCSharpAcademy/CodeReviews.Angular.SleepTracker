import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SleeptrackerService } from '../sleeptracker.service';
import { Sleep } from '../sleep.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel, MatHint } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import 'moment/locale/en-gb'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatNativeDatetimeModule } from "@mat-datetimepicker/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sleeptracker',
  standalone: true,
  imports: [MatTableModule, ReactiveFormsModule, MatNativeDatetimeModule, MatDatetimepickerModule, MatButtonModule, MatCardModule, MatDialogModule, MatPaginatorModule, MatPaginator, CommonModule, MatDatepickerModule, MatFormFieldModule, MatLabel, MatHint, MatInputModule, FormsModule],
  providers: [
    provideMomentDateAdapter(undefined, { useUtc: true }),
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  templateUrl: './sleeptracker.component.html',
  styleUrl: './sleeptracker.component.css'
})
export class SleeptrackerComponent{
  columnsToDisplay = ['id','startTime','endTime', 'duration'];
  dataSource!: MatTableDataSource<Sleep>;
  sleepData: Sleep[] = [];
  events: string[] = [];
  selectedDate: string = "";
  btnStartDate: Date = new Date(Date.now());
  btnStopDate: Date = new Date(Date.now());
  btnTimerIsRunning: Boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  sleepRecord: Sleep= {
    id: 0,
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
  }

  addSleepForm = new FormGroup({
    startDateTime: new FormControl('', Validators.required),
    endDateTime: new FormControl('', Validators.required)
  })

  constructor(private sleepService: SleeptrackerService, private _snackBar : MatSnackBar){
    this.sleepService.getSleepRecords().subscribe((data: Sleep[]) => {
      this.sleepData = data;
      this.dataSource = new MatTableDataSource<Sleep>(this.sleepData);
      this.dataSource.paginator = this.paginator;
  })
}     

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  calculateDuration(startTime: string, endTime: string){
    let startDate = new Date(startTime);
    let endDate = new Date(endTime);
    let durationMillis = endDate.getTime() - startDate.getTime();
    let totalSeconds = Math.abs(durationMillis / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedDuration;
  }

  filterSleep(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.selectedDate = event.value.toISOString().substring(0, 10);
      this.dataSource.filter = this.selectedDate;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  clearDateFilter() {
    this.selectedDate = "";
    this.dataSource.filter = this.selectedDate;
  }

  addThroughSleepForm(){
    //added +2 for timezone fix
    const dateStartTimeValue = this.addSleepForm.get('startDateTime')?.value || '';
    const adjustedStartDate = new Date(dateStartTimeValue);
    adjustedStartDate.setHours(adjustedStartDate.getHours() + 2); 
    this.sleepRecord.startTime = adjustedStartDate;

    const dateEndTimeValue = this.addSleepForm.get('endDateTime')?.value || '';
    const adjustedEndDate = new Date(dateEndTimeValue);
    adjustedEndDate.setHours(adjustedEndDate.getHours() + 2); 
    this.sleepRecord.endTime = adjustedEndDate;

    this.sleepService.postSleepRecord(this.sleepRecord)
      .subscribe();
    location.reload();
  }

  startButton(){
    this.btnStartDate = new Date(Date.now());
    this.btnStartDate.setHours(this.btnStartDate.getHours() + 2);
    this.btnTimerIsRunning = true;
    if (this.btnTimerIsRunning == true)
      {
      this.openSnackBar('Sleep timer is running.', 'X');
      }
  }

  stopButton(){
    this.sleepRecord.startTime = this.btnStartDate;
    this.btnStopDate = new Date(Date.now());
    this.btnStopDate.setHours(this.btnStopDate.getHours() + 2);
    this.sleepRecord.endTime = this.btnStopDate;
  
    this.sleepService.postSleepRecord(this.sleepRecord).subscribe(() => {
      this.sleepService.getSleepRecords().subscribe((updatedData: Sleep[]) => {
        this.sleepData = updatedData;
        this.dataSource = new MatTableDataSource<Sleep>(this.sleepData);
        this.dataSource.paginator = this.paginator;
        this.openSnackBar('Added successfully', 'X');
      });
    });
    this.btnTimerIsRunning = false;
  }
  
}
