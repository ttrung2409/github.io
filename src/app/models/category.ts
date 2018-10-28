export default class Category {
  public constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }

  public id: number;
  public name: string;
}
