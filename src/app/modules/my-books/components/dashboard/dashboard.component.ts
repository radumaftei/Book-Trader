import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MyBooksService } from '../../my-books.service';
import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DIALOG_POPUP_MESSAGES } from '../../../../constants';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tabs') tabs: MatTabGroup;
  selectedTab$ = this.myBooksService.selectedTab$;

  constructor(
    private myBooksService: MyBooksService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.tabs._handleClick = this.tabChange.bind(this);
  }

  tabChange(tab: MatTab, tabHeader: MatTabHeader, idx: number): void {
    let result = true;
    const changesMade = this.myBooksService.changes;

    if (changesMade) {
      result = confirm(`Do you really want to leave this tab?`);
    }

    return (
      result &&
      MatTabGroup.prototype._handleClick.apply(this.tabs, [tab, tabHeader, idx])
    );
  }

  onChangeTab = (index: number): void => {
    this.myBooksService.updateSelectedTab(index);
  };

  ngOnDestroy(): void {
    this.myBooksService.updateSelectedTab(0);
  }
}
