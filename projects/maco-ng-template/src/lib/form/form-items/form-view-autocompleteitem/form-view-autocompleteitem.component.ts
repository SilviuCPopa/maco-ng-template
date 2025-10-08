import { Component, Input, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { FormViewTextitemComponent } from '../form-view-textitem/form-view-textitem.component';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';
import { UntypedFormControl } from '@angular/forms';
import { FormViewOptions } from '../../interfaces/form-view-options.interface';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'maco-form-view-autocompleteitem',
    templateUrl: './form-view-autocompleteitem.component.html',
    styleUrls: ['./form-view-autocompleteitem.component.scss'],
    standalone: false
})
export class FormViewAutocompleteItemComponent extends FormViewTextitemComponent implements OnInit, OnDestroy {

  @Input()
  override formItem: FormViewBaseItemModel;

  @Input()
  debounceTime = 0;

  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  optionSelected: EventEmitter<FormViewOptions> = new EventEmitter<FormViewOptions>();

  override formControl: UntypedFormControl;
  autocompleteItems: FormViewOptions[];
  onDestroy$ = new Subject<boolean>();
  filteredOptions$: Observable<FormViewOptions[]>;

  constructor(protected override formItemUpdateService: FormItemUpdateService) { super(formItemUpdateService); }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.formItemUpdateService.initAutocompleteItems(this.formItem.key);
    this.formItemUpdateService.autoCompleteItemsUpdated$[this.formItem.key].pipe(
      takeUntil(this.onDestroy$),
      tap(value => this.autocompleteItems = value)).subscribe(() => this.formControl.updateValueAndValidity());

    this.filteredOptions$ = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );

    this.formItemUpdateService.disabledItems$[this.formItem.key]
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( disabled => {
        disabled? this.formControl.disable() : this.formControl.enable();
      });
  }

  override onInputChange($event: any): void {
    this.formItemUpdateService.update(this.containerId, {
      key: this.formItem.key,
      label: this.formItem.label,
      value: $event.target.value
    });

  }

  onOptionSelected(option: FormViewOptions): void {
    this.formItemUpdateService.update(this.containerId, {
      key: this.formItem.key,
      label: this.formItem.label,
      value: option.name,
      data: option.data
    });
    this.optionSelected.emit(option);
  }

  private filter(value: string): FormViewOptions[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.autocompleteItems?.filter(option => option.name.toLowerCase().includes(filterValue));
    }
    return this.autocompleteItems;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
