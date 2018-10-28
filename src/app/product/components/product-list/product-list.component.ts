import { Component, OnInit, ViewChild } from '@angular/core';
import ProductService from '../../../services/productService';
import { GridColumn } from '../../../widgets/grid/grid.component';
import Product from '../../../models/product';
import { FlyoutComponent } from '../../../widgets/flyout/flyout.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {
  }

  columns: GridColumn[];
  products: Product[];
  selectedProduct: Product = new Product();
  search: any = {};

  @ViewChild(FlyoutComponent)
  private flyout: FlyoutComponent;

  ngOnInit() {
    this.columns = [
      new GridColumn({
        caption: 'Mã SP',
        field: 'no'        
      }),
      new GridColumn({
        caption: 'Tên SP',
        field: 'name'
      }),
      new GridColumn({
        caption: 'ĐVT',
        field: 'uom'
      }),
      new GridColumn({
        caption: 'Giá nhập',
        field: 'cost'
      }),
      new GridColumn({
        caption: 'Giá lẻ',
        field: 'retailPrice'
      }),
      new GridColumn({
        caption: 'Giá sỉ',
        field: 'wholeSalePrice'
      }),
      new GridColumn({
        caption: 'Giá khuyến mãi',
        field: 'discountPrice'
      })
    ];

    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });    
  }

  onRowClick(row) {    
    this.selectedProduct = row;
    this.flyout.show();
  }
}
