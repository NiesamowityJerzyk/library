import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NoAuthGuard } from 'src/app/core/guards/no-auth.guard';
import { LoginComponent } from 'src/app/modules/auth/pages/login/login.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { BooksComponent } from '../user/pages/books/books.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent },
      {
        path: 'books',
        component: BooksComponent,
        data: { pageName: 'Books' },
      },
      { path: '**', redirectTo: '/admin/users' },
      // { path: '**', redirectTo: '/start' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [NoAuthGuard, AuthGuard],
})
export class AdminRouter {}
