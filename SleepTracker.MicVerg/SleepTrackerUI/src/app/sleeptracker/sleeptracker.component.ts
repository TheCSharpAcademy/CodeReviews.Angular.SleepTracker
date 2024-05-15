import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SleeptrackerService } from '../sleeptracker.service';
import { Sleep } from '../sleep.model';

@Component({
  selector: 'app-sleeptracker',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './sleeptracker.component.html',
  styleUrl: './sleeptracker.component.css'
})
export class SleeptrackerComponent implements OnInit {
  constructor(private sleepService: SleeptrackerService){}
  apiUrl: string = 'https://localhost:7240/api/sleeps/';
  sleepData: Sleep[] = [];

  ngOnInit(): void {
    this.sleepService.getSleepRecords().subscribe((data: Sleep[]) => {
      this.sleepData = data;
    });
  }

  getSleeps(){
    this.sleepService.getSleepRecords();
  }
}
