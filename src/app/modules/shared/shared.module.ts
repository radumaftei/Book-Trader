import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from './components/header.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '../auth/auth.module';
import { AppRoutingModule } from '../../app.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

const MODULES = [
  CommonModule,
  BrowserModule,
  AuthModule,
  MaterialModule,
  AppRoutingModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  HttpClientModule
];

@NgModule({
  imports: [...MODULES],
  declarations: [HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [...MODULES]
})
export class SharedModule {}
