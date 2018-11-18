import InvoiceItem from "./invoiceItem";

export default class Invoice {
  public constructor(init?: Partial<Invoice>) {
    Object.assign(this, init);    
  }

  public id: number;
  public no: string;
  public createdDate: Date;
  public updatedDate: Date;
  public invoiceDate: Date;
  public customerId: number;  
  public discount?: number;
  public tax?: number;

  get subTotal(): number {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }

  get total(): number {
    return this.subTotal - (this.discount || 0) - (this.tax || 0);
  }

  public items: InvoiceItem[] = [];
}
