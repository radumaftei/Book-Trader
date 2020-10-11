import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookProfile } from '../../interfaces';
import { AuthData } from '../../modules/auth/auth.model';

export interface DialogData {
  message: string;
  actionButton: string;
  isHomepage: boolean | null;
  book: BookProfile | null;
}

@Component({
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss']
})
export class MaterialDialogComponent {
  book: BookProfile;
  deliveryMethod: 'courier' | 'foot';

  constructor(
    public dialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.book = data.book;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

