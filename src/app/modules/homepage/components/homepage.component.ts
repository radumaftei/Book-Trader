import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BookCardsMock } from '../book-cards.mock';
import { BOOK_CATEGORIES } from '../../../constants';
import { Book } from '../../../interfaces';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit{
  isLoading = false;
  bookCards: Book[];
  // 852px + rows.length - 1
  bodyHeight = '852';

  get bookCategories() {
    return Object.keys(BOOK_CATEGORIES).map(r => BOOK_CATEGORIES[r]);
  }

  ngOnInit() {
    // this.isLoading = true;
    this.bookCards = new BookCardsMock().bookCards;
    this.bodyHeight = (Number(this.bodyHeight) + (this.bookCategories.length - 1) * 450).toString();
    console.log('height ', this.bodyHeight );
  }

  booksByCategory(category: string): Book[] {
    return this.bookCards.reduce((r, item) => item.category === category ? [...r, item] : r, []);
  }

  onPrevious(category) {
    category.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }

  onNext(category) {
    category.scrollTo({
      left: 200,
      behavior: 'smooth'
    });
  }
}
