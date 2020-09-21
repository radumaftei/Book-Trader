import { NgModule } from '@angular/core';
import { LoginComponent } from './login/components/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../constants/material.module';

@NgModule({
  declarations: [LoginComponent],
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
