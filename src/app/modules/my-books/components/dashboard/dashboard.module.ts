import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { MyBooksModule } from '../../my-books.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [MyBooksModule, CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
