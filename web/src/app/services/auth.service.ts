import HttpService from "./http.service";
import { Observable, of, BehaviorSubject } from "rxjs";
import User from "../models/user";
import { Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs/operators";
import Permission from "../models/permission";

@Injectable({
  providedIn: 'root',
})
export default class AuthService extends HttpService {
  private _permissions: Permission[] = [];

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user: User;

  authenticate(username, password): Observable<boolean> {
    return super._post('auth', { username, password }).pipe(
      tap((result: any) => {
        if (result.valid) {
          sessionStorage.setItem('auth-token', result.token);
          this.isAuthenticated$.next(result.valid);
          this.user = result.user;
          this._permissions = result.permissions;
          this.isAuthenticated$.next(result.valid);
        }        
      }),
      switchMap((result: any) => of(result.valid)));
  }

  authenticateByToken(token): Observable<boolean> {
    return super._post('auth', { token }).pipe(
      tap((result: any) => {
        if (result.valid) {
          sessionStorage.setItem('auth-token', token);
          this.user = result.user;
          this._permissions = result.permissions;
          this.isAuthenticated$.next(result.valid);
        }        
      }),
      switchMap((result: any) => of(result.valid)));
  }

  authorise(permission): boolean {
    return this._permissions.some(x => x == permission);
  }

  signout() {
    sessionStorage.removeItem('auth-token');
    this.user = null;
    this._permissions = [];    
    this.isAuthenticated$.next(false);
  }
}
