import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SleepService } from '../sleep.service';
import { formatDate, NgIf } from '@angular/common';
import { CardComponent } from '../shared/card/card.component';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-inputForm',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CardComponent,
    NgIf
  ],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormComponent {
  private _snackBar = inject(MatSnackBar);

  sleepTime = 0;

  get formDate(){ return this.sleepData.get('date')}
  get formHours(){ return this.sleepData.get('hours')}
  get formMinutes(){ return this.sleepData.get('minutes')}
  get formSeconds() { return this.sleepData.get('seconds')}

  sleepData = new FormGroup({
    date: new FormControl(Date(),[
     maxDateToday     
    ]),
    hours: new FormControl('0',[
      Validators.min(0)
    ]),
    minutes: new FormControl('0',[
      Validators.max(59),
      Validators.min(0)
    ]),
    seconds: new FormControl('0',[
      Validators.max(59),
      Validators.min(0)
    ]),
  });
  constructor(public sleepService: SleepService) {}
  @ViewChild('sleepForm') sleepForm?:ElementRef<HTMLFormElement>;

  handleSubmit() {
    const date = this.sleepData.get('date')?.value;
    const hours = this.sleepData.get('hours')?.value;
    const minutes = this.sleepData.get('minutes')?.value;
    const seconds = this.sleepData.get('seconds')?.value;
    this.sleepTime = +seconds! + +minutes! * 60 + +hours! * 3600;
    this.sleepService.addSleepRecord({
        id: '',
        date: formatDate(date!, 'yyyy-MM-dd', 'en'),
        sleepTime: this.sleepTime,
      })
      .subscribe({
        next: (resData) => {
          this.sleepService.sleepRecords.set([
            resData,
            ...this.sleepService.sleepRecords(),
          ]);
          this.sleepService.totalRecords.set(
            this.sleepService.totalRecords() + 1
          );
          this._snackBar.open('Sleep logged!', 'Dismiss', {
            duration: 3000
          });
        },
        error: (err) => {this._snackBar.open(`Failed!`, 'Dismiss', {
          duration: 3000
        });},
      });

    this.sleepForm?.nativeElement.reset();
   }
 
}

function maxDateToday(control: AbstractControl): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(23,59,59, 0);
  return selectedDate > today ? { maxDate: true } : null;
}