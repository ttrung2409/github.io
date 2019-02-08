export default class Customer {
  public constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
  }

  public id: number;
  public name: string;
  public phone: string;
  public email?: string;
  public address?: string;
  public dob?: string;
  public typeId: number;  
  public isActive: boolean = true;

  public type: CustomerType;
}

export class CustomerType {
  public id: number;
  public name: string;
}
