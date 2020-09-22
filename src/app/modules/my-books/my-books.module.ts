import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [HeaderModule, MaterialModule, CommonModule, ReactiveFormsModule],
  declarations: [CreateBookComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyBooksModule {}
