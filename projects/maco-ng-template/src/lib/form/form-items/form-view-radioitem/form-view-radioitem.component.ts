import { Component, OnInit, Input } from '@angular/core';
import { FormViewItemBaseDirective } from '../form-view-item.component';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';
import { UntypedFormControl } from '@angular/forms';
import { FormItemUpdateService } from '../../services/form-item-update.service';

@Component({
  selector: 'maco-form-view-radioitem',
  templateUrl: './form-view-radioitem.component.html',
  styleUrls: ['./form-view-radioitem.component.scss']
})
export class FormViewRadioitemComponent extends FormViewItemBaseDirective implements OnInit {

  @Input()
  override formItem: FormViewBaseItemModel;

  override formControl: UntypedFormControl;

  constructor(private formItemUpdateService: FormItemUpdateService) { super(); }

  override ngOnInit(): void {
    this.formControl = new UntypedFormControl({ value: this.formItem.value, disabled: !this.formItem.editable });
    this.formControl.setValidators(this.formItem.validators);
    this.formControl.markAllAsTouched()
  }

  onInputChange($event: any): void {
    this.formItemUpdateService.update(this.containerId, {
      key: this.formItem.key,
      label: this.formItem.label,
      value: $event.value,
    });
  }

  override getErrorMessage(): string {
    return super.getErrorMessage();
  }
}
