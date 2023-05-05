import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogComponent } from './form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DialogActionSelectedService } from '../../dialog/services/dialog-action-selected.service';
import { DialogModule, DialogAction } from '../../dialog';
import { FormViewModule } from '../form.module';
import { FormContainerComponent } from '../form-container/form-container.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('FormDialogComponent', () => {
  let component: FormDialogComponent;
  let fixture: ComponentFixture<FormDialogComponent>;
  let dialogActionService: DialogActionSelectedService;

  const fb = new UntypedFormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormContainerComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormViewModule,
        DialogModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            columns: []
          }
        },
        {
          provide: DialogActionSelectedService,
          useValue: {
            actionSelected$: new Subject<DialogAction>()
          }
        }
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogComponent);
    dialogActionService = TestBed.inject(DialogActionSelectedService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable primary action when form is invalid', async () => {
    spyOn(component, 'togglePrimaryAction').and.callThrough();
    const mockFormGroup = fb.group({
      username: new UntypedFormControl('',  Validators.compose([ Validators.required])),
    });
    mockFormGroup.updateValueAndValidity();
    component.onFormChanged(mockFormGroup);

    expect(component.togglePrimaryAction).toHaveBeenCalledWith(true);
    const updatedAction = component.actions.find( action => action.primary).disabled;
    expect(updatedAction).toBe(true);
  });

  it('should close dialog on action selected', async () => {
    spyOn(component.dialogRef, 'close');

    fixture.whenStable().then( () => {
      expect(component.dialogRef.close).toHaveBeenCalled();
    });

    component.ngOnInit();
    dialogActionService.actionSelected$[component.formContainer.key].next({
      label: 'label',
      key: 'key'
    });
    fixture.detectChanges();
  });
});
