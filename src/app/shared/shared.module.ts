import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './header/header.component';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ...MATERIAL_MODULES],
  exports: [HeaderComponent],
})
export class SharedModule {}
