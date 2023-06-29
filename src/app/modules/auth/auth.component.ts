import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  public src = 'assets/images/books1.jpg';
  private subscription$: Subscription = new Subscription();

  constructor(private router: Router) {}

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
