import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { SleepTableDataSource } from './sleep-table-datasource';
import { SleepRecord } from './sleep-record';
import { SleepRecordService } from '../sleep-record-service.service';
import { NgIf } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-sleep-table',
  templateUrl: './sleep-table.component.html',
  styleUrls: ['./sleep-table.component.css'],
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule, MatSortModule, NgIf, MatProgressBarModule]
})
export class SleepTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SleepRecord>;
  dataSource!: SleepTableDataSource;
  count!:number;

  constructor(private service: SleepRecordService){}

  ngOnInit(){
    this.dataSource = new SleepTableDataSource(this.service);
    this.dataSource.loadSleepRecords(0, 10);
    this.service.getSleepRecordCount().subscribe((count) => this.count = count);
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'hours', 'date'];

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(()=> this.loadSleepRecordPage())
    )
    .subscribe();
  }

  loadSleepRecordPage(){
    this.dataSource.loadSleepRecords(this.paginator.pageIndex, this.paginator.pageSize);
    this.service.getSleepRecordCount().subscribe((count) => this.count = count);
  }
}
