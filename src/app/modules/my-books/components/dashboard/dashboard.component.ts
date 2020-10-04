import { Component, OnInit } from '@angular/core';
import { MyBooksService } from '../../my-books.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedTabIndex;

  constructor(private myBooksService: MyBooksService) { }

  ngOnInit(): void {
    this.myBooksService.getBooks();
    this.myBooksService.selectedTab$.subscribe(index => {
      this.selectedTabIndex = index;
    })
  }

  onChangeTab = index => {
    this.myBooksService.updateSelectedTab(index);
  }
}
