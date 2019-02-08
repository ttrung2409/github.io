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
import SearchModel from 'src/app/models/search';
import { IncomeByInvoiceComponent } from './income-by-invoice.component';
import { IncomeByCustomerComponent } from './income-by-customer.component';
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
    private utils: UtilsService) { }

  @ViewChild('flyout') flyout: FlyoutComponent;
  @ViewChild(IncomeByInvoiceComponent) incomeByInvoice;
  @ViewChild(IncomeByCustomerComponent) incomeByCustomer;
  
  viewBy: string = 'invoice';
  customerId: number;
  fromDate: string = moment().format();
  toDate: string = moment().format();

  ngOnInit() {    
    this._subscription.add(fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
      this.handleKeydown(e);
    }));

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

  handleKeydown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Escape:
        this.flyout.hide();
        break;
      case Key.F2:
        this.flyout.show();
        break;
    }    
  }
  
  generateReport() {    
    switch (this.viewBy) {
      case 'invoice':
        this.incomeByInvoice.generateReport({
          customerId: this.customerId,
          fromDate: this.utils.toDbDate(this.fromDate),
          toDate: this.utils.toDbDate(this.toDate),
        });

        break;
      case 'customer':
        this.incomeByCustomer.generateReport({
          customerId: this.customerId,
          fromDate: this.utils.toDbDate(this.fromDate),
          toDate: this.utils.toDbDate(this.toDate),
        });

        break;
    }
  }
}
