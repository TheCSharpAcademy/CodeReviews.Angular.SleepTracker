import { Component } from '@angular/core';
import { SleepLogSessionComponent } from '../sleep-log-session/sleep-log-session.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { SleepLogsListComponent } from '../../user/sleep-logs-list/sleep-logs-list.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet, 
    SleepLogSessionComponent,
    RouterLink,
    MatGridListModule,
    SleepLogsListComponent,
    NotificationsComponent,
    MatDividerModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
