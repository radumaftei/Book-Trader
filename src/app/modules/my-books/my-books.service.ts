import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyBooksService {
  private SELECTED_TAB = new BehaviorSubject<number>(0);
  selectedTab$ = this.SELECTED_TAB.asObservable();

  private changesSubject = new BehaviorSubject<boolean>(false);
  changes$ = this.changesSubject.asObservable();

  get changes(): boolean {
    return this.changesSubject.getValue();
  }

  updateSelectedTab = (index: number): void => {
    this.SELECTED_TAB.next(index);
  };

  setChanges(flag: boolean): void {
    this.changesSubject.next(flag);
  }
}
