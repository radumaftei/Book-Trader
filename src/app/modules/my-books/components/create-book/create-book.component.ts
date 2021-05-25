import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getBookCategoriesArr } from '../../../../constants';
import { MyBooksService } from '../../my-books.service';
import { BooksListDatasource } from '../books-list/books-list.datasource';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent implements OnInit {
  form: FormGroup;
  bookCategories = getBookCategoriesArr();
  imagePreview: string;

  get createBookDisabled() {
    return !this.form.valid;
  }

  constructor(
    private myBooksService: MyBooksService,
    private dataSource: BooksListDatasource
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      tradingPreferenceAuthor: new FormControl(null),
      tradingPreferenceBook: new FormControl(null),
      tradingPreferenceGenre: new FormControl(null),
      tradingPreferenceDescription: new FormControl(null),
      description: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  onCreateBook = () => {
    if (this.createBookDisabled) {
      return;
    }
    const {
      title,
      author,
      tradingPreferenceAuthor,
      tradingPreferenceBook,
      tradingPreferenceGenre,
      tradingPreferenceDescription,
      description,
      category,
      image,
    } = this.form.value;
    setInterval(() => {
      this.dataSource.addBook({
        title,
        author,
        tradingPreferenceAuthor,
        tradingPreferenceBook,
        tradingPreferenceGenre,
        tradingPreferenceDescription,
        description,
        category: category,
        image,
      });
    }, 1000);
    // this.form.reset();
    // this.myBooksService.updateSelectedTab(0);
  };

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }
}
