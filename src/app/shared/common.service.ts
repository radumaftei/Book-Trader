import { Injectable } from '@angular/core';
import { BehaviorSubject, noop, Observable, Subject } from 'rxjs';
import { UserData } from '../modules/auth/auth.model';
import { ApiService } from '../core/api.service';
import {
  DifferentTownConfig,
  SameTownConfig,
  TradeDetails,
} from '../interfaces';
import { TRADE_STATUSES } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private fetchDataBooksSubject = new BehaviorSubject<boolean>(false);
  fetchDataBooks$ = this.fetchDataBooksSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private userTradesSubject = new BehaviorSubject<TradeDetails[]>([]);
  userTrades$ = this.userTradesSubject.asObservable();

  private tradeHistoryForUserSubject = new BehaviorSubject<TradeDetails[]>([]);
  tradeHistoryForUser$ = this.tradeHistoryForUserSubject.asObservable();

  private unreadNotificationsSubject = new BehaviorSubject<number>(0);
  unreadNotificationsNumber$ = this.unreadNotificationsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getUser(userSearchQuery: string, byId = true): Observable<UserData> {
    return this.apiService.getUserHttp(userSearchQuery, byId);
  }

  changeDeliverySettings(
    sameTownConfig: SameTownConfig,
    differentTownConfig: DifferentTownConfig
  ): void {
    this.apiService
      .updateUserDeliverySettings({
        sameTownConfig: sameTownConfig,
        differentTownConfig: differentTownConfig,
      })
      .subscribe(noop);
  }

  createTrade(tradeDetails: TradeDetails): Observable<unknown> {
    return this.apiService.postTrade(tradeDetails);
  }

  updateReadBy(): Observable<unknown> {
    const tradeIds: string[] = this.userTradesSubject
      .getValue()
      .map((trade: TradeDetails) => trade._id);
    return this.apiService.putReadBy(tradeIds);
  }

  getTrades(all = false): void {
    this.apiService.fetchTrades(all).subscribe((trades: TradeDetails[]) => {
      if (!all) {
        const unreadNotifications = trades.filter(
          (trade: TradeDetails) =>
            !trade.readBy.includes(localStorage.getItem('loggedInUserEmail'))
        );
        this.unreadNotificationsSubject.next(unreadNotifications.length);
        this.userTradesSubject.next(
          trades.filter(
            (trade) =>
              !trade.readBy.includes(
                localStorage.getItem('loggedInUserEmail')
              ) || TRADE_STATUSES.PENDING === trade.status
          )
        );
      } else {
        this.setTradeHistoryForUser(trades);
      }
    });
  }

  updateNotificationTrade(
    trade: TradeDetails,
    tradeType: TRADE_STATUSES
  ): Observable<unknown> {
    tradeType === TRADE_STATUSES.IN_PROGRESS && this.setFetchDataBooks(true);
    return this.apiService.updateNotificationTrade(trade, tradeType);
  }

  setLoading(flag: boolean): void {
    this.loadingSubject.next(flag);
  }

  setFetchDataBooks(flag: boolean): void {
    this.fetchDataBooksSubject.next(flag);
  }

  setTradeHistoryForUser(trades: TradeDetails[]): void {
    this.tradeHistoryForUserSubject.next(trades);
  }

  fetchLocations(): Observable<string[]> {
    return this.apiService.fetchLocations();
  }

  incrementUnreadNotifications() {
    this.unreadNotificationsSubject.next(
      this.unreadNotificationsSubject.getValue() + 1
    );
  }

  addUnreadNotification(value: TradeDetails) {
    this.userTradesSubject.next([...this.userTradesSubject.getValue(), value]);
  }
}
