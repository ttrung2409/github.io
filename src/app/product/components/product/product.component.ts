import { Component, OnInit, Input, SimpleChanges, OnChanges, ElementRef, ViewChild } from '@angular/core';
import ProductService from '../../../services/product.service';
import Product from '../../../models/product';
import { ProductLookupComponent } from '../../../widgets/product-lookup/product-lookup.component';
declare var $: any;

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {
  constructor(private productService: ProductService) { }

  @Input() id: number;
  @ViewChild('productNoInput') productNoInput: ElementRef; 

  product: Product = new Product();
  categories: any[];
  uoms: any[];

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => this.categories = categories);
    this.productService.getUOMs().subscribe(uoms => this.uoms = uoms);
  }  

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.id) {
      let id = changes.id.currentValue;
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

  save() {    
    this.productService.save(this.product);
  }

  cancel() {
    this.productService.getProduct(this.id).subscribe(x => this.product = x);
  }

  focus() {
    $(this.productNoInput.nativeElement).focus();    
  }
}

