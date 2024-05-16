import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SleeptrackerService } from '../sleeptracker.service';
import { Sleep } from '../sleep.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import 'moment/locale/en-gb'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sleeptracker',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginator, CommonModule, MatDatepickerModule, MatFormField, MatLabel, MatHint, MatInputModule, FormsModule],
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
  selectedDate?: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sleepService: SleeptrackerService){
    this.sleepService.getSleepRecords().subscribe((data: Sleep[]) => {
      this.sleepData = data;
      this.dataSource = new MatTableDataSource<Sleep>(this.sleepData);
      this.dataSource.paginator = this.paginator;
  })
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


}
