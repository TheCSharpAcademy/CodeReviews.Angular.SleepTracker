import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SleepRecordsComponent } from '../sleep-records/sleep-records.component';
import { SleepService } from '../sleep.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent {
  private _snackBar = inject(MatSnackBar);
  readonly dialogRef = inject(MatDialogRef<SleepRecordsComponent>);
  logId: string = inject(MAT_DIALOG_DATA).sleepTime;
  pageSize:number=inject(MAT_DIALOG_DATA).pageSize;

  constructor(public sleepService: SleepService) {}

  onConfirm() {
    console.log(this.logId);
    this.sleepService.deleteSleepRecord(this.logId).subscribe({
      next: (resData) => {
        this.sleepService.getSleepRecords(1, this.pageSize).subscribe({
          next: (resData) => {
            const { logs, logsCount } = resData;
            this.sleepService.sleepRecords.set([...logs]);
            console.log('Total log count:', logsCount);
            this.sleepService.totalRecords.set(logsCount);
          }          
        });
        this._snackBar.open('Sleep deleted!', 'Dismiss', {
          duration: 1000
        });
      },
      error: (err) => {this._snackBar.open(`Failed!`, 'Dismiss', {
        duration: 3000
      });},
    });
  }
}
