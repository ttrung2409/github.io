import { Injectable } from "@angular/core";
import Invoice from "../models/invoice";

@Injectable()
export default class RetailService {
  private _invoices: Invoice[] = [];

  save(invoice: Invoice) {
    this._invoices.push(invoice);
  }
}
