import {MatPaginator} from '@angular/material/paginator';

export interface DatatableColumnDimension {
    width: string;
    height?: string;
    type: DatatableDimensionType;
}

export enum DatatableRowTextAlign {
    left = 'left',
    right = 'right',
    center = 'center'
}

export enum DatatableColumnType {
    text = 'text',
    date = 'date',
    option = 'option',
    icon = 'icon',
    action = 'action',
    index = 'index'
}

export enum DatatableDimensionType {
    px = 'px',
    precent = '%'
}

export enum DatatableOptionAction {
    edit = 'edit',
    delete = 'delete',
    disable = 'disable',
    enable = 'enable'
}

export interface DatatableModel {
    columns: DatatableColumnModel[];
    rows: any[];
    paginator?: MatPaginator;
}

export interface DatatableProperties {
    showIndex?: boolean;
    sort?: boolean;
    pagination?: boolean;
    classList?: string[];
    width?: string;
    type: DatatableDimensionType;
}

export interface DatatableOptionProperties {
    label: string;
    action: string;
    icon: string;
    data?: any;
}

export interface DatatableConditionalColor {
    key: string;
    color: string;
}

export class DatatableColumnModel {
    id: string;
    display: string;
    dimension?: DatatableColumnDimension;
    textAlign?: DatatableRowTextAlign;
    type?: DatatableColumnType;
    translate?: boolean;
    icon?: string;
    color?: string;
    suffix?: string;
    prefix?: string;
    conditionalColors?: DatatableConditionalColor[];
    properties: DatatableOptionProperties[];
    format: string;

    constructor(obj: any) {
        this.id = obj.id;
        this.display = obj.display;
        this.dimension = obj.dimension;
        this.textAlign = obj.textAlign;
        this.type = obj.type ? obj.type : DatatableColumnType.text;
        this.translate = obj.translate ? obj.translate : true;
        this.icon = obj.icon;
        this.suffix = obj.suffix,
        this.prefix = obj.prefix,
        this.properties = obj.properties;
        this.color = obj.color;
        this.conditionalColors = obj.conditionalColors;
        this.format = obj.format;
    }
}
