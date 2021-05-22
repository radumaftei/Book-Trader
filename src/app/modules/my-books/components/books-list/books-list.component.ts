import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BookProfile } from '../../../../interfaces';
import { fromEvent, Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeDialogComponent } from '../../../homepage/components/trade-dialog/trade-dialog.component';
import {
  COLUMN_TYPES,
  DIALOG_POPUP_MESSAGES,
  getBookCategoriesArr,
} from '../../../../constants';
import { AuthService } from '../../../auth/auth.service';
import { BooksListDatasource } from './books-list.datasource';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements AfterViewInit, OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  bookCategories = getBookCategoriesArr();
  headerConfig = [
    { field_name: '', column_name: '#', type: 'INDEX' },
    { field_name: 'Image', column_name: 'image', type: 'IMAGE' },
    { field_name: 'Title', column_name: 'title', type: 'STRING' },
    { field_name: 'Author', column_name: 'author', type: 'STRING' },
    { field_name: 'Category', column_name: 'category', type: 'DROPDOWN' },
    {
      field_name: 'Description',
      column_name: 'description',
      type: 'STRING',
    },
    {
      field_name: 'Trading Preference Authors',
      column_name: 'tradingPreferenceAuthor',
      type: 'STRING',
    },
    {
      field_name: 'Trading Preference Books',
      column_name: 'tradingPreferenceBook',
      type: 'STRING',
    },
    {
      field_name: 'Trading Preference Genres',
      column_name: 'tradingPreferenceGenre',
      type: 'STRING',
    },
    {
      field_name: 'Trading Preference Description',
      column_name: 'tradingPreferenceDescription',
      type: 'STRING',
    },
    { field_name: '', column_name: 'delete', type: 'BUTTON' },
  ];

  COLUMN_TYPES = COLUMN_TYPES;
  pageSizeOptions = [5, 10, 15, 20];
  editPressed = false;
  books: BookProfile[] = [];
  displayedColumns: string[] = [
    '#',
    'image',
    'title',
    'author',
    'category',
    'description',
    'tradingPreferenceAuthor',
    'tradingPreferenceBook',
    'tradingPreferenceGenre',
    'tradingPreferenceDescription',
    'delete',
  ];
  paginator!: MatPaginator;

  @ViewChild('searchInput') searchInput: ElementRef;

  get actionButtonsDisabled() {
    return !this.books.length || !this.authService.authorized();
  }

  constructor(
    public dataSource: BooksListDatasource,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  testShit(row) {
    console.log('ROW', row.imagePath);
    return JSON.stringify(row);
  }

  ngOnInit(): void {
    debugger;
    this.dataSource.getBooksForTable();

    this.dataSource.data$.subscribe((books: BookProfile[]) => {
      this.books = books;
      this.books = this.books.map((book, idx) => {
        book['lineNumber'] = idx + 1;
        return book;
      });
    });
  }

  ngAfterViewInit() {
    // this.dataSource.counter$
    //   .pipe(takeUntil(this.unsubscribe))
    //   .subscribe((count) => {
    //     debugger;
    //     this.paginator.length = count;
    //   });
    this.searchInput &&
      fromEvent(this.searchInput.nativeElement, 'keyup')
        .pipe(
          takeUntil(this.unsubscribe),
          debounceTime(200),
          distinctUntilChanged()
        )
        .subscribe((searchValue) => {
          console.log('searchValue', searchValue);
        });
  }

  topTableButtonClicked = (action) => {
    switch (action) {
      case 'edit':
        this.editPressed = true;
        break;
      case 'save':
        this.dataSource.data$
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((books) => {
            this.dataSource.updateBooks(books);
          });
        this.editPressed = false;
        break;
      case 'cancel':
        this.editPressed = false;
        break;
    }
  };

  deleteRow = (bookId) => {
    this.openDialog(bookId);
  };

  openDialog = (bookId) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      message: DIALOG_POPUP_MESSAGES.DELETE_BOOK,
      actionButton: 'Delete',
      width: '400px',
    };
    const dialogRef = this.dialog.open(TradeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.deleteBook(bookId);
      }
    });
  };

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
