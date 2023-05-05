import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormViewItemUpdate, FormItemUpdateItem, FormItemAutocompleteUpdateItem } from '../interfaces/form-view-item-update.iterface';
import { FormViewOptions } from '../interfaces/form-view-options.interface';
import { UntypedFormGroup } from '@angular/forms';
import { FTFormUtil } from '../../utils/form-util';

@Injectable({
  providedIn: 'root'
})
export class FormItemUpdateService implements OnDestroy {

    initialized$ = new Subject<string>();
    autoCompleteItemsUpdated$: FormItemAutocompleteUpdateItem = {};
    itemUpdated$: FormItemUpdateItem = {};
    disabledItems$: {[key: string]: Subject<boolean> } = {};

    init(key: string): void {
      this.itemUpdated$[key] = new Subject<FormViewItemUpdate>();
      this.initialized$.next(key);
    }

    initAutocompleteItems(key: string): void {
      this.autoCompleteItemsUpdated$[key] = new Subject<FormViewOptions[]>();
      this.disabledItems$[key] = new Subject<boolean>();
    }

    disableFormItem(key: string): void {
      this.disabledItems$[key].next(true);
    }

    enableFormItem(key: string): void {
      this.disabledItems$[key].next(false);
    }

    update(key: string, item: FormViewItemUpdate): void {
        this.itemUpdated$[key].next(item);
    }

    setAutocompleteItems(key: string, items: FormViewOptions[]): void {
      this.autoCompleteItemsUpdated$[key].next(items);
    }

    markAsDirty(form: UntypedFormGroup): void {
        FTFormUtil.triggerFormValidation(form);
    }


    ngOnDestroy(): void {
      Object.values(this.itemUpdated$).forEach( item => {
        item.next(null);
        item.complete();
      });
    }
}
