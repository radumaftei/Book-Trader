import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BookProfile } from '../../../../interfaces';
import { MyBooksService } from '../../my-books.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeDialogComponent } from '../../../homepage/components/trade-dialog/trade-dialog.component';
import {
  DIALOG_POPUP_MESSAGES,
  getBookCategoriesArr,
} from '../../../../constants';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements AfterViewInit, OnInit, OnDestroy {
  bookCategories = getBookCategoriesArr();
  pageSizeOptions = [5, 10, 25, 100];
  invalidElements = document.getElementsByClassName('ng-invalid');
  editPressed = false;
  subscription = new Subscription();
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
  dataSource;
  filterValue = '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  get actionButtonsDisabled() {
    return !this.books.length || !this.authService.authorized();
  }

  get dirtyState() {
    return !this.invalidElements.length;
  }

  constructor(
    private myBooksService: MyBooksService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.myBooksService.booksUpdate$.subscribe((books: BookProfile[]) => {
        this.books = books;
        this.books = this.books.map((book, idx) => {
          book['lineNumber'] = idx + 1;
          return book;
        });
        this.dataSource = new MatTableDataSource<BookProfile>(this.books);
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  topTableButtonClicked = (action) => {
    switch (action) {
      case 'edit':
        this.editPressed = true;
        break;
      case 'save':
        this.subscription.add(
          this.dataSource._data.subscribe((books) => {
            this.myBooksService.updateBooks(books);
          })
        );
        this.editPressed = false;
        break;
      case 'cancel':
        this.editPressed = false;
        break;
    }
  };

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
        this.myBooksService.deleteBook(bookId);
      }
    });
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
