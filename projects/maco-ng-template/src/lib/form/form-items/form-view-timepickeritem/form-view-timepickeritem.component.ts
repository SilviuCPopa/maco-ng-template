import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormViewItemBaseDirective } from '../form-view-item.component';
import { UntypedFormControl } from '@angular/forms';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { Subscription } from 'rxjs';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';

@Component({
  selector: 'maco-form-view-timepicker',
  templateUrl: './form-view-timepickeritem.component.html',
  styleUrls: ['./form-view-timepickeritem.component.scss']
})
export class FormViewTimePickerItemComponent extends FormViewItemBaseDirective implements OnInit, OnDestroy {

  @Input()
  override formItem: FormViewBaseItemModel;

  @Input()
  standAlone = false;

  @Output()
  timeChanged: EventEmitter<string> = new EventEmitter<string>();

  override formControl: UntypedFormControl;
  currentDate = new Date().getTime();
  valueChangesSubscription: Subscription;

  constructor(protected formItemUpdateService: FormItemUpdateService) { super(); }

  onInputChange($event: any): void {
    if (!this.standAlone) {
      this.formItemUpdateService.update(this.containerId, {
        key: this.formItem.key,
        label: this.formItem.label,
        value: $event
      });
    }
    this.timeChanged.emit($event);
  }

  override ngOnInit(): void {
    if (this.formItem) {
      this.formControl = new UntypedFormControl({ value: this.formItem.value || '', disabled: !this.formItem.editable });
      this.formControl.setValidators(this.formItem.validators);
    }

    this.valueChangesSubscription = this.formControl.valueChanges.subscribe( (value: Date) => {
      this.onInputChange(value);
    });
  }

  ngOnDestroy(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }
}
