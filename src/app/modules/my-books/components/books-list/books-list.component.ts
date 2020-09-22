import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { BookProfile } from '../../../../interfaces';
import { BookCardsMock } from '../../../homepage/book-cards.mock';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements AfterViewInit, OnInit {
  nameInputDisabled = {};
  pageSizeOptions = [5, 10, 25, 100];
  editPressed = false;
  booksMock = new BookCardsMock().bookCardsProfile;
  displayedColumns: string[] = ['id', 'title', 'category', 'description', 'tradingPreference', 'delete'];
  dataSource = new MatTableDataSource<BookProfile>(this.booksMock);
  selection = new SelectionModel<BookProfile>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.booksMock.forEach(row => {
      this.nameInputDisabled[row.id] = true;
    });
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRow = position => {
    // do delete logic
    this.nameInputDisabled[position] = !this.nameInputDisabled[position];
  }
}
