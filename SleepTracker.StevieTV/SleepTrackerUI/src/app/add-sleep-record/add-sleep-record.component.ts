import { NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule} from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { SleepRecord } from "../sleep-record.model";
import { SleepTrackerDbService } from "../sleep-tracker-db.service";
import { MatDatetimepickerModule } from "@mat-datetimepicker/core";
import { MatNativeDatetimeModule } from "@mat-datetimepicker/core";

@Component({
  selector: 'app-add-sleep-record',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDatetimeModule,
    MatDatepickerModule,
    MatDatetimepickerModule,
    MatIconModule,
    NgIf,
    MatGridListModule
  ],
  templateUrl: './add-sleep-record.component.html',
  styleUrl: './add-sleep-record.component.css'
})

export class AddSleepRecordComponent {

  sleepRecord: SleepRecord = {
    id: 0,
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
  }

  addSleepRecord = new FormGroup({
    startDateTime: new FormControl('', Validators.required),
    endDateTime: new FormControl('', Validators.required)
  })

  invalidInput: boolean = false;
  errorResponse: string = '';

  constructor(private sleepService: SleepTrackerDbService, private router: Router) {
  }

  submit() {
    this.sleepRecord.startTime = new Date(this.addSleepRecord.get('startDateTime')!.value || '');
    this.sleepRecord.endTime = new Date(this.addSleepRecord.get('endDateTime')!.value || '');
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
