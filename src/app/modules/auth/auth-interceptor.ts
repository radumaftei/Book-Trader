import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    if (
      !localStorage.getItem('token') ||
      !localStorage.getItem('loggedInUserEmail')
    ) {
      this.authService.logout().then();
    }
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next.handle(authRequest);
  }
}
