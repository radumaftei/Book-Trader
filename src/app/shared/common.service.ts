import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../modules/auth/auth.model';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private apiService: ApiService) {}

  getUser(userSearchQuery: string, byId = true): Observable<UserData> {
    return this.apiService.getUserHttp(userSearchQuery, byId);
  }
}
