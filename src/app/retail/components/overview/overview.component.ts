import { Component, OnInit, Input } from '@angular/core';
import Invoice from 'src/app/models/invoice';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor() { }

  @Input() invoice: Invoice = new Invoice();

  ngOnInit() {
  }
}
