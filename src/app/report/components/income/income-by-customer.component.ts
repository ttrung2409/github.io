import { Component, OnInit, Input } from "@angular/core";
import ReportService from "src/app/services/report.service";
import UtilsService from "src/app/services/utils.service";
import { GridColumn } from "src/app/widgets/grid/grid.component";
import * as moment from 'moment'
import * as _ from 'lodash'
import Customer from "src/app/models/customer";

@Component({
  selector: 'income-by-customer',
  templateUrl: './income-by-customer.component.html'
})
export class IncomeByCustomerComponent implements OnInit {
  constructor(private reportService: ReportService, private utils: UtilsService) {
  }

  columns: GridColumn[] = [];
  customers: Customer[] = [];

  ngOnInit() {
    this.initGridColumns();
  }

  initGridColumns() {
    this.columns = [
      new GridColumn({
        caption: 'Mã KH',
        field: 'no',
        sortable: true
      }),
      new GridColumn({
        caption: 'Tên KH',
        field: 'name',
        sortable: true
      }),
      new GridColumn({
        caption: 'Doanh thu',
        field: 'income',
        isNumber: true,
        sortable: true,
        footer: function () {
          return this.utils.formatNumber(this.customers.reduce((acc, customer) => acc + parseFloat(customer.income || 0), 0));
        }.bind(this)
      }),
      new GridColumn({
        caption: 'Giá vốn',
        field: 'cost',
        isNumber: true,
        sortable: true,
        footer: function () {
          return this.utils.formatNumber(this.customers.reduce((acc, customer) => acc + parseFloat(customer.cost || 0), 0));
        }.bind(this)
      }),
      new GridColumn({
        caption: 'Lợi nhuận',
        field: 'profit',
        isNumber: true,
        sortable: true,
        footer: function () {
          return this.utils.formatNumber(this.customers.reduce((acc, customer) => acc + parseFloat(customer.profit || 0), 0));
        }.bind(this)
      })
    ];
  }

  generateReport({ customerId, fromDate, toDate }) {
    this.reportService.getIncomeByCustomer({ customerId, fromDate, toDate }).subscribe(customers => {      
      this.customers = _.orderBy(customers, 'income', 'desc');
    });
  }

  onSortChange({ orderBy, isDesc }) {
    this.customers = _.orderBy(this.customers, orderBy, isDesc ? 'desc' : 'asc');
  }
}
