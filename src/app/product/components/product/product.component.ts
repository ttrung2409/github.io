import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import ProductService from '../../../services/productService';
import Product from '../../../models/product';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {    
  constructor(private productService: ProductService) { }

  @Input() id: number;
  product: Product = new Product();
  categories: any[];
  uoms: any[];

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => this.categories = categories);
    this.productService.getUOMs().subscribe(uoms => this.uoms = uoms);
  }

  ngOnChanges(changes: SimpleChanges) {
    let id = changes['id'].currentValue;
    if (id > 0) {
      this.productService.getProduct(id).subscribe(x => {        
        this.product = x;
      });
    }
  }
}

