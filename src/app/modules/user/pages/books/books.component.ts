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
import { IBookCopy, IBorrow } from '../../store/types';
import { HotToastService } from '@ngneat/hot-toast';
import { TokenService } from 'src/app/core/services/token.service';

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
    private toast: HotToastService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.librarianService.getBooks().subscribe((val) => {
      this.books = val;
    });
  }

  public createBorrow(bookId: number): void {
    this.userService
      .getBorrows({
        user: this.tokenService.getUserId(),
        status: 'reservations',
      })
      .subscribe((val) => {
        let isBooked = val.find((el: any) => el.bookID === bookId);
        if (!isBooked) {
          this.userService.getBookCopiesByBookId(bookId).subscribe((val) => {
            let availableCopies = val.filter(
              (el: IBookCopy) => el.copyStatusName === 'Available'
            );

            // sprawdzic czy jest conajmniej jedna dostepna kopia
            if (availableCopies.length) {
              let data = {
                copyID: availableCopies[0].copyID,
                borrowStatusID: this.constsService.borrowsOptions.find(
                  (el: IConstOption) => el.title === 'Reservation'
                )?.value,
                userID: this.tokenService.getUserId(),
              };
              this.userService.createBorrow(data).subscribe((val) => {
                let statusLoanedId = this.constsService.copyStatusOptions.find(
                  (el: IConstOption) => el.title === 'Loaned'
                )?.value;

                this.userService
                  .updateBookCopy({
                    copyID: data.copyID,
                    copyStatusId: statusLoanedId,
                    bookId,
                  })
                  .subscribe();
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
