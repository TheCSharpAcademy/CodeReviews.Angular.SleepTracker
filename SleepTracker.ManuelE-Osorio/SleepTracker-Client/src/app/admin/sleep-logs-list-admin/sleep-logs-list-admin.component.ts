import { Component, ViewChild } from '@angular/core';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { SleepLog } from '../../models/sleep-logs';
import { NgFor, NgIf } from '@angular/common';
import { SleepLogCreateAdminComponent } from '../sleep-log-create-admin/sleep-log-create-admin.component';
import { SleepLogDetailsAdminComponent } from '../sleep-log-details-admin/sleep-log-details-admin.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent} from '@angular/material/dialog';
import { SleepLogDetailsComponent } from '../../user/sleep-log-details/sleep-log-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-sleep-logs-list-admin',
  standalone: true,
  imports: [
    NgFor, 
    NgIf, 
    SleepLogCreateAdminComponent, 
    SleepLogDetailsAdminComponent, 
    MatTableModule, 
    MatProgressBarModule, 
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './sleep-logs-list-admin.component.html',
  styleUrl: './sleep-logs-list-admin.component.css'
})
export class SleepLogsListAdminComponent {


  columnsToDisplay = ['startDate', 'endDate', 'duration', 'comments', "userName", "details"];
  dataSource = new MatTableDataSource<SleepLog>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = true;
  private searchDate = new Subject<string>();
  date? : string = undefined;

  constructor(
    private sleepLogService : SleepLogsService,
    public logDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLogs(0);
    this.searchDate.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        this.date = term;
        return this.sleepLogService.getAllLogs(0, term)
      }),
      ).subscribe( resp => {
        if(resp != null){
          this.isLoading = false;
          this.dataSource.data = resp.sleepLogs;
          this.paginator.length = resp.totalRecords;
        }
      });
  }

  getLogs(startIndex: number) {
    this.isLoading = true;
    this.sleepLogService.getAllLogs( startIndex, this.date).subscribe( resp => {
      if( resp!= null) {
        this.isLoading = false;
        this.dataSource.data = resp.sleepLogs;
        this.paginator.length = resp.totalRecords;
      }
    });
  }

  onChangePage(event: PageEvent) {
    this.getLogs(event.pageIndex*event.pageSize); 
  }

  openDetails(log: SleepLog): void {
    this.logDialog.open(SleepLogDetailsAdminComponent, {
      width: '400px',
      enterAnimationDuration: '400',
      exitAnimationDuration: '400',
      data: log
    }).afterClosed().subscribe(() => this.getLogs(this.paginator.pageIndex*this.paginator.pageSize));
  }

  openCreate(): void {
    this.logDialog.open(SleepLogCreateAdminComponent, {
      width: '400px',
      enterAnimationDuration: '400',
      exitAnimationDuration: '400',
    }).afterClosed().subscribe(() => this.getLogs(this.paginator.pageIndex*this.paginator.pageSize));
  }

  search(term: string ): void {
    this.searchDate.next(term);
  }
}
