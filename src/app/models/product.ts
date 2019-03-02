import ProductSpec from "./productSpec";

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
  public wholesalePrice?: number;
  public discountPrice?: number;
  public cost: number;  
  public isContainer: boolean;  
  public notes: string;

  public spec: ProductSpec = new ProductSpec();
  public selected: boolean;
}
