import { Component, OnInit, Input } from '@angular/core';
import { GridColumn } from 'web/src/app/widgets/grid/grid.component';
import BulkDataService from 'web/src/app/services/bulk-data.service';
import Product from 'web/src/app/models/product';
import UtilsService from 'web/src/app/services/utils.service';
import * as moment from 'moment'

@Component({
  selector: 'bulk-delete-product',
  templateUrl: './bulk-delete-product.component.html'
})
export class BulkDeleteProductComponent implements OnInit {

  constructor(private bulkDataService: BulkDataService, private utils: UtilsService) { }

  @Input() products: Product[] = [];

  columns: GridColumn[] = [];

  ngOnInit() {
    this.initGridColumn();
  }

  initGridColumn() {
    this.columns = [
      new GridColumn({
        caption: 'Mã SP',
        field: 'no',
        width: '10%',
      }),
      new GridColumn({
        caption: 'Ngày tạo',
        field: 'createdAt',
        width: '15%',
        format: function (val) {
          return moment(val).format('DD/MM/YYYY');
        }
      }),
      new GridColumn({
        caption: 'Tên SP',
        field: 'name',
        width: '30%',
        footer: function () {
          return `Có tất cả ${this.products.length} sản phẩm`
        }.bind(this)
      }),
      new GridColumn({
        caption: 'ĐVT',
        field: 'uom',
        width: '10%'
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

  height() {
    return $(window).height() - $('.toolbar').outerHeight(true);
  }
}
