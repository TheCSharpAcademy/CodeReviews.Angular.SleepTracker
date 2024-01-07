import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { SleepRecord } from './sleep-record';
import { SleepRecordService } from '../sleep-record-service.service';

/**
 * Data source for the SleepTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SleepTableDataSource extends DataSource<SleepRecord> {
  private data = new BehaviorSubject<SleepRecord[]>([]);
  private loadingData = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingData.asObservable();
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private service: SleepRecordService) { super();}

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<SleepRecord[]> {
    return this.data.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.data.complete();
    this.loadingData.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: SleepRecord[]): SleepRecord[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SleepRecord[]): SleepRecord[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data;
  }

  public loadSleepRecords(page: number, limit: number){
    this.loadingData.next(true);
    this.service.getSleepRecords(page, limit)
    .pipe(
      finalize(() => this.loadingData.next(false))
    )
      .subscribe(sleepRecords => {
        this.data.next(sleepRecords);
      })
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
