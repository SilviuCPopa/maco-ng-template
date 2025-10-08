import { FormViewBaseItemModel } from './../../models/form-view-baseitem.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { FormViewItemBaseDirective } from '../form-view-item.component';
import { FormViewOptions } from '../../interfaces/form-view-options.interface';
import { FormItemUpdateService } from '../../services/form-item-update.service';

@Component({
    selector: 'maco-form-view-chips-autocomplete',
    templateUrl: 'form-view-chips-autocomplete.component.html',
  })
  export class FormViewChipsAutocompleteComponent extends FormViewItemBaseDirective implements OnInit, AfterContentChecked {

    @Input()
    override formItem: FormViewBaseItemModel;

    override formControl: UntypedFormControl;

    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredOptions: Observable<FormViewOptions[]>;
    options: FormViewOptions[] = [];
    chipsInputControl = new UntypedFormControl();
    allOptions: FormViewOptions[];

    @ViewChild('formInput') formInput: ElementRef<HTMLInputElement>;

    constructor(private formItemUpdateService: FormItemUpdateService) {super();}

    override ngOnInit(): void {
        this.formControl = new UntypedFormControl({ value: null, disabled: !this.formItem.editable });
        this.formControl.setValidators(this.formItem.validators);

        this.allOptions = this.formItem?.options || [];
        this.filteredOptions = this.chipsInputControl.valueChanges.pipe(
          map((value: string | null) => this._filter(value))
        );
    }

    ngAfterContentChecked(): void {
      this.chipsInputControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    }

    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      if (value && this.isOptionValid(value)) {
        const option = this.allOptions.find( item => item.name === value);
        this.options.push(option);
      }

      if (event.chipInput !== undefined) {
        event.chipInput.clear();
        this.chipsInputControl.setValue(null);
        this.updateFormControl();
      }
    }

    remove(index: number): void {

      if (index >= 0) {
        this.options.splice(index, 1);
      }
      this.chipsInputControl.setValue(null);
      this.updateFormControl();
    }

    override getErrorMessage(): string {
      if (this.isFormControlRequired()) {
        return 'APP.ERRORS.FIELD.REQUIRED';
      } else if (this.isFormControlInvalid() ) {
        return 'APP.ERRORS.FIELD.INVALID';
      }
      return null;
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.options.push(event.option.value);
      this.formInput.nativeElement.value = '';
      this.chipsInputControl.setValue(null);
      this.updateFormControl();
    }

    isFormControlRequired(): boolean {
      return this.chipsInputControl.touched
              && this.isFormRequired
              && this.options.length === 0
              && this.chipsInputControl.value === null;
    }

    isFormControlInvalid(): boolean {
      return this.chipsInputControl.touched
             && this.options.length === 0
             && this.chipsInputControl.value !== null;
    }

    onInputChange($event: any): void {}

    private get isFormRequired(): boolean {
      if (this.formControl.validator !== null) {
        const validator = this.formControl?.validator({} as AbstractControl);
        if (validator && validator['required']) {
          return true;
        }
        return false;
      }
      return false;
    }

    private updateFormControl(): void {
      this.formItemUpdateService.update(this.containerId, {
        key: this.formItem.key,
        label: this.formItem.label,
        value: this.options.map(option => option.value)
      });
    }

    private isOptionValid(value: string): boolean {
      return !!this.allOptions.find(option => option.name === value) &&
        !this.options.find(option => option.name = value);
    }

    private _filter(value: string): FormViewOptions[] {
      if (typeof value !== 'string') { return this.allOptions; }

      const filterValue = value.toLowerCase();
      return this.allOptions
      .filter(item => !this.options.find(option => option.name.toLowerCase() === item.name.toLowerCase()))
      .filter(item => {
        return item.name.toLowerCase().includes(filterValue);
      });
    }

  }
