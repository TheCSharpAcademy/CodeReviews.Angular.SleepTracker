import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Record } from 'src/app/models/Record';
import { SleepTrackerService } from 'src/app/services/sleep-tracker.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css'],
})
export class RecordsListComponent {
  displayedColumns: string[] = ['date', 'hours', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() records: Record[] = [];

  constructor(
    private sleepService: SleepTrackerService,
    private sharedService: SharedService
  ) {
    this.sharedService.recordAdded.subscribe((record) => {
      this.getRecords();
    });
  }

  ngOnInit() {
    this.getRecords();
  }

  getRecords() {
    this.sleepService.getRecords().subscribe((records) => {
      this.records = records;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteRecord(record: Record) {
    this.sleepService.deleteRecord(record.id).subscribe(() => {
      this.getRecords();
    });
  }
  applyFilter(eventValue: string) {
    console.log(new Date(eventValue).toISOString().slice(0, 10));
    this.dataSource.filter = new Date(eventValue).toISOString().slice(0, 10);
  }

  resetFilter() {
    this.dataSource.filter = '';
  }
}
