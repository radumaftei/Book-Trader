import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_MODULES } from './modules';


@NgModule({
  imports: [
    ...MATERIAL_MODULES
  ],
  providers: [MatIconRegistry],
  exports: [
    ...MATERIAL_MODULES
  ]
})
export class MaterialModule {}
