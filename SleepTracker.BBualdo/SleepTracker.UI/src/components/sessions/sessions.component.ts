import { Component, OnInit } from '@angular/core';
import { SleepSession } from '../../models/SleepSession';
import { Observable, filter, map, tap } from 'rxjs';
import { SleepSessionsService } from '../../services/sleep-sessions.service';
import { AsyncPipe, NgClass, formatDate } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogService } from '../../services/dialog.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationService } from '../../services/pagination.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sessions',
  standalone: true,
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss',
  imports: [
    AsyncPipe,
    MatIconModule,
    RouterLink,
    BackButtonComponent,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NgClass,
  ],
})
export class SessionsComponent implements OnInit {
  sessions$: Observable<SleepSession[]> = this.dataService.sessions$;

  constructor(
    private sleepSessionsService: SleepSessionsService,
    private dialogService: DialogService,
    public paginationService: PaginationService,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.paginationService.paginateSessions();
  }

  filterByDate(date: string) {
    this.dataService.sessions$
      .pipe(
        map((sessions) =>
          sessions.filter((session) =>
            String(session.startTime).includes(date),
          ),
        ),
      )
      .subscribe((filteredSessions) => {
        this.paginationService.paginateSessions(filteredSessions);
      });
  }

  getDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);

    return hours ? `${hours}h ` + `${minutes}m` : minutes + ' m';
  }

  formatDate(date: Date | string, format: string, locale: string): string {
    return formatDate(date, format, locale, 'UTC');
  }

  confirmDelete(session: SleepSession) {
    this.dialogService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.deleteSession(session);
        }
      });
  }

  openFormDialog(
    type: 'add' | 'update',
    title: string,
    session?: SleepSession,
  ) {
    this.dialogService
      .openFormDialog(type, title, session)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          res.subscribe({
            next: () => {
              this.sleepSessionsService
                .getSessions()
                .subscribe((sessions) =>
                  this.dataService.sessionsSubject.next(sessions),
                );
            },
          });
        }
      });
  }

  private deleteSession(session: SleepSession) {
    this.sleepSessionsService.deleteSession(session).subscribe(() => {
      this.sleepSessionsService.getSessions().subscribe((sessions) => {
        this.dataService.sessionsSubject.next(sessions);
      });

      this.paginationService.paginateSessions();
    });
  }
}
