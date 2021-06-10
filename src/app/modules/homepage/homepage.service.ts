import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { BookApi, BookProfile } from '../../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  private books: BookProfile[] = [];
  private HOMEPAGE_BOOKS_UPDATE = new BehaviorSubject<BookProfile[]>([]);
  homepageBooksUpdate$ = this.HOMEPAGE_BOOKS_UPDATE.asObservable();

  constructor(private apiService: ApiService) {}

  getHomepageBooks(): void {
    this.apiService.fetchBooks().subscribe((data: BookApi) => {
      if (!data.books) return;
      this.books = data.books;
      this.HOMEPAGE_BOOKS_UPDATE.next([...this.books]);
    });
  }

  getUserBooks(): Observable<BookApi> {
    return this.apiService.fetchBooks(false);
  }

  cleanUp(): void {
    this.HOMEPAGE_BOOKS_UPDATE.next([]);
  }
}
