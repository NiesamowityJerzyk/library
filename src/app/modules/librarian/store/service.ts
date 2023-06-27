import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheManager } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { IAuthor, IBook, IPublisher } from './types';

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
  public addPublisher(data: any): Observable<any> {
    return this.apiService.post(`/api/publishers`, data);
  }

  public getPublishers(): Observable<IPublisher[]> {
    return this.apiService.get(`/api/publishers `);
  }

  public getAuthors(): Observable<IAuthor[]> {
    return this.apiService.get(`/api/authors`);
  }

  public addAuthor(data: any): Observable<any> {
    return this.apiService.post(`/api/authors`, data);
  }

  public getBorrows(): Observable<any[]> {
    return this.apiService.get(`/api/borrows`);
  }
}
