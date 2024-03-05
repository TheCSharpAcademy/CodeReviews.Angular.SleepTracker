import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { SleepRecord } from '../sleep-record';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private api: ApiService, private _liveAnnouncer : LiveAnnouncer, private _snackbar : MatSnackBar) { }

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
          verticalPosition: 'top', duration: 5000});
          this.getAllSleeps();
        },
       (err: HttpErrorResponse) =>{
        console.log(err);
        this._snackbar.open('Oops, something went wrong. Try again','close', { horizontalPosition: 'center',
          verticalPosition: 'top', duration: 5000});
       }
          
    );
  }
}
