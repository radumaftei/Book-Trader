import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { CommonService } from '../common.service';
import { UserNotificationService } from './user-notification.service';
import { Observable, Subject } from 'rxjs';
import { TradeDetails } from '../../interfaces';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationMenuComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  trades$: Observable<TradeDetails[]> =
    this.userNotificationService.getTrades();
  loading$ = this.commonService.loading$;

  constructor(
    private commonService: CommonService,
    private userNotificationService: UserNotificationService
  ) {}

  ngOnInit(): void {
    this.commonService.setLoading(false);
  }

  markAllNotificationsAsRead(): void {
    console.log('marked');
  }

  deleteAllNotifications(): void {
    console.log('deleted');
  }

  ngOnDestroy(): void {
    this.commonService.setLoading(true);
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
