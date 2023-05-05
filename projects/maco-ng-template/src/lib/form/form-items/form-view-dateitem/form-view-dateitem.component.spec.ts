import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewDateitemComponent } from './form-view-dateitem.component';
import { FormItemUpdateService } from '../../services/form-item-update.service';
import { TranslateModule } from '@ngx-translate/core';

describe('FormViewDateitemComponent', () => {
  let component: FormViewDateitemComponent;
  let fixture: ComponentFixture<FormViewDateitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormViewDateitemComponent ],
      imports: [
        TranslateModule.forRoot({}),
      ],
      providers: [
        FormItemUpdateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewDateitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
