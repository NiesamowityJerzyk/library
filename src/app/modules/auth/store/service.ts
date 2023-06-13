import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheManager } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { StateResetAll } from 'ngxs-reset-plugin';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';
import { SetUser } from 'src/app/modules/auth/store/actions';
import { IAuthToken, IAuthTokens, ILogin, IResponseUser, IUser } from './types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private store: Store,
    private manager: HttpCacheManager,
    private router: Router,
    private zone: NgZone
  ) {}

  public fetchProfile(): Observable<IUser> {
    return this.apiService.get(`/user/me`).pipe(
      tap((data: IUser) => {
        this.store.dispatch(new SetUser(data));
      })
    );
  }

  public logout(): Observable<boolean> {
    const refreshToken = this.tokenService.getRefreshToken();
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    this.manager.clear();
    this.store
      .dispatch(new StateResetAll())
      .subscribe(() => this.zone.run(() => this.router.navigateByUrl('/auth')));
    return this.apiService.post('/auth/logout', { refreshToken });
  }

  public login(data: ILogin): Observable<IUser> {
    return this.apiService.post('/auth/login', data).pipe(
      switchMap((data: IResponseUser) => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveRefreshToken(data.refreshToken);
        // this.store.dispatch(new SetUser(data.user));
        // return of(data);
        return this.fetchProfile();
      })
    );
  }

  public refreshToken(refreshToken: string): Observable<IAuthTokens> {
    return this.apiService.post(`/auth/refresh-token`, { refreshToken }).pipe(
      switchMap((data: IAuthTokens) => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveRefreshToken(data.refreshToken);
        return of(data);
      })
    );
  }
}
