import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormViewRadioitemComponent } from './form-view-radioitem.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormViewBaseItemModel } from '../../models/form-view-baseitem.model';
import { FormViewModule } from '../../form.module';
import { FormItemUpdateService } from '../../services/form-item-update.service';

describe('FormViewRadioitemComponent', () => {
  let component: FormViewRadioitemComponent;
  let fixture: ComponentFixture<FormViewRadioitemComponent>;
  let formItemUpdateService: FormItemUpdateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        TranslateModule.forRoot(),
        FormViewModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewRadioitemComponent);
    component = fixture.componentInstance;
    component.formItem = new FormViewBaseItemModel({
      label: 'mock',
      value: 'mock',
      key: 'mock',
      editable: true,
      options: [{id: '112', name: ''}]
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
