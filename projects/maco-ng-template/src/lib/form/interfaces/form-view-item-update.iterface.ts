import { Subject } from 'rxjs';
import { FormViewOptions } from './form-view-options.interface';

export interface FormViewItemUpdate {
    key: string;
    label: string;
    value: any;
    data?: any;
}

export interface FormItemUpdateItem {
  [key: string]: Subject<FormViewItemUpdate>;
}
export interface FormItemAutocompleteUpdateItem {
  [key: string]: Subject<FormViewOptions[]>;
}


