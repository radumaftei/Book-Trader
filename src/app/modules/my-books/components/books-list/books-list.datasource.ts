import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { ApiService } from './../../../../core/api.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { BookProfile } from 'src/app/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BooksListDatasource implements DataSource<any> {
  private unsubscribe = new Subject<void>();
  private dataSubject = new BehaviorSubject<BookProfile[]>([]);
  data$ = this.dataSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private noDataSubject = new BehaviorSubject<boolean>(false);
  noData$ = this.noDataSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  counter$ = this.countSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getBooksForTable() {
    this.loadingSubject.next(true);
    this.noDataSubject.next(false);
    this.apiService
      .fetchBooks(false)
      .pipe(
        takeUntil(this.unsubscribe),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((books) => {
        if (!books) return;
        !books.length && this.noDataSubject.next(true);
        this.dataSubject.next(books);
      });
  }

  addBook = (props) => {
    const book = new FormData();
    book.append('title', props['title']);
    book.append('author', props['author']);
    book.append('description', props['description']);
    book.append('tradingPreferenceAuthor', props['tradingPreferenceAuthor']);
    book.append('tradingPreferenceBook', props['tradingPreferenceBook']);
    book.append('tradingPreferenceGenre', props['tradingPreferenceGenre']);
    book.append(
      'tradingPreferenceDescription',
      props['tradingPreferenceDescription']
    );
    book.append('category', props['category']);
    book.append('image', props['image'], props['title']);
    this.apiService
      .postBookHttp(book)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(({ newBook }) => {
        if (!newBook) return;
        this.dataSubject.next([...this.dataSubject.getValue(), newBook]);
      });
  };

  updateBooks = (books) => {
    this.apiService
      .putBooksHttp(books)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.getBooksForTable();
      });
  };

  deleteBook = (id) => {
    this.apiService
      .deleteBooksHttp(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.getBooksForTable();
      });
  };

  connect(
    collectionViewer: CollectionViewer
  ): Observable<any[] | readonly any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
