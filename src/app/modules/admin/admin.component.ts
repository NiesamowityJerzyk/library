import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AdminService } from './store/service';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/store/state';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from '../auth/store/service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnDestroy {
  private subscription$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private store: Store,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  public user$ = this.store.select(AuthState.user);

  ngOnInit() {
    this.user$.subscribe((val) => {
      console.log(val);
    });
    // this.authService
    //   .getCurrentUser(this.tokenService.getToken() as any)
    //   .subscribe((val) => {
    //     console.log(val);
    //   });
  }
  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
