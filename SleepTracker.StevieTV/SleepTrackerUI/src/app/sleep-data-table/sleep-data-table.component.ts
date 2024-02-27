import { DatePipe } from "@angular/common";
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerModule, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatIcon } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SleepTrackerDbService } from "../sleep-tracker-db.service";
import 'moment/locale/en-gb'

export interface SleepRecord {
  id: string;
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-sleep-data-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, DatePipe, MatDatepickerModule, MatIcon, FormsModule],
  providers: [
    provideMomentDateAdapter(undefined, { useUtc: true }),
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  templateUrl: './sleep-data-table.component.html',
  styleUrl: './sleep-data-table.component.css'
})
export class SleepDataTableComponent {
  displayedColumn: string[] = ['id', 'startTime', 'endTime', 'duration'];
  dataSource!: MatTableDataSource<SleepRecord>;
  records:any;
  filterValue!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sleepService: SleepTrackerDbService) {
    this.sleepService.getData().subscribe(data => {
      console.log(data);
      this.records = data;
      this.dataSource = new MatTableDataSource<SleepRecord>(this.records);
      this.dataSource.paginator = this.paginator;
      this.sort.sort({id: 'startTime', start: 'desc', disableClear: false});
      this.dataSource.sort = this.sort;
    })
  }

  calculateDuration(endTime: string, startTime: string) {
    const endDate = new Date(endTime);
    const startDate = new Date(startTime);
    const utcEndDate = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes());
    const utcStartDate = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes());
    return(this.secondsToHm((utcEndDate - utcStartDate) / 1000));
  }

  secondsToHm(duration: number) {
    const h = Math.floor(duration / 3600);
    const m = Math.floor(duration % 3600 / 60);
    const s = Math.floor(duration % 3600 % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes") : "";
    return hDisplay + mDisplay;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
  applyDateFilter(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.filterValue = event.value.toISOString().substring(0, 10);
      this.dataSource.filter = this.filterValue;
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  clearDateFilter() {
    this.filterValue = "";
    this.dataSource.filter = this.filterValue;
  }
}
