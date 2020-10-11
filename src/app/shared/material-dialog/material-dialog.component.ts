import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookProfile } from '../../interfaces';
import { AuthData } from '../../modules/auth/auth.model';

export interface DialogData {
  message: string;
  actionButton: string;
  isHomepage: boolean | null;
  book: BookProfile | null;
  user: AuthData | null;
}

@Component({
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialDialogComponent {
  book: BookProfile;
  userInfo: AuthData;

  constructor(
    public dialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.book = data.book;
    this.userInfo = data.user;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

