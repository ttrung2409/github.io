import HttpService from "./http.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import User from "../models/user";
import Permission from "../models/permission";

@Injectable({
  providedIn: 'root'
})
export default class UserService extends HttpService {
  all(): Observable<User[]> {
    return super._get('user/all');
  }

  get(id: number): Observable<User> {
    return super._get(`user/${id}`);
  }

  save(user: User): Observable<User> {
    return super._post('user', user);
  }

  allPermissions(): Observable<Permission[]> {
    return super._get('user/allPermissions');
  }  
}
