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
  public discount: number | any;
  public tax: number | any;
  public freight: number | any;
  public fee: number | any;
  public subTotal: number;
  public totalCost: number;
  public total: number;
  public amountPaid: number;
  public createdBy: number;
  public updatedBy: number;

  public customer: Customer = new Customer();
  public items: InvoiceItem[] = [];
  public payments: Payment[] = [];

  get computedSubTotal(): number {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }  

  get computedTotal(): number {
    return this.computedSubTotal
      - parseFloat(this.discount || 0)
      + parseFloat(this.tax || 0)
      + parseFloat(this.freight || 0)
      + parseFloat(this.fee || 0);
  }

  get computedTotalCost(): number {
    return this.items.reduce((acc, item) => acc + item.totalCost, 0);
  }

  get computedAmountPaid(): number {
    return this.amountPaid > 0 ? this.amountPaid : Math.min(this.payments.reduce((acc, payment) => acc += payment.amount, 0), this.computedTotal);
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
  Draft = 'Draft',
  New = "New",
  Paid = "Paid",
  Cancelled = "Cancelled",
  Partial = "Partial"
}
