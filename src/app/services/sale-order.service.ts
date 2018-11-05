import { Injectable } from "@angular/core";
import SaleOrder from "../models/saleOrder";

@Injectable()
export default class SaleOrderService {
  private _orders: SaleOrder[] = [];  
}
