import { Component } from '@angular/core';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
})
export class ErrorDialogComponent {
  errors: string[] = this.errorsService.errors;
  constructor(private errorsService: ErrorsService) {}

  retry(): void {
    window.location.reload();
  }
}
