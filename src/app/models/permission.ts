export default class Permission {
  public constructor(init?: Partial<Permission>) {
    Object.assign(this, init);
  }

  public id: number;
  public code: string;
  public name: string;
  public parentId: number;
}
