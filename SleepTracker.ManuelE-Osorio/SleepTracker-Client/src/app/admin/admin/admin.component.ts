import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SleepLogsListAdminComponent } from '../sleep-logs-list-admin/sleep-logs-list-admin.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationsComponent } from '../../notifications/notifications.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink,
    MatGridListModule,
    SleepLogsListAdminComponent,
    NotificationsComponent,
    MatDividerModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
