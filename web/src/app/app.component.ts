import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import AuthService from './services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ScreenLocker from './services/screen-locker';
import * as $ from 'jquery'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private screenLocker: ScreenLocker,
    private el: ElementRef) {
  }

  isAuthenticated: boolean;
  msg: string;

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
 
    this._subscription.add(this.screenLocker.state$.subscribe(state => {
      let _this = this;
      let $screenLocker = $(this.el.nativeElement).find('.screen-locker');
      if (state.locked) {        
        $screenLocker.fadeIn(300, function () {
          $screenLocker.css('display', 'flex');
          _this.msg = state.msg;
        });
      }
      else {
        $(this.el.nativeElement).find('.screen-locker').fadeOut(300);
        this.msg = '';
      }      
    }));
  }

  ngAfterViewInit() {
  
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
