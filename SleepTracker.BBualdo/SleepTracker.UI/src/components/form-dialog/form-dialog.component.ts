import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, formatDate } from '@angular/common';
import { SleepSessionAddDTO } from '../../models/SleepSessionAddDTO';
import { SleepSessionsService } from '../../services/sleep-sessions.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';
import { SleepSession } from '../../models/SleepSession';
import { SleepSessionUpdateDTO } from '../../models/SleepSessionUpdateDTO';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, MatError, NgClass],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent {
  today = formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en-US');
  title = this.data.title;
  buttonText = this.data.type;

  formGroup: FormGroup = new FormGroup({
    startTime: new FormControl<string>(
      this.data.session
        ? formatDate(
            this.data.session?.startTime,
            'yyyy-MM-dd HH:mm',
            'en-US',
            'UTC',
          )
        : '',
      [Validators.required],
    ),
    endTime: new FormControl<string>(
      this.data.session
        ? formatDate(
            this.data.session?.endTime,
            'yyyy-MM-dd HH:mm',
            'en-US',
            'UTC',
          )
        : '',
      [Validators.required],
    ),
  });

  constructor(
    private sessionsService: SleepSessionsService,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: 'add' | 'update';
      title: string;
      session?: SleepSession;
    },
  ) {}

  submit() {
    if (this.formGroup.valid) {
      this.data.type === 'add' ? this.addSession() : this.updateSession();
    }
  }

  private updateSession() {
    const session: SleepSessionUpdateDTO = {
      id: this.data.session!.id,
      startTime: this.formatToISO(this.formGroup.value.startTime),
      endTime: this.formatToISO(this.formGroup.value.endTime),
    };

    this.dialogRef.close(this.sessionsService.updateSession(session));
  }

  private addSession() {
    const session: SleepSessionAddDTO = {
      startTime: this.formatToISO(this.formGroup.value.startTime),
      endTime: this.formatToISO(this.formGroup.value.endTime),
    };
    this.dialogRef.close(this.sessionsService.addSession(session));
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private formatToISO(date: string | Date): string {
    return formatDate(date, 'yyyy-MM-ddTHH:mm:ss.000', 'en-US') + 'Z';
  }
}
