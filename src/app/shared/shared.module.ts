import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './header/header.component';
import { NotificationModule } from './notification/notification.module';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

const MATERIAL_MODULES = [
  MatMenuModule,
  MatBadgeModule,
  MatTabsModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
  MatCardModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatTableModule,
];

@NgModule({
  declarations: [HeaderComponent, DialogComponent],
  imports: [CommonModule, ...MATERIAL_MODULES, NotificationModule, FormsModule],
  exports: [
    HeaderComponent,
    NotificationModule,
    ...MATERIAL_MODULES,
    CommonModule,
  ],
})
export class SharedModule {}
