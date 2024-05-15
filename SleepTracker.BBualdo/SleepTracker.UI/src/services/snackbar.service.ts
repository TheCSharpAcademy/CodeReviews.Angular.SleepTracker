import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  snackbarLog(message: string) {
    this.snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      panelClass: ['snackbar'],
      duration: 2000,
    });
  }
}
