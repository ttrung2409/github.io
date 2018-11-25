import InvoiceItem from "./invoiceItem";
import Customer from "./customer";

export default class Invoice {
  public constructor(init?: Partial<Invoice>) {
    Object.assign(this, init);    
  }

  public id: number;
  public no: string;
  public createdDate: Date;
  public updatedDate: Date;
  public invoiceDate: Date;
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
}
