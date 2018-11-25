import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import Customer from "../models/customer";
import { Guid } from "guid-typescript";
import { concatAll, filter, reduce, map, toArray, skipWhile } from "rxjs/operators";
import * as _ from 'lodash'

@Injectable()
export default class CustomerService {
  private _customers: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  getCustomers(): Observable<Customer[]> {
    setTimeout(() => {
      this.getCustomerTypes().subscribe(types => {
        of(this._cachedCustomers).pipe(
          concatAll(),
          map(customer => Object.assign(customer, { type: types.find(x => x.id == customer.typeId) })),
          toArray()
        ).subscribe(customers => this._customers.next(customers));
      });      
    });

    return this._customers.asObservable().pipe(skipWhile(customers => customers.length == 0));
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
      toArray());      
  }

  getCustomerTypes(): Observable<any[]> {
    return of([{ id: 1, name: 'Khách lẻ' }, { id: 2, name: 'Khách sỉ' }]);
  }

  save(customer: Customer) {
    this.getCustomerTypes().subscribe(types => {
      let oldCustomer = this._cachedCustomers.find(x => x.id == customer.id);
      if (!!oldCustomer) {
        Object.assign(oldCustomer, customer, { type: types.find(x => x.id == customer.typeId) });
      }
      else {
        this._cachedCustomers.push(Object.assign(customer, {
          id: Guid.create().toString(),
          type: types.find(x => x.id == customer.typeId)
        }));
      }
      
      this._customers.next(this._cachedCustomers);
    });
  }

  private _cachedCustomers: Customer[] = [
    new Customer({
      id: 1,
      name: 'Khách lẻ',
      phoneNumber: '0933 096 626',
      typeId: 1
    }),
    new Customer({
      id: 2,
      name: 'Khách hàng 1',
      phoneNumber: '0933 100 101',
      typeId: 1
    }),
    new Customer({
      id: 3,
      name: 'Khách hàng 2',
      phoneNumber: '0933 100 102',
      typeId: 1
    }),
    new Customer({
      id: 4,
      name: 'Khách hàng 3',
      phoneNumber: '0933 100 103',
      typeId: 1
    }),
    new Customer({
      id: 5,
      name: 'Khách hàng 4',
      phoneNumber: '0933 100 104',
      typeId: 1
    }),
    new Customer({
      id: 6,
      name: 'Khách hàng 5',
      phoneNumber: '0933 100 105',
      typeId: 1
    })
  ];
}
