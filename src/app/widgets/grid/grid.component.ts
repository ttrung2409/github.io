import { Component, OnInit, Input, Output, EventEmitter, DoCheck, IterableDiffers } from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']  
})
export class GridComponent implements OnInit, DoCheck {  
  private _differs: any;

  constructor(private differs: IterableDiffers) {
    this._differs = differs.find([]).create(null);
  }

  @Input() columns: GridColumn[];
  @Input() dataSource: any[];
  @Input() selectedIndex: number = 0;
  @Output() rowClick = new EventEmitter();  

  bindingDataSource: any[];

  get displayedColumns() {
    return this.columns.map(x => x.field);
  }

  ngOnInit() {    
    for (let column of this.columns) {
      column.format = column.format || ((value, item) => value);      
    }    
  }

  ngDoCheck() {    
    if (!!this._differs.diff(this.dataSource)) {
      debugger;
      this.bindingDataSource = [...this.dataSource];
    }
  }
  
  onRowClick(row) {    
    this.rowClick.emit(row);
  }

  getCellData(row: any, column: GridColumn) {
    let paths = column.field.split('.');
    let data = row;
    for (let path of paths) {
      data = data[path];
    }

    return data;
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
