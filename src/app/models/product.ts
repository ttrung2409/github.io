export default class Product {
  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }

  public id: number;
  public no: string;
  public name: string;
  public uom?: string;
  public retailPrice?: number;
  public wholeSalePrice?: number;
  public discountPrice?: number;  
}
