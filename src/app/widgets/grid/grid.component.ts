import { Component, OnInit, Input, Output, EventEmitter, DoCheck, IterableDiffers, OnDestroy, IterableDiffer } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Key } from 'ts-keycode-enum';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Sort } from '@angular/material';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']  
})
export class GridComponent implements OnInit, DoCheck, OnDestroy {  
  private _differ: IterableDiffer<any>;
  private _hotkey: Hotkey;

  constructor(private differs: IterableDiffers, private hotkeyService: HotkeysService) {
    this._differ = differs.find([]).create(null);
  }

  @Input() columns: GridColumn[];
  @Input() dataSource: any[];
  @Input() selectedIndex: number = 0;
  @Input() showFooter: boolean;
  @Input() isHeaderSticky: boolean;
  @Input() isFooterSticky: boolean;
  @Output() rowClick = new EventEmitter();
  @Output() selectedIndexChange = new EventEmitter();
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() sortChange = new EventEmitter();

  bindingDataSource: any[];

  get displayedColumns() {
    return this.columns.map(x => x.field);
  }  

  ngOnInit() {    
    for (let column of this.columns) {
      column.format = column.format || ((value, item) => value);      
    }

    this.hotkeyService.add(this._hotkey = new Hotkey(['up', 'down', 'enter', 'del'], (event: KeyboardEvent) => {     
      this.handleKeyEvent(event);
      return false;
    }));  
  }

  ngDoCheck() {    
    if (!!this._differ.diff(this.dataSource)) {      
      this.bindingDataSource = [...this.dataSource];     
    }
  }

  ngOnDestroy() {
    this.hotkeyService.remove(this._hotkey);
  }
  
  onRowClick(row, index) {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(this.selectedIndex);
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

  handleKeyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case Key.UpArrow:
        this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        this.selectedIndexChange.emit(this.selectedIndex);
        break;
      case Key.DownArrow:
        this.selectedIndex = Math.min(this.dataSource.length - 1, this.selectedIndex + 1);
        this.selectedIndexChange.emit(this.selectedIndex);
        break;
      case Key.Enter:
        if (this.selectedIndex > -1) {
          this.select.emit(this.dataSource[this.selectedIndex]);
        }
        
        break;
      case Key.Delete:
        if (this.selectedIndex > -1) {
          this.delete.emit(this.dataSource[this.selectedIndex]);
        }
        
        break;
    }
  }

  getFooterValue(footer) {
    if (typeof (footer) === 'function') {
      return footer();
    }

    return footer || '';
  }

  onSortChange(sort: Sort) {
    this.sortChange.emit({ orderBy: sort.active, isDesc: sort.direction == 'desc' ? true : false });  
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
  public footer: any;
  public sortable: boolean;
  public isNumber: boolean;
}
