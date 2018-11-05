import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Product from '../../models/product';
import ProductService from '../../services/product.service';
import { BindableComponent } from '../bindable.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-lookup',
  templateUrl: './product-lookup.component.html',
  styleUrls: ['./product-lookup.component.scss']
})
export class ProductLookupComponent extends BindableComponent implements OnInit {
  private _subscription: Subscription;

  constructor(private productService: ProductService) {
    super();
  }
  
  @Input() direction: string = 'auto';
  @Output() select = new EventEmitter();

  isLoading: boolean = false;
  products: Product[] = [];
  
  ngOnInit() {
  }

  onSearch(query) {
    this.isLoading = true;
    this.products = [];
    if (!!this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }

    this._subscription = this.productService.lookup(query).subscribe((products: Product[]) => {
      this.products = products;
      this.isLoading = false;
    });
  }

  onKeyup(event) {
    if (event.keyCode == 13) {      
    }    
  }
}
