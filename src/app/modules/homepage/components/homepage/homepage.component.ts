import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BookProfile } from 'src/app/interfaces';
import { HomepageService } from '../../homepage.service';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { CommonService } from '../../../../shared/common.service';
import { DIALOG_POPUP_ACTIONS, DIALOG_POPUP_MESSAGES } from '../../../../enums';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  loading$ = this.commonService.loading$;

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
    this.homepageService.getHomepageBooks();
    this.commonService.fetchDataBooks$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        if (!data) return;
        this.homepageService.getHomepageBooks();
        this.commonService.setFetchDataBooks(false);
      });
    this.homepageService.homepageBooksUpdate$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((books) => {
        this.commonService.setLoading(false);
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
      title: DIALOG_POPUP_MESSAGES.TRADE_BOOK,
      actionButton: DIALOG_POPUP_ACTIONS.SEND_TRADE_OFFER,
      isHomepage: true,
      book,
    };
    dialogConfig.disableClose = true;
    dialogConfig.width = '800px';
    dialogConfig.autoFocus = false;

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
        dialogRef = this.dialog.open(DialogComponent, dialogConfig);

        dialogRef
          .afterClosed()
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((result) => {
            if (result) {
              const fromUser = localStorage.getItem('loggedInUserEmail');
              const toUser = dialogConfig.data.user.email;
              const { tradedWithBookId, tradedWithBookTitle, tradeMethod } =
                result;
              const tradedBookTitle = book.title;
              const tradedBookId = book.id;
              const [town, method] = tradeMethod.split('-');
              const informationForUser = `The user ${fromUser} wants to trade from ${
                town === 'sameTownConfig' ? 'same' : 'a different'
              } town by ${method === 'onFoot' ? 'foot' : 'courier'}`;
              this.commonService
                .createTrade({
                  fromUser,
                  toUser,
                  description: informationForUser,
                  tradedWithBookId,
                  tradedWithBookTitle,
                  tradedBookTitle,
                  tradedBookId,
                  tradeMethod,
                })
                .pipe(takeUntil(this.unsubscribe))
                .subscribe((data) => {});
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
    this.commonService.setLoading(true);
  }
}
