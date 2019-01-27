import { Injectable } from "@angular/core";
import Invoice from "../models/invoice";
import * as moment from 'moment';
import UtilsService from "./utils.service";
import InvoiceItem from "../models/invoiceItem";
import { Observable, of, throwError } from "rxjs";
import CustomerService from "./customer.service";
import { map, groupBy, concatAll, mergeMap, toArray, skipWhile, first } from "rxjs/operators";
import Customer from "../models/customer";

@Injectable()
export default class ReportService {
  constructor(private utils: UtilsService, private customerService: CustomerService) {
  }

  getIncomeByInvoice(): Observable<Invoice[]> {
    return this.customerService.search().pipe(      
      map(customers => {
        let invoices = [];
        for (let i = 0; i < 50; i++) {
          let customer = customers[this.utils.random(0, 5)];
          invoices.push(new Invoice({
            id: i + 1,
            no: (i + 100001).toString(),
            customerId: customer.id,            
            invoiceDate: new Date(),
            items: this.generateInvoiceItems(),
            customer: customer
          }));
        }

        return invoices;
      }),
      first()
    );
  }

  getIncomeByCustomer(): Observable<Customer[]> {
    return this.getIncomeByInvoice().pipe(
      concatAll(),
      groupBy(x => x.customerId),
      mergeMap(group => group.pipe(
        toArray(),
        map(invoices => {
          return Object.assign(invoices[0].customer, {
            income: invoices.reduce((acc, invoice) => acc + invoice.total, 0),
            cost: invoices.reduce((acc, invoice) => acc + invoice.totalCost, 0)
          });          
        })
      )),
      toArray()
    ) 
  }

  private generateInvoiceItems() {
    let count = this.utils.random(1, 10);
    let items = [];
    for (let i = 0; i < count; i++) {
      let price = Math.floor(this.utils.random(20000, 50000) / 1000) * 1000;
      items.push(new InvoiceItem({
        qty: this.utils.random(1, 2),
        price: price,
        cost: Math.floor(price * 2 / 3 / 1000) * 1000
      }));
    }

    return items;
  }
}
