import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { MaterialModule } from '../../constants/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [MaterialModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
