import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { defaultPageOptions } from '../../../../constants';
import { AuthService } from '../../../auth/auth.service';
import { BooksListDatasource } from './books-list.datasource';
import { takeUntil } from 'rxjs/operators';
import {
  COLUMN_TYPES,
  DIALOG_POPUP_ACTIONS,
  DIALOG_POPUP_MESSAGES,
} from '../../../../enums';
import { getBookCategoriesArr } from '../../../helpers';
import { MyBooksService } from '../../my-books.service';
import { displayedColumns, headerConfig } from './table-config';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements AfterViewInit, OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  bookCategories = getBookCategoriesArr();
  headerConfig = headerConfig;

  COLUMN_TYPES = COLUMN_TYPES;
  editPressed = false;

  defaultPageSizeOptions = defaultPageOptions;
  displayedColumns: string[] = displayedColumns;

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  get actionButtonsDisabled(): boolean {
    return !this.dataSource.books.length || !this.authService.authorized();
  }

  constructor(
    public dataSource: BooksListDatasource,
    private dialog: MatDialog,
    private authService: AuthService,
    private myBooksService: MyBooksService
  ) {}

  ngOnInit(): void {
    this.myBooksService.selectedTab$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((index) => {
        if (!index) {
          this.dataSource.getBooksForTable(this.defaultPageSizeOptions);
        }
      });
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
    // this.searchInput &&
    //   fromEvent(this.searchInput.nativeElement, 'keyup')
    //     .pipe(
    //       takeUntil(this.unsubscribe),
    //       debounceTime(200),
    //       distinctUntilChanged()
    //     )
    //     .subscribe((searchValue) => {
    //       console.log('searchValue', searchValue);
    //     });
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
    this.paginator.pageIndex = 0;
    this.openDialog(bookId);
  };

  openDialog = (bookId: string): void => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: DIALOG_POPUP_MESSAGES.DELETE_BOOK,
      actionButton: DIALOG_POPUP_ACTIONS.DELETE,
      width: '400px',
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

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
