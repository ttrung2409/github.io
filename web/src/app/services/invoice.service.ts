import { Injectable } from "@angular/core";
import Invoice from "../models/invoice";
import HttpService from "./http.service";
import { Observable } from "rxjs";
import Payment from "../models/payment";
import AuthService from "./auth.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export default class InvoiceService extends HttpService {
  constructor(http: HttpClient, private authService: AuthService) {
      super(http);
  }

  get(id): Observable<Invoice> {
    return super._get(`invoice/${id}`);
  }

  save(invoice: Invoice): Observable<Invoice> {
    if (invoice.id > 0) {
      invoice.updatedBy = this.authService.user.id;
      return super._put('invoice', invoice);
    }
    else {
      invoice.createdBy = this.authService.user.id;
      return super._post('invoice', invoice);
    }
  }

  lookup(query: string): Observable<Invoice[]> {
    return super._get<Invoice[]>('invoice/lookup', { query });
  }

  cancel(id): Observable<any> {
    return super._put('invoice/cancel', { id });
  }
}
