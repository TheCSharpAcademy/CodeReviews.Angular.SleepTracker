import { CommonModule } from '@angular/common';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SleepApiServiceService } from './services/sleep-api-service.service';
import { SleepInterface } from './models/sleep-interface';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'startOfSleep',
    'endOfSleep',
    'typeOfSleep',
    'lengthOfSleep',
    'action',
  ];
  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;
  dataSource!: MatTableDataSource<SleepInterface>;
  records: any;

  constructor(
    public sleepService: SleepApiServiceService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  fetchData() {
    this.sleepService.getRecordsWithoutFilters().subscribe((res) => {
      this.records = res;
      this.dataSource = new MatTableDataSource<SleepInterface>(this.records);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '640px',
      data: obj,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event == 'Add') {
        this.addRecordData(result.data);
      } else if (result.event == 'Live') {
        this.fetchData();
      }
    });
  }

  calculateSleepLength(start: Date, end: Date) {
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const hoursOfSleep = Math.floor(duration / (1000 * 60 * 60));
    const minutesOfSleep = Math.floor(
      (duration % (1000 * 60 * 60)) / (1000 * 60)
    );
    return `${hoursOfSleep}:${minutesOfSleep < 10 ? '0' : ''}${minutesOfSleep}`;
  }

  addRecordData(row_obj) {
    this.saveRecord(row_obj);
  }

  deleteRowData(row_obj) {
    this.dataSource = this.records.filter((value, key) => {
      if (value.id == row_obj.id) {
        this.deleteRecord(row_obj.id);
      }
    });
  }

  saveRecord(data: any) {
    this.sleepService.addRecord(data).subscribe(() => {
      this.fetchData();
    });
  }

  deleteRecord(id: number) {
    this.sleepService.deleteSleepRecord(id).subscribe(() => {
      this.fetchData();
    });
  }
}
