import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/store/state';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from '../auth/store/service';
import { UserService } from '../user/store/service';
import { ConstsService } from 'src/app/core/services/const.service';
import { IBorrow, ICopyStatus } from '../user/store/types';

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.scss'],
})
export class LibrarianComponent implements OnDestroy {
  private subscription$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private userService: UserService,
    private constsService: ConstsService
  ) {}

  ngOnInit(): void {
    this.getBorrowStatuses();
    this.getCopyStatuses();
  }

  private getBorrowStatuses(): void {
    this.userService.getBorrowStatuses().subscribe((val) => {
      this.constsService.borrowsOptions = val.map((el: IBorrow) => ({
        title: el.borrowStatusName,
        value: el.borrowStatusID,
      }));
    });
  }

  private getCopyStatuses(): void {
    this.userService.getCopyStatuses().subscribe((val) => {
      this.constsService.copyStatusOptions = val.map((el: ICopyStatus) => ({
        title: el.copyStatusName,
        value: el.copyStatusID,
      }));
    });
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
