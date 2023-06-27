import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NoAuthGuard } from 'src/app/core/guards/no-auth.guard';
import { LoginComponent } from 'src/app/modules/auth/pages/login/login.component';
import { LibrarianComponent } from './librarian.component';
import { BooksComponent } from './pages/books/books.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { PublishersComponent } from './pages/publishers/publishers.component';
import { AddPublisherComponent } from './pages/add-publisher/add-publisher.component';
import { AddAuthorComponent } from './pages/add-author/add-author.component';
import { authorsComponent } from './pages/authors/authors.component';
import { BorrowsComponent } from './pages/borrows/borrows.component';

const routes: Routes = [
  {
    path: '',
    component: LibrarianComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'books',
        component: BooksComponent,
        data: { pageName: 'Books' },
      },
      {
        path: 'publishers',
        component: PublishersComponent,
      },
      {
        path: 'authors',
        component: authorsComponent,
      },
      {
        path: 'borrows',
        component: BorrowsComponent,
      },
      {
        path: 'add-book',
        component: AddBookComponent,
        data: { pageName: 'Add book' },
      },
      {
        path: 'add-author',
        component: AddAuthorComponent,
      },
      {
        path: 'add-publisher',
        component: AddPublisherComponent,
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
