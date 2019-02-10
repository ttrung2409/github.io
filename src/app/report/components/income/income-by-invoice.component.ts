import { Component, OnInit, Input } from "@angular/core";
import ReportService from "src/app/services/report.service";
import UtilsService from "src/app/services/utils.service";
import { GridColumn } from "src/app/widgets/grid/grid.component";
import * as moment from 'moment'
import Invoice from "src/app/models/invoice";
import * as _ from 'lodash'
import * as $ from 'jquery'

@Component({
  selector: 'income-by-invoice',
  templateUrl: './income-by-invoice.component.html'
})
export class IncomeByInvoiceComponent implements OnInit {
  constructor(private reportService: ReportService, private utils: UtilsService) {
  }

  columns: GridColumn[] = [];
  invoices: Invoice[] = [];

  ngOnInit() {
    this.initGridColumns();
  }

  initGridColumns() {
    this.columns = [
      new GridColumn({
        caption: 'Mã HĐ',
        field: 'no',
        sortable: true,        
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
        field: 'customer.name',
        width: '25%'
        footer: 'Tổng',
        sortable: true
      }),
      new GridColumn({
        caption: 'Doanh thu',
        field: 'total',
        isNumber: true,
        footer: function () {
          return this.utils.formatNumber(this.invoices.reduce((acc, invoice) => acc + invoice.total, 0));
        }.bind(this),
        sortable: true
      }),
      new GridColumn({
        caption: 'Giá vốn',
        field: 'totalCost',
        isNumber: true,
        footer: function () {          
          return this.utils.formatNumber(this.invoices.reduce((acc, invoice) => acc + parseFloat(invoice.totalCost || 0), 0));
        }.bind(this),
        sortable: true
      }),
      new GridColumn({
        caption: 'Lợi nhuận',
        field: 'profit',
        isNumber: true,
        footer: function () {
          return this.utils.formatNumber(this.invoices.reduce((acc, invoice) => acc + invoice.total - invoice.totalCost, 0));
        }.bind(this),
        sortable: true
      })
    ];
  }

  generateReport({ customerId, fromDate, toDate }) {
    this.reportService.getIncomeByInvoice({ customerId, fromDate, toDate }).subscribe(invoices => {
      this.invoices = invoices.map(x => {
        let total = x.subTotal - (x.discount || 0) + (x.tax || 0) + (x.freight || 0) + (x.fee || 0);
        return Object.assign(x, {
          total,
          totalCost: x.totalCost || 0,
          profit: total - x.totalCost
        });
      });

      this.invoices = _.orderBy(this.invoices, 'no', 'desc');      
    });
  }

  onSortChange({ orderBy, isDesc }) {
    this.invoices = _.orderBy(this.invoices, orderBy, isDesc ? 'desc' : 'asc');
  }

  height() {    
    return $(window).height() - $('.toolbar').outerHeight(true);
  }
}
