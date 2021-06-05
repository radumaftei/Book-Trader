import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DIALOG_POPUP_MESSAGES } from 'src/app/constants';
import { BookProfile } from 'src/app/interfaces';
import { HomepageService } from '../../homepage.service';
import { TradeDialogComponent } from '../trade-dialog/trade-dialog.component';
import { CommonService } from '../../../../shared/common.service';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();

  isLoading = false;
  bookCards: BookProfile[];
  bookCategories = [];
  offsetBookNumberMapper = {};
  navigationButtonsStatuses = {};

  constructor(
    private homepageService: HomepageService,
    private dialog: MatDialog,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.homepageService.getHomepageBooks();
    this.homepageService.homepageBooksUpdate$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((books) => {
        if (!books) return;
        this.isLoading = false;
        if (!books.length) return;
        this.bookCards = books;
        this.bookCategories = books
          .reduce(
            (acc, b) =>
              acc.indexOf(b.category) === -1 ? [...acc, b.category] : acc,
            []
          )
          .sort();
        this.bookCategories.forEach((category) => {
          this.offsetBookNumberMapper[category] = {};
          this.navigationButtonsStatuses[category] = {};
          this.offsetBookNumberMapper[category].offset = 0;
          this.offsetBookNumberMapper[category].bookNumber =
            this.booksByCategory(category).length;
          this.navigationButtonsStatuses[category].previous = true;
          this.navigationButtonsStatuses[category].next =
            this.offsetBookNumberMapper[category].bookNumber <= 8;
        });
      });
  }

  openBookDetails = (book: BookProfile): void => {
    let dialogRef;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: DIALOG_POPUP_MESSAGES.TRADE_BOOK,
      actionButton: 'Send Trade offer',
      isHomepage: true,
      book,
    };
    dialogConfig.disableClose = true;
    dialogConfig.width = '800px';

    forkJoin([
      this.commonService.getUser(book.userId),
      this.homepageService.getUserBooks(),
    ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(([userData, userBooks]) => {
        dialogConfig.data = {
          ...dialogConfig.data,
          user: userData,
          userBooks: userBooks.books,
        };
        dialogRef = this.dialog.open(TradeDialogComponent, dialogConfig);

        dialogRef
          .afterClosed()
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((result) => {
            if (result) {
              console.log('trade pressed');
            }
          });
      });
  };

  booksByCategory = (category: string): BookProfile[] => {
    return this.bookCards.reduce(
      (r, item) => (item.category === category ? [...r, item] : r),
      []
    );
  };

  onPrevious = (element: any, category: string) => {
    const minOffset = 0;
    const maxOffset =
      (this.offsetBookNumberMapper[category].bookNumber - 8) * 200;
    this.navigationButtonsStatuses[category].next = false;
    if (this.offsetBookNumberMapper[category].offset > maxOffset) {
      this.offsetBookNumberMapper[category].offset =
        this.offsetBookNumberMapper[category].offset - 1800;
    } else if (this.offsetBookNumberMapper[category].offset > minOffset) {
      this.offsetBookNumberMapper[category].offset =
        this.offsetBookNumberMapper[category].offset - 1600;
    }
    if (this.offsetBookNumberMapper[category].offset <= minOffset) {
      this.navigationButtonsStatuses[category].previous = true;
    }
    element.scrollTo({
      left: this.offsetBookNumberMapper[category].offset,
      behavior: 'smooth',
    });
  };

  onNext = (element: any, category: string) => {
    let maxOffset;
    this.navigationButtonsStatuses[category].previous = false;
    if (this.offsetBookNumberMapper[category].bookNumber > 8) {
      maxOffset = (this.offsetBookNumberMapper[category].bookNumber - 8) * 200;
      if (this.offsetBookNumberMapper[category].offset <= maxOffset) {
        this.offsetBookNumberMapper[category].offset =
          this.offsetBookNumberMapper[category].offset + 1600;
      }
    }
    if (this.offsetBookNumberMapper[category].offset > maxOffset) {
      this.navigationButtonsStatuses[category].next = true;
    }
    element.scrollTo({
      left: this.offsetBookNumberMapper[category].offset,
      behavior: 'smooth',
    });
  };

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.homepageService.cleanUp();
  }
}
