import { Injectable } from "@angular/core";
import Invoice from "../models/invoice";
import * as moment from 'moment';
import { Observable} from "rxjs";
import HttpService from "./http.service";
import Customer from "../models/customer";
import PagedResult from "../models/pagedResult";

@Injectable({
  providedIn: 'root'
})
export default class ReportService extends HttpService {
  getIncomeByInvoice(params): Observable<Invoice[]> {
    return super._post('report/incomeByInvoice', params);
  }

  getIncomeSummaryByInvoice(params): Observable<any> {
    return super._post('report/incomeByInvoice/summary', params);
  }

  getIncomeByCustomer(params): Observable<Customer[]> {
    return super._post('report/incomeByCustomer', params);
  }

  getIncomeSummaryByCustomer(params): Observable<any> {
    return super._post('report/incomeByCustomer/summary', params);
  }
}
