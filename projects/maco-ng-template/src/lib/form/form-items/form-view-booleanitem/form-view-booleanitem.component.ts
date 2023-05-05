import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';
import { UntypedFormControl } from '@angular/forms';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { FormViewItemBaseDirective } from '../form-view-item.component';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'maco-form-view-booleanitem',
  templateUrl: './form-view-booleanitem.component.html'
})
export class FormViewBooleanItemComponent extends FormViewItemBaseDirective implements OnInit {

  constructor(private formItemUpdateService: FormItemUpdateService) { super(); }

  @Input()
  override formItem: FormViewBaseItemModel;

  @Output()
  inputChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  override formControl: UntypedFormControl;

  override ngOnInit(): void {
    this.formControl = new UntypedFormControl({ value: '', disabled: !this.isFormItemEditable() });
    this.formControl.setValidators(this.formItem.validators);
  }

  isFormItemEditable(): boolean {
    return this.formItem && this.formItem.editable;
  }

  onInputChange($event: MatCheckboxChange): void {
    this.formItemUpdateService.update(this.containerId, {
      key: this.formItem.key,
      label: this.formItem.label,
      value: $event.checked.toString()
    });

    this.inputChange.emit($event.checked);
  }
}
