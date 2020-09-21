import { NgModule } from '@angular/core';
import { TrackScrollDirective } from './scroll-directive.directive';

@NgModule({
  declarations: [TrackScrollDirective],
  exports: [TrackScrollDirective]
})
export class ScrollDirectiveModule {}
