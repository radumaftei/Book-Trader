import { Component } from '@angular/core';
import { CommonService } from '../../../../shared/common.service';
import { Observable } from 'rxjs';
import { TradeDetails } from '../../../../interfaces';
import { TRADE_STATUSES } from 'src/app/enums';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.scss'],
})
export class TradeHistoryComponent {
  allTradesForUser$: Observable<TradeDetails[]> =
    this.commonService.allTradesForUser$;
  TRADE_STATUSES = TRADE_STATUSES;

  constructor(private commonService: CommonService) {
    this.commonService.getTrades(true);
  }

  handleTrade(trade: TradeDetails, tradeType: TRADE_STATUSES): void {}
}
