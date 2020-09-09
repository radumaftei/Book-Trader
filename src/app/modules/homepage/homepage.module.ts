import { NgModule } from '@angular/core';
import { HomepageComponent } from './components/homepage.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [HomepageComponent]
})
export class HomepageModule {}
