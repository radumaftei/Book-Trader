import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyBooksService } from '../../my-books.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  selectedTabIndex;
  private subscription = new Subscription();

  constructor(private myBooksService: MyBooksService) { }

  ngOnInit(): void {
    this.myBooksService.getBooks();
    this.subscription.add(this.myBooksService.selectedTab$.subscribe(index => {
      this.selectedTabIndex = index;
    }));
  }

  onChangeTab = index => {
    this.myBooksService.updateSelectedTab(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
