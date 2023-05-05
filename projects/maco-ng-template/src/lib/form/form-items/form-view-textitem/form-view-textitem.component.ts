import { Component, Input} from '@angular/core';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { FormViewItemBaseDirective } from '../form-view-item.component';
import { UntypedFormControl } from '@angular/forms';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';

@Component({
  selector: 'maco-form-view-textitem',
  templateUrl: './form-view-textitem.component.html'
})
export class FormViewTextitemComponent extends FormViewItemBaseDirective {

  @Input()
  override formItem: FormViewBaseItemModel;

  override formControl: UntypedFormControl;

  constructor(protected formItemUpdateService: FormItemUpdateService) { super(); }

  onInputChange($event: any): void {
    this.formItemUpdateService.update(this.containerId, {
      key: this.formItem.key,
      label: this.formItem.label,
      value: $event.target.value
    });
  }
}
