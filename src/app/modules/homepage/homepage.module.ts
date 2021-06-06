import { SharedModule } from '../../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

const MATERIAL_MODULES = [
  MatSelectModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, ...MATERIAL_MODULES, SharedModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomepageModule {}
