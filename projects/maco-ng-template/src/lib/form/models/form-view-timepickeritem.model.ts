import { FormViewBaseItemModel } from './form-view-baseitem.model';
import { FormItemType } from './form-type.enum';
import { FormViewItemProperties } from '../interfaces/form-view-item-properties.interface';

export class FormViewTimePickerItemModel extends FormViewBaseItemModel {
    type: FormItemType = FormItemType.timepicker;

    constructor(formViewItemProperties: FormViewItemProperties) {
        super(formViewItemProperties);
    }
}
