import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { AuthService } from './modules/auth/auth.service';
import { NotificationSocketService } from './shared/notification-menu/notification-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private notificationSocketService: NotificationSocketService
  ) {
    this.notificationSocketService.init();
  }

  ngOnInit(): void {
    this.authService.userDataSubject.subscribe((userEmail) => {
      if (userEmail) {
        this.notificationSocketService.joinUser(userEmail);
      }
    });
    this.authService.autoAuthorizeUser();
  }

  prepareRoute(outlet: RouterOutlet): string {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
