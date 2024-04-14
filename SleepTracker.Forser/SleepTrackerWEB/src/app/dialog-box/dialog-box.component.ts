import { CommonModule } from '@angular/common';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { Component, Inject, LOCALE_ID, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
  DatetimeAdapter,
  MAT_DATETIME_FORMATS,
  NativeDatetimeAdapter,
  MAT_NATIVE_DATETIME_FORMATS,
} from '@mat-datetimepicker/core';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { SleepInterface } from '../models/sleep-interface';
import { ThemePalette } from '@angular/material/core';
import { SleepTypeConst } from '../models/SleepTypeConst';

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

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: SleepInterface
  ) {
    console.log(data);
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
    this.dialogRef.close({ event: 'Cancel' });
  }
}
