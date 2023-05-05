import { NgModule } from '@angular/core';
import { DialogActionComponent } from './dialog-action/dialog-action.component';
import { DialogActionSelectedService } from './services/dialog-action-selected.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EntityDialogComponent } from './entity-dialog/entity-dialog.component';
import { MaterialModules } from '../commons/material.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        MaterialModules
    ],
    declarations: [
        DialogActionComponent,
        ConfirmationDialogComponent,
        EntityDialogComponent
    ],
    exports: [
        DialogActionComponent
    ],
    providers: [
        DialogActionSelectedService
    ]
})
export class DialogModule {}
