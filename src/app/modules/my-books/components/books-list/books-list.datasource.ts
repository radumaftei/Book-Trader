import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { ApiService } from '../../../../core/api.service';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { BookProfile, BookProfileDTO } from 'src/app/interfaces';
import { Injectable } from '@angular/core';

interface BookProps {
  author: string;
  category: string;
  description: string;
  title: string;
  tradingPreferenceAuthor: string | null;
  tradingPreferenceBook: string | null;
  tradingPreferenceDescription: string | null;
  tradingPreferenceGenre: string | null;
  image: File;
}

@Injectable({
  providedIn: 'root',
})
export class BooksListDatasource implements DataSource<any> {
  private unsubscribe = new Subject<void>();
  private readonly initialDataSubject = new BehaviorSubject<BookProfile[]>([]);

  private dataSubject = new BehaviorSubject<BookProfile[]>([]);
  data$ = this.dataSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private noDataSubject = new BehaviorSubject<boolean>(false);
  noData$ = this.noDataSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  counter$ = this.countSubject.asObservable();

  constructor(private apiService: ApiService) {}

  get books(): BookProfile[] {
    return this.dataSubject.getValue();
  }

  get initialBooks(): BookProfile[] {
    return this.initialDataSubject.getValue();
  }

  getBooksForTable(): void {
    this.loadingSubject.next(true);
    this.noDataSubject.next(false);
    this.apiService
      .fetchBooks(false)
      .pipe(
        takeUntil(this.unsubscribe),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((books: BookProfileDTO[]) => {
        if (!books) return;
        !books.length && this.noDataSubject.next(true);
        let lineNumber = 0;
        const bookData = books.map((book) => {
          lineNumber = lineNumber + 1;
          return {
            ...book,
            lineNumber,
          };
        });
        this.initialDataSubject.next(JSON.parse(JSON.stringify(bookData)));
        this.dataSubject.next(JSON.parse(JSON.stringify(bookData)));
      });
  }

  addBook = (props: BookProps): void => {
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
        this.dataSubject.next([
          ...this.books,
          <BookProfile>{
            ...newBook,
            changed: false,
          },
        ]);
      });
  };

  updateBooks = (): void => {
    const booksToUpdate = this.books.filter((book) => book.changed);
    this.apiService
      .putBooksHttp(booksToUpdate)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.getBooksForTable();
      });
  };

  deleteBook = (id: string): void => {
    this.apiService
      .deleteBooksHttp(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.getBooksForTable();
      });
  };

  resetChangedStatus = () => {
    this.dataSubject.next(JSON.parse(JSON.stringify(this.initialBooks)));
  };

  connect(): Observable<BookProfile[] | readonly BookProfile[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
