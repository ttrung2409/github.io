import { Component, OnInit, Input } from '@angular/core';
import { GridColumn } from 'src/app/widgets/grid/grid.component';
import BulkDataService from 'src/app/services/bulk-data.service';
import Customer from 'src/app/models/customer';

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
        width: '15%',
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
