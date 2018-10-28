import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {  
  constructor() { }

  @Input() columns: GridColumn[];
  @Input() dataSource: any[];
  @Output() rowClick = new EventEmitter();

  get displayedColumns() {
    return this.columns.map(x => x.field);
  }

  ngOnInit() {    
    for (let column of this.columns) {
      column.format = column.format || ((value, item) => value);      
    }    
  }

  onRowClick(row) {    
    this.rowClick.emit(row);
  }
}

export class GridColumn {
  public constructor(init?: Partial<GridColumn>) {
    Object.assign(this, init);
  }

  public caption: string;
  public field: string;
  public width: string;
  public format: Function;  
}
