import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DatatableComponent } from './datatable.component';
import { MaterialModules } from '../commons/material.module';


@NgModule({
    declarations: [
        DatatableComponent
    ],
    imports: [
        CommonModule,
        MaterialModules,
        TranslateModule
    ],
    exports: [
        DatatableComponent
    ]
})
export class DatatableModule {}
