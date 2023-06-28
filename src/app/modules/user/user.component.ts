import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UserService } from './store/service';
import { ConstsService } from 'src/app/core/services/const.service';
import { IBorrow, ICopyStatus } from './store/types';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnDestroy {
  public src = 'assets/images/library.jpg';
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
