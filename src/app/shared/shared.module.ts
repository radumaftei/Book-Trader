import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './header/header.component';
import { NotificationModule } from './notification/notification.module';
import { TradeDialogComponent } from './trade-dialog/trade-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
  MatSelectModule,
  MatRadioModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
];

@NgModule({
  declarations: [HeaderComponent, TradeDialogComponent],
  imports: [CommonModule, ...MATERIAL_MODULES, NotificationModule, FormsModule],
  exports: [HeaderComponent, NotificationModule],
})
export class SharedModule {}
