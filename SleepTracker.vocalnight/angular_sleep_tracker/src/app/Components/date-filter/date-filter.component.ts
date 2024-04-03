import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { SleepModel } from '../../Model/SleepModel';
import { MatTableDataSource } from '@angular/material/table';
import { SleepHttpService } from '../../Services/sleep-http.service';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.css'
})
export class DateFilterComponent {

  dateFieldStart: Date = new Date();
  dateFieldEnd: Date = new Date();
  @Output() FilterDate = new EventEmitter<MatTableDataSource<SleepModel>>();

  constructor(private SleepHttp: SleepHttpService) {}

  formatDate(date: Date): number {
    return date.setHours(0, 0, 0, 0);
  }

  onChangeDate() {
    if (this.dateFieldEnd) {
      let dataSource;

      this.SleepHttp.getRecords('sleepers').subscribe({
        next: (records: SleepModel[]) => {
          dataSource = new MatTableDataSource(records.filter(
            sleepRecord =>
              this.formatDate(new Date(sleepRecord.timeStart)) >= this.formatDate(this.dateFieldStart)
              && this.formatDate(new Date(sleepRecord.timeStart)) <= this.formatDate(this.dateFieldEnd)
          ))
        },
        error: (e: any) => console.error("Api error", e)
      });

      this.FilterDate.emit(dataSource);
    }
  }
}
