import { Component, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';
import { BindableComponent } from '../bindable.component';
declare var $: any;

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent extends BindableComponent implements OnInit, AfterViewInit {

  constructor(private el: ElementRef) {
    super();
  }
  
  @Input() options: any[];
  @Input() valueMember: string = 'value';
  @Input() displayMember: string = 'text';
  @Input() label: string;  

  private bindingOptions: any[];

  ngOnInit() {
    this.bindingOptions = this.options.map(x => x instanceof Object ? x : {
      value: x,
      text: x
    });
  }  

  ngAfterViewInit() {
    let _this = this;
    $(this.el.nativeElement).find('.ui.dropdown').dropdown({
      forceSelection: false,
      clearable: true,
      onShow: function () {
        $(_this.el.nativeElement).find('.mat-form-field').addClass('mat-form-field-should-float');
        $(_this.el.nativeElement).find('.mat-form-field-underline').addClass('highlight');
        
      },
      onHide: function () {
        if (!_this.model) {
          $(_this.el.nativeElement).find('.mat-form-field').removeClass('mat-form-field-should-float');
        }

        $(_this.el.nativeElement).find('.mat-form-field-underline').removeClass('highlight');
      }
    });    
  }  
}
