import { Component, OnInit, Input, Output, ElementRef, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BindableComponent } from '../bindable.component';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent extends BindableComponent implements OnInit, OnChanges {

  constructor(private el: ElementRef) {
      super();
  }

  @Input() options: any[];  
  @Input() isLoading: boolean = false;
  @Input() valueMember: string = 'value';
  @Input() displayMember: string = 'text';
  @Input() label: string;
  @Input() floatLabel: string = 'auto';
  @Input() minChars: number = 3;  
  @Input() direction: string = 'auto';

  @Output() search = new EventEmitter();
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
    }
  }

  ngAfterViewInit() {    
    let $input = $(this.el.nativeElement.querySelector('input.search'));    
    fromEvent($input, 'keyup').pipe(debounceTime(300)).subscribe((event: any) => {
      if (event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 13) {        
        if (!!$input.val() && $input.val().length >= this.minChars) {
          this.search.emit($input.val());
        }      
      }      
    });
  }

  onKeyup(event) {
    this.keyup.emit(event);
  }
}
