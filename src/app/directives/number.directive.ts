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
  @Output() modelChange = new EventEmitter();

  @HostListener('input', ['$event']) onInput(event) {    
    event.target.value = this.utils.formatNumber(event.target.value);
    this.modelChange.emit(!!event.target.value ? parseFloat(event.target.value.replace(/,/g, '')) : null);
  }  
  
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (event.keyCode == Key.Tab || event.keyCode == Key.Backspace || event.keyCode == Key.Home) return;
    if (!/[0-9]/.test(event.key)) event.preventDefault();    
  }

  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.model) {
      $(this.el.nativeElement).val(this.utils.formatNumber(this.model));
    }
  }
}
