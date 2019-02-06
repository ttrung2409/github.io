import Product from "./product";

export default class InvoiceItem {
  public constructor(init?: Partial<InvoiceItem>) {
    Object.assign(this, init);
  }

  public id: number | string;
  public invoiceId: number | string;
  public productId: number;  
  public qty: number;
  public price: number;
  public cost: number;
  public discount?: number;
  public tax?: number;
  public index?: number;
  public isNew: boolean;
  
  get total(): number {
    return (this.qty * this.price) - (this.discount || 0) - (this.tax || 0);
  }

  get totalCost(): number {
    return this.qty * this.cost;
  }

  public product: Product = new Product();

  static from(src: InvoiceItem) {
    return new InvoiceItem(src);
  }
}
