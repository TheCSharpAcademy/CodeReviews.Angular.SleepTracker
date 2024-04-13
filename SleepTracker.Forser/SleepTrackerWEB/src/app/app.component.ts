import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

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
    'action',
  ];
  dataSource = new MatTableDataSource<ISleep>();
  sleepRecords: ISleep[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  SleepTypeEnum = SleepTypeConst;
  sleepEnum = SleepTypeConst.Sleep;

  constructor(public sleepService: SleepService, public dialog: MatDialog) {}

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};

  ngOnInit(): void {
    this.fetchData();
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '640px',
      disableClose: true,
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRecord(result.data);
      }
    });
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

  addRowData(row_obj) {}

  deleteRecord(row_obj) {
    this.sleepService.deleteRecord(row_obj.id).subscribe(() => {
      this.fetchData();
    });
    console.log('Record deleted successfully');
  }
}
