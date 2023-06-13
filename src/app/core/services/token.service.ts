import { Injectable } from '@angular/core';

export const TOKEN = 'token';
export const REFRESH_TOKEN = 'refreshToken';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public saveToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  public saveRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  public removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN);
  }

  
}
