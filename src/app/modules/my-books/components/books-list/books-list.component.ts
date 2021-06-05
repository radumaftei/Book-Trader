import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { fromEvent, Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeDialogComponent } from '../../../homepage/components/trade-dialog/trade-dialog.component';
import {
  COLUMN_TYPES,
  defaultPageOptions,
  DIALOG_POPUP_MESSAGES,
  getBookCategoriesArr,
} from '../../../../constants';
import { AuthService } from '../../../auth/auth.service';
import { BooksListDatasource } from './books-list.datasource';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  takeUntil,
} from 'rxjs/operators';

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
  editPressed = false;

  defaultPageSizeOptions = defaultPageOptions;
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

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  get actionButtonsDisabled(): boolean {
    return !this.dataSource.books.length || !this.authService.authorized();
  }

  constructor(
    public dataSource: BooksListDatasource,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.dataSource.getBooksForTable(this.defaultPageSizeOptions);
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(({ pageSize, pageIndex }: PageEvent) => {
        this.dataSource.getBooksForTable({
          pageSize,
          pageIndex,
        });
      });
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

  topTableButtonClicked = (action: string): void => {
    switch (action) {
      case 'edit':
        this.editPressed = true;
        break;
      case 'save':
        this.dataSource.updateBooks();
        this.paginator.pageIndex = 0;
        this.editPressed = false;
        break;
      case 'cancel':
        this.dataSource.resetChangedStatus();
        this.editPressed = false;
        break;
    }
  };

  deleteRow = (bookId: string): void => {
    console.log('book id', bookId);
    this.openDialog(bookId);
  };

  openDialog = (bookId: string): void => {
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
