import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { CommonService } from '../common.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  notificationsNumber$: Observable<number> =
    this.commonService.notificationsNumber$;
  // notificationsRead: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

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
}
