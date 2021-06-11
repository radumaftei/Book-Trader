import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonService } from '../common.service';
import { Observable, Subject } from 'rxjs';
import { TradeDetails } from '../../interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DIALOG_POPUP_MESSAGES, TRADE_STATUSES } from '../../enums';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationMenuComponent implements OnDestroy {
  private unsubscribe = new Subject<void>();

  TRADE_STATUSES = TRADE_STATUSES;

  trades$: Observable<TradeDetails[]> = this.commonService.trades$;

  constructor(
    private commonService: CommonService,
    private dialog: MatDialog
  ) {}

  markAllNotificationsAsRead(): void {
    console.log('marked');
  }

  deleteAllNotifications(): void {
    console.log('deleted');
  }

  showRejectedInProgress = (trade: TradeDetails): boolean =>
    [TRADE_STATUSES.REJECTED, TRADE_STATUSES.IN_PROGRESS].includes(
      trade.status
    );

  getMessageForRejectedInProgress = (trade: TradeDetails): string => {
    switch (trade.status) {
      case TRADE_STATUSES.REJECTED: {
        return 'rejected';
      }
      case TRADE_STATUSES.IN_PROGRESS: {
        return 'accepted';
      }
      default: {
        return '';
      }
    }
  };

  handleTrade(trade: TradeDetails, tradeType: string): void {
    this.commonService.acceptRejectTrades(trade, tradeType).subscribe(() => {
      this.commonService.getTrades();
    });
  }

  showNotificationInformation(trade: TradeDetails): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: DIALOG_POPUP_MESSAGES.SHOW_INFORMATION,
      description: trade.description,
      width: '300px',
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
