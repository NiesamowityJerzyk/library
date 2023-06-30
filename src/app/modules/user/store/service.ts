import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheManager } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { IBookCopy, IBorrow, ICopyStatus, ICreateBorrow } from './types';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private apiService: ApiService,
    private store: Store,
    private manager: HttpCacheManager,
    private router: Router,
    private zone: NgZone
  ) {}

  // public getBooks(): Observable<IBook[]> {
  //   return this.apiService.get(`/api/books`);
  // }

  public createBorrow(data?: ICreateBorrow | any): Observable<any> {
    return this.apiService.post(`/api/borrows`, data);
  }

  public getBorrowStatuses(data?: any): Observable<IBorrow[]> {
    return this.apiService.get(`/api/borrowstatuses`, data);
  }

  public getCopyStatuses(data?: any): Observable<ICopyStatus[]> {
    return this.apiService.get(`/api/copystatuses`, data);
  }

  // public getBorrows(data?: any): Observable<IBorrow[]> {
  //   return this.apiService.get(`/api/borrows`, data);
  // }
  public getBorrows(data?: any): Observable<IBorrow[]> {
    return this.apiService.get(`/api/borrows/user=${data.user}`);
  }

  public getBookCopies(data?: any): Observable<IBookCopy[]> {
    return this.apiService.get(`/api/bookcopies`, data);
  }

  public getBookCopiesByBookId(bookId: number): Observable<IBookCopy[]> {
    return this.apiService.get(`/api/bookcopies/?bookid=${bookId}`);
  }

  public updateBookCopy(data?: any): Observable<any> {
    return this.apiService.put(`/api/bookcopies`, data);
  }
}
