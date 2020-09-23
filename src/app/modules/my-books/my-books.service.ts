import { Injectable } from '@angular/core';
import { BookProfile } from '../../interfaces';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyBooksService {
  private booksList: BookProfile[] = [];
  public booksUpdated = new BehaviorSubject<BookProfile[]>([]);

  getBooks = () => {
    return [...this.booksList];
  }

  addBook = (title: string, description: string, tradingPreferenceList: string, category: string) => {
    const book: BookProfile = {title, description, tradingPreferenceList, category};
    this.booksList.push(book);
    this.booksUpdated.next([...this.booksList]);
  }
}
