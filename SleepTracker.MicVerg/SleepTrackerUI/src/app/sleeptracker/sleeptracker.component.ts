import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SleeptrackerService } from '../sleeptracker.service';
import { Sleep } from '../sleep.model';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-sleeptracker',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './sleeptracker.component.html',
  styleUrl: './sleeptracker.component.css'
})
export class SleeptrackerComponent implements OnInit {
  constructor(private sleepService: SleeptrackerService){}
  apiUrl: string = 'https://localhost:7240/api/sleeps/';
  sleepData: Sleep[] = [];
  columnsToDisplay = ['id','startTime','endTime'];

  ngOnInit(): void {
    this.sleepService.getSleepRecords().subscribe((data: Sleep[]) => {
      this.sleepData = data;
    });
  }

  getSleeps(){
    this.sleepService.getSleepRecords()
      .subscribe(sleepData => this.sleepData = sleepData);
  }
}
