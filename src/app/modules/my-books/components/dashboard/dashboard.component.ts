import { Component, OnDestroy } from '@angular/core';
import { MyBooksService } from '../../my-books.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  selectedTab$ = this.myBooksService.selectedTab$;

  constructor(private myBooksService: MyBooksService) {}

  onChangeTab = (index) => {
    this.myBooksService.updateSelectedTab(index);
  };

  ngOnDestroy(): void {
    this.myBooksService.updateSelectedTab(0);
  }
}
