import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
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

    this.http.post('http://localhost:4500/api/users/register', reqObj, { headers }).subscribe(
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
