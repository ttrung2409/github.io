import { Injectable } from "@angular/core";
import Invoice from "../models/invoice";
import HttpService from "./http.service";
import { Observable } from "rxjs";
import Payment from "../models/payment";

@Injectable()
export default class InvoiceService extends HttpService {
  get(id): Observable<Invoice> {
    return super._get(`invoice/${id}`);
  }

  save(invoice: Invoice): Observable<Invoice> {
    return invoice.id > 0 ? super._put('invoice', invoice) : super._post('invoice', invoice);
  }

  lookup(query: string): Observable<Invoice[]> {
    return super._get<Invoice[]>('invoice/lookup', { query });
  }  
}
