import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormViewModule } from './form/form.module';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    TranslateModule,
    FormViewModule
  ],
  exports: [
    FormViewModule
  ],
  providers: [],
})
export class MacoNgCoreModule {}
