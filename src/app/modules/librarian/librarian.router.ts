import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NoAuthGuard } from 'src/app/core/guards/no-auth.guard';
import { LoginComponent } from 'src/app/modules/auth/pages/login/login.component';
import { LibrarianComponent } from './librarian.component';
import { BooksComponent } from './pages/books/books.component';
import { AddBookComponent } from './pages/add-book/add-book.component';

const routes: Routes = [
  {
    path: '',
    component: LibrarianComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'books',
        component: BooksComponent,
        data: { pageName: 'Books' },
      },
      {
        path: 'add-book',
        component: AddBookComponent,
        data: { pageName: 'Add book' },
      },
      { path: '**', redirectTo: '/librarian/books' },
      // { path: '**', redirectTo: '/start' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [NoAuthGuard, AuthGuard],
})
export class LibrarianRouter {}
