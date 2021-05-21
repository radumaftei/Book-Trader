import { Injectable } from '@angular/core';
import { BookProfileDTO } from '../interfaces';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HOME_URL,
  HOMEPAGE,
  MY_BOOKS_URL,
  USER_LOGIN_URL,
  USER_SIGNUP_URL,
} from '../constants';
import { AuthData } from '../modules/auth/auth.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BOOKS_API_URL = `${HOME_URL}/${MY_BOOKS_URL}`;
  private USER_API_URL = `${HOME_URL}/user`;
  private HOMEPAGE_URL = `${HOME_URL}/${HOMEPAGE}`;

  constructor(private httpClient: HttpClient) {}

  fetchBookDataHttp = () => {
    return this.httpClient
      .get<{ message: string; books: BookProfileDTO[] }>(this.BOOKS_API_URL)
      .pipe(
        map((data) => data.books.map((book) => ({ ...book, id: book._id })))
      );
  };

  fetchHomepageDataHttp = () => {
    return this.httpClient
      .get<{ message: string; books: BookProfileDTO[] }>(this.HOMEPAGE_URL)
      .pipe(
        map((data) => data.books.map((book) => ({ ...book, id: book._id })))
      );
  };

  postBookHttp = (book) => {
    return this.httpClient.post<{ message: string; newBook: BookProfileDTO }>(
      this.BOOKS_API_URL,
      book
    );
  };

  putBooksHttp = (books) => {
    return this.httpClient.put(this.BOOKS_API_URL, books);
  };

  deleteBooksHttp = (id) => {
    return this.httpClient.delete(`${this.BOOKS_API_URL}/${id}`);
  };

  createUserHttp = (authData: AuthData) => {
    return this.httpClient.post<{ user: { email: string; location: string } }>(
      `${this.USER_API_URL}/${USER_SIGNUP_URL}`,
      authData
    );
  };

  loginUserHttp = (authData: AuthData) => {
    return this.httpClient
      .post<{
        token: string;
        expiresIn: number;
        user: { email: string; location: string };
      }>(`${this.USER_API_URL}/${USER_LOGIN_URL}`, authData)
      .pipe(catchError(this.handleError));
  };

  handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client side errors
      errorMessage = `Client errored with ${error.error.message}`;
    } else {
      // Server side
      errorMessage = `Server error with ${error.message} with status ${error.status}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  };
}
