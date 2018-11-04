import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import ProductService from '../../../services/product.service';
import Product from '../../../models/product';
import { map } from 'rxjs/operators';

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
  isSearchingItems: boolean = false;
  items: Product[] = [];

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => this.categories = categories);
    this.productService.getUOMs().subscribe(uoms => this.uoms = uoms);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes['id']) {
      let id = changes['id'].currentValue;
      if (id > 0) {
        this.productService.getProduct(id).subscribe(x => {
          this.product = x;
        });
      }
      else {
        this.product = new Product();
      }
    }    
  }

  onSearchItems(query) {
    this.isSearchingItems = true;
    this.items = [];
    this.productService.lookup(query).subscribe((items: Product[]) => {      
      this.items = items;
      this.isSearchingItems = false;
    });
  }

  save() {    
    this.productService.save(this.product);
  }

  cancel() {
    this.productService.getProduct(this.id).subscribe(x => this.product = x);
  }
}

