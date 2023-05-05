import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';

const MATERIAL_MODULES = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSnackBarModule,
  MatCardModule,
  MatDatepickerModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatMomentDateModule,
  MatExpansionModule,
  MatRadioModule,
  MatListModule,
  MatSidenavModule
];
@NgModule({
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ],
})
export class MaterialModules { }
