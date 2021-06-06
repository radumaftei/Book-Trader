import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DifferentTownConfig, SameTownConfig } from '../../interfaces';
import { ApiService } from '../../core/api.service';
@Injectable({
  providedIn: 'root',
})
export class MyBooksService {
  private SELECTED_TAB = new BehaviorSubject<number>(0);
  selectedTab$ = this.SELECTED_TAB.asObservable();

  constructor(private apiService: ApiService) {}

  updateSelectedTab = (index: number): void => {
    this.SELECTED_TAB.next(index);
  };
}
