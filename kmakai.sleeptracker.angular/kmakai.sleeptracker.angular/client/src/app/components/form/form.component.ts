import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Record } from 'src/app/models/Record';
import { SleepTrackerService } from 'src/app/services/sleep-tracker.service';
import { Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  intervalId: any = null;
  form = new FormGroup({
    id: new FormControl(0),
    date: new FormControl(new Date().toISOString().slice(0, 10)),
    hours: new FormControl('1'),
  });
  Timer(
    rangeElement: HTMLInputElement,
    buttonElement: MatButton,
    TimerValueElement: HTMLElement
  ) {
    let btn = buttonElement._elementRef.nativeElement;
    // console.log(rangeElement.value);
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    console.log(btn.innerText);

    if (btn.innerText === 'Start Timer') {
      btn.innerText = 'Stop Timer';
      this.intervalId = setInterval(() => {
        seconds++;
        if (seconds === 60) {
          minutes++;
          seconds = 0;
        }
        if (minutes === 60) {
          hours++;
          minutes = 0;
        }
        TimerValueElement.innerText = `${hours}:${minutes}:${seconds}`;
      }, 1000);
    } else {
      btn.innerText = 'Start Timer';
      if (this.intervalId) clearInterval(this.intervalId);
      this.form.value.hours =
        hours < 1 ? '1' : (hours + minutes / 60).toFixed(2).toString();
    }
  }

  @Output() onRecordAdded = new EventEmitter<Record>();

  constructor(
    private sleepService: SleepTrackerService,
    private sharedService: SharedService
  ) {}

  onSubmit() {
    const record: Record = {
      id: +this.form.value.id!,
      date: new Date(this.form.value.date!),
      hours: +this.form.value.hours!,
    };

    this.sleepService.addRecord(record).subscribe((record) => {
      this.sharedService.recordAdded.emit(record);
    });
  }
}
