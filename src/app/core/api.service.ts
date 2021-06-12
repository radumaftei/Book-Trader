import { Injectable } from '@angular/core';
import {
  BookApi,
  BookProfileDTO,
  DifferentTownConfig,
  PageOptions,
  SameTownConfig,
  TradeDetails,
} from '../interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  defaultPageOptions,
  DELIVERY_CONFIG,
  HOME_URL,
  HOMEPAGE,
  MY_BOOKS_URL,
  READ_BY,
  TRADE_URL,
  USER_LOGIN_URL,
  USER_SIGNUP_URL,
} from '../constants';
import { AuthData, UserData } from '../modules/auth/auth.model';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from '../shared/notification/notification.service';
import { NotificationType } from '../shared/notification/notification-type.enum';
import { transformDTOBooks } from '../modules/helpers';

interface IDelivery {
  sameTownConfig: SameTownConfig;
  differentTownConfig: DifferentTownConfig;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BOOKS_API_URL = `${HOME_URL}/${MY_BOOKS_URL}`;
  private USER_API_URL = `${HOME_URL}/user`;
  private HOMEPAGE_API_URL = `${HOME_URL}/${HOMEPAGE}`;
  private TRADE_API_URL = `${HOME_URL}/${TRADE_URL}`;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  fetchBooks = (
    homepage = true,
    withPagination = false,
    queryParams: PageOptions = defaultPageOptions
  ): Observable<BookApi> => {
    const query = {
      ...queryParams,
      pageIndex: queryParams.pageIndex + 1,
    };
    return this.httpClient
      .get<{ books: BookProfileDTO[]; length: number }>(
        homepage ? this.HOMEPAGE_API_URL : this.BOOKS_API_URL,
        {
          observe: 'body',
          params: {
            ...query,
            withPagination,
          },
        }
      )
      .pipe(
        map((data: { books: BookProfileDTO[]; length: number }) =>
          transformDTOBooks(data.books, data.length)
        ),
        catchError(this.handleError("Couldn't fetch books"))
      );
  };

  getUserHttp(userSearchQuery: string, byId = true): Observable<UserData> {
    return this.httpClient
      .get<UserData>(this.USER_API_URL, {
        observe: 'body',
        params: {
          userSearchQuery,
          byId,
        },
      })
      .pipe(catchError(this.handleError("Couldn't get user")));
  }

  postBookHttp = (book) => {
    return this.httpClient.post<BookProfileDTO>(this.BOOKS_API_URL, book).pipe(
      tap(() => this.handleSuccess('Book added successfully')),
      catchError(this.handleError("Couldn't add book"))
    );
  };

  putBooksHttp = (books) => {
    return this.httpClient.put(this.BOOKS_API_URL, books).pipe(
      tap(() => this.handleSuccess('Books saved successfully')),
      catchError(this.handleError("Couldn't save books/book"))
    );
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
        tap(() => this.handleSuccess('User added successfully')),
        catchError(
          this.handleError(
            "Couldn't sign up. Please make sure you completed every input"
          )
        )
      );
  };

  updateUserDeliverySettings = (deliveryConfig: IDelivery) => {
    return this.httpClient
      .put(`${this.USER_API_URL}/${DELIVERY_CONFIG}`, deliveryConfig)
      .pipe(
        tap(() =>
          this.handleSuccess('User delivery methods updated successfully')
        ),
        catchError(this.handleError("Couldn't update user delivery methods"))
      );
  };

  loginUserHttp = (authData: AuthData) => {
    return this.httpClient
      .post<{
        token: string;
        expiresIn: number;
        user: { email: string; location: string };
      }>(`${this.USER_API_URL}/${USER_LOGIN_URL}`, authData)
      .pipe(catchError(this.handleError('', true)));
  };

  postTrade = (tradeDetails: TradeDetails): Observable<unknown> => {
    return this.httpClient.post(this.TRADE_API_URL, tradeDetails).pipe(
      tap(() => this.handleSuccess('Trade made successfully')),
      catchError(this.handleError("Couldn't make the trade, please try again"))
    );
  };

  fetchTrades = (all: boolean): Observable<TradeDetails[]> => {
    return this.httpClient
      .get<TradeDetails[]>(this.TRADE_API_URL, {
        observe: 'body',
        params: {
          all,
        },
      })
      .pipe(catchError(this.handleError('Trouble fetching notifications')));
  };

  putTrade = (trade: TradeDetails, tradeType: string): Observable<unknown> => {
    return this.httpClient
      .put(this.TRADE_API_URL, {
        trade,
        tradeType,
      })
      .pipe(
        tap(() => this.handleSuccess(`Trade updated successfully`)),
        catchError(this.handleError("Couldn't save books/book"))
      );
  };

  putReadBy = (readBy: string, tradeIds: string[]): Observable<string> => {
    return this.httpClient
      .put<string>(`${this.TRADE_API_URL}/${READ_BY}`, {
        userEmail: readBy,
        ids: tradeIds,
      })
      .pipe(
        catchError(this.handleError("Couldn't update notification status"))
      );
  };

  handleError =
    (notificationMessage: string, showBeError = false) =>
    (error: HttpErrorResponse): Observable<never> => {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client side errors
        errorMessage = `Client errored with ${error.error.message}`;
      } else {
        // Server side
        errorMessage = `Server error with ${error.message} with status ${error.status}`;
      }

      this.notificationService.showNotification(
        !showBeError ? notificationMessage : error.error.message,
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
