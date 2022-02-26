import { Input, Output, Component, EventEmitter} from "@angular/core";

@Component({  
  template: '' 
})
export class BindableComponent {    
  @Output() modelChange = new EventEmitter();

  _model: any;
  get model() {
    return this._model;
  }

  @Input()
  set model(value) {
    this._model = value;
    this.modelChange.emit(value);
  }
}
