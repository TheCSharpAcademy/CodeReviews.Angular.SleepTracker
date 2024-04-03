import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { SleepModel } from '../../Model/SleepModel';
import { SleepHttpService } from '../../Services/sleep-http.service';

import { RecordAddComponent } from '../record-add/record-add.component';
import { TimerComponent } from '../timer/timer.component';
import { DateFilterComponent } from '../date-filter/date-filter.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, MatTableModule, MatDividerModule, MatPaginator, MatPaginatorModule, CommonModule, RecordAddComponent, TimerComponent, DateFilterComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['id', 'timeStart', 'timeEnd', 'time'];
  clickedRecord!: SleepModel;
  dataSource = new MatTableDataSource<SleepModel>([]);
  newRecordEdit: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.getRecords();
  }

  constructor(private SleepHttp: SleepHttpService) { }

  addNewRecord(record: SleepModel) {
    this.SleepHttp.postItem(record, 'sleepers')
      .subscribe({
        next: (r) => {
          this.getRecords();
        },
        error: (e) => {
          console.error("post error", e)
        }
      })

    this.changeView();
  }

  getRecords() {
    this.SleepHttp.getRecords('sleepers').subscribe({
      next: records => {
        this.dataSource = new MatTableDataSource(records);
        this.dataSource.paginator = this.paginator;
      },
      error: e => console.error("Api error", e)
    });;
  }

  onTimerStop(timerRecord: SleepModel) {
    this.SleepHttp.postItem(timerRecord, 'sleepers')
      .subscribe({
        next: (r) => {
          this.getRecords();
        },
        error: (e) => {
          console.error("post error", e)
        }
      });
  }

  onChangeDate(date: MatTableDataSource<SleepModel>) {
    this.dataSource = date;
    this.dataSource.paginator = this.paginator;
  }

  deleteRecord() {
    if (this.clickedRecord) {
      console.log("hi");
      this.SleepHttp.deleteRow(this.clickedRecord.id, 'sleepers')
        .subscribe({
          next: result => this.getRecords(),
          error: e => console.error("Api error", e)
        })
    }
  }

  changeView() {
    this.newRecordEdit = !this.newRecordEdit;
  }

  formatTableDate(milliseconds: number) {
    let time = new Date(milliseconds);
    return time;
  }
}
