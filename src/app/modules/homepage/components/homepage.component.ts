import { ChangeDetectionStrategy, Component, OnDestroy, Renderer2 } from '@angular/core';
import { BookCardsMock } from '../book-cards.mock';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {
  xAxisOffset = 0;
  bookCards = new BookCardsMock().bookCards;
  height = '450';

  getScrollValue(event) {
    this.xAxisOffset = event;
  }
}
