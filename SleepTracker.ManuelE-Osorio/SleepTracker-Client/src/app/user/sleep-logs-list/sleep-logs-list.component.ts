import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SleepLogsService } from '../../services/sleep-logs.service';
import { SleepLog } from '../../models/sleep-logs';
import { NgFor, NgIf } from '@angular/common';
import { SleepLogDetailsComponent } from '../sleep-log-details/sleep-log-details.component';
import { SleepLogCreateComponent } from '../sleep-log-create/sleep-log-create.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { Subject, catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { SleepLogSessionComponent } from '../sleep-log-session/sleep-log-session.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-sleep-logs-list',
  standalone: true,
  imports: [
    NgFor, 
    NgIf, 
    SleepLogCreateComponent, 
    SleepLogDetailsComponent, 
    MatTableModule, 
    MatProgressBarModule, 
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    SleepLogSessionComponent,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './sleep-logs-list.component.html',
  styleUrl: './sleep-logs-list.component.css'
})
export class SleepLogsListComponent implements OnInit{

  columnsToDisplay = ['startDate', 'endDate', 'duration', 'comments', "details"];
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
      return this.sleepLogService.getLogs(0, term)
    }),
    ).subscribe( resp => {
      if(resp != null){
        this.isLoading = false;
        this.dataSource.data = resp.sleepLogs;
        this.paginator.length = resp.totalRecords;
      }
    });
  }

  getLogs( startIndex: number) {
    this.isLoading = true;
    this.sleepLogService.getLogs( startIndex, this.date).subscribe( resp => {
      if(resp != null){
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
    this.logDialog.open(SleepLogDetailsComponent, {
      width: '400px',
      enterAnimationDuration: '400',
      exitAnimationDuration: '400',
      data: log
    }).afterClosed().subscribe(() => this.getLogs(this.paginator.pageIndex*this.paginator.pageSize));
  }

  openCreate(): void {
    this.logDialog.open(SleepLogCreateComponent, {
      width: '400px',
      enterAnimationDuration: '400',
      exitAnimationDuration: '400',
    }).afterClosed().subscribe(() => this.getLogs(this.paginator.pageIndex*this.paginator.pageSize));
  }

  search(term: string ): void {
    this.searchDate.next(term);
  }
}
