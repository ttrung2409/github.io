export default class Customer {
  public constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
  }

  public id: number | string;
  public name: string;
  public phone: string;
  public email?: string;
  public address?: string;
  public dob?: Date;
  public typeId: number;  
  public income: number;
  public cost: number;
  public isActive: boolean = true;

  get profit(): number {
    return this.income - this.cost;
  }

  public type: CustomerType;
}

export class CustomerType {
  public id: number;
  public name: string;
}
