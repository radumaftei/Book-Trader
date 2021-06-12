import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private allTradesForUserSubject = new BehaviorSubject<TradeDetails[]>([]);
  allTradesForUser$ = this.allTradesForUserSubject.asObservable();

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
      .subscribe(() => {});
  }

  createTrade(tradeDetails: TradeDetails): Observable<unknown> {
    return this.apiService.postTrade(tradeDetails);
  }

  updateReadBy(readBy: string): Observable<string> {
    const tradeIds: string[] = this.userTradesSubject
      .getValue()
      .map((trade: TradeDetails) => trade._id);
    return this.apiService.putReadBy(readBy, tradeIds);
  }

  getTrades(all = false): void {
    this.apiService.fetchTrades(all).subscribe((trades: TradeDetails[]) => {
      if (!all) {
        this.userTradesSubject.next(trades);
      } else {
        this.allTradesForUserSubject.next(trades);
      }
    });
  }

  acceptRejectTrades(
    trade: TradeDetails,
    tradeType: TRADE_STATUSES
  ): Observable<unknown> {
    tradeType === TRADE_STATUSES.IN_PROGRESS && this.setFetchDataBooks(true);
    return this.apiService.putTrade(trade, tradeType);
  }

  setLoading(flag: boolean): void {
    this.loadingSubject.next(flag);
  }

  setFetchDataBooks(flag: boolean): void {
    this.fetchDataBooksSubject.next(flag);
  }
}
