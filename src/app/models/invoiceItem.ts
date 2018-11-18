import Product from "./product";

export default class InvoiceItem {
  public constructor(init?: Partial<InvoiceItem>) {
    Object.assign(this, init);
  }

  public id: number | string;
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

  public product: Product = new Product();
}
