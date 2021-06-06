import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FormsModule } from '@angular/forms';
import { HomepageRoutingModule } from './homepage-routing.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, HomepageRoutingModule, SharedModule, FormsModule],
})
export class HomepageModule {}
