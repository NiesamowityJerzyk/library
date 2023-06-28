import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Userouter } from './user.router';
import { BookComponent } from './pages/book/book.component';
import { BooksComponent } from './pages/books/books.component';
import { BookingsComponent } from './pages/bookings/bookings.component';

@NgModule({
  declarations: [
    UserComponent,
    BookComponent,
    BooksComponent,
    BookingsComponent,
  ],
  imports: [CommonModule, SharedModule, Userouter],
})
export class UserModule {}
