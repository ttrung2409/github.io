import { Component, OnInit, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import Invoice from 'web/src/app/models/invoice';
import Payment from 'web/src/app/models/payment';
import AuthService from 'web/src/app/services/auth.service';
import * as moment from 'moment'

@Component({
  selector: 'print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit, OnChanges {

  constructor(private authService: AuthService, private el: ElementRef) { }

  @Input() invoice: Invoice = new Invoice();
  @Input() payment: Payment = new Payment();

  invoiceDate: string;

  get staffName() {
    return this.authService.user.name;
  }

  get createdAt() {
    return moment(this.invoice.createdAt).add(7, 'h').format('DD/MM/YYYY HH:mm');
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  print() {
    let iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.contentWindow.document.body.innerHTML = this.el.nativeElement.innerHTML;
    iframe.contentWindow.print();
    iframe.remove();
  }
}
