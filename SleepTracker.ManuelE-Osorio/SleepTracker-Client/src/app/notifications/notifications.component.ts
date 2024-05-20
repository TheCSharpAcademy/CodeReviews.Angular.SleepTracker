import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NotificationsService } from '../services/notifications.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NgFor, 
    NgIf,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './notifications.component.html'
})

export class NotificationsComponent {

  constructor(
    public notificationService: NotificationsService,
    private _snackBar: MatSnackBar
    ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
