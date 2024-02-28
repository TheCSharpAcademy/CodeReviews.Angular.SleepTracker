import { Component, Inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [MatDialogModule, MatButton],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {

  message: string = "Are you sure?"
  confirmationButtonText: string = "Delete"
  cancelButtonText: string = "Cancel"
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private deleteDialog: MatDialogRef<DeleteConfirmationComponent>) {
    if (data) {
      this.message = `Are you sure you want to delete record ${data.sleepRecord.id}?`
    }
  }

  onConfirmClick(): void {
    this.deleteDialog.close(true);
  }

}
