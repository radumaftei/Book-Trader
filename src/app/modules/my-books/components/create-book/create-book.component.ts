import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getBookCategoriesArr } from '../../../../constants';
import { MyBooksService } from '../../my-books.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  form: FormGroup;
  bookCategories = getBookCategoriesArr();

  get createBookDisabled() {
    return !this.form.valid;
  }

  constructor(private myBooksService: MyBooksService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      description: new FormControl(null, [
        Validators.required
      ]),
      tradingPreferences: new FormControl(),
      bookCategory: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onCreateBook = () => {
    if (this.createBookDisabled) {
      return;
    }
    this.myBooksService.addBook(
      this.form.controls.title.value,
      this.form.controls.description.value,
      this.form.controls.tradingPreferences.value,
      this.form.controls.bookCategory.value
    );
    this.form.reset();
    this.myBooksService.updateSelectedTab(0);
  }
}
