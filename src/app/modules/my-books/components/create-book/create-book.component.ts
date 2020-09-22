import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getBookCategoriesArr } from '../../../../constants';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit{
  form: FormGroup;
  bookCategories = getBookCategoriesArr();

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      description: new FormControl(null, [
        Validators.required
      ]),
      bookCategory: new FormControl(null, [
        Validators.required
      ])
    });
  }
}
