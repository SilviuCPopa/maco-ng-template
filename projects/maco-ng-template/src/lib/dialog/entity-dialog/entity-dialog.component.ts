import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityDialogOperation, EntityDialogResult } from '../entity-dialog.interface';

@Component({
    selector: 'app-entity-dialog',
    templateUrl: 'entity-dialog.component.html',
    styles: ['mat-form-field { width: 100%; margin: 10px 0; }'],
    encapsulation: ViewEncapsulation.Emulated
  })
  export class EntityDialogComponent implements OnInit {

    entityForm: UntypedFormGroup;
    currentOperation: EntityDialogOperation;

    constructor(
      private matDialogRef: MatDialogRef<EntityDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: EntityDialogResult,
      private fb: UntypedFormBuilder) {}

    get nameControlErrors(): ValidationErrors {
      return this.entityForm.controls['name'].errors ?? {};
    }

    get title() {
      return this.data.title ? this.data.title.toString() : '';
    }

    ngOnInit(): void {
      this.entityForm = this.fb.group({
        uuid: new UntypedFormControl(this.data.data?.uuid),
        name: new UntypedFormControl(this.data.data?.name, Validators.compose([Validators.required, Validators.maxLength(60)])),
        description: new UntypedFormControl(this.data.data?.description)
      });
      this.currentOperation = this.data.action;
    }

    triggerAction(): void {
      if (this.entityForm.valid) {
        this.matDialogRef.close({
          action: this.currentOperation,
          data: this.entityForm.value
        });
      }
    }
  }
