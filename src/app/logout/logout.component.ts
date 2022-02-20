import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {
  logout_message = 'You are logged out successfully, you\'ll be redirected in 5s...'

  constructor(
    private auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.auth.logout();

    setTimeout(() => { 
      this._router.navigate(['login']); 
    }, 5000)
  }
}
