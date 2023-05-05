import { FormViewBaseItemModel } from './form-view-baseitem.model';
import { FormItemType } from './form-type.enum';
import { FormViewItemProperties } from '../interfaces/form-view-item-properties.interface';

export class FormViewDateItemModel extends FormViewBaseItemModel {
    type: FormItemType = FormItemType.date;

    constructor(formViewItemProperties: FormViewItemProperties) {
        super(formViewItemProperties);
    }
}
