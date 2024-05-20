import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { Account, AccountForm } from '../../models/account';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent implements OnInit{
  
  loggedIn: boolean = false;
  logInFailed: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,    
  ){}

  logOut() {
    this.authenticationService.logOut().subscribe( resp => {
      console.log(resp)
      if( resp.status == 200){
        this.authenticationService.isLoggedIn().subscribe();
        this.authenticationService.getAdmin().subscribe();
        this.loggedIn = false;
        this.logInFailed = false;
        this.router.navigate(['/signin']);
      }
    });
  }

  ngOnInit(): void {
  }
}
