import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../../constants/material.module';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [HeaderModule, MaterialModule, CommonModule],
  declarations: [CreateBookComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyBooksModule {}
