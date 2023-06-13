import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthState } from 'src/app/modules/auth/store/state';
import { IUser } from 'src/app/modules/auth/store/types';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Select(AuthState.user) user$!: Observable<IUser>;
  constructor(private router: Router, private tokenService: TokenService, private store: Store) {}

  public canActivate(): Observable<boolean> {
    const token = this.tokenService.getToken();
    if (token) {
      return this.store.select(AuthState.user).pipe(
        filter<any | null>(Boolean),
        take(1),
        map((user: any | null) => {
          if (user) {
            return true;
          }
          this.router.navigateByUrl('/auth');
          return false;
        }),
      );
    }
    this.router.navigateByUrl('/auth');
    return of(false);
  }
}
