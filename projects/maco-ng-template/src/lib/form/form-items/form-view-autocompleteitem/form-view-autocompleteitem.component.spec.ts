import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewAutocompleteItemComponent } from './form-view-autocompleteitem.component';
import { TranslateModule } from '@ngx-translate/core';
import { UntypedFormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormViewModule } from '../../form.module';
import { FormItemUpdateService } from '../../services/form-item-update.service';

describe('FormViewAutocompleteItemComponent', () => {
  let component: FormViewAutocompleteItemComponent;
  let fixture: ComponentFixture<FormViewAutocompleteItemComponent>;
  let formItemUpdateService: FormItemUpdateService;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FormViewModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewAutocompleteItemComponent);
    component = fixture.componentInstance;
    component.formItem = {
      label: '',
      editable: true,
      value: '',
      key: '',
      icon: ''
    };
    component.formControl = new UntypedFormControl();
    formItemUpdateService = TestBed.inject(FormItemUpdateService);
    spyOn(formItemUpdateService, 'update');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update form when option is selected', () => {
    component.onOptionSelected({
      id: '',
      name: '',
      data: []
    });
    expect(formItemUpdateService.update).toHaveBeenCalled();
  });

  it('should update form when text is changed', () => {
    component.onInputChange({
      target: {
        value: ''
      }
    });
    expect(formItemUpdateService.update).toHaveBeenCalled();
  });
});
