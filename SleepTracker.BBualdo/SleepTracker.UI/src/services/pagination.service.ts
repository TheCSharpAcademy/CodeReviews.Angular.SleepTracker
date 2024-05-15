import { Injectable } from '@angular/core';
import { SleepSession } from '../models/SleepSession';
import { DataService } from './data.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  paginatedSessions: SleepSession[] = [];

  currentPage = 1;
  pageSize = 5;
  pagesAmount = 0;

  constructor(private dataService: DataService) {}

  paginateSessions(filteredSessions?: SleepSession[]) {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    const sessionsToPaginate = filteredSessions
      ? of(filteredSessions)
      : this.dataService.sessions$;

    sessionsToPaginate.subscribe((sessions) => {
      this.paginatedSessions = sessions.slice(startIndex, endIndex);
      this.pagesAmount = Math.ceil(sessions.length / this.pageSize);
      if (this.currentPage > this.pagesAmount) {
        this.previousPage();
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.pagesAmount) {
      this.currentPage++;
      this.paginateSessions();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateSessions();
    }
  }
}
