import { Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onLogin(): void {
    if (this.form.invalid) return;
    this.authService.loginUser({
      email: this.form.value.email,
      password: this.form.value.password,
      location: null,
    });
    this.subscription = this.authService
      .getAuthStatusListener()
      .subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
