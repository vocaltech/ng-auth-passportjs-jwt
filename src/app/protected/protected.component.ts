import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})

export class ProtectedComponent implements OnInit {
  unauthorizedMessage = '';
  isLoggedIn = false;
  username = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn()

    if (this.isLoggedIn) {
      this.username = this.auth.getUsername();
      console.log(`logged true - access granted for ${this.username}`)

      // check if token is expired
      const isTokenExpired = this.auth.isTokenExpired()
      console.log(`[protected.component] isTokenExpired: ${isTokenExpired}`)

      if (isTokenExpired) {
        this.auth.logout();
        this._router.navigate(['login'])
      }
    } else {
      console.log('logged false - check access from server!')
      this.checkAccessFromServer()
    }
  }

  private checkAccessFromServer = () => {
    this.http.get(environment.url_protected).subscribe(
      (response: any) => {
        console.log(response)
        this.unauthorizedMessage = response.message
        this.isLoggedIn = true
      }, 
      (error: any) => {
        console.log(error)
        error.status === 401 ? this.unauthorizedMessage = error.statusText: this.unauthorizedMessage = error.message
      },
      () => {
        console.log('Http done !')
      }
    )
  }
}
