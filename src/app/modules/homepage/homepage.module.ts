import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomepageComponent } from './components/homepage.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [HeaderModule],
  declarations: [HomepageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomepageModule {}
