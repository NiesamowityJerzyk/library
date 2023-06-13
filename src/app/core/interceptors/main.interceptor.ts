import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from 'src/app/modules/auth/store/service';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  private headers: { [name: string]: string | string[] } = {};
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  constructor(private tokenService: TokenService, private authService: AuthService, private toast: HotToastService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.headers = request.url.includes(environment.apiUrl) ? this.addHeaders() : {};
  
    return next.handle(request.clone({ setHeaders: this.headers })).pipe(
      catchError((err: any) => {
        if (err.status === 401 && this.tokenService.getToken()) {
          return this.handleRefreshToken(err, request, next);
        } else if (err.status >= 400 && err.status < 500) {
          this.toast.warning(Array.isArray(err.error.message) ? err.error.message[0] : err.error.message);
        } else {
          this.toast.error('Błąd serwera');
        }
        return throwError(err);
      }),
    );
  }

  private addHeaders(): { [name: string]: string | string[] } {
    const token = this.tokenService.getToken();
    const headers: { [name: string]: string | string[] } = {};
    token ? (headers['Authorization'] = 'Bearer ' + token) : delete headers['Authorization'];
    return headers;
  }

  private handleRefreshToken(err: any, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      this.authService.logout();
      // message about logging out
      return throwError(err);
    } else if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken(refreshToken).pipe(
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(true);
          this.headers = request.url.includes(environment.apiUrl) ? this.addHeaders() : {};
          return next.handle(request.clone({ setHeaders: this.headers }));
        }),
        catchError(() => {
          this.authService.logout();
          this.isRefreshing = false;
          this.refreshTokenSubject.next(false);
          // message about logging out
          return throwError(err);
        }),
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((data) => data != null),
        take(1),
        switchMap((data) => {
          if (data) {
            this.headers = request.url.includes(environment.apiUrl) ? this.addHeaders() : {};
            return next.handle(request.clone({ setHeaders: this.headers }));
          } else {
            return throwError(err);
          }
        }),
      );
    }
  }
}
