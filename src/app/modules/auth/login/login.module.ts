import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

const MATERIAL_MODULES = [
  MatProgressSpinnerModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ...MATERIAL_MODULES,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
