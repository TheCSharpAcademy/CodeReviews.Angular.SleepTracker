import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { SleepRecord } from '../sleep-record';
import { ApiService } from '../services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog} from '@angular/material/dialog';
import { ConfirmationDeleteDialogComponent } from '../confirmation-delete-dialog/confirmation-delete-dialog.component';

@Component({
  selector: 'app-sleep-overview',
  templateUrl: './sleep-overview.component.html',
  styleUrl: './sleep-overview.component.css',
})
export class SleepOverviewComponent {
  
  displayedColumns: string[] = ['id', 'sleepStart', 'sleepEnd', 'duration', 'action'];
  dataSource!: MatTableDataSource<SleepRecord>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  sleeps: SleepRecord[] = [];

  constructor(private api: ApiService, private dialog: MatDialog) { }
  
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
    const dialogWindow = this.dialog.open(ConfirmationDeleteDialogComponent, {
      width: '250px',
      data: { message: `Are you sure you want to delete record ${recordId}?`},
    })

    dialogWindow.afterClosed().subscribe(result => {
      if (result){
        this.api.deleteSleep(recordId).subscribe(
          {
            next: (response) => {
              console.log(recordId + " successfully deleted");
              this.getAllSleeps();
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            }
          }
        );
      }
    });
  }
}
