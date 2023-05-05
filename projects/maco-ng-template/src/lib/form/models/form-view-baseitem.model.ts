import { ValidatorFn } from '@angular/forms';
import { FormViewItemProperties } from '../interfaces/form-view-item-properties.interface';
import { FormViewItem } from '../interfaces/form-view-item.interface';
import { FormViewOptions } from '../interfaces/form-view-options.interface';


export class FormViewBaseItemModel implements FormViewItem {
    label: string;
    value: string | FormViewOptions | Date | number;
    key: string;
    editable: boolean;
    icon: string;
    validators?: ValidatorFn[];
    data?: any;
    options?: FormViewOptions[];
    width?: number;
    fieldType: string;
    minRows?: number;
    maxRows?: number;
    mapField?: string;

    constructor(formViewItemProperties: FormViewItemProperties) {
        this.label = formViewItemProperties.label || '';
        this.value = formViewItemProperties.value || null;
        this.key = formViewItemProperties.key;
        this.editable = formViewItemProperties.editable;
        this.icon = formViewItemProperties.icon || '';
        this.validators = formViewItemProperties.validators || [];
        this.data = formViewItemProperties.data || null;
        this.options = formViewItemProperties.options || [];
        this.width = formViewItemProperties.width;
        this.minRows = formViewItemProperties.minRows;
        this.maxRows = formViewItemProperties.maxRows;
        this.fieldType = formViewItemProperties.fieldType || 'text';
        this.mapField = formViewItemProperties.mapField || null;
    }
}
