import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AccountDto } from '../../models/account';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LogOutComponent } from '../log-out/log-out.component';
import { LogInComponent } from '../log-in/log-in.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatButtonModule,
    LogOutComponent,
    LogInComponent,
    RouterLink
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent implements OnDestroy{

  constructor(
    private authenticationService: AuthenticationService,
    public logInDialog: MatDialog
  ) {
    this.authenticationService.isLoggedIn().subscribe();
    this.authenticationService.getInfo().subscribe();
    this.accountInfoSubscription = this.authenticationService.accountInfo().subscribe( resp => this.UserInfo = resp);
    this.loggedInSubscription = this.authenticationService.onStateChanged().subscribe( resp => this.isLoggedIn = resp);
  }

  isLoggedIn : boolean = false;
  UserInfo: AccountDto | null = null;
  @Input() reload: boolean = false;
  accountInfoSubscription: Subscription;
  loggedInSubscription: Subscription;

  ngOnDestroy(): void {
    this.accountInfoSubscription.unsubscribe();
    this.loggedInSubscription.unsubscribe();
  }

  logInDialogOpen() {
    this.logInDialog.open(LogInComponent, {
      width: '400px',
      enterAnimationDuration: '400',
      exitAnimationDuration: '400',
    })
  }
}
