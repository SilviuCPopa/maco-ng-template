import { ValidatorFn } from '@angular/forms';
import { FormViewOptions } from './form-view-options.interface';

export interface FormViewItemProperties {
    label: string;
    value: any;
    key: string;
    editable: boolean;
    icon?: string;
    validators?: ValidatorFn[];
    errorMessage?: string;
    data?: any;
    options?: FormViewOptions[];
    width?: number;
    fieldType?: string;
    mapField?: string;
    minRows?: number;
    maxRows?: number;
}
