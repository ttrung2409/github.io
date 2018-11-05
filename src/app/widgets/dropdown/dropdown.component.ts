import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewEncapsulation, SimpleChanges, OnChanges, OnDestroy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { BindableComponent } from '../bindable.component';
declare var $: any;

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent extends BindableComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(private el: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
    super();
  }
  
  @Input() options: any[];
  @Input() valueMember: string = 'value';
  @Input() displayMember: string = 'text';
  @Input() label: string;
  @Input() isLoading: boolean = false;
  @Input() floatLabel: string = 'auto';
  @Input() direction: string = 'auto';
  @Input() showOnFocus: boolean = true;

  @Output() keyup = new EventEmitter();

  bindingOptions: any[];

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {           
    if (!!changes['options']) {
      this.bindingOptions = this.options.map(x => x instanceof Object ? x : {
        value: x,
        text: x
      });

      $(this.el.nativeElement).find('.ui.dropdown .menu > .message').css('display', this.bindingOptions.length > 0 ? 'none' : 'block');
    }

    if (!!changes['isLoading']) {
      if (this.isLoading) $(this.el.nativeElement).find('.ui.dropdown').addClass('loading');
      else $(this.el.nativeElement).find('.ui.dropdown').removeClass('loading');
    }
    
    if (!!changes['model']) {      
      this.setText(this.model);
    }
  }

  ngAfterViewInit() {
    let _this = this;    
    $(this.el.nativeElement).find('.ui.dropdown').dropdown({
      forceSelection: false,
      clearable: true,
      selectOnKeydown: false,
      direction: this.direction,
      showOnFocus: this.showOnFocus,
      onShow: function () {
        $(_this.el.nativeElement).find('.mat-form-field').addClass('mat-form-field-should-float');
        $(_this.el.nativeElement).find('.mat-form-field-underline').addClass('highlight');        
      },
      onHide: function () {
        if (!_this.model) {
          $(_this.el.nativeElement).find('.mat-form-field').removeClass('mat-form-field-should-float');
        }

        $(_this.el.nativeElement).find('.mat-form-field-underline').removeClass('highlight');
      },
      onChange(value) {
        _this.model = value || undefined;             
        let option = _this.bindingOptions.find(x => x[_this.valueMember] == value);
        if (!!option) {
          $(_this.el.nativeElement).find('.ui.dropdown').dropdown('set text', option[_this.displayMember]);
        }
      }
    });

    $(this.el.nativeElement).find('.ui.dropdown > input.search').on('keyup', (event: any) => {
      if ((event.keyCode == 8 || event.keyCode == 46) && !event.target.value) {
        this.clear();
      }

      this.keyup.emit(event);
    });
  } 

  private setText(value) {
    let option = this.bindingOptions.find(x => x[this.valueMember] == value);
    if (!!option) {
      $(this.el.nativeElement).find('.ui.dropdown').dropdown('set text', option[this.displayMember]);
    }
    else {      
      this.clear();            
    }
  }

  private clear() {
    this.model = undefined;
    $(this.el.nativeElement).find('.ui.dropdown').dropdown('clear');
    if (this.floatLabel == 'never') {
      $(this.el.nativeElement).find('.ui.dropdown').dropdown('set text', this.label);
      $(this.el.nativeElement).find('.ui.dropdown > .text').addClass('default');
    }
  }
}
