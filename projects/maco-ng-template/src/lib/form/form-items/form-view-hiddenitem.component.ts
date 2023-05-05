import { Component, Input} from '@angular/core';
import { FormViewItemBaseDirective } from './form-view-item.component';
import { UntypedFormControl } from '@angular/forms';
import { FormViewBaseItemModel } from '../models/form-view-baseitem.model';

@Component({
    selector: 'maco-form-view-hiddenitem',
    template: ``,
    styles: [
      `:host {
        display: none;
      }`
    ]
  })
  export class FormViewHiddenItemComponent extends FormViewItemBaseDirective {

    @Input()
    override formItem: FormViewBaseItemModel;

    override formControl: UntypedFormControl;

    constructor() { super(); }

    onInputChange($event: any): void { return $event; }
  }
