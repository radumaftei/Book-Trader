import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getBookCategoriesArr } from '../../../../constants';
import { MyBooksService } from '../../my-books.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  form: FormGroup;
  bookCategories = getBookCategoriesArr();
  imagePreview: string;

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
      tradingPreferences: new FormControl(null),
      bookCategory: new FormControl(null, [
        Validators.required
      ]),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  onCreateBook = () => {
    if (this.createBookDisabled) {
      return;
    }
    this.myBooksService.addBook({
      'title': this.form.value.title,
      'description': this.form.value.description,
      'tradingPreferences': this.form.value.tradingPreferences,
      'category': this.form.value.bookCategory,
      'image': this.form.value.image
    });
    this.form.reset();
    this.myBooksService.updateSelectedTab(0);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    }
    reader.readAsDataURL(file);
  }
}
