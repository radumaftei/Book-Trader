import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { BookProfile } from '../../interfaces';
import { BehaviorSubject } from 'rxjs';
import { AuthData } from '../auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  private books: BookProfile[] = [];
  userInfo: AuthData;
  private HOMEPAGE_BOOKS_UPDATE = new BehaviorSubject<BookProfile[]>([]);
  homepageBooksUpdate$ = this.HOMEPAGE_BOOKS_UPDATE.asObservable();

  constructor(private apiService: ApiService) {}

  getHomepageBooks = () => {
    this.apiService.fetchHomepageDataHttp()
      .subscribe(({ books, userData }) => {
        if (!books) return;
        this.books = books;
        this.userInfo = userData;
        this.HOMEPAGE_BOOKS_UPDATE.next([...this.books]);
      })
  }
}
