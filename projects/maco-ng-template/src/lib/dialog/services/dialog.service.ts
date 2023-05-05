import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { EntityDialogOperation, EntityDialogResult } from '../entity-dialog.interface';
import { EntityDialogComponent } from '../entity-dialog/entity-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Injectable({
    providedIn: 'root'
})
export class DialogService implements OnDestroy{

    private matDialogRef: MatDialogRef<any>;
    onDestroy$ = new Subject<boolean>();

    constructor(private dialog: MatDialog) {}

    confirm(message?: string, item?: string): Observable<boolean> {
        this.matDialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message,
                item
            }
        });
        return this.matDialogRef.afterClosed();
    }


    openEntityDialog(operation: EntityDialogOperation, title: string, value: any = null): Observable<EntityDialogResult> {
        this.matDialogRef = this.dialog.open(EntityDialogComponent, {
          data: {
            title,
            action: operation,
            data: value,
          },
          disableClose: true,
        });
        return this.onEntityDialogClose();
    }

    private onEntityDialogClose(): Observable<EntityDialogResult> {
        return this.matDialogRef.afterClosed().pipe(
          takeUntil(this.onDestroy$),
          filter((entityDialogResult: EntityDialogResult) => !!entityDialogResult.action),
        );
    }

    openDialog(component: any, data: any): MatDialogRef<EntityDialogComponent> {
      return this.dialog.open(component, { ...data, disableClose: true });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
      }
}
