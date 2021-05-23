import { Injectable } from '@angular/core';
import { BookProfileDTO } from '../interfaces';
import { catchError, map, tap } from 'rxjs/operators';
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
import { NotificationService } from '../shared/notification/notification.service';
import { NotificationType } from '../shared/notification/notification-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BOOKS_API_URL = `${HOME_URL}/${MY_BOOKS_URL}`;
  private USER_API_URL = `${HOME_URL}/user`;
  private HOMEPAGE_URL = `${HOME_URL}/${HOMEPAGE}`;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  fetchBooks = (homepage: boolean = true) => {
    return this.httpClient
      .get<{ message: string; books: BookProfileDTO[] }>(
        homepage ? this.HOMEPAGE_URL : this.BOOKS_API_URL
      )
      .pipe(
        map((data) => data.books.map((book) => ({ ...book, id: book._id }))),
        catchError(this.handleError("Couldn't fetch books"))
      );
  };

  postBookHttp = (book) => {
    return this.httpClient
      .post<{ message: string; newBook: BookProfileDTO }>(
        this.BOOKS_API_URL,
        book
      )
      .pipe(
        tap(() => this.handleSuccess('Book added successfully')),
        catchError(this.handleError("Couldn't add book"))
      );
  };

  putBooksHttp = (books) => {
    return this.httpClient
      .put(this.BOOKS_API_URL, books)
      .pipe(catchError(this.handleError("Couldn't save books/book")));
  };

  deleteBooksHttp = (id) => {
    return this.httpClient.delete(`${this.BOOKS_API_URL}/${id}`).pipe(
      tap(() => this.handleSuccess('Book deleted successfully')),
      catchError(this.handleError("Couldn't delete book"))
    );
  };

  createUserHttp = (authData: AuthData) => {
    return this.httpClient
      .post<{ user: { email: string; location: string } }>(
        `${this.USER_API_URL}/${USER_SIGNUP_URL}`,
        authData
      )
      .pipe(
        catchError(
          this.handleError(
            "Couldn't sign up. Please make sure you completed every input"
          )
        )
      );
  };

  loginUserHttp = (authData: AuthData) => {
    return this.httpClient
      .post<{
        token: string;
        expiresIn: number;
        user: { email: string; location: string };
      }>(`${this.USER_API_URL}/${USER_LOGIN_URL}`, authData)
      .pipe(
        catchError(
          this.handleError(
            "Couldn't login. Please re-check username and password"
          )
        )
      );
  };

  handleError = (notificationMessage: string) => (
    error: HttpErrorResponse
  ): Observable<never> => {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client side errors
      errorMessage = `Client errored with ${error.error.message}`;
    } else {
      // Server side
      errorMessage = `Server error with ${error.message} with status ${error.status}`;
    }

    this.notificationService.showNotification(
      notificationMessage,
      NotificationType.ERROR
    );
    console.error(errorMessage);
    return throwError(errorMessage);
  };

  handleSuccess = (notificationMessage: string) => {
    this.notificationService.showNotification(
      notificationMessage,
      NotificationType.SUCCESS
    );
  };
}
