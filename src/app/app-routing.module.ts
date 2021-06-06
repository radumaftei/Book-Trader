import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { UnsavedChangesGuard } from './modules/my-books/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/login/login.module').then((m) => m.LoginModule),
    data: {
      animation: 'Login',
    },
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./modules/auth/signup/signup.module').then((m) => m.SignupModule),
    data: {
      animation: 'Signup',
    },
  },
  {
    path: 'homepage',
    loadChildren: () =>
      import('./modules/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
    canActivate: [AuthGuard],
    data: {
      animation: 'Homepage',
    },
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
    data: {
      animation: 'Profile',
    },
  },
  {
    path: 'personal-book-page',
    loadChildren: () =>
      import('./modules/my-books/components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
    canDeactivate: [UnsavedChangesGuard],
    data: {
      animation: 'PersonalBookPage',
    },
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
