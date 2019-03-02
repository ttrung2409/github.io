import { Component, OnInit, OnDestroy } from '@angular/core';
import AuthService from './services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
  }

  isAuthenticated: boolean;

  ngOnInit() {
    this._subscription.add(this.authService.isAuthenticated$.subscribe(authenticated => {
      if (!authenticated) {
        let token = sessionStorage.getItem('auth-token');
        if (!token) {
          this.isAuthenticated = false;
          this.router.navigateByUrl('/login');
          return;
        }

        this.authService.authenticateByToken(token).subscribe();
      }
      else {
        this.isAuthenticated = true;        
        this.router.navigateByUrl('/');
      }
    }));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  authorise(permission) {
    return this.authService.authorise(permission);
  }

  signout() {
    this.authService.signout();
    this.router.navigateByUrl('/login');
  }
}
