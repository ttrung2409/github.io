import Permission from "./permission";

export default class User {
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public address: string;
  public username: string;
  public password: string;
  public confirmPassword: string;

  public permissions: Array<any> = [];
}
