import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookProfile } from '../../../../interfaces';
import { LoginSignUpUser } from '../../../auth/auth.model';

export interface DialogData {
  message: string;
  actionButton: string;
  isHomepage: boolean | null;
  book: BookProfile | null;
  loggedInUser: LoginSignUpUser;
}

@Component({
  templateUrl: './trade-dialog.component.html',
  styleUrls: ['./trade-dialog.component.scss'],
})
export class TradeDialogComponent {
  book: BookProfile;
  loggedInUser;
  deliveryMethod: 'courier' | 'foot';

  constructor(
    public dialogRef: MatDialogRef<TradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.book = data.book;
    this.loggedInUser = data.loggedInUser;
  }
}
