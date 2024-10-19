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
  MAT_DIALOG_DATA,
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
import { SuccessSnackBarComponent } from '../../snack-bars/success-snack-bar/success-snack-bar.component';
import { ErrorSnackBarComponent } from '../../snack-bars/error-snack-bar/error-snack-bar.component';

@Component({
  selector: 'app-delete-sleep-record-dialog',
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
  templateUrl: './delete-sleep-record-dialog.component.html',
  styleUrl: './delete-sleep-record-dialog.component.scss',
})
export class DeleteSleepRecordDialogComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  data = inject(MAT_DIALOG_DATA);
  sleepRecordForm!: FormGroup;
  inProgress: boolean = false;

  constructor(
    private sleepRecordService: SleepRecordService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DeleteSleepRecordDialogComponent>
  ) {}

  ngOnInit(): void {
    this.sleepRecordForm = this.formBuilder.group({
      started: this.data.started,
      finished: this.data.finished,
    });
  }

  onDelete() {
    if (this.sleepRecordForm.valid) {
      this.inProgress = true;
      this.sleepRecordService
        .deleteSleepRecord(this.data.id)
        .subscribe((result) => {
          this.inProgress = false;
          if (result) {
            this.openSuccessSnackBar('Sleep deleted successfully!');
            this.dialogRef.close();
          } else {
            this.openErrorSnackBar('Unable to delete Sleep!');
          }
        });
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
