import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { AuthService } from './modules/auth/auth.service';
import { WebsocketService } from './core/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private webSocket: WebsocketService
  ) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.webSocket.connect();
  }

  prepareRoute(outlet: RouterOutlet): string {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
