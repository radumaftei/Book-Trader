import { Component, OnDestroy } from '@angular/core';
import { CommonService } from '../../../../shared/common.service';
import { Observable, Subject } from 'rxjs';
import { TradeDetails } from '../../../../interfaces';
import { TRADE_STATUSES } from 'src/app/enums';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.scss'],
})
export class TradeHistoryComponent implements OnDestroy {
  private unsubscribe = new Subject<void>();
  tradeHistoryForUser$: Observable<TradeDetails[]> =
    this.commonService.tradeHistoryForUser$;
  unreadNotificationsNumber$ = this.commonService.unreadNotificationsNumber$;

  TRADE_STATUSES = TRADE_STATUSES;

  constructor(private commonService: CommonService) {
    this.commonService.getTrades(true);
  }

  showActions(trade: TradeDetails): boolean {
    return ![
      TRADE_STATUSES.COMPLETED,
      TRADE_STATUSES.CANCELED,
      TRADE_STATUSES.REJECTED,
    ].includes(trade.status);
  }

  handleTrade(trade: TradeDetails, tradeType: TRADE_STATUSES): void {
    switch (tradeType) {
      case TRADE_STATUSES.CANCELED: {
        this.commonService
          .updateNotificationTrade(trade, tradeType)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(() => {
            this.commonService.getTrades(true);
          });
        break;
      }
      case TRADE_STATUSES.COMPLETED: {
        this.commonService
          .completeTrade(trade, tradeType)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(() => {
            this.commonService.getTrades(true);
          });
        break;
      }
    }
  }

  unreadNotification(readBy: string): boolean {
    return !readBy.includes(localStorage.getItem('loggedInUserEmail'));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
