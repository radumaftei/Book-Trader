import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  form: FormGroup;
  hide = true;
  isLoading = false;

  constructor(private authService: AuthService) {}

  get loginButtonDisabled(): boolean {
    return this.form.invalid || this.form.untouched;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  onLogin(): void {
    if (this.form.invalid) return;
    this.authService.loginUser({
      email: this.form.value.email,
      password: this.form.value.password,
      location: null,
    });
    this.isLoading = true;
    this.subscription = this.authService
      .getAuthStatusListener()
      .subscribe((data) => {
        if (!data) {
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
