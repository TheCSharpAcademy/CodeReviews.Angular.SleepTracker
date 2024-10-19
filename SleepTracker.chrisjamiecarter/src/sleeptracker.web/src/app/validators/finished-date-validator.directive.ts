import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

Directive({
  selector: '[appFinishedDateValidator]',
  standalone: true,
});
export const finishedDateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const started = control.get('started')?.value;
  const finished = control.get('finished')?.value;

  return started && finished && new Date(finished) <= new Date(started)
    ? { finishedDateInvalid: true }
    : null;
};
