import HttpService from "./http.service";
import { Observable } from "rxjs";
import User from "../models/user";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export default class AuthService extends HttpService {
  authenticate(username, password): Observable<string> {
    return super._post('auth', { username, password });
  }

  authorise(permission): Observable<boolean> {    
    let token = sessionStorage.getItem('auth-token');
    return super._get<User>('auth', { token });
  }
}
