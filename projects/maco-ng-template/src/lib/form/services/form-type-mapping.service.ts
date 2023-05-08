import { Type, Injectable } from '@angular/core';
import { FormViewTextitemComponent } from '../form-items/form-view-textitem/form-view-textitem.component';
import { FormItemType } from '../models/form-type.enum';
import { FormViewHiddenItemComponent } from '../form-items/form-view-hiddenitem.component';
import { FormViewBooleanItemComponent } from '../form-items/form-view-booleanitem/form-view-booleanitem.component';
import { FormViewRadioitemComponent } from '../form-items/form-view-radioitem/form-view-radioitem.component';
import { FormViewAutocompleteItemComponent } from '../form-items/form-view-autocompleteitem/form-view-autocompleteitem.component';
import { FormViewTextareaitemComponent } from '../form-items/form-view-textareaitem/form-view-textareaitem.component';
import { FormViewTimePickerItemComponent } from '../form-items/form-view-timepickeritem/form-view-timepickeritem.component';
import { FormViewDateitemComponent } from '../form-items/form-view-dateitem/form-view-dateitem.component';
import { FormViewDropdownItemComponent } from '../form-items/form-view-dropdownitem/form-view-dropdownitem.component';
import { FormViewChipsAutocompleteComponent } from '../form-items/form-view-chips-autocomplete/form-view-chips-autocomplete.component';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({ providedIn: 'root' })
export class FormTypeMappingService {

    protected defaultValue: Type<{}> = FormViewTextitemComponent;
    protected types: { [key: string]: ComponentType<any> } = {
      text: FormViewTextitemComponent,
      textarea: FormViewTextareaitemComponent,
      hidden: FormViewHiddenItemComponent,
      boolean: FormViewBooleanItemComponent,
      radio: FormViewRadioitemComponent,
      dropdown: FormViewDropdownItemComponent,
      autocomplete: FormViewAutocompleteItemComponent,
      chipsAutocomplete: FormViewChipsAutocompleteComponent,
      timepicker: FormViewTimePickerItemComponent,
      date: FormViewDateitemComponent
    };

    public getComponentFromType(type: FormItemType): ComponentType<any> {
      return this.types[type];
    }
}
