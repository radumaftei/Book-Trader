import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  BookProfile,
  DifferentTownConfig,
  SameTownConfig,
} from '../../interfaces';
import { UserData } from '../../modules/auth/auth.model';

export interface DialogData {
  title: string;
  actionButton?: string;
  description?: string;
  isHomepage?: boolean;
  book?: BookProfile;
  user: UserData;
  userBooks: BookProfile[];
}

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  isHomepage: boolean | null;
  description: string;
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

  get tradeButtonDisabled(): boolean {
    return !this.isHomepage
      ? false
      : !(this.userBooks?.length && this.selectedConfig && this.selectedBook);
  }

  get dataOnClose(): string {
    return this.isHomepage ? this.selectedConfig : this.data.actionButton;
  }

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.description = data.description;
    this.isHomepage = data.isHomepage;
    this.book = data.book;
    this.userBooks = data.userBooks;
    this.sameTownConfig = data.user?.sameTownConfig;
    this.differentTownConfig = data.user?.differentTownConfig;
  }
}
