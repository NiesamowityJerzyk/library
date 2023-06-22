import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NoAuthGuard } from 'src/app/core/guards/no-auth.guard';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { LoginComponent } from 'src/app/modules/auth/pages/login/login.component';
import { UserComponent } from './user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BooksComponent } from './pages/books/books.component';
import { BookComponent } from './pages/book/book.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { pageName: 'Dashboard' },
      },
      {
        path: 'books',
        component: BooksComponent,
        data: { pageName: 'Books' },
      },
      {
        path: 'books/:id',
        component: BookComponent,
        data: { pageName: 'Book' },
      },
      { path: '**', redirectTo: '/user/books' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [NoAuthGuard, AuthGuard],
})
export class Userouter {}
