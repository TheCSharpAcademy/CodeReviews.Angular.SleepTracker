import { Injectable, EventEmitter } from '@angular/core';
import { Record } from '../models/Record';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public recordAdded = new EventEmitter<Record>();
  constructor() {}
}
