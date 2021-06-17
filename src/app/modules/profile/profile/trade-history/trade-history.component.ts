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

  TRADE_STATUSES = TRADE_STATUSES;

  constructor(private commonService: CommonService) {
    this.commonService.getTrades(true);
  }

  showCompleteActionButton(trade: TradeDetails): boolean {
    return ![
      TRADE_STATUSES.COMPLETED,
      TRADE_STATUSES.CANCELED,
      TRADE_STATUSES.REJECTED,
      TRADE_STATUSES.PENDING,
    ].includes(trade.status);
  }

  showCancelActionButton(trade: TradeDetails): boolean {
    return ![
      TRADE_STATUSES.COMPLETED,
      TRADE_STATUSES.CANCELED,
      TRADE_STATUSES.REJECTED,
    ].includes(trade.status);
  }

  handleTrade(trade: TradeDetails, tradeType: TRADE_STATUSES): void {
    this.commonService
      .updateNotificationTrade(trade, tradeType)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.commonService.getTrades(true);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
