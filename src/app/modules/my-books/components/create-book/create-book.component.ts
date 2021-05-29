import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getBookCategoriesArr } from '../../../../constants';
import { MyBooksService } from '../../my-books.service';
import { BooksListDatasource } from '../books-list/books-list.datasource';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBookComponent implements OnInit {
  form: FormGroup;
  bookCategories = getBookCategoriesArr();
  imagePreview: string;

  get createBookDisabled(): boolean {
    return !this.form.valid;
  }

  constructor(
    private formBuilder: FormBuilder,
    private myBooksService: MyBooksService,
    private dataSource: BooksListDatasource
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      tradingPreferenceAuthor: [null],
      tradingPreferenceBook: [null],
      tradingPreferenceGenre: [null],
      tradingPreferenceDescription: [null],
      description: [null, [Validators.required]],
      category: [null, [Validators.required]],
      image: [
        null,
        {
          validators: [Validators.required],
          asyncValidators: [mimeType],
        },
      ],
    });
  }

  onCreateBook = (): void => {
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
    // setInterval(() => {
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
    // }, 1000);
    this.form.reset();
    this.myBooksService.updateSelectedTab(0);
  };

  onImagePicked(event: Event): void {
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
