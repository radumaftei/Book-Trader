import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  unreadNotificationsNumber$ = this.commonService.unreadNotificationsNumber$;

  // liveData$ = this.webSocket.messages$.pipe(
  //   map((rows) => rows.data),
  //   catchError((error) => {
  //     throw error;
  //   }),
  //   tap({
  //     error: (error) => console.log('[Live component] Error:', error),
  //     complete: () => console.log('[Live component] Connection Closed'),
  //   })
  // );

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.fetchUserNotifications();
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
