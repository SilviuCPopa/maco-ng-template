import { FormViewItem } from './form-view-item.interface';

export enum RenderType {
  ROW = 'row',
  COLUMN = 'column'
}

export interface FormColumnContainer {
    label?: string;
    renderType?: RenderType;
    items: FormViewItem[];
}

export interface FormContainer {
    key: string;
    title?: string;
    columns: FormColumnContainer[];
    width?: number;
    actions?: any[];
}
