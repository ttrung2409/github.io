export default class Permission {
  public constructor(init?: Partial<Permission>) {
    Object.assign(this, init);
  }

  public id: number;
  public name: string;
  public parentId: number;
}
