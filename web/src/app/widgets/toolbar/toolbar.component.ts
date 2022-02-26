import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnChanges {
  private _timeout: any;  

  constructor() { }

  @Input() showProgress: boolean;
  @Input() class: string;

  showProgressInternal: boolean;

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges) {
    if (!!change.showProgress) {
      if (!!this.showProgress) {
        this._timeout = setTimeout(() => {
          this.showProgressInternal = true;
        }, 300);
      }
      else {
        clearTimeout(this._timeout);
        this.showProgressInternal = false;
      }
    }    
  }
}
