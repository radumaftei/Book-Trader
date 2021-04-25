import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_MODULES } from './modules';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [...MATERIAL_MODULES, CommonModule, FormsModule],
  declarations: [MaterialDialogComponent],
  providers: [MatIconRegistry],
  exports: [...MATERIAL_MODULES],
})
export class MaterialModule {}
