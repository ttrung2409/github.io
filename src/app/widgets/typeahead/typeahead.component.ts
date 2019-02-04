import { Component, OnInit, Input, Output, ElementRef, EventEmitter, SimpleChanges, OnChanges, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { BindableComponent } from '../bindable.component';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Key } from 'ts-keycode-enum'
import { DropdownComponent } from '../dropdown/dropdown.component';
declare var $: any;

@Component({
  selector: 'typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent extends BindableComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(private el: ElementRef) {
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
  @Input() showOnKeyDown: boolean = true;
  @Input() preventKeys: string[] = [];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() requestForOption: (value) => Observable<any>;

  @Output() search = new EventEmitter();
  @Output() onKeydown = new EventEmitter();
  @Output() show = new EventEmitter();
  @Output() hide = new EventEmitter();
  @Output() onSelect = new EventEmitter();

  @ViewChild('dropdown') dropdown: DropdownComponent;

  bindingOptions: any[];

  ngOnInit() {
  }  

  ngAfterViewInit() {    
    let $input = $(this.el.nativeElement.querySelector('input.search'));
    this._subscription.add(fromEvent($input, 'keyup').pipe(debounceTime(300)).subscribe((event: any) => {
      if (event.keyCode != Key.UpArrow && event.keyCode != Key.DownArrow && event.keyCode != Key.Enter) {        
        if (!!$input.val() && $input.val().length >= this.minChars) {
          this.search.emit($input.val());
        }      
      }      
    }));
  }  

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  handleKeydown(event) {
    this.onKeydown.emit(event);
  }

  handleSelect(event) {
    this.onSelect.emit(event);
  }

  clear() {
    this.dropdown.clear();
  }

  focus() {
    this.dropdown.focus();
  }

  onShow() {
    this.show.emit();
  }

  onHide() {
    this.hide.emit();
  }
}
