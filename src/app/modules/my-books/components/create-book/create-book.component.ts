import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getBookCategoriesArr } from '../../../../constants';
import { MyBooksService } from '../../my-books.service';
import { BooksListDatasource } from '../books-list/books-list.datasource';
import { mimeType } from './mime-type.validator';
import { DestinationType } from '../../../../interfaces';

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
  destinationType: DestinationType = '0';
  addMultipleBooks = false;
  resetForm = false;

  get createBookDisabled(): boolean {
    return !this.form.valid;
  }

  constructor(
    private formBuilder: FormBuilder,
    private myBooksService: MyBooksService,
    private dataSource: BooksListDatasource,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      tradingPreferenceAuthor: [''],
      tradingPreferenceBook: [''],
      tradingPreferenceGenre: [''],
      tradingPreferenceDescription: [''],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      courier: [false],
      onFoot: [false],
      image: [
        null,
        {
          validators: [Validators.required],
          asyncValidators: [mimeType],
        },
      ],
    });
  }

  async onCreateBook(): Promise<void> {
    if (this.createBookDisabled) {
      return;
    }
    if (!this.form.get('courier').value && !this.form.get('onFoot').value) {
      this.form.patchValue({
        courier: true,
        onFoot: true,
      });
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
      courier,
      onFoot,
      image,
    } = this.form.value;
    // setInterval(() => {
    await this.dataSource.addBook({
      title,
      author,
      tradingPreferenceAuthor,
      tradingPreferenceBook,
      tradingPreferenceGenre,
      tradingPreferenceDescription,
      description,
      category,
      destinationType: this.destinationType,
      courier,
      onFoot,
      image,
    });
    // }, 1000);
    if (!this.addMultipleBooks) {
      this.myBooksService.updateSelectedTab(0);
    } else {
      this.resetForm && this.form.reset();
    }
  }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }
}
