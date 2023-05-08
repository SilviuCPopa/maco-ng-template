import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { FormViewItemBaseDirective } from '../form-view-item.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment/moment';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';

@Component({
  selector: 'maco-form-view-dateitem',
  templateUrl: './form-view-dateitem.component.html',
  styleUrls: ['./form-view-dateitem.component.scss']
})
export class FormViewDateitemComponent extends FormViewItemBaseDirective implements OnInit {

  @Input()
  override formItem: FormViewBaseItemModel;

  @Input()
  standAlone = false;

  @Output()
  dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  override formControl: UntypedFormControl;

  constructor(protected formItemUpdateService: FormItemUpdateService) { super(); }

  override ngOnInit(): void {
    if (this.formItem) {
      this.formControl = new UntypedFormControl({ value: this.getDateValue(), disabled: !this.formItem.editable });
      this.formControl.setValidators(this.formItem.validators);
      this.formControl.markAllAsTouched();
    }
  }

  onInputChange($event: MatDatepickerInputEvent<Date>): void {
    const value = moment($event.target.value).startOf('day').format();
    if (!this.standAlone) {
      this.formItemUpdateService.update(this.containerId, {
        key: this.formItem.key,
        label: this.formItem.label,
        value
      });
    }
    this.dateChanged.emit(moment(value).toDate());
  }

  getDateValue(): unknown {
    if (typeof this.formItem.value === 'string') {
      return new Date(parseInt(this.formItem.value, 10));
    }
    return this.formItem.value;
  }
}
