import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { CommonService } from '../common.service';
import { NotificationSocketService } from '../notification-menu/notification-socket.service';
import { TradeDetails } from '../../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  unreadNotificationsNumber$ = this.commonService.unreadNotificationsNumber$;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
    private notificationSocketService: NotificationSocketService
  ) {}

  ngOnInit(): void {
    this.fetchUserNotifications();
    this.notificationSocketService
      .listen('new_notification')
      .subscribe((data: { tradeData: TradeDetails }) => {
        this.commonService.incrementUnreadNotifications();
        this.commonService.addUnreadNotification(data.tradeData);
      });
  }

  get actionButtonsDisabled(): boolean {
    return !this.authService.authorized();
  }

  async onLogoutClick(): Promise<void> {
    await this.authService.logout();
  }

  async onHomepageClick(): Promise<void> {
    await this.router.navigate(['homepage']);
  }

  async onProfileClick(): Promise<void> {
    await this.router.navigate(['profile']);
  }

  async onMyBooksClick(): Promise<void> {
    await this.router.navigate(['personal-book-page']);
  }

  fetchUserNotifications(): void {
    this.commonService.getTrades();
  }
}
