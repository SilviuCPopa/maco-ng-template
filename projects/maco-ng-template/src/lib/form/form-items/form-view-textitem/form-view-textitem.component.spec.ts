import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewTextitemComponent } from './form-view-textitem.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormViewModule } from '../../form.module';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { MaterialModulesModule } from 'tracking-fleet/src/lib/material.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormViewTextitemComponent', () => {
  let component: FormViewTextitemComponent;
  let fixture: ComponentFixture<FormViewTextitemComponent>;
  let formItemUpdateService: FormItemUpdateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        TranslateModule.forRoot(),
        FormViewModule,
        NoopAnimationsModule,
        MaterialModulesModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewTextitemComponent);
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
      target: {
        value: ''
      }
    });
    expect(formItemUpdateService.update).toHaveBeenCalled();
  });
});
