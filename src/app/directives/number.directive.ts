import { Directive, ElementRef, HostListener } from '@angular/core';
import { Key } from 'ts-keycode-enum';
declare var $: any;

@Directive({
  selector: '[number]'
})
export class NumberDirective {

  constructor(private el: ElementRef) { }  

  @HostListener('input') onInput() {    
    let value = $(this.el.nativeElement).val();
    value = value.replace(/[^0-9]/g, '');    
    $(this.el.nativeElement).val(value);
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (event.keyCode == Key.Tab || event.keyCode == Key.Backspace || event.keyCode == Key.Home) return;
    if (!/[0-9]/.test(event.key)) event.preventDefault();
  }
}
