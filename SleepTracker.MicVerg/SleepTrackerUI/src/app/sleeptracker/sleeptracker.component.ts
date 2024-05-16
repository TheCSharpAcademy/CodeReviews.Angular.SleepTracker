import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SleeptrackerService } from '../sleeptracker.service';
import { Sleep } from '../sleep.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sleeptracker',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginator, CommonModule],
  templateUrl: './sleeptracker.component.html',
  styleUrl: './sleeptracker.component.css'
})
export class SleeptrackerComponent{
  columnsToDisplay = ['id','startTime','endTime'];
  dataSource!: MatTableDataSource<Sleep>;
  sleepData: Sleep[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sleepService: SleeptrackerService){
    this.sleepService.getSleepRecords().subscribe((data: Sleep[]) => {
      this.sleepData = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<Sleep>(this.sleepData);
      this.dataSource.paginator = this.paginator;
  })
}     
  /* getSleeps(){
    this.sleepService.getSleepRecords()                               
      .subscribe(sleepData => this.sleepData = sleepData);
  } */
}
