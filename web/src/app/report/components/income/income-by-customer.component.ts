import { Component, OnInit, Input } from "@angular/core";
import ReportService from "web/src/app/services/report.service";
import UtilsService from "web/src/app/services/utils.service";
import { GridColumn } from "web/src/app/widgets/grid/grid.component";
import * as moment from 'moment'
import * as _ from 'lodash'
import Customer from "web/src/app/models/customer";
import { PageEvent } from "@angular/material";

@Component({
  selector: 'income-by-customer',
  templateUrl: './income-by-customer.component.html'
})
export class IncomeByCustomerComponent implements OnInit {
  constructor(private reportService: ReportService, private utils: UtilsService) {
  }

  columns: GridColumn[] = [];
  customers: Customer[] = [];
  params: any = { orderBy: 'no', isDesc: true, size: 1000, index: 1 };
  summary: any = {};

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
        width: '25%',
        sortable: true,
        footer: 'Tổng'
      }),
      new GridColumn({
        caption: 'Doanh thu',
        field: 'income',
        isNumber: true,
        sortable: true,
        footer: function () {
          return this.utils.formatNumber(this.summary.income);
        }.bind(this)
      }),
      new GridColumn({
        caption: 'Giá vốn',
        field: 'cost',
        isNumber: true,
        sortable: true,
        footer: function () {
          return this.utils.formatNumber(this.summary.cost);
        }.bind(this)
      }),
      new GridColumn({
        caption: 'Lợi nhuận',
        field: 'profit',
        isNumber: true,
        sortable: true,
        footer: function () {
          return this.utils.formatNumber(this.summary.profit);
        }.bind(this)
      }),
      new GridColumn({
        caption: 'Thanh toán',
        field: 'amountPaid',
        isNumber: true,
        footer: function () {
          return this.utils.formatNumber(this.summary.amountPaid);
        }.bind(this),
        sortable: true
      }),
      new GridColumn({
        caption: 'Nợ',
        field: 'balance',
        isNumber: true,
        footer: function () {
          return this.utils.formatNumber(this.summary.balance);
        }.bind(this),
        sortable: true
      })
    ];
  }

  generateReport(params) {
    return new Promise(resolve => {
      this.params = Object.assign(this.params, params, { index: 1 });
      this.reportService.getIncomeByCustomer(this.params).subscribe(customers => {
        this.customers = customers;
        resolve();
      });

      this.reportService.getIncomeSummaryByCustomer(this.params).subscribe(summary => this.summary = summary);
    });
  }

  getIncomeByCustomer(params) {
    this.params = Object.assign(this.params, params);
    this.reportService.getIncomeByCustomer(this.params).subscribe(customers => {
      this.customers = customers;
    });
  }

  onSortChange({ orderBy, isDesc }) {
    this.getIncomeByCustomer(Object.assign(this.params, { orderBy, isDesc }));
  }

  onPageChanged(event: PageEvent) {
    this.getIncomeByCustomer(Object.assign(this.params, { index: event.pageIndex + 1 }));
  }

  height() {
    return $(window).height() - $('.toolbar').outerHeight(true) - $('.mat-paginator').outerHeight(true);
  }
}
