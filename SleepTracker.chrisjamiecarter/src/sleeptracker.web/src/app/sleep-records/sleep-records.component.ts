import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SleepRecordService } from '../shared/sleep-record.service';
import { SleepRecord } from '../shared/sleep-record.interface';
import { DeleteSleepRecordDialogComponent } from './delete-sleep-record-dialog/delete-sleep-record-dialog.component';
import { UpdateSleepRecordDialogComponent } from './update-sleep-record-dialog/update-sleep-record-dialog.component';
import { CreateSleepRecordDialogComponent } from './create-sleep-record-dialog/create-sleep-record-dialog.component';

@Component({
  selector: 'app-sleep-records',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sleep-records.component.html',
  styleUrl: './sleep-records.component.scss',
})
export class SleepRecordsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['started', 'finished', 'duration', 'actions'];
  dataSource: MatTableDataSource<SleepRecord>;
  filterFromDate: Date | null = null;
  filterToDate: Date | null = null;
  matDialog = inject(MatDialog);
  sleepRecords: SleepRecord[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sleepRecordService: SleepRecordService) {
    this.dataSource = new MatTableDataSource(this.sleepRecords);
  }

  ngOnInit(): void {
    this.sleepRecordService.SleepRecords.subscribe((records) => {
      this.sleepRecords = records;
      this.applyFilter();
    });

    this.sleepRecordService.getSleepRecords();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    const fromDate = this.filterFromDate
      ? new Date(this.filterFromDate).getTime()
      : null;
    const toDate = this.filterToDate
      ? new Date(this.addDaysToDate(this.filterToDate, 1)).getTime()
      : null;
    const filteredRecords = this.sleepRecords.filter((record) => {
      const startedDate = record.started
        ? new Date(record.started).getTime()
        : null;

      if (fromDate && toDate && startedDate) {
        return startedDate >= fromDate && startedDate <= toDate;
      } else if (fromDate && startedDate) {
        return startedDate >= fromDate;
      } else if (toDate && startedDate) {
        return startedDate <= toDate;
      }
      return true;
    });

    this.dataSource = new MatTableDataSource(filteredRecords);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCreateSleepRecord() {
    this.matDialog.open(CreateSleepRecordDialogComponent, {
      width: '20rem',
    });
  }

  onDeleteSleepRecord(sleepRecord: SleepRecord) {
    this.matDialog.open(DeleteSleepRecordDialogComponent, {
      width: '20rem',
      data: sleepRecord,
    });
  }

  onUpdateSleepRecord(sleepRecord: SleepRecord) {
    this.matDialog.open(UpdateSleepRecordDialogComponent, {
      width: '20rem',
      data: sleepRecord,
    });
  }

  onResetFilter() {
    this.filterFromDate = null;
    this.filterToDate = null;
    this.applyFilter();
  }

  addDaysToDate(date: Date, days: number): Date {
    var output = new Date(date.valueOf());
    output.setDate(output.getDate() + days);
    return output;
  }
}
