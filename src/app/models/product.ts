export default class Product {
  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }

  public id: number;  
  public no: string;
  public name: string;
  public uom?: string;
  public categoryId: number;
  public retailPrice?: number;
  public wholeSalePrice?: number;
  public discountPrice?: number;
  public cost: number;
  public isActive: boolean;
  public isContainer: boolean;
  public itemId?: number;
  public itemQty?: number;
}
