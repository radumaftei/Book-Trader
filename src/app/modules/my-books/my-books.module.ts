import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksListComponent } from './components/books-list/books-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  imports: [HeaderModule, MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [CreateBookComponent, BooksListComponent, DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyBooksModule {}
