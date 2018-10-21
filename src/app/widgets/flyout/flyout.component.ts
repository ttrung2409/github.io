import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
declare var $: any;

@Component({
  selector: 'flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.scss']
})
export class FlyoutComponent implements OnInit {
  constructor(private el: ElementRef) { }

  @Input() direction?: string = 'right';
  @Input() size?: string = 'very wide';
  visible: boolean;  

  ngOnInit() {
  }

  show() {
    $(this.el.nativeElement).find('.ui.sidebar').sidebar('show');
  }

  hide() {
    $(this.el.nativeElement).find('.ui.sidebar').sidebar('hide');
  }
}
