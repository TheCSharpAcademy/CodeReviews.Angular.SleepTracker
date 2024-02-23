import {Component} from '@angular/core';


@Component({
  selector: 'app-add-sleep',
  templateUrl: './add-sleep.component.html',
  styleUrl: './add-sleep.component.css',
})

export class AddSleepComponent {
  currentDate = new Date();
  currentTime = this.formatTime(this.currentDate);

  formatTime(date: Date): string{
    let hours: number | string = date.getHours();
    let minutes: number | string = date.getMinutes();
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
  }
}
