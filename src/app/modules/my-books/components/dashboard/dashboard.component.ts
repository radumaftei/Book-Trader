import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyBooksService } from '../../my-books.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  selectedTab$ = this.myBooksService.selectedTab$;

  constructor(private myBooksService: MyBooksService) {}

  ngOnInit(): void {
    this.myBooksService.getBooks();
  }

  onChangeTab = (index) => {
    this.myBooksService.updateSelectedTab(index);
  };

  ngOnDestroy(): void {
    this.myBooksService.updateSelectedTab(0);
    this.subscription.unsubscribe();
  }
}
