import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormItemUpdateService } from '../services/form-item-update.service';
import { FormContainer, FormColumnContainer, RenderType } from '../interfaces/form-container.interface';
import { UntypedFormGroup, UntypedFormControl, Validators, AbstractControl } from '@angular/forms';
import { FormViewItem } from '../interfaces/form-view-item.interface';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'maco-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormContainerComponent implements OnInit, OnDestroy {

  @Input() formContainer: FormContainer;

  @Output() formChanged: EventEmitter<UntypedFormGroup> = new EventEmitter();

  @Output() formItemChanged: EventEmitter<FormViewItem> = new EventEmitter();

  formGroup: UntypedFormGroup = new UntypedFormGroup({});

  private onDestroy$ = new Subject<boolean>();

  constructor(
    private formItemUpdateService: FormItemUpdateService) { }

  ngOnInit(): void {
    this.buildForm();
    this.formItemUpdateService.init(this.formContainer.key);

    this.formItemUpdateService.itemUpdated$[this.formContainer.key]
      .pipe(takeUntil(this.onDestroy$), debounceTime(100))
      .subscribe( (item: FormViewItem) => {
      this.updateForm(item);
    });
  }

  get formItems(): FormViewItem[] {
    if (this.hasColumns(this.formContainer)) {
      const formItems: FormViewItem[] = [];
      this.formContainer.columns.forEach( ( { items }) => formItems.concat(items) );
      return formItems;
    }
    return [];
  }

  buildForm(): void {
    this.formContainer.columns?.forEach( ( { items }) => {
      items.forEach( formItem => {
        this.formGroup.addControl(formItem.key, new UntypedFormControl(formItem.value, Validators.compose(formItem.validators)));
      });
    });
    this.formChanged.emit(this.formGroup);
  }

  hasColumns(formContainer: FormContainer): boolean {
    return formContainer.columns && formContainer.columns.length > 0;
  }

  updateForm(item: FormViewItem): void {
    this.getFormControl(item.key)?.setValue(item.value);
    this.formItemChanged.emit(item);
    this.formChanged.emit(this.formGroup);
  }

  resetForm(): void {
    this.formGroup.reset();
  }

  isRowType(item: FormColumnContainer): boolean {
    return item.renderType === RenderType.ROW;
  }

  private getFormControl(key: string): AbstractControl {
    return this.formGroup.controls[key];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
