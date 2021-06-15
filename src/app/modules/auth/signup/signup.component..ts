import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordValidator } from '../password.validator';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  get signUpButtonDisabled(): boolean {
    return !this.form.valid;
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
      confirmPassword: [
        '',
        [Validators.required, PasswordValidator.matchValues('password')],
      ],
      location: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  onSignUp(): void {
    if (this.form.invalid) return;
    this.authService.createUser({
      email: this.form.value.email,
      password: this.form.value.password,
      location: this.form.value.location,
      phoneNumber: parseInt(this.form.value.phoneNumber),
    });
  }
}
