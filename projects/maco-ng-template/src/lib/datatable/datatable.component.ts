import {
  Component,
  Input,
  ViewEncapsulation,
  OnChanges,
  ViewChild,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {
  DatatableOptionProperties, DatatableModel,
  DatatableProperties, DatatableColumnModel,
  DatatableColumnType, DatatableConditionalColor
} from './datatable.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'maco-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatatableComponent implements OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @HostBinding('class.app-datatable')

  @Input() data: DatatableModel;

  @Input() properties: DatatableProperties;

  @Input() loadingData = false;

  @Output() executeRowAction = new EventEmitter<DatatableOptionProperties>();

  @Output() actionClick = new EventEmitter<any>();

  @ViewChild(MatMenuTrigger, {static: true})
  contextMenu: MatMenuTrigger;

  columnsRefsIds: string[];
  columns: {[key: string]: DatatableColumnModel} = {};

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor() { }

  ngOnChanges(): void {
    if (this.data && this.data.columns) {
      this.columnsRefsIds = this.data.columns.map( (item: DatatableColumnModel) => {
        this.columns[item.id] = item;
        return item.id;
      });
    }
  }

  onContextMenu(event: MouseEvent, row: any): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { column: this.columns['options'], row };
    this.contextMenu.openMenu();
  }

  onActionClick(actionId: string, index: number): void {
    const action = {
      action: actionId,
      rowIndex: index
    };
    this.actionClick.emit(action);
  }

  isTextType(columnId: string): boolean {
    return this.getColumnTypeById(columnId) === DatatableColumnType.text;
  }

  isOptionType(columnId: string): boolean {
    return this.getColumnTypeById(columnId) === DatatableColumnType.option;
  }

  isIconType(columnId: string): boolean {
    return this.getColumnTypeById(columnId) === DatatableColumnType.icon;
  }

  getColumnTypeById(id: string): DatatableColumnType {
    return this.columns[id] ? this.columns[id].type : null;
  }

  getColumnColor(column: DatatableColumnModel, text: string): string {
    if (column.conditionalColors) {
      const conditionalColor = column.conditionalColors.find( (item: DatatableConditionalColor) => item.key === text.toString());
      return conditionalColor.color;
    }
    return null;
  }

  getColumnWidth(column: DatatableColumnModel): string {
    if (column.dimension) {
      return column.dimension.width + column.dimension.type
    }
    return 'auto'
  }

  onExecuteRowAction(rowProperties: DatatableOptionProperties, row: any): void {
    rowProperties.data = row;
    this.executeRowAction.emit(rowProperties);
  }
}
