import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContainerComponent } from './form-container.component';
import { FormViewModule } from '../form.module';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormItemUpdateService } from '../services/form-item-update.service';
import { RenderType } from '../interfaces/form-container.interface';
import { FormViewTextItemModel } from '../models/form-view-textitem.model';

describe('FormContainerComponent', () => {
  let component: FormContainerComponent;
  let fixture: ComponentFixture<FormContainerComponent>;
  let formItemUpdateService: FormItemUpdateService;

  const mockItem = {
    label: 'label1',
    value: 'value1',
    key: 'key'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        FormViewModule,
        TranslateModule.forRoot({}),
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContainerComponent);
    component = fixture.componentInstance;
    component.formContainer = {
      key: 'form-container',
      columns: [
        {
          renderType: RenderType.COLUMN,
          items: [
            new FormViewTextItemModel({
              label: 'label',
              value: 'value',
              key: 'key',
              editable: true
            })
          ]
        }
      ]
    };
    formItemUpdateService = TestBed.inject(FormItemUpdateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update form on init', () => {
    spyOn(component, 'updateForm');
    component.ngOnInit();
    formItemUpdateService.update('form-container', mockItem);
    expect(component.updateForm).toHaveBeenCalled();
  });

  it('should add form control when build the form', () => {
    spyOn(component.formGroup, 'addControl');
    component.buildForm();
    expect(component.formGroup.addControl).toHaveBeenCalled();
  });

  it('should emit changed form when build the form', () => {
    spyOn(component.formChanged, 'emit');
    component.buildForm();
    expect(component.formChanged.emit).toHaveBeenCalledWith(component.formGroup);
  });

  it('should emit changed form when the form is updated', () => {
    spyOn(component.formChanged, 'emit');
    component.updateForm(mockItem);
    expect(component.formGroup.controls[mockItem.key].value).toEqual(mockItem.value);
    expect(component.formChanged.emit).toHaveBeenCalledWith(component.formGroup);
  });
});
