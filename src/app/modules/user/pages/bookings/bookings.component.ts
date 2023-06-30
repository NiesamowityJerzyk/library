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
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent {
  public borrows!: any[];
  constructor(
    public router: Router,
    private librarianService: LibrarianService,
    private userService: UserService,
    private constsService: ConstsService,
    private authService: AuthService,
    public tokenService: TokenService
  ) {}

  ngOnInit() {
    this.userService
      .getBorrows({
        user: Number(this.tokenService.getUserId()),
        // status: 'reservations',
      })
      .subscribe((val) => {
        this.borrows = val;
      });
  }
}
