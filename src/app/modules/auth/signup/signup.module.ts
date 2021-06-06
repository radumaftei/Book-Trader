import { NgModule } from '@angular/core';
import { SignupRoutingModule } from './signup-routing.module';
import { SignUpComponent } from './signup.component.';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
  MatProgressSpinnerModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ...MATERIAL_MODULES,
    ReactiveFormsModule,
  ],
})
export class SignupModule {}
