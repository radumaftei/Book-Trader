import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DIALOG_POPUP_MESSAGES, getBookCategoriesArr } from 'src/app/constants';
import { BookProfile } from 'src/app/interfaces';
import { LoginSignUpUser } from 'src/app/modules/auth/auth.model';
import { HomepageService } from '../../homepage.service';
import { TradeDialogComponent } from '../trade-dialog/trade-dialog.component';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  loggedInUser: LoginSignUpUser;
  isLoading = false;
  bookCards: BookProfile[];
  bookCategories = getBookCategoriesArr();
  offsetBookNumberMapper = {};
  // 852px + rows.length - 1
  bodyHeight = '852';
  navigationButtonsStatuses = {};

  constructor(
    private homepageService: HomepageService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.isLoading = true;
    this.loggedInUser = {
      email: localStorage.getItem('loggedInUserEmail'),
      location: localStorage.getItem('loggedInUserLocation'),
    };
    this.homepageService.getHomepageBooks();
    this.subscription.add(
      this.homepageService.homepageBooksUpdate$.subscribe((books) => {
        if (!books) return;
        this.bookCards = books;
        this.bodyHeight = (
          Number(this.bodyHeight) +
          (this.bookCategories.length - 1) * 450
        ).toString();
        this.bookCategories.forEach((category) => {
          this.offsetBookNumberMapper[category] = {};
          this.navigationButtonsStatuses[category] = {};
          this.offsetBookNumberMapper[category].offset = 0;
          this.offsetBookNumberMapper[
            category
          ].bookNumber = this.booksByCategory(category).length;
          this.navigationButtonsStatuses[category].previous = true;
          this.navigationButtonsStatuses[category].next =
            this.offsetBookNumberMapper[category].bookNumber <= 8;
        });
      })
    );
  }

  onTrade = (book: BookProfile) => {
    const dialogRef = this.dialog.open(TradeDialogComponent, <any>{
      width: '800px',
      data: {
        message: DIALOG_POPUP_MESSAGES.TRADE_BOOK,
        actionButton: 'Send Trade offer',
        isHomepage: true,
        book,
        loggedInUser: this.loggedInUser,
      },
    });

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
    this.subscription.unsubscribe();
  }
}
