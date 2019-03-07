import { Component, OnInit, Input, ElementRef } from '@angular/core';
import Invoice from 'src/app/models/invoice';
import Payment from 'src/app/models/payment';
import AuthService from 'src/app/services/auth.service';
import * as moment from 'moment'

@Component({
  selector: 'print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  constructor(private authService: AuthService, private el: ElementRef) { }

  @Input() invoice: Invoice = new Invoice();
  @Input() payment: Payment = new Payment();

  get staffName() {
    return this.authService.user.name;
  }

  get createdAt() {
    return moment(this.invoice.createdAt).local();
  }

  ngOnInit() {
  }

  print() {
    let iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.contentWindow.document.body.innerHTML = this.el.nativeElement.innerHTML;
    iframe.contentWindow.print();
    iframe.remove();
  }
}
