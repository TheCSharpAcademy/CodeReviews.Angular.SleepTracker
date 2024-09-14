import { Component, inject, signal } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SleepService } from '../sleep.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../shared/card/card.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { DatePipe, formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sleep-records',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    CardComponent,
    DatePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sleep-records.component.html',
  styleUrl: './sleep-records.component.scss',
})
export class SleepRecordsComponent {
  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  pageSize = signal<number>(4);
  displayedColumns: string[] = ['date', 'duration', 'actions'];
  selectedDate = signal<string | undefined>(undefined);
  dateFromForm: Date | undefined = undefined;
  isLoading=true;
  constructor(public sleepService: SleepService) {}

  get records() {
    return this.sleepService.sleepRecords.asReadonly();
  }

  get totalRecordsCount() {
    return this.sleepService.totalRecords();
  }

  ngOnInit() {
    this.loadInitial()
  }

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    console.log(event.pageIndex, event.pageSize);
    console.log(this.dateFromForm);
    const formattedDate = this.dateFromForm 
  ? formatDate(this.dateFromForm, 'yyyy-MM-dd', 'en') 
  : undefined;
    this.sleepService
      .getSleepRecords(
        event.pageIndex + 1,
        event.pageSize,
        formattedDate
      )
      .subscribe({
        next: (resData) => {
          const { logs, logsCount } = resData;
          this.sleepService.sleepRecords.set([...logs]);
          console.log('Total log count:', logsCount);
          this.sleepService.totalRecords.set(logsCount);
        },
        error: (err) => {
          this._snackBar.open(`Failed!`, 'Dismiss', {
            duration: 3000,
          });
        },
      });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    sleepTime: string
  ): void {
    this.dialog.open(DeleteDialogComponent, {
      data: { sleepTime: sleepTime, pageSize: this.pageSize() },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    console.log(selectedDate);
    this.sleepService
      .getSleepRecords(
        1,
        this.pageSize(),
        formatDate(selectedDate!, 'yyyy-MM-dd', 'en')
      )
      .subscribe({
        next: (resData) => {
          const { logs, logsCount } = resData;
          this.sleepService.sleepRecords.set([...logs]);
          console.log('Total log count:', logsCount);
          this.sleepService.totalRecords.set(logsCount);
          this._snackBar.open('Logs loaded', 'Dismiss', {
            duration: 1000,
          });
        },
        error: (err) => {
          this._snackBar.open(`Failed!`, 'Dismiss', {
            duration: 3000,
          });
        },
      });
  }

  resetFilter() {
    this.selectedDate.set(undefined)
    this.dateFromForm=undefined
    this.loadInitial()
  }
  
  loadInitial ()  {
    this.sleepService.getSleepRecords(1, this.pageSize()).subscribe({
      next: (resData) => {
        const { logs, logsCount } = resData;
        this.sleepService.sleepRecords.set([...logs]);
        console.log('Total log count:', logsCount);
        this.sleepService.totalRecords.set(logsCount);
        this.isLoading=false;
        this._snackBar.open('Logs loaded', 'Dismiss', {
          duration: 1000,
        });
      },
      error: (err) => {
        this._snackBar.open(`Failed!`, 'Dismiss', {
          duration: 3000,
        });
        this.loadInitial()
      },
    });
  }
}


