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

  public fetchProfile(id: number): Observable<IUser> {
    return this.apiService.get(`/api/user/${id}`).pipe(
      tap((data: IUser) => {
        console.log(data);

        this.store.dispatch(new SetUser(data));
      })
    );
  }

  public login(data: ILogin): Observable<IUser> {
    return this.apiService.post('/api/auth', data).pipe(
      switchMap((data: IResponseUser) => {
        console.log(data);

        this.tokenService.saveToken(data.userToken);
        // this.tokenService.saveRefreshToken(data.refreshToken);
        return this.fetchProfile(data.userId);
      })
    );
  }

  public getUsers(): Observable<IUser> {
    return this.apiService.get(`/api/user`).pipe(
      tap((data: IUser) => {
        console.log(data);

        // this.store.dispatch(new SetUser(data));
      })
    );
  }

  public logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/auth/login']);
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
