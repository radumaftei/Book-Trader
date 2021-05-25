import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { delay, takeUntil, takeWhile } from 'rxjs/operators';
import { DIALOG_POPUP_MESSAGES } from 'src/app/constants';
import { BookProfile } from 'src/app/interfaces';
import { LoginSignUpUser } from 'src/app/modules/auth/auth.model';
import { HomepageService } from '../../homepage.service';
import { TradeDialogComponent } from '../trade-dialog/trade-dialog.component';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  alive = true;

  loggedInUser: LoginSignUpUser;
  isLoading = false;
  bookCards: BookProfile[];
  bookCategories = [];
  offsetBookNumberMapper = {};
  navigationButtonsStatuses = {};

  constructor(
    private homepageService: HomepageService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.loggedInUser = {
      email: localStorage.getItem('loggedInUserEmail'),
      location: localStorage.getItem('loggedInUserLocation'),
    };
    this.homepageService.getHomepageBooks();
    this.homepageService.homepageBooksUpdate$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((books) => {
        if (!books) return;
        this.isLoading = false;
        if (!books.length) return;
        this.bookCards = books;
        this.bookCategories = books.map((b) => b.category);
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

  onTrade = (book: BookProfile) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: DIALOG_POPUP_MESSAGES.TRADE_BOOK,
      actionButton: 'Send Trade offer',
      isHomepage: true,
      book,
      loggedInUser: this.loggedInUser,
    };
    dialogConfig.disableClose = true;
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(TradeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('trade pressed');
      }
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
