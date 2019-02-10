import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import Customer, { CustomerType } from "../models/customer";
import { Guid } from "guid-typescript";
import { concatAll, filter, reduce, map, toArray, skipWhile } from "rxjs/operators";
import * as _ from 'lodash'
import HttpService from "./http.service";
import PagedResult from "../models/pagedResult";

@Injectable()
export default class CustomerService extends HttpService {
  search(params?: any): Observable<PagedResult<Customer>> {
    return this._search('customer/search', params);
  }

  get(id: number): Observable<Customer> {
    return super._get<Customer>(`customer/${id}`);
  }

  lookup(query: string): Observable<Customer[]> {
    return super._get<Customer[]>('customer/lookup', { query });
  }

  save(customer: Customer): Observable<Customer> {
    return customer.id > 0 ? super._put('customer', customer) : super._post('customer', customer);
  }

  delete(id: number): Observable<void> {
    return super._delete(`customer/${id}`);
  }

  allTypes(): Observable<CustomerType[]> {
    return super._get('customer/allTypes');
  }
}
