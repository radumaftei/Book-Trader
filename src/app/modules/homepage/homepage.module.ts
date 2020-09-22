import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomepageComponent } from './components/homepage.component';
import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [HeaderModule, MaterialModule, CommonModule],
  declarations: [HomepageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomepageModule {}
