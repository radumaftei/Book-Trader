import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MyBooksService } from './my-books.service';

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard<T> implements CanDeactivate<T> {
  constructor(private myBooksService: MyBooksService) {}
  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve) => {
      this.myBooksService.changes$.subscribe((changesMade) => {
        if (changesMade) return;
        resolve(true);
      });
    });
  }
}
