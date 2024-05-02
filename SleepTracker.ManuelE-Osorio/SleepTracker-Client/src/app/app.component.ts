import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, provideRouter } from '@angular/router';
import { LogInComponent } from './authorization/log-in/log-in.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LogOutComponent } from './authorization/log-out/log-out.component';
import { routes } from './app.routes';
import { AdminComponent } from './admin/admin/admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AuthorizationComponent } from './authorization/authorization/authorization.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { AuthenticationService } from './services/authentication.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet, 
    RouterLink, 
    LogInComponent, 
    NotificationsComponent, 
    LogOutComponent, 
    RouterLinkActive, 
    AdminComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AuthorizationComponent,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnDestroy{
  
  title = "SleepTracker-Client"
  isLoggedIn : boolean = false;
  isAdmin : boolean = false;
  adminSubscription : Subscription;
  loggedInSubscription : Subscription;

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private authService: AuthenticationService,
  ) 
  {
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/github.svg'));
    iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/linkedin.svg'));
    this.authService.isLoggedIn().subscribe();
    this.authService.getAdmin().subscribe();
    this.loggedInSubscription = this.authService.onStateChanged().subscribe( resp => this.isLoggedIn = resp);
    this.adminSubscription = this.authService.isAdmin2().subscribe( resp => this.isAdmin = resp);
  }

  ngOnDestroy(): void {
    this.adminSubscription.unsubscribe();
    this.loggedInSubscription.unsubscribe();
  }
}
