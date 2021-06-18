import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonService } from '../common.service';
import { noop, Observable, Subject } from 'rxjs';
import { TradeDetails } from '../../interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DIALOG_POPUP_MESSAGES, TRADE_STATUSES } from '../../enums';
import { DialogComponent } from '../dialog/dialog.component';
import { HomepageService } from '../../modules/homepage/homepage.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationMenuComponent implements OnDestroy {
  private unsubscribe = new Subject<void>();

  TRADE_STATUSES = TRADE_STATUSES;
  userTrades$: Observable<TradeDetails[]> = this.commonService.userTrades$;
  unreadNotificationsNumber$ = this.commonService.unreadNotificationsNumber$;

  constructor(
    private commonService: CommonService,
    private dialog: MatDialog,
    private homepageService: HomepageService,
    private router: Router
  ) {}

  markAllNotificationsAsRead(): void {
    this.commonService
      .updateReadBy()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.commonService.getTrades(false);
        this.router.url === '/profile' && this.commonService.getTrades(true);
      });
  }

  showNotificationWithoutActions = (trade: TradeDetails): boolean =>
    [
      TRADE_STATUSES.REJECTED,
      TRADE_STATUSES.IN_PROGRESS,
      TRADE_STATUSES.CANCELED,
      TRADE_STATUSES.COMPLETED,
    ].includes(trade.status);

  getStatusFromNoActionTrades = (trade: TradeDetails): string => {
    const statusObjects = {
      [TRADE_STATUSES.REJECTED]: 'rejected',
      [TRADE_STATUSES.IN_PROGRESS]: 'accepted',
      [TRADE_STATUSES.CANCELED]: 'cancelled',
      [TRADE_STATUSES.COMPLETED]: 'completed',
    };
    return statusObjects[trade.status];
  };

  handleTrade(trade: TradeDetails, tradeType: TRADE_STATUSES): void {
    this.commonService
      .updateNotificationTrade(trade, tradeType)
      .subscribe(() => {
        this.commonService.getTrades();
        if (tradeType === TRADE_STATUSES.IN_PROGRESS) {
          this.homepageService.getHomepageBooks();
        }
        this.router.url === '/profile' && this.commonService.getTrades(true);
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

    dialogRef.afterClosed().subscribe(noop);
  }

  unreadNotification(readBy: string): boolean {
    return !readBy.includes(localStorage.getItem('loggedInUserEmail'));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
