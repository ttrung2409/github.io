import SaleOrderItem from "./saleOrderItem";

export default class SaleOrder {
  public constructor(init?: Partial<SaleOrder>) {
    Object.assign(this, init);    
  }

  public id: number;
  public no: string;
  public createdDate: Date;
  public orderDate: Date;
  public customerId: number;
  public subTotal?: number;
  public discount?: number;
  public tax?: number;

  get total(): number {
    return this.subTotal - this.discount - this.tax;
  }

  public items: SaleOrderItem[] = [];
}
