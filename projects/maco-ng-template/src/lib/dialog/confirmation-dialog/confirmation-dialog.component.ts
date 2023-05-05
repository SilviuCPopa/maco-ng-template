import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityDialogOperation } from '../entity-dialog.interface';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: 'confirmation-dialog.component.html',
    encapsulation: ViewEncapsulation.None
  })
  export class ConfirmationDialogComponent {
    currentOperation: EntityDialogOperation;

    constructor(
      private matDialogRef: MatDialogRef<ConfirmationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    onConfirm(): void {
        this.matDialogRef.close(true);
    }
  }
