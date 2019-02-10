import { Component, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/widgets/grid/grid.component';
import BulkDataService from 'src/app/services/bulk-data.service';
import Product from 'src/app/models/product';

@Component({
  selector: 'bulk-delete-product',
  templateUrl: './bulk-delete-product.component.html'
})
export class BulkDeleteProductComponent implements OnInit {

  constructor(private bulkDataService: BulkDataService) { }
  
  columns: GridColumn[] = [];
  products: Product[] = [];

  ngOnInit() {
    this.initGridColumn();
  }

  initGridColumn() {
    this.columns = [
      new GridColumn({
        caption: 'Mã SP',
        field: 'no',
        width: '15%',
      }),
      new GridColumn({
        caption: 'Tên SP',
        field: 'name',
        width: '30%',
      }),
      new GridColumn({
        caption: 'ĐVT',
        field: 'uom',
        width: '10%',
      }),
      new GridColumn({
        caption: 'SL',
        field: 'qty',
        isNumber: true
      }),
      new GridColumn({
        caption: 'Giá lẻ',
        field: 'retailPrice',
        isNumber: true
      }),
      new GridColumn({
        caption: 'Doanh thu',
        field: 'income',
        isNumber: true,
      }),      
    ];
  }

  search(params) {
    this.bulkDataService.findProductsWithIncomeBetween(params).subscribe(products => this.products = products);
  }

  height() {
    return 500;
  }
}
