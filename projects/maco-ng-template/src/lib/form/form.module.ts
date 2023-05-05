import { NgModule} from '@angular/core';
import { FormItemDispacherComponent } from './form-item-dispacher/form-item-dispacher.component';
import { FormItemContentProxyDirective } from './form-item-dispacher/form-item-content-proxy.directive';
import { FormViewTextitemComponent } from './form-items/form-view-textitem/form-view-textitem.component';
import { FormTypeMappingService } from './services/form-type-mapping.service';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormViewHiddenItemComponent } from './form-items/form-view-hiddenitem.component';
import { FormViewBooleanItemComponent } from './form-items/form-view-booleanitem/form-view-booleanitem.component';
import { FormViewRadioitemComponent } from './form-items/form-view-radioitem/form-view-radioitem.component';
import { FormViewAutocompleteItemComponent } from './form-items/form-view-autocompleteitem/form-view-autocompleteitem.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormViewTextareaitemComponent } from './form-items/form-view-textareaitem/form-view-textareaitem.component';
import { FormViewTimePickerItemComponent } from './form-items/form-view-timepickeritem/form-view-timepickeritem.component';
import { FormViewDateitemComponent } from './form-items/form-view-dateitem/form-view-dateitem.component';
import { FormViewDropdownItemComponent } from './form-items/form-view-dropdownitem/form-view-dropdownitem.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FormViewChipsAutocompleteComponent } from './form-items/form-view-chips-autocomplete/form-view-chips-autocomplete.component';
import { MaterialModules } from '../commons/material.module';
import { DialogModule } from '../dialog/dialog.module';

export const FORM_ITEM_COMPONENTS = [
    FormViewTextitemComponent,
    FormViewHiddenItemComponent,
    FormViewBooleanItemComponent,
    FormViewRadioitemComponent,
    FormViewDropdownItemComponent,
    FormViewAutocompleteItemComponent,
    FormDialogComponent,
    FormContainerComponent,
    FormViewTextareaitemComponent,
    FormViewTimePickerItemComponent,
    FormViewDateitemComponent,
    FormViewChipsAutocompleteComponent
];

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        MaterialModules,
        ReactiveFormsModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        DialogModule
    ],
    declarations: [
        FormItemContentProxyDirective,
        FormItemDispacherComponent,
        ...FORM_ITEM_COMPONENTS
    ],
    providers: [
        FormTypeMappingService
    ]
})
export class FormViewModule {}
