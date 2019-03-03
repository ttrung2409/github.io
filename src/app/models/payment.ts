export default class Payment {
  public constructor(init?: Partial<Payment>) {
    Object.assign(this, init);
  }

  public id: number;
  public customerId: number;
  public invoiceId: number;
  public amount: number;
  public method: string;
  public print: boolean;
}

export enum PaymentMethod {
  Cash = 'Cash'
}
