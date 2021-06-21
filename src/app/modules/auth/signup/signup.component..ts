import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordValidator } from '../password.validator';
import { CommonService } from '../../../shared/common.service';
import { Observable, Subject } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnDestroy {
  form: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  unsubscribe = new Subject<void>();

  locations: string[] = [];
  selectedLocations: string[] = [];

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  cdkVirtualScrollViewPort: CdkVirtualScrollViewport;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  get signUpButtonDisabled(): boolean {
    return !this.form.valid;
  }

  ngOnInit(): void {
    this.commonService
      .fetchLocations()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((locations: string[]) => {
        this.locations = locations;
      });
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          PasswordValidator.strong,
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, PasswordValidator.matchValues('password')],
      ],
      location: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^(\\+407|07)\\d{2}[.]?\\d{3}[.]?\\d{3}$'),
        ],
      ],
    });
  }

  openChange(event: boolean): void {
    if (event) {
      this.cdkVirtualScrollViewPort.scrollToIndex(0);
      this.cdkVirtualScrollViewPort.checkViewportSize();
    }
  }

  onKey(event: KeyboardEvent): void {
    const value = (<HTMLInputElement>event.target).value;
    this.selectedLocations = this.search(value);
  }

  search(value: string): string[] {
    const filter = value.toLowerCase();
    return this.locations.filter((option) =>
      option.toLowerCase().startsWith(filter)
    );
  }

  onSignUp(): void {
    if (this.form.invalid) return;
    this.authService.createUser({
      emailPass: btoa(`${this.form.value.email}:${this.form.value.password}`),
      location: this.form.value.location,
      phoneNumber: parseInt(this.form.value.phoneNumber),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
