import { SharedModule } from './../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksListComponent } from './components/books-list/books-list.component';
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
