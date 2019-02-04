import { Component, OnInit, Input, Output, EventEmitter, DoCheck, IterableDiffers, OnDestroy, IterableDiffer, SimpleChanges, OnChanges, ViewChild, HostListener, ElementRef, Inject } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { Key } from 'ts-keycode-enum';
import { Sort, MatSort } from '@angular/material';
import { APP_GLOBAL } from 'src/app/app.global';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']  
})
export class GridComponent implements OnInit, DoCheck, OnDestroy, OnChanges {  
  private _differ: IterableDiffer<any>;
  private _subscription: Subscription;
  private _global: any;

  constructor(private differs: IterableDiffers, @Inject(APP_GLOBAL) global) {
    this._differ = differs.find([]).create(null);
    this._global = global;
  }

  @Input() columns: GridColumn[];
  @Input() dataSource: any[];
  @Input() selectedIndex: number = 0;
  @Input() showFooter: boolean;
  @Input() isHeaderSticky: boolean = true;
  @Input() isFooterSticky: boolean;
  @Input() defaultSearch: any = {};

  @Output() rowClick = new EventEmitter();
  @Output() selectedIndexChange = new EventEmitter();
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() sortChange = new EventEmitter();

  @ViewChild(MatSort) matSort: MatSort;

  bindingDataSource: any[];

  get displayedColumns() {
    return this.columns.map(x => x.field);
  }

  ngOnInit() {    
    for (let column of this.columns) {
      column.format = column.format || ((value, item) => value);      
    }

    this.enableHotkeys();  
  }

  ngDoCheck() {    
    if (!!this._differ.diff(this.dataSource)) {      
      this.bindingDataSource = [...this.dataSource];     
    }    
  }

  ngOnChanges(changes: SimpleChanges) {    
  }

  ngOnDestroy() {
    this.disableHotkeys();
  }
  
  onRowClick(row, index) {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(this.selectedIndex);
    this.rowClick.emit(row);    
  }

  getCellData(row: any, column: GridColumn) {
    let paths = column.field.split('.');
    return paths.reduce((acc, value) => !!acc ? acc[value] : null, row);     
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

  enableHotkeys() {
    this._subscription = new Subscription();
    this._subscription.add(fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
      if (!this._global.lockHotkeys) {
        this.handleKeyEvent(event);
      }      
    }));
  }

  disableHotkeys() {
    this._subscription.unsubscribe();
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
