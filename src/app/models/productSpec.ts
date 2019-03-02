export default class ProductSpec {
  public constructor(init?: Partial<ProductSpec>) {
    Object.assign(this, init);
  }

  public id: number;
  public productId: number;
  public uomId: number;
  public qty: number;
}
