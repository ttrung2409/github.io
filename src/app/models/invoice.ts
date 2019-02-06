import InvoiceItem from "./invoiceItem";
import Customer from "./customer";

export default class Invoice {
  public constructor(init?: Partial<Invoice>) {
    Object.assign(this, init);        
  }

  public id: number;
  public no: string;
  public status: string;
  public createdAt: string;
  public updatedAt: string;
  public invoiceDate: string;
  public customerId: number | string;
  public discount?: number;
  public tax?: number;

  public customer: Customer;

  get subTotal(): number {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }

  get total(): number {
    return this.subTotal - (this.discount || 0) - (this.tax || 0);
  }

  get totalCost(): number {
    return this.items.reduce((acc, item) => acc + item.totalCost, 0);
  }

  get profit(): number {
    return this.total - this.totalCost;
  }

  public items: InvoiceItem[] = [];

  static from(src: Invoice) {
    let target = new Invoice(src);
    target.items = [];
    let index = 1;
    for (let item of src.items) {
      item.index = index++;
      target.items.push(new InvoiceItem(item));
    }

    return target;
  }
}


export enum InvoiceStatus {
  New = "New",
  Paid = "Paid"
}
