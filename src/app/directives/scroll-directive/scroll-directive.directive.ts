import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[trackScroll]'
})
export class TrackScrollDirective {
  @Output()
  public setScrollValue = new EventEmitter();

  @HostListener('window:scroll', ['$event.target'])
  track() {
    const xAxisOffset = Math.round(window.pageXOffset);
    this.setScrollValue.emit(xAxisOffset);
  }
}
