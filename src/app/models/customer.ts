export default class Customer {
  public constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
  }

  public id: number;  
  public name: string;
  public phoneNumber: string;
  public email?: string;
  public address?: string;
  public dob?: Date;
  public typeId: number;
  public type: string;
  public income: number;
  public cost: number;

  get profit(): number {
    return this.income - this.cost;
  }
}
