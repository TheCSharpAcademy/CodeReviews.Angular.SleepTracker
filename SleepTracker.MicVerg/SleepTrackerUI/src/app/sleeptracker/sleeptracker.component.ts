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
  columnsToDisplay = ['id','startTime','endTime', 'duration'];
  dataSource!: MatTableDataSource<Sleep>;
  sleepData: Sleep[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sleepService: SleeptrackerService){
    this.sleepService.getSleepRecords().subscribe((data: Sleep[]) => {
      this.sleepData = data;
      this.dataSource = new MatTableDataSource<Sleep>(this.sleepData);
      this.dataSource.paginator = this.paginator;
  })
}     
  /* getSleeps(){
    this.sleepService.getSleepRecords()                               
      .subscribe(sleepData => this.sleepData = sleepData);
  } */

  calculateDuration(startTime: string, endTime: string){
    let startDate = new Date(startTime);
    let endDate = new Date(endTime);
    let durationMillis = endDate.getTime() - startDate.getTime();
    let totalSeconds = Math.abs(durationMillis / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedDuration;
  }
}
