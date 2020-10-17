import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthData, LoginSignUpUser } from './auth.model';

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
      .subscribe(({ user}) => {
        this.saveLoggedInUserToLs(user);
        this.saveToLs('loggedInUserEmail', user.email);
        this.saveToLs('loggedInUserLocation', user.location);
        this.router.navigate(['homepage']);
      })
  }

  loginUser = (authData: AuthData) => {
    this.apiService.loginUserHttp(authData)
      .subscribe(({ token, expiresIn, user  }) => {
        this.token = token;
        if (token) {
          this.saveLoggedInUserToLs(user);
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
    this.saveToLs('token', token);
    this.saveToLs('expirationDate', expirationDate.toISOString());
  }

  private clearAuthDataFromLS = () => {
    this.removeFromLs('token');
    this.removeFromLs('expirationDate');
  }

  private saveLoggedInUserToLs = user => {
    this.saveToLs('loggedInUserEmail', user.email);
    this.saveToLs('loggedInUserLocation', user.location);
  }

  private saveToLs = (key: string, value: any): void => {
    localStorage.setItem(key, value);
  }

  private removeFromLs = (key: string): void => {
    localStorage.removeItem(key);
  }

  private getFromLs = (key: string): any => {
    localStorage.getItem(key);
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
    const token = this.getFromLs('token');
    const expirationDate = this.getFromLs('expirationDate');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    }
  }
}
