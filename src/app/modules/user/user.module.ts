import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Userouter } from './user.router';
import { BookComponent } from './pages/book/book.component';

@NgModule({
  declarations: [UserComponent, BookComponent],
  imports: [CommonModule, SharedModule, Userouter],
})
export class UserModule {}
