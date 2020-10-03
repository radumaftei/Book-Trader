import { Injectable } from '@angular/core';
import { BookProfile, BookProfileDTO } from '../../interfaces';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyBooksService {
  private booksList: BookProfile[] = [];
  private BOOKS_UPDATE = new BehaviorSubject<BookProfile[]>([]);
  booksUpdate = this.BOOKS_UPDATE.asObservable();

  constructor(private httpClient: HttpClient) { }

  getBooks = () => {
    this.httpClient.get<{ message: string, books: BookProfileDTO[] }>('http://localhost:3000/api/personal-book-page')
      .pipe(
        map(data => data.books.map(book => ({ ...book, id: book._id })))
      )
      .subscribe(books => {
        if (!books || !books.length) { return; }
        this.booksList = books;
        this.BOOKS_UPDATE.next([...this.booksList]);
      });
  }

  addBook = (title: string, description: string, tradingPreferenceList: string, category: string) => {
    const book: BookProfile = {id: null, title, description, tradingPreferenceList, category};
    this.httpClient.post<{ message: string, bookId: string }>('http://localhost:3000/api/personal-book-page', book)
      .subscribe(({ bookId }) => {
        if (!bookId) return;
        book['id'] = bookId;
        this.booksList.push(book);
        this.BOOKS_UPDATE.next([...this.booksList]);
      });
  }

  updateBooks = books => {
    this.httpClient.put('http://localhost:3000/api/personal-book-page', books)
      .subscribe(data => {
        if (!data) return;
        console.log('data =', data);
      });
  }

  deleteBook = id => {
    this.httpClient.delete(`http://localhost:3000/api/personal-book-page/${id}`)
      .subscribe(() => {
        this.booksList = this.booksList.filter(book => book['id'] !== id);
        this.BOOKS_UPDATE.next([...this.booksList]);
      });
  }
}
