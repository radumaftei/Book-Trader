import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { BookProfile } from '../../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../auth/auth.model';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  private books: BookProfile[] = [];
  private HOMEPAGE_BOOKS_UPDATE = new BehaviorSubject<BookProfile[]>([]);
  homepageBooksUpdate$ = this.HOMEPAGE_BOOKS_UPDATE.asObservable();

  constructor(private apiService: ApiService) {}

  getHomepageBooks(): void {
    this.apiService.fetchBooks().subscribe((books: BookProfile[]) => {
      if (!books) return;
      this.books = books;
      this.HOMEPAGE_BOOKS_UPDATE.next([...this.books]);
    });
  }

  getUserBooks(): Observable<BookProfile[]> {
    return this.apiService.fetchBooks(false);
  }

  getUser(userId: string): Observable<UserData> {
    return this.apiService.getUserHttp(userId);
  }

  cleanUp(): void {
    this.HOMEPAGE_BOOKS_UPDATE.next([]);
  }
}
