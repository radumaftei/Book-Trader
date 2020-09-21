import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomepageComponent } from './components/homepage.component';
import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../../constants/material.module';
import { CommonModule } from '@angular/common';
import { ScrollDirectiveModule } from '../../directives/scroll-directive/scroll.directive.module';

@NgModule({
  imports: [HeaderModule, MaterialModule, CommonModule, ScrollDirectiveModule],
  declarations: [HomepageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomepageModule {}
