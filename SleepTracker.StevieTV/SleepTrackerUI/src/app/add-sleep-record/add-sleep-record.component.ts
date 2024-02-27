import { NgIf } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule} from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { SleepRecord } from "../sleep-record.model";
import { SleepTrackerDbService } from "../sleep-tracker-db.service";
import moment from 'moment';
@Component({
  selector: 'app-add-sleep-record',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    NgIf,
    MatGridListModule
  ],
  providers: [
    provideMomentDateAdapter(undefined, { useUtc: false }),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  templateUrl: './add-sleep-record.component.html',
  styleUrl: './add-sleep-record.component.css'
})

export class AddSleepRecordComponent {

  sleepRecord: SleepRecord = {
    id: 0,
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now())
  }
  //addSleepRecord!: FormGroup;

  addSleepRecord = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  })

  invalidInput: boolean = false;
  errorResponse: string = '';

  constructor(private sleepService: SleepTrackerDbService, private router: Router) {
  }

  submit() {
    console.log(this.addSleepRecord.value);
    let sleepStart: moment.Moment = moment(this.addSleepRecord.get('startDate')!.value);
    sleepStart = sleepStart.add(moment.duration(this.addSleepRecord.get('startTime')!.value));
    let sleepEnd: moment.Moment = moment(this.addSleepRecord.get('endDate')!.value);
    sleepEnd = sleepEnd.add(moment.duration(this.addSleepRecord.get('endTime')!.value));
    this.sleepRecord.startTime = sleepStart.toDate();
    this.sleepRecord.endTime = sleepEnd.toDate();
    this.sleepService.addSleep(this.sleepRecord)
      .subscribe({
          next: (complete) => {
            console.log(complete);
            this.router.navigate(['/menu'])
          },
          error: (error) => {
            this.invalidInput = true;
            console.log(error);
            if (typeof error.error === 'string')
            {
              this.errorResponse = error.error
            }
            else {
              this.errorResponse = "An invalid input was detected"
            }
          }
        }
      );
  }
}
