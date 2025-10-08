import { Component, OnInit, Inject, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogAction } from '../../dialog/dialog.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup } from '@angular/forms';
import { DialogActionSelectedService, EntityDialogOperation } from '../../dialog';
import { FormContainer } from '../interfaces/form-container.interface';


@Component({
    selector: 'maco-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    standalone: false
})
export class FormDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  defaultFormActions: DialogAction[] = [
    {
      label: 'APP.ACTIONS.SAVE',
      key: EntityDialogOperation.CREATE,
      matColor: 'primary',
      primary: true
    },
    {
      label: 'APP.ACTIONS.CANCEL',
      key: EntityDialogOperation.CANCEL
    }
  ];

  actions: DialogAction[] = this.defaultFormActions;

  private onDetroy$ = new Subject<boolean>();
  private form: UntypedFormGroup

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.form.valid) {
      const action = this.actions.find(item => !!item.primary);
      this.closeDialog(action);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public formContainer: FormContainer,
    private dialogActionService: DialogActionSelectedService) {}

  ngOnInit(): void {
    if (this.formContainer.actions) {
      this.actions = this.formContainer.actions;
    }
  }

  ngAfterViewInit(): void {
    this.dialogActionService.actionSelected$[this.formContainer.key]
      .pipe(takeUntil(this.onDetroy$))
      .subscribe( (action: DialogAction) => {
        this.closeDialog(action);
    });
  }

  get formTitle(): string {
    if (this.formContainer.title) {
      return this.formContainer.title.toString();
    }
    return '';
  }

  onFormChanged(form: UntypedFormGroup): void {
    this.form = form;
    this.togglePrimaryAction(!form.valid);
  }

  togglePrimaryAction(disabled: boolean): void {
    const action = this.actions.find( action => action?.primary)
    if (action) {
      action.disabled = disabled;
    }
  }

  private closeDialog(action: DialogAction): void {
    action.data = this.form;
    this.dialogRef.close(action);
  }

  ngOnDestroy(): void {
    this.onDetroy$.next(true);
    this.onDetroy$.complete();
  }
}
