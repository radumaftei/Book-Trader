import { Component, OnInit } from '@angular/core';
import { BookCardsMock } from '../book-cards.mock';
import { BOOK_CATEGORIES } from '../../../constants';
import { Book } from '../../../interfaces';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  isLoading = false;
  bookCards: Book[];
  offsetBookNumberMapper = {};
  // 852px + rows.length - 1
  bodyHeight = '852';

  get bookCategories() {
    return Object.keys(BOOK_CATEGORIES).map(r => BOOK_CATEGORIES[r]);
  }

  ngOnInit() {
    // this.isLoading = true;
    this.bookCards = new BookCardsMock().bookCards;
    this.bodyHeight = (Number(this.bodyHeight) + (this.bookCategories.length - 1) * 450).toString();
    this.bookCategories.forEach(category => {
      this.offsetBookNumberMapper[category] = {};
      this.offsetBookNumberMapper[category].offset = 0;
      this.offsetBookNumberMapper[category].bookNumber = this.booksByCategory(category).length;
    });
  }

  booksByCategory = (category: string): Book[] => {
    return this.bookCards.reduce((r, item) => item.category === category ? [...r, item] : r, []);
  }

  setNavigationStatus = (category: string) => {
    return this.offsetBookNumberMapper[category].bookNumber <= 8;
  }

  onPrevious = (element: any, category: string) => {
    const minOffset = 0;
    const maxOffset = (this.offsetBookNumberMapper[category].bookNumber - 8) * 200;
    if (this.offsetBookNumberMapper[category].offset > maxOffset) {
      this.offsetBookNumberMapper[category].offset = this.offsetBookNumberMapper[category].offset - 400;
    } else if (this.offsetBookNumberMapper[category].offset > minOffset) {
      this.offsetBookNumberMapper[category].offset = this.offsetBookNumberMapper[category].offset - 200;
    }
    element.scrollTo({
      left: this.offsetBookNumberMapper[category].offset,
      behavior: 'smooth'
    });
  }

  onNext = (element: any, category: string) => {
    let maxOffset;
    if (this.offsetBookNumberMapper[category].bookNumber > 8) {
      maxOffset = (this.offsetBookNumberMapper[category].bookNumber - 8) * 200;
      if (this.offsetBookNumberMapper[category].offset <= maxOffset) {
        this.offsetBookNumberMapper[category].offset = this.offsetBookNumberMapper[category].offset + 200;
      }
    }
    element.scrollTo({
      left: this.offsetBookNumberMapper[category].offset,
      behavior: 'smooth'
    });
  }
}
