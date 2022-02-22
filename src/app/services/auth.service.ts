import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//TODO: expiresAt w/date-fns
export class AuthService {
  private _isLoggedIn = false;
  private _username = '';
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
    localStorage.setItem('id_token', responseObj.token)
  }

  logout() {
    this._isLoggedIn = false;
    this._username = '';

    // notify observers
    this.setLoggedIn(false)
    
    localStorage.removeItem('id_token');
  }
}
