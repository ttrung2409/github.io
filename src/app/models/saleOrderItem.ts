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
  public discount?: number;
  public tax?: number;
  public index?: number;

  get total(): number {
    return (this.qty * this.price) - (this.discount || 0) - (this.tax || 0);
  }  

  public product: Product;
}