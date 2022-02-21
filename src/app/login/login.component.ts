import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { AuthService } from '../services/auth.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLoggedIn = false;
  username = '';

  // This will give us access to the form
  @ViewChild("loginform", { static: false }) 
  loginForm!: NgForm;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn()
    this.username = this.auth.getUsername()

    console.log(`onInit: username: ${this.username} - isLoggedIn: ` + this.auth.isLoggedIn())
  }

  onLoginSubmit() {
    const _username = this.loginForm.value.username;
    const _password = this.loginForm.value.password;

    const headers = new HttpHeaders({ 'Content-type': 'application/json' })

    const reqObj = {
      username: _username,
      password: _password
    }

    this.http.post(environment.url_login, reqObj, { headers }).subscribe(
      (response) => {
        console.log(response);

        this.isLoggedIn = true;
        this.username = _username as string

        this.auth.setUsername(this.username);
        this.auth.setLoggedIn(true)
        this.auth.setLocalStorage(response)
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('done!');
      }
    )
  }
}
