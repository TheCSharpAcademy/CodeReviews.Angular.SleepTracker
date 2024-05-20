import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { NotificationMessage } from '../models/sleep-logs';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  constructor() { }

  messages: NotificationMessage[] = [];


  add(message: string, type: string) {
    this.messages.push( { message: message, type: type} );
    timer(3000).subscribe(n => {
      this.remove();
    });
  }

  remove() {
    this.messages.shift()
  }
  
  clear() {
    this.messages = [];
  }
}
