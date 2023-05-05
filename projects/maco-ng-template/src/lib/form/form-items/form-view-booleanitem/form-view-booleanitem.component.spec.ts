import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewBooleanItemComponent } from './form-view-booleanitem.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';
import { MaterialModulesModule } from '../../../../material.module';

describe('FormViewBooleanitemComponent', () => {
  let component: FormViewBooleanItemComponent;
  let fixture: ComponentFixture<FormViewBooleanItemComponent>;
  let formItemUpdateService: FormItemUpdateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormViewBooleanItemComponent ],
      imports: [
        TranslateModule.forRoot(),
        MaterialModulesModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormItemUpdateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewBooleanItemComponent);
    component = fixture.componentInstance;
    component.formItem = new FormViewBaseItemModel({
      label: 'mock',
      value: 'mock',
      key: 'mock',
      editable: true,
    });

    formItemUpdateService = TestBed.inject(FormItemUpdateService);
    spyOn(formItemUpdateService, 'update');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update form when text is changed', () => {
    component.onInputChange({
      checked: true,
      source: null
    });
    expect(formItemUpdateService.update).toHaveBeenCalled();
  });
});
