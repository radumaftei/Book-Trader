import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyBooksService } from '../../my-books.service';
import { ICanDeactivateComponent } from '../../unsaved-changes.guard';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { takeUntil } from 'rxjs/operators';
import { DIALOG_POPUP_ACTIONS, DIALOG_POPUP_MESSAGES } from '../../../../enums';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent
  implements ICanDeactivateComponent, OnInit, OnDestroy
{
  private unsubscribe = new Subject<void>();
  selectedTab$ = this.myBooksService.selectedTab$;
  private shouldNavigate = new BehaviorSubject<boolean>(true);

  constructor(
    private myBooksService: MyBooksService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.myBooksService.changes$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((changes) => this.shouldNavigate.next(!changes));
  }

  canDeactivate(): Observable<boolean> {
    if (this.myBooksService.changes) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.data = {
        message: DIALOG_POPUP_MESSAGES.UNSAVED_CHANGES,
        actionButton: DIALOG_POPUP_ACTIONS.LOSE_CHANGES,
        width: '400px',
      };
      const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.shouldNavigate.next(result === DIALOG_POPUP_ACTIONS.LOSE_CHANGES);
      });
    }
    return this.shouldNavigate.asObservable();
  }

  onChangeTab = (index: number): void => {
    this.myBooksService.updateSelectedTab(index);
  };

  ngOnDestroy(): void {
    this.myBooksService.updateSelectedTab(0);
  }
}
