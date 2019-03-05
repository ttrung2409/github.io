import { Component, OnInit, Input } from "@angular/core";
import ReportService from "src/app/services/report.service";
import UtilsService from "src/app/services/utils.service";
import { GridColumn } from "src/app/widgets/grid/grid.component";
import * as moment from 'moment'
import Invoice from "src/app/models/invoice";
import * as _ from 'lodash'
import * as $ from 'jquery'
import SearchModel from "src/app/models/search";
import { PageEvent } from "@angular/material";

@Component({
  selector: 'income-by-invoice',
  templateUrl: './income-by-invoice.component.html'
})
export class IncomeByInvoiceComponent implements OnInit {
  constructor(private reportService: ReportService, private utils: UtilsService) {
  }

  columns: GridColumn[] = [];
  invoices: Invoice[] = [];  
  params: any = { orderBy: 'no', isDesc: true, size: 1000, index: 1 };
  summary: any = {};

  ngOnInit() {
    this.initGridColumns();
  }

  initGridColumns() {
    this.columns = [
      new GridColumn({
        caption: 'Mã HĐ',
        field: 'no',
        sortable: true
      }),
      new GridColumn({
        caption: 'Ngày',
        field: 'date',
        format: (value) => {
          return moment(value).format('DD/MM/YYYY');
        },
        sortable: true
      }),
      new GridColumn({
        caption: 'Khách hàng',
        field: 'customerName',
        width: '25%',
        footer: 'Tổng',
        sortable: true
      }),
      new GridColumn({
        caption: 'Doanh thu',
        field: 'total',
        isNumber: true,
        footer: function () {
          return this.utils.formatNumber(this.summary.total);
        }.bind(this),
        sortable: true
      }),      
      new GridColumn({
        caption: 'Giá vốn',
        field: 'totalCost',
        isNumber: true,
        footer: function () {          
          return this.utils.formatNumber(this.summary.totalCost);
        }.bind(this),
        sortable: true
      }),
      new GridColumn({
        caption: 'Lợi nhuận',
        field: 'profit',
        isNumber: true,
        footer: function () {
          return this.utils.formatNumber(this.summary.profit);
        }.bind(this),
        sortable: true
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
    return new Promise((resolve, reject) => {
      this.params = Object.assign(this.params, params, { index: 1 });
      this.reportService.getIncomeByInvoice(this.params).subscribe(invoices => {
        this.invoices = invoices;
        resolve();
      });

      this.reportService.getIncomeSummaryByInvoice(this.params).subscribe(summary => this.summary = summary);
    });
  }

  getIncomeByInvoice(params) {
    this.params = Object.assign(this.params, params);
    this.reportService.getIncomeByInvoice(this.params).subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  onSortChange({ orderBy, isDesc }) {
    this.getIncomeByInvoice(Object.assign(this.params, { orderBy, isDesc }));
  }

  height() {
    return $(window).height() - $('.toolbar').outerHeight(true) - $('.mat-paginator').outerHeight(true);
  }

  onPageChanged(event: PageEvent) {
    this.getIncomeByInvoice(Object.assign(this.params, { index: event.pageIndex + 1 }));
  }
}
