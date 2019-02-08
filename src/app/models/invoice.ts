import InvoiceItem from "./invoiceItem";
import Customer from "./customer";
import Payment from "./payment";

export default class Invoice {    
  public constructor(init?: Partial<Invoice>) {
    Object.assign(this, init);        
  }

  public id: number;
  public no: string;
  public status: string;
  public date: string;
  public createdAt: string;
  public updatedAt: string;  
  public customerId: number;
  public discount: number;
  public tax: number;
  public freight: number;
  public fee: number;
  public subTotal: number;
  public totalCost: number;
  public total: number;

  public customer: Customer = new Customer();
  public items: InvoiceItem[] = [];
  public payments: Payment[] = [];

  get computedSubTotal(): number {
    return this.items.length > 0 ? this.items.reduce((acc, item) => acc + item.total, 0) : this.subTotal;
  }  

  get computedTotal(): number {
    return this.computedSubTotal - (this.discount || 0) + (this.tax || 0) + (this.freight || 0) + (this.fee || 0);
  }

  get computedTotalCost(): number {
    return this.items.length > 0 ? this.items.reduce((acc, item) => acc + item.totalCost, 0) : this.totalCost;
  }
  
  static from(src: Invoice) {
    let target = new Invoice(src);
    target.items = [];
    let index = 1;
    let items = src.items || [];
    for (let item of items) {
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
