import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { AuthData } from './auth.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
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
      .subscribe(({ token }) => {
        this.token = token;
        this.authStatusListener.next(true);
        this.router.navigate(['homepage']);
      })
  }

  logout = () => {
    this.token = null;
    this.authStatusListener.next(false);
    this.router.navigate(['login']);
  }
}
