import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Account, AccountDto } from "../models/account";
import { BehaviorSubject, Observable, Subject, asyncScheduler, catchError, map, of, scheduled, subscribeOn, tap } from "rxjs";
import { NotificationsService } from "./notifications.service";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
    ) { }

  private _authStateChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private _accountInfo: Subject<AccountDto | null> = new BehaviorSubject<AccountDto | null>(null);
  private _isAdmin: Subject<boolean> = new BehaviorSubject<boolean>(false);

  public onStateChanged() {
    return this._authStateChanged.asObservable();
  }

  public accountInfo() {
    return this._accountInfo.asObservable();
  }

  public isAdmin2() {
    return this._isAdmin.asObservable();
  }

  public logIn(account: Account) : Observable<any> {
    return this.http.post<any>(`/login?useCookies=true`, account, {
      observe: 'response'
    }).pipe(
      tap( {next: () => this.log(`Logged in succesfully`, `success`)}),
      catchError( this.logError<any>(false)),
      map( (res) => {
        if(res.status == 200){
          this._authStateChanged.next(true);
          this.getInfo().subscribe();
        }
        return res
    }));
  }

  public logOut() : Observable<any> {
    return this.http.post<any>(`/logout`, {}, {
      withCredentials: true,
      observe: 'response',
      responseType: 'json'
    }).pipe(
      tap( {next: () => this.log(`Logged out succesfully`, `success`)}),
      catchError( this.logError<any>(true)),
      map( (res) => {
        if( res.status == 200){
          this._authStateChanged.next(false);
        }
        return res;
      })
    );    
  }

  public getInfo() : Observable<AccountDto | null> {
    return this.http.get<AccountDto | null>('/manage/info', {
      withCredentials: true,
      responseType: 'json'
    }).pipe(
      tap( {next: () => this.log('Fetching user data', 'success')}),
      catchError( () => scheduled([null], asyncScheduler)),
      map( (res) => {     
        
        this._accountInfo.next(res);
        return res
      })
    )
  }

  public isLoggedIn() : Observable<boolean> {
    return this.http.get<AccountDto | null >('/manage/info', {
      withCredentials: true,
      responseType: 'json'
    }).pipe(
      tap( {next: () => this.log(`User is logged in`, `success`)}),
      catchError( () => scheduled([null], asyncScheduler) ),
      map((resp) => {
        if( resp!= null && resp.email.length > 0 ){
            this._authStateChanged.next(true);
            return true;
          }
        this._authStateChanged.next(false);
        return false;
      })
    );
  }

  public getAdmin() : Observable<boolean> {
    return this.http.get<boolean>('/role', {
      withCredentials: true,
      responseType: 'json'
    }).pipe(
      tap( {next: () => this.log(`Admin Request`, `success`)}),
      catchError( () => scheduled([false], asyncScheduler)),
      map( (res) => {     
        this._isAdmin.next(res);
        return res
      })      
    )
  }

  private log(message: string, type: string) {
    this.notificationService.add( message, type);
  }

  private logError<T>( status: boolean){
    return (error: any): Observable<T> => {
      this._authStateChanged.next(status);
      this.log(`Unable to complete operation, please try again later. Error code: ${error.status}`, 'error');
      return scheduled([[] as T], asyncScheduler);
    };
  }
}