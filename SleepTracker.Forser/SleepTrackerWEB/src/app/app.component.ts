import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SleepService } from './services/sleep.service';
import { ISleep } from './models/ISleep.model';
import { SleepTypeConst } from './models/SleepTypeConst';

import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'SleepTrackerWEB';
  displayedColumns = [
    'id',
    'startOfSleep',
    'endOfSleep',
    'typeOfSleep',
    'lengthOfSleep',
    'Actions',
  ];
  dataSource = new MatTableDataSource<ISleep>();
  sleepRecords: ISleep[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  SleepTypeEnum = SleepTypeConst;
  sleepEnum = SleepTypeConst.Sleep;

  constructor(
    public sleepService: SleepService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.sleepService.getRecordsWithoutFilters().subscribe((res) => {
      this.dataSource.data = res;
      this.isLoadingResults = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '640px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchData();
    });
  }

  deleteRecord(id: number) {
    this.sleepService.deleteRecord(id).subscribe(() => {
      this.fetchData();
    });
    console.log('Record deleted successfully');
  }
}
