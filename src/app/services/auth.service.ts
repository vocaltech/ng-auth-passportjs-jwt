import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//TODO: expiresAt w/date-fns
export class AuthService {
  constructor() { }

  setLocalStorage(responseObj: any) {
    localStorage.setItem('id_token', responseObj.token)
  }
}
