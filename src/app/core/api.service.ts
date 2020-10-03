import { Injectable } from '@angular/core';
import { BookProfileDTO } from '../interfaces';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  fetchBookData = () => {
    return this.httpClient.get<{ message: string, books: BookProfileDTO[] }>('http://localhost:3000/api/personal-book-page')
      .pipe(
        map(data => data.books.map(book => ({ ...book, id: book._id })))
      );
  }

  postBook = book => {
    return this.httpClient.post<{ message: string, bookId: string }>('http://localhost:3000/api/personal-book-page', book)
  }

  putBooks = books => {
    return this.httpClient.put('http://localhost:3000/api/personal-book-page', books);
  }

  deleteBooks = id => {
    return this.httpClient.delete(`http://localhost:3000/api/personal-book-page/${id}`);
  }
}
