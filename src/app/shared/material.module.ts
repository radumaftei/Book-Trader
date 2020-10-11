import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_MODULES } from './modules';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    ...MATERIAL_MODULES,
    CommonModule
  ],
  declarations: [MaterialDialogComponent],
  providers: [MatIconRegistry],
  exports: [
    ...MATERIAL_MODULES
  ]
})
export class MaterialModule {}
