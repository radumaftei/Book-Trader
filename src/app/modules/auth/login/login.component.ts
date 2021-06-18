import { noop, Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PasswordValidator } from '../password.validator';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  form: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  get loginButtonDisabled(): boolean {
    return this.form.invalid || this.form.untouched;
  }

  ngOnInit(): void {
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
    });
  }

  onLogin(): void {
    if (this.form.invalid) return;
    const emailPass = btoa(
      `${this.form.value.email}:${this.form.value.password}`
    );
    this.authService.loginUser({
      emailPass,
    });
    this.subscription = this.authService
      .getAuthStatusListener()
      .subscribe(noop);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
