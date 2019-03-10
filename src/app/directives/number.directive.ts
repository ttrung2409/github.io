import { Directive, ElementRef, HostListener, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Key } from 'ts-keycode-enum';
import UtilsService from '../services/utils.service';
declare var $: any;

@Directive({
  selector: 'input[number]'
})
export class NumberDirective implements OnInit, OnChanges {
  constructor(private el: ElementRef, private utils: UtilsService) {
  }

  @Input() model: any;
  @Input() allowDecimal: boolean;
  @Output() modelChange = new EventEmitter();

  @HostListener('input', ['$event']) onInput(event) {
    let value = this.utils.formatNumber(event.target.value, { allowDecimal: this.allowDecimal });
    this.modelChange.emit(!!value ? parseFloat(value.replace(/,/g, '')) : null);
  }  
  
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (event.shiftKey) return;
    if (event.keyCode == Key.Tab
      || event.keyCode == Key.Backspace
      || event.keyCode == Key.Home
      || event.keyCode == Key.Delete
      || event.keyCode == Key.Home
      || event.keyCode == Key.End) return;

    let pattern = this.allowDecimal ? new RegExp('[0-9\\.]') : new RegExp('[0-9]');
    if (!pattern.test(event.key)) event.preventDefault();    
  }

  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.model) {
      $(this.el.nativeElement).val(this.utils.formatNumber(this.model, { allowDecimal: this.allowDecimal }));
    }
  }
}
