import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
import { TradeHistoryComponent } from './profile/trade-history/trade-history.component';

@NgModule({
  imports: [SharedModule, ProfileRoutingModule, FormsModule],
  declarations: [ProfileComponent, TradeHistoryComponent],
})
export class ProfileModule {}
