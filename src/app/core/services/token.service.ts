import { Injectable } from '@angular/core';

export const ROLE = 'role';
export const TOKEN = 'token';
export const REFRESH_TOKEN = 'refreshToken';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public saveToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }
  public saveRole(role: any): void {
    localStorage.setItem(ROLE, role);
  }
  public saveRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  public getRole(): string | null {
    return localStorage.getItem(ROLE);
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
