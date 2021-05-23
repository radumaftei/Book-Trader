import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { BookProfile } from '../../interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  private books: BookProfile[] = [];
  private HOMEPAGE_BOOKS_UPDATE = new BehaviorSubject<BookProfile[]>([]);
  homepageBooksUpdate$ = this.HOMEPAGE_BOOKS_UPDATE.asObservable();

  constructor(private apiService: ApiService) {}

  getHomepageBooks = () => {
    this.apiService.fetchBooks().subscribe((books) => {
      if (!books) return;
      this.books = books;
      this.HOMEPAGE_BOOKS_UPDATE.next([...this.books]);
    });
  };

  cleanUp = () => {
    this.HOMEPAGE_BOOKS_UPDATE.next([]);
  };
}
