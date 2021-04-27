import { SharedModule } from './../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TradeDialogComponent } from './components/trade-dialog/trade-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MATERIAL_MODULES = [
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
];

@NgModule({
  declarations: [HomepageComponent, TradeDialogComponent],
  imports: [CommonModule, ...MATERIAL_MODULES, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomepageModule {}
