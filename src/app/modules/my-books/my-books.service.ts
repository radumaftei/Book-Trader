import { Injectable } from '@angular/core';
import { BookProfile } from '../../interfaces';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class MyBooksService {
  private booksList: BookProfile[] = [];
  private BOOKS_UPDATE = new BehaviorSubject<BookProfile[]>([]);
  booksUpdate$ = this.BOOKS_UPDATE.asObservable();
  private SELECTED_TAB = new BehaviorSubject<number>(0);
  selectedTab$ = this.SELECTED_TAB.asObservable();

  constructor(private apiService: ApiService) { }

  getBooks = () => {
    this.apiService.fetchBookData()
      .subscribe(books => {
        if (!books || !books.length) return;
        this.booksList = books;
        this.BOOKS_UPDATE.next([...this.booksList]);
      });
  }

  addBook = (title: string, description: string, tradingPreferenceList: string, category: string) => {
    const book: BookProfile = {id: null, title, description, tradingPreferenceList, category};
    this.apiService.postBook(book)
      .subscribe(({ bookId }) => {
        if (!bookId) return;
        book['id'] = bookId;
        this.booksList.push(book);
        this.BOOKS_UPDATE.next([...this.booksList]);
      });
  }

  updateBooks = books => {
    this.apiService.putBooks(books)
      .subscribe(() => {
        this.getBooks();
      })
  }

  deleteBook = id => {
    this.apiService.deleteBooks(id)
      .subscribe(() => {
        this.getBooks();
      });
  }

  updateSelectedTab = index => {
    this.SELECTED_TAB.next(index);
  }
}
