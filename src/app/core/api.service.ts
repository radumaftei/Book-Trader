import { Injectable } from '@angular/core';
import { BookProfileDTO } from '../interfaces';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HOME_URL, HOMEPAGE, MY_BOOKS_URL, USER_LOGIN_URL, USER_SIGNUP_URL } from '../constants';
import { AuthData } from '../modules/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BOOKS_API_URL = `${HOME_URL}/${MY_BOOKS_URL}`;
  private USER_API_URL = `${HOME_URL}/user`;
  private HOMEPAGE_URL = `${HOME_URL}/${HOMEPAGE}`;

  constructor(private httpClient: HttpClient) { }

  fetchBookDataHttp = () => {
    return this.httpClient.get<{ message: string, books: BookProfileDTO[] }>(this.BOOKS_API_URL)
      .pipe(
        map(data => data.books.map(book => ({ ...book, id: book._id })))
      );
  }

  fetchHomepageDataHttp = () => {
    return this.httpClient.get<{ message: string, books: BookProfileDTO[] }>(this.HOMEPAGE_URL)
      .pipe(
        map(data => data.books.map(book => ({ ...book, id: book._id })))
      );
  }

  postBookHttp = book => {
    return this.httpClient.post<{ message: string, newBook: BookProfileDTO }>(this.BOOKS_API_URL, book)
  }

  putBooksHttp = books => {
    return this.httpClient.put(this.BOOKS_API_URL, books);
  }

  deleteBooksHttp = id => {
    return this.httpClient.delete(`${this.BOOKS_API_URL}/${id}`);
  }

  createUserHttp = (authData: AuthData) => {
    return this.httpClient.post(`${this.USER_API_URL}/${USER_SIGNUP_URL}`, authData);
  }

  loginUserHttp = (authData: AuthData) => {
    return this.httpClient.post<{ token: string, expiresIn: number }>(`${this.USER_API_URL}/${USER_LOGIN_URL}`, authData);
  }
}
