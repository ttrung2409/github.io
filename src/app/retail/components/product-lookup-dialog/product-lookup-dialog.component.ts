import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import ProductService from 'src/app/services/product.service';
import Product from 'src/app/models/product';
import { MatDialog, MatDialogRef } from '@angular/material';

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
