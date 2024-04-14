import { CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID, Optional } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ThemePalette } from '@angular/material/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SleepInterface } from '../models/sleep-interface';
import { SleepTypeConst } from '../models/SleepTypeConst';

import {
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
  DatetimeAdapter,
  MAT_DATETIME_FORMATS,
  NativeDatetimeAdapter,
  MAT_NATIVE_DATETIME_FORMATS,
} from '@mat-datetimepicker/core';
import { SleepApiServiceService } from '../services/sleep-api-service.service';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule,
    MatGridListModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US',
    },
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter,
    },
    {
      provide: DatetimeAdapter,
      useClass: NativeDatetimeAdapter,
    },
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: MAT_NATIVE_DATETIME_FORMATS,
    },
  ],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss',
})
export class DialogBoxComponent {
  public breakpoint!: number;
  public color: ThemePalette = 'primary';

  action: string;
  local_data: any;
  keys: any[] = [];
  sleepTypes = SleepTypeConst;
  selectedSleepType = SleepTypeConst.Sleep;

  invalidInput: boolean = false;
  errorResponse: string = null;

  displayTimer: string = '00:00:00';
  startTime: Date = new Date();
  endTime: Date = new Date();
  timerStarted: boolean = false;
  timerInterval: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public sleepService: SleepApiServiceService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: SleepInterface
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  public createForm: FormGroup = new FormGroup<{
    startOfSleep: FormControl<Date>;
    endOfSleep: FormControl<Date>;
    typeOfSleep: FormControl<Number>;
  }>({
    startOfSleep: new FormControl(new Date(), Validators.required),
    endOfSleep: new FormControl(new Date(), Validators.required),
    typeOfSleep: new FormControl(null),
  });

  ngOnInit(): void {
    this.keys = Object.entries(this.sleepTypes).map(([key, value]) => ({
      name: key,
      value: value,
    }));
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;

    this.createForm = this.fb.group({
      startOfSleep: [new Date().toISOString()],
      endOfSleep: [new Date().toISOString()],
      selectedSleepType: [''],
    });
  }

  startTimer() {
    this.startTime = new Date();
    this.timerStarted = true;
    this.updateTimer();
    this.timerInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  stopTimer() {
    this.endTime = new Date();
    this.timerStarted = false;
    clearInterval(this.timerInterval);
    this.updateTimer();

    let timeDiff = Math.abs(
      (this.endTime.getTime() - this.startTime.getTime()) / 1000
    );

    const timeStartOffset: Date = new Date(
      this.startTime.getTime() - this.startTime.getTimezoneOffset() * 60000
    );
    const timeEndOffset: Date = new Date(
      this.endTime.getTime() - this.endTime.getTimezoneOffset() * 60000
    );

    const sleepRecord: SleepInterface = {
      id: 0,
      startOfSleep: timeStartOffset,
      endOfSleep: timeEndOffset,
      typeOfSleep: 1,
    };

    if (timeDiff >= 60) {
      this.sleepService.addRecord(sleepRecord).subscribe(() => {
        this.snackBar.open('Sleep has been added', 'close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.createForm.reset();
      });
    } else {
      this.snackBar.open(
        'Less then a minute long, record not saved!',
        'close',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        }
      );
    }
  }

  updateTimer() {
    let currentTime = new Date();
    let currentTimeDiff =
      (currentTime.getTime() - this.startTime.getTime()) / 1000;
    let hours = Math.floor(currentTimeDiff / 3600);
    let minutes = Math.floor((currentTimeDiff % 3600) / 60);
    let seconds = Math.floor(currentTimeDiff % 60);
    this.displayTimer =
      this.formatTime(hours) +
      ':' +
      this.formatTime(minutes) +
      ':' +
      this.formatTime(seconds);
  }

  formatTime(time: number) {
    return time < 10 ? '0' + time : time;
  }

  doAction() {
    if (this.action == 'Add') {
      this.local_data = {
        startOfSleep: this.createForm.controls['startOfSleep'].value,
        endOfSleep: this.createForm.controls['endOfSleep'].value,
        typeOfSleep: this.createForm.controls['selectedSleepType'].value,
      };
    }
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    if (this.action == 'Live') {
      this.dialogRef.close({ event: this.action, data: 'Refresh' });
    } else {
      this.dialogRef.close({ event: 'Cancel' });
    }
  }
}
