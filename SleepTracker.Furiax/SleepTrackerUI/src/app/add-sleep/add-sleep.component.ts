import {Component} from '@angular/core';
import { SleepRecord } from '../sleep-record';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ControlContainer } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-sleep',
  templateUrl: './add-sleep.component.html',
  styleUrl: './add-sleep.component.css',
})

export class AddSleepComponent {
  currentDate = new Date();
  sleepForm!: FormGroup;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private _snackbar: MatSnackBar){
    this.sleepForm = this.formBuilder.group({
      sleepStart: ['', Validators.required],
      sleepEnd: ['', [Validators.required, this.endTimeValidator]],
    });
  }

  save(){
    if (this.sleepForm.valid){
        const startSleepDate: Date = this.sleepForm.value.sleepStart.toDate();
        const endSleepDate: Date = this.sleepForm.value.sleepEnd.toDate();

        const startSleepOffset: Date = new Date(startSleepDate.getTime() - (startSleepDate.getTimezoneOffset() * 60000));
        const endSleepOffset: Date = new Date(endSleepDate.getTime() - (endSleepDate.getTimezoneOffset() * 60000));

        const sleepRecord: SleepRecord ={
        id: 0,
        sleepStart: startSleepOffset,
        sleepEnd: endSleepOffset
      };
      this.api.addSleep(sleepRecord).subscribe(
        (response) => {
          this._snackbar.open('Sleep record added successfully', 'close', { horizontalPosition: 'center',
        verticalPosition: 'top', duration: 5000});
          this.sleepForm.reset()
        },
        (error) => {
          this._snackbar.open('Something went wrong, record NOT added','close', { horizontalPosition: 'center',
          verticalPosition: 'top', duration: 5000});
        }
      );
    }else{
      this._snackbar.open('Please fill in the form correctly, record NOT added','close', { horizontalPosition: 'center',
          verticalPosition: 'top', duration: 5000});
    }
  }

  endTimeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const startTime = control.root.get('sleepStart')?.value;
    const endTime = control.value;
    
    if (startTime && endTime && startTime >= endTime) {
      return { 'invalidEndTime': true };
    }
    
    return null;
  }
  

  displayTime: string = '00:00:00';
  timerStarted: boolean = false;
  timerStart: Date = new Date();
  timerStop: Date = new Date();
  timerInterval: any;

  startTimer(){
    this.timerStart = new Date();
    this.timerStarted = true;
    this.updateDisplayTime();
    this.timerInterval = setInterval(() => {
      this.updateDisplayTime();
    }, 1000);
  }
  stopTimer(){
    this.timerStop = new Date();
    this.timerStarted = false;
    clearInterval(this.timerInterval);
    this.updateDisplayTime();

    let timerDifference = Math.abs((this.timerStop.getTime() - this.timerStart.getTime()) / 1000)
    
    const timerStartOffset: Date = new Date(this.timerStart.getTime() - (this.timerStart.getTimezoneOffset() * 60000));
    const timerStopOffset: Date = new Date(this.timerStop.getTime() - (this.timerStop.getTimezoneOffset() * 60000));

    const sleepRecord: SleepRecord ={
      id: 0,
      sleepStart: timerStartOffset,
      sleepEnd: timerStopOffset
    };

    if(timerDifference >= 60) {
      this.api.addSleep(sleepRecord).subscribe(
        (response) => {
          this._snackbar.open('Sleep record added successfully', 'close', { horizontalPosition: 'center',
        verticalPosition: 'top', duration: 5000});
          this.sleepForm.reset()
        },
        (error) => {
          this._snackbar.open('Something went wrong, record NOT added','close', { horizontalPosition: 'center',
          verticalPosition: 'top', duration: 5000});
        }
      );
    }
    else{
      this._snackbar.open('Record needs to be at least 1 min long, record NOT added','close', { horizontalPosition: 'center',
      verticalPosition: 'top', duration: 5000});
    }
  }

  updateDisplayTime(){
    let currentTime = new Date();
    let timeDifference = (currentTime.getTime() - this.timerStart.getTime()) / 1000;
    let hours = Math.floor(timeDifference / 3600);
    let minutes = Math.floor((timeDifference % 3600) / 60);
    let seconds = Math.floor(timeDifference % 60);
    this.displayTime = this.formatTime(hours) + ':' + this.formatTime(minutes) + ':' + this.formatTime(seconds);
  }

  formatTime(time: number)
  {
      return time < 10 ? '0' + time : time;
  }
}
