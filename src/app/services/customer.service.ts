import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import Customer from "../models/customer";
import { Guid } from "guid-typescript";
import { concatAll, filter, reduce, map } from "rxjs/operators";
declare var _: any;

@Injectable()
export default class CustomerService {
  private _customers: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  getCustomers(): Observable<Customer[]> {
    setTimeout(() => {
      of(this._cachedCustomers).subscribe(customers => this._customers.next(customers));
    });

    return this._customers.asObservable();
  }

  getCustomer(id: number): Observable<Customer> {
    return of(this._cachedCustomers).pipe(concatAll(), filter(x => x.id == id), map(x => _.cloneDeep(x)));
  }

  lookup(query): Observable<Customer[]> {
    return of(this._cachedCustomers).pipe(
      concatAll(),
      filter(x => (!!x.name && x.name.toLowerCase().includes(query.toLowerCase()))
        || (!!x.email && x.email.toLowerCase().includes(query.toLowerCase()))
        || (!!x.phoneNumber && x.phoneNumber.toLowerCase().includes(query.toLowerCase()))),
      map(x => _.cloneDeep(x)),
      reduce((acc, value) => acc.concat(value), []));
  }

  private _cachedCustomers: Customer[] = [
    new Customer({
      id: 1,
      name: 'Khách lẻ',
      phoneNumber: '0933 096 626'
    }),
    new Customer({
      id: 2,
      name: 'Khách hàng 1',
      phoneNumber: '0933 100 101'
    }),
    new Customer({
      id: 3,
      name: 'Khách hàng 2',
      phoneNumber: '0933 100 102'
    }),
    new Customer({
      id: 4,
      name: 'Khách hàng 3',
      phoneNumber: '0933 100 103'
    }),
    new Customer({
      id: 5,
      name: 'Khách hàng 4',
      phoneNumber: '0933 100 104'
    }),
    new Customer({
      id: 6,
      name: 'Khách hàng 5',
      phoneNumber: '0933 100 105'
    })
  ];
}
