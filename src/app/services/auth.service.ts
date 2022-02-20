import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//TODO: expiresAt w/date-fns
export class AuthService {
  private _isLoggedIn = false;
  private _username = '';

  constructor() { }

  isLoggedIn = () => this._isLoggedIn 
  setLoggedIn = (val: boolean) => this._isLoggedIn = val

  getUsername = () => this._username;
  setUsername = (val: string) => this._username = val

  setLocalStorage(responseObj: any) {
    localStorage.setItem('id_token', responseObj.token)
  }

  logout() {
    this._isLoggedIn = false;
    this._username = '';
    
    localStorage.removeItem('id_token');
  }
}
