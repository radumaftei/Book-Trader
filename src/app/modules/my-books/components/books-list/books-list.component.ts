import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BookProfile } from '../../../../interfaces';
import { MyBooksService } from '../../my-books.service';
import { Subscription } from 'rxjs';
import { areObjectDifferent } from '../../../helpers';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements AfterViewInit, OnInit, OnDestroy {
  pageSizeOptions = [5, 10, 25, 100];
  invalidElements = document.getElementsByClassName('ng-invalid');
  editPressed = false;
  subscription = new Subscription();
  books: BookProfile[] = [];
  displayedColumns: string[] = ['#', 'title', 'category', 'description', 'tradingPreferenceList', 'delete'];
  dataSource;
  filterValue = '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  get editDisabled() {
    return !this.books.length;
  }

  get dirtyState() {
    return !this.invalidElements.length;
  }

  constructor(private myBooksService: MyBooksService) { }

  ngOnInit(): void {
    this.myBooksService.getBooks();
    this.subscription.add(this.myBooksService.booksUpdate
      .subscribe((books: BookProfile[]) => {
       this.books = books;
       this.books = this.books.map((book, idx) => {
         book['lineNumber'] = idx + 1;
         return book;
       });
       this.dataSource = new MatTableDataSource<BookProfile>(this.books);
      }));

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  topTableButtonClicked = action => {
    switch (action) {
      case 'edit':
        // do edit logic
        this.editPressed = true;
        break;
      case 'save':
        // do save logic
        this.dataSource._data.subscribe(books => {
          this.myBooksService.updateBooks(books);
        });
        this.editPressed = false;
        break;
      case 'cancel':
        // do cancel logic
        this.editPressed = false;
        break;
    }
    if (action === 'edit') {
      this.editPressed = true;
    }
    if (action === 'save') {
      // do save logic
      this.editPressed = false;
    }
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRow = id => {
    this.myBooksService.deleteBook(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
