import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  BookProfile,
  DifferentTownConfig,
  SameTownConfig,
} from '../../../../interfaces';
import { UserData } from '../../../auth/auth.model';
import { MatRadioChange } from '@angular/material/radio';

export interface DialogData {
  message: string;
  actionButton: string;
  isHomepage: boolean | null;
  book: BookProfile | null;
  user: UserData;
  userBooks: BookProfile[];
}

@Component({
  templateUrl: './trade-dialog.component.html',
  styleUrls: ['./trade-dialog.component.scss'],
})
export class TradeDialogComponent {
  book: BookProfile;
  userBooks: BookProfile[];
  selectedBook: BookProfile;
  sameTownConfig: SameTownConfig;
  differentTownConfig: DifferentTownConfig;
  selectedConfig: string;

  get preferences(): boolean {
    return (
      !!this.book.tradingPreferenceAuthor ||
      !!this.book.tradingPreferenceGenre ||
      !!this.book.tradingPreferenceBook ||
      !!this.book.tradingPreferenceDescription
    );
  }

  constructor(
    public dialogRef: MatDialogRef<TradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.book = data.book;
    this.userBooks = data.userBooks;
    this.sameTownConfig = data.user.sameTownConfig;
    this.differentTownConfig = data.user.differentTownConfig;
  }
}
