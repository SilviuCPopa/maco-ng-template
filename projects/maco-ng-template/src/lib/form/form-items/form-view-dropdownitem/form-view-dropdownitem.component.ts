import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormViewItemBaseDirective } from '../form-view-item.component';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';
import { UntypedFormControl } from '@angular/forms';
import { FormItemUpdateService } from '../../services/form-item-update.service';

@Component({
  selector: 'maco-form-view-dropdown',
  templateUrl: './form-view-dropdownitem.component.html',
  styleUrls: ['./form-view-dropdownitem.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormViewDropdownItemComponent extends FormViewItemBaseDirective implements OnInit {

  @Input()
  override formItem: FormViewBaseItemModel;

  override formControl: UntypedFormControl;

  constructor(private formItemUpdateService: FormItemUpdateService) { super(); }

  override ngOnInit(): void {
    this.formControl = new UntypedFormControl({ value: this.formItem.options[0]?.id, disabled: !this.formItem.editable });
    this.formControl.setValidators(this.formItem.validators);
    this.formControl.markAllAsTouched();
  }

  onInputChange($event: any): void {
    const mapField = this.formItem.mapField;
    this.formItemUpdateService.update(this.containerId, {
      key: this.formItem.key,
      label: this.formItem.label,
      value: mapField ? $event.value[mapField] : $event.value
    });
  }
}
