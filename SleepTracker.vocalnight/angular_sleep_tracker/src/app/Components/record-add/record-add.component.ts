import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SleepModelForm } from '../../Model/SleepModelForm';
import moment from 'moment';
import { SleepModel } from '../../Model/SleepModel';

@Component({
  selector: 'app-record-add',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule],
  templateUrl: './record-add.component.html',
  styleUrl: './record-add.component.css'
})
export class RecordAddComponent {

  sleepRecordModel: SleepModelForm = new SleepModelForm(0, 0, new Date(), '');
  @Output() newRecord = new EventEmitter<SleepModel>();

  onSubmit() { 

    let startDate = this.sleepRecordModel.dateStart;
    let startTime = this.sleepRecordModel.timeStart;

    let start = moment(startDate + " " + startTime, "YYYY-MM-DD HH:mm");
    let end = moment(startDate + " " + startTime, "YYYY-MM-DD HH:mm");

    end.add(this.sleepRecordModel.time, "hours");
    let time = this.sleepRecordModel.time.length === 1 ? 
      '0' + this.sleepRecordModel.time + ":00:00" : this.sleepRecordModel.time + ":00:00";

    let sleep = new SleepModel(0, start.valueOf(), end.valueOf(), time);

    this.newRecord.emit(sleep);
  }
}
