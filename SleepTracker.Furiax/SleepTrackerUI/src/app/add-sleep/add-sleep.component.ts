import {Component} from '@angular/core';
import { SleepRecord } from '../sleep-record';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sleep',
  templateUrl: './add-sleep.component.html',
  styleUrl: './add-sleep.component.css',
})

export class AddSleepComponent {
  currentDate = new Date();
  sleepForm!: FormGroup;

  constructor(private api: ApiService, private formBuilder: FormBuilder){
    this.sleepForm = this.formBuilder.group({
      sleepStart: ['', Validators.required],
      sleepEnd: ['', Validators.required]
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
        SleepStart: startSleepOffset,
        SleepEnd: endSleepOffset
      };
      this.api.addSleep(sleepRecord).subscribe(
        (response) => {
          console.log('Sleep record added successfully', response);
          this.sleepForm.reset()
        },
        (error) => {
          console.error('Error adding sleep record:', error);
        }
      );
    }else{
      console.log('Form is invalid. Cannot add the record');
    }
  }
}
