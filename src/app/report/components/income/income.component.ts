import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { GridColumn } from '../../../widgets/grid/grid.component';
import Invoice from '../../../models/invoice';
import Customer from '../../../models/customer';
import * as moment from 'moment'
import ReportService from '../../../services/report.service';
import { fromEvent, Subscription } from 'rxjs';
import UtilsService from '../../../services/utils.service';
import { Key } from 'ts-keycode-enum';
import { FlyoutComponent } from '../../../widgets/flyout/flyout.component';
import CustomerService from '../../../services/customer.service';
import * as _ from 'lodash'
declare var $: any;

@Component({
  selector: 'income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(private el: ElementRef,
    private reportService: ReportService,
    private utils: UtilsService,
    private customerService: CustomerService) { }

  @ViewChild('flyout') flyout: FlyoutComponent;

  @HostListener('keyup', ['$event']) onKeyup(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Escape:
        this.flyout.hide();
        break;
      case Key.F4:
        this.flyout.hide();
        this.generateReport();
        break;
    }
  }
  
  viewBy: string = 'invoice';
  selectedViewBy: string = 'invoice';
  incomeByInvoiceColumns: GridColumn[] = [
    new GridColumn({
      caption: 'Số HĐ',
      field: 'no'      
    }),
    new GridColumn({
      caption: 'Ngày',
      field: 'invoiceDate',
      format: (value) => {
        return moment(value).format('DD/MM/YYYY');
      }
    }),
    new GridColumn({
      caption: 'Khách hàng',
      field: 'customer.name',
      footer: 'Tổng'
    }),
    new GridColumn({
      caption: 'Doanh thu',
      field: 'total',
      footer: function () {
        return this.utils.formatNumber(this.invoices.reduce((acc, invoice) => acc + invoice.total, 0));
      }.bind(this)      
    }),
    new GridColumn({
      caption: 'Giá vốn',
      field: 'totalCost',
      footer: function () {
        return this.utils.formatNumber(this.invoices.reduce((acc, invoice) => acc + invoice.totalCost, 0));
      }.bind(this) 
    }),
    new GridColumn({
      caption: 'Lợi nhuận',
      field: 'profit',
      footer: function () {
        return this.utils.formatNumber(this.invoices.reduce((acc, invoice) => acc + invoice.profit, 0));
      }.bind(this) 
    })
  ];

  incomeByCustomerColumns: GridColumn[] = [
    new GridColumn({
      caption: 'Tên KH',
      field: 'name',
    }),
    new GridColumn({
      caption: 'Loại KH',
      field: 'type.name'
    }),
    new GridColumn({
      caption: 'Số ĐT',
      field: 'phoneNumber',
      footer: 'Tổng'
    }),
    new GridColumn({
      caption: 'Doanh thu',
      field: 'income',
      footer: function () {
        return this.utils.formatNumber(this.customers.reduce((acc, customer) => acc + customer.income, 0));
      }.bind(this)
    }),
    new GridColumn({
      caption: 'Giá vốn',
      field: 'cost',
      footer: function () {
        return this.utils.formatNumber(this.customers.reduce((acc, customer) => acc + customer.cost, 0));
      }.bind(this)
    }),
    new GridColumn({
      caption: 'Lợi nhuận',
      field: 'profit',
      footer: function () {
        return this.utils.formatNumber(this.customers.reduce((acc, customer) => acc + customer.profit, 0));
      }.bind(this)
    })
  ];

  invoices: Invoice[] = [];
  customers: Customer[] = [];

  ngOnInit() {
    this.generateReport();
    this._subscription.add(fromEvent(window, 'resize').subscribe(e => {
      $(this.el.nativeElement).find('.content').height($(window).height() - 50); 
    }));
  }

  ngAfterViewInit() {
    $(this.el.nativeElement).find('.content').height($(window).height() - 50); 
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  generateReport() {    
    this.selectedViewBy = this.viewBy || 'invoice';
    switch (this.selectedViewBy) {
      case 'invoice':
        this.reportService.getIncomeByInvoice().subscribe(invoices => this.invoices = invoices);
        break;
      case 'customer':
        this.reportService.getIncomeByCustomer().subscribe(customers => {
          this.customers = _.orderBy(customers, 'name');
        });

        break;
    }
  }
}
