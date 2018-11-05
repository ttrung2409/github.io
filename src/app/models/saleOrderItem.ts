import Product from "./product";

export default class SaleOrderItem {
  public constructor(init?: Partial<SaleOrderItem>) {
    Object.assign(this, init);
  }

  public id: number;
  public orderId: number;
  public productId: number;  
  public qty: number;
  public price: number;    
  public subTotal?: number;
  public discount?: number;
  public tax?: number;

  get total(): number {
    return this.subTotal - this.discount - this.tax;
  }

  public product: Product;
}
