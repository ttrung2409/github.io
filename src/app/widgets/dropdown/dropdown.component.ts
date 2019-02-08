import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewEncapsulation, SimpleChanges, OnChanges, EventEmitter, Output, TemplateRef, HostListener, Inject } from '@angular/core';
import { BindableComponent } from '../bindable.component';
import { Key } from 'ts-keycode-enum'
import { Observable } from 'rxjs';
import { APP_GLOBAL } from 'src/app/app.global';
declare var $: any;

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent extends BindableComponent implements OnInit, OnChanges, AfterViewInit {
  private _down: boolean;
  private _shouldHandleOnChange: boolean = true;
  private $dropdown: any;
  private _global: any;

  constructor(private el: ElementRef, @Inject(APP_GLOBAL) global) {
    super();
    this._global = global;
  }
  
  @Input() options: any[] = [];
  @Input() valueMember: string = 'value';
  @Input() displayMember: string = 'text';
  @Input() label: string;
  @Input() isLoading: boolean = false;
  @Input() floatLabel: string = 'auto';
  @Input() direction: string = 'auto';
  @Input() showOnFocus: boolean = true;
  @Input() showOnDown: boolean = true;
  @Input() preventKeys: string[] = [];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() requestForOption: (value) => Observable<any>;

  @Output() onKeydown = new EventEmitter();
  @Output() show = new EventEmitter();
  @Output() hide = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output('focus') onFocus = new EventEmitter();
  @Output('blur') onBlur = new EventEmitter();

  bindingOptions = [];

  @HostListener('keydown', ['$event']) keydown(event) {
    switch (event.keyCode) {
      case Key.Backspace:
      case Key.Delete:
        if (!event.target.value) {
          this.clear();
        }

        break;
      case Key.DownArrow:      
        this._down = true;
        break;
    }

    if (this.preventKeys.some(x => x == event.key)) {
      event.preventDefault();
    }

    this.onKeydown.emit(event);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.options && !!this.options) {
      this.bindingOptions = this.options.map(x => x instanceof Object ? x : {
        value: x,
        text: x
      });
         
      setTimeout(() => {
        this.$dropdown.find('.menu > .message').css('display', this.bindingOptions.length > 0 ? 'none' : 'block');
        if (!this.$dropdown.find('input.search').val()) {
          this.setSelected(this.model);
        }        
      });
    }    

    if (!!changes.model && !!this.$dropdown) {
      this.setSelected(this.model);
    }    
  }

  ngAfterViewInit() {    
    this.initDropdown();
    this.setSelected(this.model);    
  }

  initDropdown() {
    let _this = this;
    this.$dropdown = $(this.el.nativeElement).find('.ui.dropdown');
    this.$dropdown.dropdown({
      forceSelection: false,
      clearable: true,
      selectOnKeydown: false,
      direction: this.direction,
      showOnFocus: this.showOnFocus,
      fullTextSearch: 'exact',
      onShow: function () {                             
        if (!_this.showOnDown && _this._down) {
          _this._down = false;
          return false;
        }
        
        _this._global.lockHotkeys = true;
        $(_this.el.nativeElement).find('.mat-form-field').addClass('mat-form-field-should-float');
        $(_this.el.nativeElement).find('.mat-form-field-underline').addClass('highlight');
        _this.show.emit();
      },
      onHide: function () {
        if (!_this.model) {
          $(_this.el.nativeElement).find('.mat-form-field').removeClass('mat-form-field-should-float');
        }

        $(_this.el.nativeElement).find('.mat-form-field-underline').removeClass('highlight');

        setTimeout(() => {          
          _this._global.lockHotkeys = false
          _this.hide.emit();
        });
      },
      onChange(value) {
        if (!!_this._shouldHandleOnChange) {
          _this.model = value || undefined;
          _this.onSelect.emit(_this.model);
          _this.close();
        }
      }   
    });

    this.$dropdown.find('input.search').off('focus');
    this.$dropdown.find('input.search').off('blur');
    this.$dropdown.find('input.search').on('focus', () => {
      this.onFocus.emit();
    });

    this.$dropdown.find('input.search').on('blur', () => {
      this.onBlur.emit();
    });
  }

  clear() {    
    this.model = undefined;
    if (!!this.$dropdown) {
      this.$dropdown.dropdown('clear');
      this.$dropdown.find('input.search').val('');
      if (this.floatLabel == 'never') {
        this.$dropdown.dropdown('set text', this.label);
        this.$dropdown.find('.text').addClass('default');
      }
    }
  }

  focus() {
    this.$dropdown.find('input.search').focus();
  }

  close() {
    this.$dropdown.dropdown('hide');
  }

  private setSelected(value) {
    this._shouldHandleOnChange = false;
    if (this.bindingOptions.some(x => x[this.valueMember] == value)) {
      this.$dropdown.dropdown('set selected', value);
    }
    else if (value !== undefined && value !== null) {
      if (typeof this.requestForOption === 'function') {
        this.requestForOption(value).subscribe(option => {
          this.bindingOptions.push(option);
          this.$dropdown.dropdown('set selected', value);
        });
      }
    }
    else {
      this.clear();
    }

    this._shouldHandleOnChange = true;    
  }
}
