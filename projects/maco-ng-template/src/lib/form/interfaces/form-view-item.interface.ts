import { FormItemType } from '../models/form-type.enum';
import { ValidatorFn } from '@angular/forms';

export interface FormViewItem {
    label: string;
    value: any;
    key: string;
    type?: FormItemType;
    editable?: boolean;
    icon?: string;
    validators?: ValidatorFn[];
    width?: number;
}
