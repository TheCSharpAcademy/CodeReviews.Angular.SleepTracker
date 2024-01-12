import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService extends ErrorHandler {
  private isOpen:boolean = false;
  constructor(private dialog: MatDialog, private ngZone: NgZone) { 
    super();
  }

  override handleError(error: HttpErrorResponse): void {
    this.ngZone.run(() => {
      if(this.isOpen === false){
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          data:error.statusText
        });
        this.isOpen = true;

        dialogRef.afterClosed().subscribe(() => {
          this.isOpen = false;
        })
      }
    });
  }
}
