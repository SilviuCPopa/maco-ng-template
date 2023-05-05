import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { FormViewItemBaseDirective } from '../form-view-item.component';

@Component({
  selector: 'maco-form-view-textareaitem',
  templateUrl: './form-view-textareaitem.component.html'
})
export class FormViewTextareaitemComponent extends FormViewItemBaseDirective implements OnInit {

  @Input()
  override formItem: FormViewBaseItemModel;

  override formControl: UntypedFormControl;

  constructor(protected formItemUpdateService: FormItemUpdateService) { super(); }

  override onInputChange($event: any): void {
    this.formItemUpdateService.update(this.containerId, {
      key: this.formItem.key,
      value: $event.target.value,
      label: this.formItem.label
    });
  }
}
