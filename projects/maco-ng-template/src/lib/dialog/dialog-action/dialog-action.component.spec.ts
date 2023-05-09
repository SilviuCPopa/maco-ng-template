import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActionComponent } from './dialog-action.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { DialogActionSelectedService } from '../services/dialog-action-selected.service';
import { StoreModule } from '@ngrx/store';
import {MaterialModules} from '@apiary/commons';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}


describe('DialogActionComponent', () => {
  let component: FormActionComponent;
  let fixture: ComponentFixture<FormActionComponent>;
  let actionSelectedService: DialogActionSelectedService;

  beforeEach(((done) => {
    TestBed.configureTestingModule({
      declarations: [ FormActionComponent ],
      imports: [
        MaterialModules,
        StoreModule.forRoot({}),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        DialogActionSelectedService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActionComponent);
    component = fixture.componentInstance;
    actionSelectedService = TestBed.inject(DialogActionSelectedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select action', () => {
    spyOn(actionSelectedService, 'selectAction');
    const action = {
      label: 'action',
      key: 'key',
      data: {
        key: 'selectAction'
      }
    };
    component.onActionClicked(action);
    expect(actionSelectedService.selectAction).toHaveBeenCalledWith(action);
  });
});
