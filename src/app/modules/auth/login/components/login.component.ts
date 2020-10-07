import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  isLoading = false;

  constructor(private authService: AuthService) {}

  get loginButtonDisabled() {
    return !this.form.valid;
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(5)]
      )
    });
  }

  onLogin() {
    if (this.form.invalid) return;
    this.authService.loginUser({
      email: this.form.value.email,
      password: this.form.value.password
    })
    this.isLoading = true;
  }
}
