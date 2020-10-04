import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './modules/auth/login/components/login.component';
import { HomepageComponent } from './modules/homepage/components/homepage.component';
import { DashboardComponent } from './modules/my-books/components/dashboard/dashboard.component';
import { SignUpComponent } from './modules/auth/signup/signup.component.';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },
  {
    path: 'signup',
    component: SignUpComponent,
    children: []
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'personal-book-page',
    component: DashboardComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
