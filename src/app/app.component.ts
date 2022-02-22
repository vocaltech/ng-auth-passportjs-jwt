import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Passportjs JWT Authentication';
  currentConfig = environment.currentConfig;
  subscription!: Subscription;
  username = '';
  isLoggedIn = false

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.auth.onLogin().subscribe({
      next: (v) => {
        this.isLoggedIn = v.isLogged
        this.username = v.username
        
        this.cdr.detectChanges()
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
