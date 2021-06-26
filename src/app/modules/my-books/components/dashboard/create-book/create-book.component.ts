import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MyBooksService } from '../../../my-books.service';
import { BooksListDatasource } from '../books-list/books-list.datasource';
import { mimeType } from './mime-type.validator';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { getBookCategoriesArr } from '../../../../helpers';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBookComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  @ViewChild('formDirective') formDirective: NgForm;

  form: FormGroup;
  bookCategories = getBookCategoriesArr();
  imagePreview: string;

  addMultipleBooks = false;

  get createBookDisabled(): boolean {
    return !this.form.valid;
  }

  constructor(
    private formBuilder: FormBuilder,
    private myBooksService: MyBooksService,
    private dataSource: BooksListDatasource,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(100), takeUntil(this.unsubscribe))
      .subscribe((formData) => {
        const setChangesBoolean = Object.keys(formData).every(
          (key) => formData[key] === null
        );
        this.myBooksService.setChanges(!setChangesBoolean);
      });
  }

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
    if (!this.addMultipleBooks) {
      this.form.reset();
      this.formDirective.resetForm();
    }
    await this.dataSource.addBook({
      title,
      author,
      tradingPreferenceAuthor,
      tradingPreferenceBook,
      tradingPreferenceGenre,
      tradingPreferenceDescription,
      description,
      category,
      image,
    });
    !this.addMultipleBooks && this.myBooksService.updateSelectedTab(0);
    this.dataSource.setNoData(false);
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
    this.cdr.detectChanges();
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    this.myBooksService.setChanges(false);
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
