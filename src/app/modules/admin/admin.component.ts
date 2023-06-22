import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnDestroy {
  private subscription$: Subscription = new Subscription();

  constructor(private router: Router) {}

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
