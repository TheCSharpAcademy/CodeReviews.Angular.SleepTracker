import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appInvalidWakeUpDate]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InvalidInputDateDirective,
      multi: true
    }
  ]
})
export class InvalidInputDateDirective {

  @Input('appInvalidWakeUpDate') invalidInputDate : Date|undefined = undefined;

  constructor() { }

  validate (control:AbstractControl):ValidationErrors | null {
    return this.invalidInputDate ? this.invalidSleepDate(this.invalidInputDate, control) : null; 

  }

  private invalidSleepDate(wakeUpDate: Date, control:AbstractControl) : ValidationErrors | null {
      const controlDate = new Date(control.value);
      const wakeUpDateParsed = new Date(wakeUpDate);
      return wakeUpDateParsed < controlDate ? {tooHighDate:{value: controlDate}} : null
  }
}
