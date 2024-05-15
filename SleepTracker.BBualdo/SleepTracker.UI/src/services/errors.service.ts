import { Injectable } from '@angular/core';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  errors: string[] = [];

  constructor(private dialogService: DialogService) {}

  add(error: string) {
    this.errors.push(error);
  }

  openDialog() {
    this.clear();
    this.dialogService.openErrorDialog();
  }

  clear() {
    this.errors = [];
  }
}
