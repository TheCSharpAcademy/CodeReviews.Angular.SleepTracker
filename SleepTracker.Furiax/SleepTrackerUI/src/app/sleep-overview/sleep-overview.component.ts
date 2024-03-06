import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { SleepRecord } from '../sleep-record';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sleep-overview',
  templateUrl: './sleep-overview.component.html',
  styleUrl: './sleep-overview.component.css',
})
export class SleepOverviewComponent {
  
  displayedColumns: string[] = ['id', 'sleepStart', 'sleepEnd', 'duration', 'action'];
  dataSource: MatTableDataSource<SleepRecord> = new MatTableDataSource<SleepRecord>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(){
    if (this.dataSource){
      this.dataSource.sort = this.sort;
    }
  }

  announceSortChange(event: Sort): void{
    if(event.active && event.direction){
      this._liveAnnouncer.announce(`Sorted ${event.direction}ending`);
    } else{
      this._liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  sleeps: SleepRecord[] = [];

  constructor(private api: ApiService, private _liveAnnouncer : LiveAnnouncer,
    private _snackbar : MatSnackBar, private _dialog: MatDialog) { }

  ngOnInit():void {
    this.getAllSleeps();
  }

  getAllSleeps(){
    this.api.getSleeps()
      .subscribe({
        next: (response) => { 
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => { alert("error occurred while fetching records" + err); }
      });
  }

  calculateDuration(start: Date, end: Date): string{
    const durationMs = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(durationMs / (1000*60 *60));
    const minutes = Math.floor((durationMs % (1000*60*60)) / (1000 * 60));
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  delete(recordId: number): void{
    this.api.deleteSleep(recordId).subscribe(
      () => {
          console.log(recordId + " successfully deleted");
          this._snackbar.open('record ' + recordId + ' successfully deleted','close', { horizontalPosition: 'center',
          verticalPosition: 'top', duration: 5000 });
          this.getAllSleeps();
        },
       (err: HttpErrorResponse) =>{
        console.log(err);
        this._snackbar.open('Oops, something went wrong. Try again','close', { horizontalPosition: 'center',
          verticalPosition: 'top', duration: 5000});
       }
          
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();
  
    if (filterValue === '') {
      this.dataSource.filter = '';
      return;
    }
  
    // Split the filter value into day, month, and year
    const [day, month, year] = filterValue.split('/').map(Number);
  
    // Create a new Date object with the parsed values (Note: year assumed to be 4 digits)
    const filterDate = new Date(year + 2000, month - 1, day); // Subtract 1 from month since it's zero-based
  
    this.dataSource.filterPredicate = (data: SleepRecord, filter: string) => {
      // Extract date parts from the sleepStart and sleepEnd dates
      const startDate = new Date(data.sleepStart);
      const endDate = new Date(data.sleepEnd);
  
      // Check if the date parts match the filtered date for either sleepStart or sleepEnd
      return (startDate.getDate() === filterDate.getDate() &&
             startDate.getMonth() === filterDate.getMonth() &&
             startDate.getFullYear() === filterDate.getFullYear()) ||
             (endDate.getDate() === filterDate.getDate() &&
             endDate.getMonth() === filterDate.getMonth() &&
             endDate.getFullYear() === filterDate.getFullYear());
    };
  
    // Apply the filter
    this.dataSource.filter = filterValue;
  }
  
  
  
  
  
}
