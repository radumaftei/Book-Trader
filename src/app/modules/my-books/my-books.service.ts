import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MyBooksService {
  private SELECTED_TAB = new BehaviorSubject<number>(0);
  selectedTab$ = this.SELECTED_TAB.asObservable();

  updateSelectedTab = (index) => {
    this.SELECTED_TAB.next(index);
  };
}
