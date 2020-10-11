import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthData } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private expiresInTimeOutID: any;
  private authStatusListener = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService, private router: Router) { }

  getAuthStatusListener = () => {
    return this.authStatusListener.asObservable();
  }

  authorized = () => {
    return this.authStatusListener.getValue();
  }

  getToken = () => {
    return this.token;
  }

  createUser = (authData: AuthData) => {
    this.apiService.createUserHttp(authData)
      .subscribe(() => {
        this.router.navigate(['homepage']);
      })
  }

  loginUser = (authData: AuthData) => {
    this.apiService.loginUserHttp(authData)
      .subscribe(({ token, expiresIn  }) => {
        this.token = token;
        if (token) {
          this.setAuthTimer(expiresIn);
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthDataToLS(token, expirationDate);
          this.router.navigate(['homepage']);
        }
      })
  }

  logout = () => {
    this.token = null;
    this.authStatusListener.next(false);
    this.clearAuthDataFromLS();
    clearTimeout(this.expiresInTimeOutID);
    this.router.navigate(['login']);
  }

  private saveAuthDataToLS = (token: string, expirationDate: Date) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  private clearAuthDataFromLS = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  autoAuthUser = () => {
    const authInformation = this.getAuthData();
    if (!authInformation) return;
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  private setAuthTimer = (duration: number) => {
    this.expiresInTimeOutID = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private getAuthData = () => {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    }
  }
}
