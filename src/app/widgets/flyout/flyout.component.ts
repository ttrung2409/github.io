import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
declare var $: any;

@Component({
  selector: 'flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlyoutComponent implements OnInit, AfterViewInit {
  constructor(private el: ElementRef) { }

  @Input() direction?: string = 'right';
  @Input() size?: string = 'very wide';  
  @Input() closable: boolean = true;

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(this.el.nativeElement).find('.ui.sidebar').sidebar({
      context: $('#app'),
      transition: 'overlay',
      closable: this.closable,      
      onVisible: function () {
        $('.pusher').addClass('dimmed');
      },
      onHide: function () {
        $('.pusher').removeClass('dimmed');
      }
    });
  }

  show() {
    $('#app').find('.ui.sidebar.right').sidebar('show');    
  }

  hide() {
    $('#app').find('.ui.sidebar.right').sidebar('hide');   
  }
}
