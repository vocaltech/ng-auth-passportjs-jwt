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
  // This will give us access to the form
  @ViewChild("loginform", { static: false }) 
  loginForm!: NgForm;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  onLoginSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    const headers = new HttpHeaders({ 'Content-type': 'application/json' })

    const reqObj = {
      username,
      password
    }

    this.http.post(environment.url_login, reqObj, { headers }).subscribe(
      (response) => {
        console.log(response);
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
