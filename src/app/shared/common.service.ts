import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../modules/auth/auth.model';
import { ApiService } from '../core/api.service';
import { DifferentTownConfig, SameTownConfig } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getUser(userSearchQuery: string, byId = true): Observable<UserData> {
    return this.apiService.getUserHttp(userSearchQuery, byId);
  }

  changeDeliverySettings(
    sameTownConfig: SameTownConfig,
    differentTownConfig: DifferentTownConfig
  ): void {
    this.apiService
      .updateUserDeliverySettings({
        sameTownConfig: sameTownConfig,
        differentTownConfig: differentTownConfig,
      })
      .subscribe(() => {});
  }

  setLoading(flag: boolean): void {
    this.loadingSubject.next(flag);
  }
}
