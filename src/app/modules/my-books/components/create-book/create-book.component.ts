import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getBookCategoriesArr } from '../../../../constants';
import { MyBooksService } from '../../my-books.service';
import { BooksListDatasource } from '../books-list/books-list.datasource';
import { mimeType } from './mime-type.validator';
import { DifferentTownConfig, SameTownConfig } from '../../../../interfaces';
import { CommonService } from '../../../../shared/common.service';
import { takeUntil } from 'rxjs/operators';
import { UserData } from '../../../auth/auth.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBookComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  form: FormGroup;
  bookCategories = getBookCategoriesArr();
  imagePreview: string;
  sameTownConfig: SameTownConfig = {
    onFoot: true,
    courier: true,
  };

  differentTownConfig: DifferentTownConfig = {
    courier: true,
  };
  sameTownAllChecked = true;
  differentTownAllChecked = true;

  addMultipleBooks = false;
  resetForm = false;

  get createBookDisabled(): boolean {
    return !this.form.valid || this.deliveryMethodsEmpty;
  }

  get deliveryMethodsEmpty(): boolean {
    return (
      Object.keys(this.sameTownConfig).every(
        (t: string) => !this.sameTownConfig[t]
      ) &&
      Object.keys(this.differentTownConfig).every(
        (t: string) => !this.differentTownConfig[t]
      )
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private myBooksService: MyBooksService,
    private dataSource: BooksListDatasource,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService
      .getUser(localStorage.getItem('loggedInUserEmail'), false)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user: UserData) => {
        this.sameTownConfig = user.sameTownConfig;
        this.differentTownConfig = user.differentTownConfig;
        this.sameTownAllChecked = Object.keys(this.sameTownConfig).every(
          (t: string) => this.sameTownConfig[t]
        );
        this.differentTownAllChecked = Object.keys(
          this.differentTownConfig
        ).every((t: string) => this.differentTownConfig[t]);
      });
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

  updateAllCompleted(town: string, allSelected: string): void {
    this[allSelected] = Object.keys(this[town]).every(
      (t: string) => this[town][t]
    );
  }

  someCompletedSameTown(): boolean {
    return (
      Object.keys(this.sameTownConfig).filter((t) => this.sameTownConfig[t])
        .length > 0 && !this.sameTownAllChecked
    );
  }

  setAllForSeparateTowns(
    town: string,
    allSelected: string,
    completed: boolean
  ): void {
    this[allSelected] = completed;
    Object.keys(this[town]).forEach((t) => (this[town][t] = completed));
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
    if (!this.addMultipleBooks) {
      this.myBooksService.updateSelectedTab(0);
    } else {
      this.resetForm && this.form.reset();
    }
  }

  changeSettings(): void {
    this.myBooksService.changeDeliverySettings(
      this.sameTownConfig,
      this.differentTownConfig
    );
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

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
