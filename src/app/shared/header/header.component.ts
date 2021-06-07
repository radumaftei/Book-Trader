import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  hidden = false;

  constructor(private router: Router, private authService: AuthService) {}

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

  toggleNotifications(): void {
    this.hidden = !this.hidden;
  }
}
