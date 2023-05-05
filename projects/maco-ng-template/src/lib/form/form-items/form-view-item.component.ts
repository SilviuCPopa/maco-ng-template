import { FormViewItem } from '../interfaces/form-view-item.interface';
import { UntypedFormControl } from '@angular/forms';
import { OnInit, Directive } from '@angular/core';


@Directive()
export abstract class FormViewItemBaseDirective implements OnInit {

    formItem: FormViewItem;
    formControl: UntypedFormControl;
    containerId: string;

    abstract onInputChange($event: any): void;

    ngOnInit(): void {
      if (this.formItem) {
        this.formControl = new UntypedFormControl({ value: this.formItem?.value, disabled: !this.formItem.editable });
        this.formControl.setValidators(this.formItem.validators);
      }
    }

    getErrorMessage(): string {
        if (this.formControl.hasError('required')) {
          return 'APP.ERRORS.FIELD.REQUIRED';
        } else {
          return 'APP.ERRORS.FIELD.INVALID';
        }
    }

    isRequired(): boolean {
      return !!this.formItem.validators.find(item => item.name === 'required');
    }
}
