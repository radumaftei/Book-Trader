import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  hide = true;
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {}

  get signUpButtonDisabled() {
    return !this.form.valid;
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      location: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  onSignUp() {
    if (this.form.invalid) return;
    this.authService.createUser({
      email: this.form.value.email,
      password: this.form.value.password,
      location: this.form.value.location,
    });
    this.isLoading = true;
  }
}
