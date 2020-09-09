import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './modules/auth/login/components/login.component';
import { HomepageComponent } from './modules/homepage/components/homepage.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'homepage',
    component: HomepageComponent
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
