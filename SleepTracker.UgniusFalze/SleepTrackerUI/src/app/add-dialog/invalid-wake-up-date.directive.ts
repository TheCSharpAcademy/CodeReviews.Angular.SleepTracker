import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appInvalidSleepDate]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InvalidWakeUpDateDirective,
      multi: true
    }
  ]
})
export class InvalidWakeUpDateDirective {

  @Input('appInvalidSleepDate') sleepDate : Date|undefined = undefined;

  constructor() { }

  validate (control:AbstractControl):ValidationErrors | null {
    return this.sleepDate ? this.invalidSleepDate(this.sleepDate, control) : null; 

  }

  private invalidSleepDate(sleep: Date, control:AbstractControl) : ValidationErrors | null {
      const controlDate = new Date(control.value);
      const sleepDateParsed = new Date(sleep);
      return sleepDateParsed > controlDate ? {tooHighDate:{value: controlDate}} : null
  }

}
