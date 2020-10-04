import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { AuthData } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService) { }

  createUser = (authData: AuthData) => {
    this.apiService.createUserHttp(authData)
      .subscribe(response => {
        console.log(response)
      })
  }

  loginUser = (authData: AuthData) => {
    this.apiService.loginUserHttp(authData)
      .subscribe(response => {
        console.log(response)
      })
  }
}
