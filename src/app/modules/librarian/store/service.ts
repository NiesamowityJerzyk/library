import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheManager } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { IBook } from './types';

@Injectable({ providedIn: 'root' })
export class LibrarianService {
  constructor(
    private apiService: ApiService,
    private store: Store,
    private manager: HttpCacheManager,
    private router: Router,
    private zone: NgZone
  ) {}

  public getBooks(): Observable<IBook[]> {
    return this.apiService.get(`/api/books`);
  }

  public addBook(data: any): Observable<any> {
    return this.apiService.post(`/api/books`, data);
  }

  public updateUser(data: any): Observable<any[]> {
    return this.apiService.put(`/api/user`, data);
  }

  public removeUser(id: number): Observable<any> {
    return this.apiService.delete(`/api/user/${id}`);
  }
}
