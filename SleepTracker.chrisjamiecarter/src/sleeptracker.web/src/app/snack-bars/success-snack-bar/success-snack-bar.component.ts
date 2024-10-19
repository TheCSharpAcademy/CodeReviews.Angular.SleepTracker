import { Component, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-snack-bar',
  standalone: true,
  imports: [],
  templateUrl: './success-snack-bar.component.html',
  styleUrl: './success-snack-bar.component.scss'
})
export class SuccessSnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
}
