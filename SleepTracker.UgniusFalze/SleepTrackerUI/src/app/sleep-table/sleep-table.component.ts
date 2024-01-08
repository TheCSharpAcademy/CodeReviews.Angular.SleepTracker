import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { SleepTableDataSource } from './sleep-table-datasource';
import { SleepRecord } from './sleep-record';
import { SleepRecordService } from '../sleep-record-service.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged, fromEvent, tap } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-sleep-table',
  templateUrl: './sleep-table.component.html',
  styleUrls: ['./sleep-table.component.css'],
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule, 
    MatSortModule, NgIf, MatProgressBarModule, MatInputModule, MatIconModule, MatButtonModule]
})
export class SleepTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<SleepRecord>;
  @ViewChild('filterDate') select!: ElementRef;
  dataSource!: SleepTableDataSource;
  count!:number;
  dates!:Date[];

  constructor(private service: SleepRecordService, public dialog: MatDialog){}

  ngOnInit(){
    this.dataSource = new SleepTableDataSource(this.service);
    this.dataSource.loadSleepRecords(0, 10);
    this.service.getSleepRecordCount().subscribe((count) => this.count = count);
    this.service.getSleepRecordDates().subscribe(
      (dates) => this.dates = dates);
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'hours', 'date'];

  ngAfterViewInit(): void {
    fromEvent(this.select.nativeElement, 'change').pipe(
      distinctUntilChanged(),
      tap(() =>{
        this.paginator.pageIndex = 0;
        this.loadSleepRecordPage();
      })
    ).subscribe();
    this.paginator.page.pipe(
      tap(()=> this.loadSleepRecordPage())
    )
    .subscribe();
  }

  loadSleepRecordPage(){
    const dateFilter = this.select.nativeElement.value == '' ? undefined : this.select.nativeElement.value;
    this.dataSource.loadSleepRecords(
      this.paginator.pageIndex, 
      this.paginator.pageSize,
      dateFilter);
    this.service.getSleepRecordCount(dateFilter).subscribe((count) => this.count = count);
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddDialogComponent);
  }
}
