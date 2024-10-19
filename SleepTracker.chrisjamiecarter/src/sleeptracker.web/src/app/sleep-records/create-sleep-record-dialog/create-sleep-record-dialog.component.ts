import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SleepRecordService } from '../../shared/sleep-record.service';
import { CreateSleepRecord } from '../../shared/create-sleep-record.interface';
import { SuccessSnackBarComponent } from '../../snack-bars/success-snack-bar/success-snack-bar.component';
import { ErrorSnackBarComponent } from '../../snack-bars/error-snack-bar/error-snack-bar.component';
import { finishedDateValidator } from '../../validators/finished-date-validator.directive';

@Component({
  selector: 'app-create-sleep-record-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogModule,
    MatDialogTitle,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-sleep-record-dialog.component.html',
  styleUrl: './create-sleep-record-dialog.component.scss',
})
export class CreateSleepRecordDialogComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  sleepRecordForm!: FormGroup;
  inProgress: boolean = false;

  constructor(
    private sleepRecordService: SleepRecordService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateSleepRecordDialogComponent>
  ) {}

  ngOnInit(): void {
    this.sleepRecordForm = this.formBuilder.group(
      {
        started: ['', Validators.required],
        finished: ['', Validators.required],
      },
      {
        validators: finishedDateValidator,
      }
    );
  }

  onCreate() {
    if (this.sleepRecordForm.hasError('finishedDateInvalid')) {
      // I do not know why this is not working on the form itself. But setting here resolves it.
      this.sleepRecordForm
        .get('finished')
        ?.setErrors({ finishedDateInvalid: true });
    }

    if (this.sleepRecordForm.valid) {
      this.inProgress = true;
      const request: CreateSleepRecord = {
        started: this.sleepRecordForm.value.started,
        finished: this.sleepRecordForm.value.finished,
      };
      this.sleepRecordService.createSleepRecord(request).subscribe((result) => {
        this.inProgress = false;
        if (result) {
          this.openSuccessSnackBar('Sleep created successfully!');
          this.dialogRef.close();
        } else {
          this.openErrorSnackBar('Unable to create Sleep!');
        }
      });
    } else {
      this.sleepRecordForm.markAllAsTouched();
    }
  }

  openErrorSnackBar(message: string) {
    this._snackBar.openFromComponent(ErrorSnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }

  openSuccessSnackBar(message: string) {
    this._snackBar.openFromComponent(SuccessSnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }
}
