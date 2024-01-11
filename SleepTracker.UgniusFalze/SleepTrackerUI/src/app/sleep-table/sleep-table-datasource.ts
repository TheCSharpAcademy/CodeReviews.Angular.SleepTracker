import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { SleepRecord } from './sleep-record';
import { SleepRecordService } from '../sleep-record-service.service';

export class SleepTableDataSource extends DataSource<SleepRecord> {
  private data = new BehaviorSubject<SleepRecord[]>([]);
  private loadingData = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingData.asObservable();
  paginator: MatPaginator | undefined;

  constructor(private service: SleepRecordService) { super();}

  connect(): Observable<SleepRecord[]> {
    return this.data.asObservable();
  }

  disconnect(): void {
    this.data.complete();
    this.loadingData.complete();
  }

  public loadSleepRecords(page: number, limit: number, date?:Date){
    this.loadingData.next(true);
    this.service.getSleepRecords(page, limit, date)
    .pipe(
      finalize(() => this.loadingData.next(false))
    )
      .subscribe(sleepRecords => {
        this.data.next(sleepRecords);
      })
  }
}
