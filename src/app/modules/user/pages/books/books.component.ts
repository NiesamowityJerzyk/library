import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from 'src/app/modules/librarian/store/service';
import { IBook } from 'src/app/modules/librarian/store/types';
import { UserService } from '../../store/service';
import {
  ConstsService,
  IConstOption,
} from 'src/app/core/services/const.service';
import { AuthService } from 'src/app/modules/auth/store/service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  public books!: IBook[];
  constructor(
    public router: Router,
    private librarianService: LibrarianService,
    private userService: UserService,
    private constsService: ConstsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.librarianService.getBooks().subscribe((val) => {
      console.log('books', val);
      this.books = val;
    });

    this.authService.getUsers().subscribe((val) => {
      console.log('users', val);
    });
  }

  public createBorrow(bookId: number): void {
    console.log(bookId);

    this.userService.getBookCopies().subscribe((val) => {
      console.log(val);
      let data = val.filter((el: any) => el.bookId === bookId);
      console.log(data);
    });
    // let data = {
    //   copyID: this.constsService.copyStatusOptions.find(
    //     (el: IConstOption) => el.title === 'Loaned'
    //   )?.value,
    //   borrowStatusID: this.constsService.borrowsOptions.find(
    //     (el: IConstOption) => el.title === 'Reservation'
    //   )?.value,
    //   userId: 4,
    // };
    // console.log(data);
    // this.userService.createBorrow().subscribe((val) => {
    //   console.log(val);
    // });
    //to do
  }
}
