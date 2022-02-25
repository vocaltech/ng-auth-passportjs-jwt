import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import ms from 'ms'
import addMilliseconds from 'date-fns/addMilliseconds'
import isBefore from 'date-fns/isBefore'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _isLoggedIn!: boolean;
  private _username!: string;
  private subject = new Subject<any>();

  constructor() { }

  isLoggedIn = () => this._isLoggedIn 

  setLoggedIn = (val: boolean) => {
    this._isLoggedIn = val

    // notify observers
    this.subject.next({
      isLogged: this._isLoggedIn,
      username: this._username
    })
  }

  onLogin = (): Observable<any> => {
    // limit subject as observable 
    // avoid doing next() method from outside
    return this.subject.asObservable();
  }

  getUsername = () => this._username;
  setUsername = (val: string) => this._username = val

  setLocalStorage(responseObj: any) {
    const expiresInMs = ms(responseObj.expiresIn as string)
    const expiresAt = addMilliseconds(Date.now(), expiresInMs)

    localStorage.setItem('id_token', responseObj.token)
    localStorage.setItem('expiresAt', new Date(expiresAt).toISOString())
  }

  isTokenExpired() {
    const now = Date.now()
    const expiresAt = localStorage.getItem('expiresAt') as string
    const expiresDate = Date.parse(expiresAt)

    console.log(`now: ${now} - expiresDate: ${expiresDate}`)

    if (isBefore(now, expiresDate)) {
      return false
    } 

    return true
  }

  logout() {
    this._isLoggedIn = false;
    this._username = '';

    // notify observers
    this.setLoggedIn(false)
    
    localStorage.removeItem('id_token');
    localStorage.removeItem('expiresAt')
  }
}
