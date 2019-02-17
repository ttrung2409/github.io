import { Injectable } from "@angular/core";
import Invoice from "../models/invoice";
import * as moment from 'moment';
import { Observable} from "rxjs";
import HttpService from "./http.service";
import Customer from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export default class ReportService extends HttpService {
  getIncomeByInvoice(params): Observable<Invoice[]> {
    return super._post('report/incomeByInvoice', params);
  }

  getIncomeByCustomer(params): Observable<Customer[]> {
    return super._post('report/incomeByCustomer', params);
  }  
}
