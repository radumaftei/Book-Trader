import { SharedModule } from './../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksListComponent } from './components/books-list/books-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';

const MATERIAL_MODULES = [
  MatCheckboxModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatTabsModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatTooltipModule,
  MatPaginatorModule,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,

    ...MATERIAL_MODULES,
    FormsModule,
  ],
  declarations: [CreateBookComponent, BooksListComponent, DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyBooksModule {}
