import { Input, Output, Component, EventEmitter } from "@angular/core";

@Component({  
  template: '' 
})
export class BindableComponent {  
  @Input() model: any;
  @Output() modelChange = new EventEmitter();  
}
