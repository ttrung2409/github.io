import { Component, OnInit, Input, ViewEncapsulation, HostListener } from '@angular/core';
import ProductService from 'src/app/services/product.service';
import Product from 'src/app/models/product';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Key } from 'ts-keycode-enum';

@Component({
  selector: 'product-lookup-dialog',
  templateUrl: './product-lookup-dialog.component.html',
  styleUrls: ['./product-lookup-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductLookupDialogComponent implements OnInit {

  constructor(private productService: ProductService, private dialogRef: MatDialogRef<ProductLookupDialogComponent>) { }  
    
  selectedPrice: string = 'retail';
  product: Product = new Product();

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {
    if (e.shiftKey) {
      switch (e.keyCode) {
        case Key.L:
          this.onPriceTagClick('retail');
          e.preventDefault();
          break;
        case Key.S:
          this.onPriceTagClick('wholesale');
          e.preventDefault();
          break;
        case Key.K:
          this.onPriceTagClick('discount');
          e.preventDefault();
          break;
      }
    }
  };

  ngOnInit() {
  }

  onSelect(product: Product) {
    this.product = product;
  }

  close() {
    this.dialogRef.close();
  }

  onPriceTagClick(selectedPrice) {
    this.selectedPrice = selectedPrice;
  }
}
