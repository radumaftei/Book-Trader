import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './modules/auth/login/components/login.component';
import { DashboardComponent } from './modules/my-books/components/dashboard/dashboard.component';
import { SignUpComponent } from './modules/auth/signup/signup.component.';
import { AuthGuard } from './modules/auth/auth.guard';
import { HomepageComponent } from './modules/homepage/components/homepage/homepage.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [],
    data: {
      animation: 'Login',
    },
  },
  {
    path: 'signup',
    component: SignUpComponent,
    children: [],
    data: {
      animation: 'Signup',
    },
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [AuthGuard],
    data: {
      animation: 'Homepage',
    },
  },
  {
    path: 'personal-book-page',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      animation: 'PersonalBookPage',
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
