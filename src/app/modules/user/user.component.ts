import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnDestroy {
  public src = 'assets/images/library.jpg';
  private subscription$: Subscription = new Subscription();

  constructor(private router: Router) {}

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
