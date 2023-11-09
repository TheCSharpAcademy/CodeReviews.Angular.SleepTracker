import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Record } from 'src/app/models/Record';
import { SleepTrackerService } from 'src/app/services/sleep-tracker.service';
import { Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  form = new FormGroup({
    id: new FormControl(0),
    date: new FormControl(new Date().toISOString().slice(0, 10)),
    hours: new FormControl('4'),
  });

  @Output() onRecordAdded = new EventEmitter<Record>();

  constructor(
    private sleepService: SleepTrackerService,
    private sharedService: SharedService
  ) {}

  onSubmit() {
    const record: Record = {
      id: +this.form.value.id!,
      date: new Date(this.form.value.date!),
      hours: +this.form.value.hours!,
    };

    this.sleepService.addRecord(record).subscribe((record) => {
      this.sharedService.recordAdded.emit(record);
    });
  }
}
