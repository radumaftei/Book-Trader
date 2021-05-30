import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  hide = true;
  isLoading = false;

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
      password: ['', [Validators.required, Validators.minLength(5)]],
      location: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSignUp(): void {
    if (this.form.invalid) return;
    this.authService.createUser({
      email: this.form.value.email,
      password: this.form.value.password,
      location: this.form.value.location,
    });
    this.isLoading = true;
  }
}
