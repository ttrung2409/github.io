import { Component, OnInit, Input } from '@angular/core';
import { GridColumn } from 'web/src/app/widgets/grid/grid.component';
import BulkDataService from 'web/src/app/services/bulk-data.service';
import Customer from 'web/src/app/models/customer';
import * as moment from 'moment'

@Component({
  selector: 'bulk-delete-customer',
  templateUrl: './bulk-delete-customer.component.html'
})
export class BulkDeleteCustomerComponent implements OnInit {

  constructor(private bulkDataService: BulkDataService) { }

  @Input() customers: Customer[] = [];

  columns: GridColumn[] = [];

  ngOnInit() {
    this.initGridColumn();
  }

  initGridColumn() {
    this.columns = [
      new GridColumn({
        caption: 'Mã KH',
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
        caption: 'Tên KH',
        field: 'name',
        width: '30%',
        footer: function () {
          return `Có tất cả ${this.customers.length} khách hàng`;
        }.bind(this)
      }),
      new GridColumn({
        caption: 'SĐT',
        field: 'phone',
      }),
      new GridColumn({
        caption: 'Doanh thu',
        field: 'income',
        isNumber: true
      }),
    ];
  }

  height() {
    return $(window).height() - $('.toolbar').outerHeight(true);
  }
}
