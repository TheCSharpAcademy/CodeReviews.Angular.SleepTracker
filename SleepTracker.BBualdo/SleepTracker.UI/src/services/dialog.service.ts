import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from '../components/form-dialog/form-dialog.component';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { SleepSession } from '../models/SleepSession';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent);
  }

  openFormDialog(
    type: 'add' | 'update',
    title: string,
    session?: SleepSession,
  ): MatDialogRef<FormDialogComponent> {
    return this.dialog.open(FormDialogComponent, {
      data: {
        type,
        title,
        session,
      },
    });
  }

  openErrorDialog(): MatDialogRef<ErrorDialogComponent> {
    return this.dialog.open(ErrorDialogComponent, {
      disableClose: true,
    });
  }
}
