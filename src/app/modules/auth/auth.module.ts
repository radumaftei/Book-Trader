import { NgModule } from '@angular/core';
import { LoginComponent } from './login/components/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { SignUpComponent } from './signup/signup.component.';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: []
})
export class AuthModule {}
