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
    this.apiService.fetchBookDataHttp()
      .subscribe(books => {
        if (!books) return;
        debugger;
        this.booksList = books;
        this.BOOKS_UPDATE.next([...this.booksList]);
      });
  }

  addBook = props => {
    const book = new FormData();
    book.append('title', props['title']);
    book.append('description', props['description']);
    book.append('tradingPreferences', props['tradingPreferences']);
    book.append('category', props['category']);
    book.append('image', props['image'], props['title']);
    this.apiService.postBookHttp(book)
      .subscribe(({ newBook }) => {
        if (!newBook) return;
        const bookToAdd: BookProfile = {
          id: newBook.id,
          title: newBook.title,
          description: newBook.description,
          tradingPreferenceList: newBook.tradingPreferenceList,
          category: newBook.category,
          imagePath: newBook.imagePath
        };
        this.booksList.push(bookToAdd);
        this.BOOKS_UPDATE.next([...this.booksList]);
      });
  }

  updateBooks = books => {
    this.apiService.putBooksHttp(books)
      .subscribe(() => {
        this.getBooks();
      })
  }

  deleteBook = id => {
    this.apiService.deleteBooksHttp(id)
      .subscribe(() => {
        this.getBooks();
      });
  }

  updateSelectedTab = index => {
    this.SELECTED_TAB.next(index);
  }
}
