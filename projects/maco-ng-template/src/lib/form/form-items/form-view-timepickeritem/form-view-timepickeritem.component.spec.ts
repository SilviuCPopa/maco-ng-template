import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewTimePickerItemComponent } from './form-view-timepickeritem.component';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';

describe('FormViewTimePickerItemComponent', () => {
  let component: FormViewTimePickerItemComponent;
  let fixture: ComponentFixture<FormViewTimePickerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      declarations: [ FormViewTimePickerItemComponent ],
      providers: [
        FormItemUpdateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewTimePickerItemComponent);
    component = fixture.componentInstance;
    component.formItem = new FormViewBaseItemModel({
      label: 'test',
      value: 'value',
      key: 'key',
      editable: true
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
