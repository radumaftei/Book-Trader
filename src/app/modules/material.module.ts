import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [],
  providers: [MatIconRegistry],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
