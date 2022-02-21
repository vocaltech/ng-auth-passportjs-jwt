import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Passportjs JWT Authentication';
  currentConfig = environment.currentConfig;
  subscription!: Subscription;
  username!: string;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.auth.onLogin().subscribe({
      next: (v) => {
        console.log(v.isLogged)
        this.username = v.username
      }
    })
  }

}
