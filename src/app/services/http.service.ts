import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import PagedResult from '../models/pagedResult';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

const baseUrl = 'http://localhost:3000/api';

@Injectable()
export default class HttpService {  
  constructor(private http: HttpClient) {
  }

  _get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(`${baseUrl}/${url}`, { headers, params });
  }

  _post<T>(url: string, model: T): Observable<T> {
    return this.http.post<T>(`${baseUrl}/${url}`, model, { headers });
  }  

  _put<T>(url: string, model: T): Observable<T> {
    return this.http.put<T>(`${baseUrl}/${url}`, model, { headers });
  }

  _delete(url: string, params?: any): Observable<{}> {    
    return this.http.delete(`${baseUrl}/${url}`, { headers, params });
  }

  _search<T>(url: string, data: any): Observable<PagedResult<T>> {
    return this.http.post<PagedResult<T>>(`${baseUrl}/${url}`, data, { headers });
  }
}
