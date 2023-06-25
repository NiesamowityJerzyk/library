import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './pages/books/books.component';
import { LibrarianRouter } from './librarian.router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibrarianComponent } from './librarian.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { PublishersComponent } from './pages/publishers/publishers.component';

@NgModule({
  declarations: [
    LibrarianComponent,
    BooksComponent,
    AddBookComponent,
    PublishersComponent,
  ],
  imports: [CommonModule, SharedModule, LibrarianRouter],
})
export class LibrarianModule {}
