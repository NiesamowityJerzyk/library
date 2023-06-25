import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/store/state';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from '../auth/store/service';

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.scss'],
})
export class LibrarianComponent implements OnDestroy {
  private subscription$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private store: Store,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
