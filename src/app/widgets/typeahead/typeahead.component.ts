import { Component, OnInit, Input, Output, ElementRef, EventEmitter, SimpleChanges, OnChanges, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { BindableComponent } from '../bindable.component';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Key } from 'ts-keycode-enum'
import { DropdownComponent } from '../dropdown/dropdown.component';
import * as _ from 'lodash'
import UtilsService from 'src/app/services/utils.service';

declare var $: any;

@Component({
  selector: 'typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent extends BindableComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(private el: ElementRef, private utils: UtilsService) {
      super();
  }

  @Input() options: any[];  
  @Input() isLoading: boolean = false;
  @Input() valueMember: string = 'value';
  @Input() displayMember: string = 'text';
  @Input() label: string;
  @Input() floatLabel: string = 'never';
  @Input() minChars: number = 3;  
  @Input() direction: string = 'auto';
  @Input() showOnDown: boolean = false;
  @Input() preventKeys: string[] = [];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() requestForOption: (value) => Observable<any>;
  @Input() itemClass: string;
  @Input() showNoResults: boolean = true;

  @Output() search = new EventEmitter();
  @Output('keydown') keydownEvent = new EventEmitter();
  @Output('show') showEvent = new EventEmitter();
  @Output('hide') hideEvent = new EventEmitter();
  @Output('select') selectEvent = new EventEmitter();
  @Output('focus') focusEvent = new EventEmitter();
  @Output() blur = new EventEmitter();

  @ViewChild('dropdown') dropdown: DropdownComponent;

  bindingOptions: any[];

  ngOnInit() {
  }  

  ngAfterViewInit() {    
    let $input = $(this.el.nativeElement.querySelector('input.search'));
    this._subscription.add(fromEvent($input, 'keyup').pipe(debounceTime(300)).subscribe((event: any) => {
      if (!event.shiftKey && event.keyCode != Key.UpArrow
        && event.keyCode != Key.DownArrow
        && event.keyCode != Key.Enter
        && event.keyCode != Key.Escape
        && event.keyCode != Key.Shift) {        
        if (!!$input.val() && $input.val().length >= this.minChars) {
          this.search.emit(this.utils.unaccent($input.val()));
        }      
      }      
    }));
  }  

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onKeydown(event) {
    this.keydownEvent.emit(event);
  }

  onSelect(event) {
    this.selectEvent.emit(event);
  }

  clear() {
    this.dropdown.clear();
  }

  focus() {
    this.dropdown.focus();
  }

  show() {
    this.dropdown.show();
  }

  hide() {
    this.dropdown.hide();
  }

  onShow() {
    this.showEvent.emit();
  }

  onHide() {
    this.hideEvent.emit();
  }

  onFocus() {
    this.focusEvent.emit();
  }

  onBlur() {
    this.blur.emit();
  }
}
