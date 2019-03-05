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
  getIncomeByInvoice(params): Observable<any> {
    return super._post('report/incomeByInvoice', params);
  }

  getIncomeSummaryByInvoice(params): Observable<any> {
    return super._post('report/incomeByInvoice/summary', params);
  }

  getIncomeByCustomer(params): Observable<PagedResult<Customer>> {
    return super._post('report/incomeByCustomer', params);
  }  
}
