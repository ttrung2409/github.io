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
  }

  getIncomeByCustomer(): Observable<Customer[]> {
     
  }  
}
