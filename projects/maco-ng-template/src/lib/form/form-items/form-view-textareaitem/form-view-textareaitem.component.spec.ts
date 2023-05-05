import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewTextareaitemComponent } from './form-view-textareaitem.component';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { MaterialModulesModule } from 'tracking-fleet';
import { TranslateModule } from '@ngx-translate/core';

describe('FormViewTextareaitemComponent', () => {
  let component: FormViewTextareaitemComponent;
  let fixture: ComponentFixture<FormViewTextareaitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({}),
        MaterialModulesModule
      ],
      declarations: [ FormViewTextareaitemComponent ],
      providers: [
        FormItemUpdateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewTextareaitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
