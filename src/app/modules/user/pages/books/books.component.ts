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
import { IBorrow } from '../../store/types';
import { HotToastService } from '@ngneat/hot-toast';

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
    private authService: AuthService,
    private toast: HotToastService
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

    // this.userService.getBookCopies().subscribe((val) => {
    //   console.log(val);
    //   let data = val.filter((el: any) => el.bookId === bookId);
    //   console.log(data);
    // });

    this.userService
      .getBorrows({ user: 4, status: 'reservations' })
      .subscribe((val) => {
        console.log('borrows rezerwacje: ', val);

        let isBooked = val.find((el: any) => el.bookID === bookId);
        if (!isBooked) {
          this.userService.getBookCopiesByBookId(bookId).subscribe((val) => {
            console.log(val);
            //sprawdzic czy jest conajmniej jedna dostepna kopia
            if (val.length) {
              let data = {
                copyID: val[0].copyID,
                borrowStatusID: this.constsService.borrowsOptions.find(
                  (el: IConstOption) => el.title === 'Reservation'
                )?.value,
                userID: 4,
              };
              this.userService.createBorrow(data).subscribe((val) => {
                console.log(val);
                this.toast.success('Rezerwacja utworzona');
              });
            } else {
              this.toast.warning(
                'Ta książka nie ma egzemplarzy. Rezerwacja niedostępna'
              );
            }
          });
        } else {
          this.toast.warning('Masz już rezerwację na tą książkę');
        }
      });

    //to do
  }
}
