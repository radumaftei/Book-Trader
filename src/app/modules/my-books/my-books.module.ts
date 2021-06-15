import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CreateBookComponent } from './components/dashboard/create-book/create-book.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksListComponent } from './components/dashboard/books-list/books-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [CreateBookComponent, BooksListComponent],
  exports: [CreateBookComponent, BooksListComponent],
})
export class MyBooksModule {}
