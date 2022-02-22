import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  // This will give us access to the form
  @ViewChild("registerform", { static: false })
  registerForm!: NgForm

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onRegisterSubmit() {
    const username = this.registerForm.value.username
    const password = this.registerForm.value.password

    const headers = new HttpHeaders({ 'Content-type': 'application/json' })

    const reqObj = {
      username,
      password
    };

    this.http.post(environment.url_register, reqObj, { headers }).subscribe(
      (response) => {
        console.log(response);
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
