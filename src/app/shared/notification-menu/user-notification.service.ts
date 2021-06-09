import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Observable } from 'rxjs';
import { TradeDetails } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationService {
  constructor(private apiService: ApiService) {}

  getTrades(): Observable<TradeDetails[]> {
    return this.apiService.fetchTrades();
  }
}
