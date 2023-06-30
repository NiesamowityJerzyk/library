import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from '../../store/service';
import { IBook } from '../../store/types';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  public books!: IBook[];
  public isLoading = false;
  constructor(
    public router: Router,
    private librarianService: LibrarianService,
    private fb: UntypedFormBuilder
  ) {}
  private subscription$: Subscription = new Subscription();
  public formSearch: UntypedFormGroup = this.fb.group({
    search: '',
  });

  ngOnInit() {
    this.getBooks();
    this.subscription$.add(
      this.formSearch
        .get('search')
        ?.valueChanges.pipe(distinctUntilChanged(), debounceTime(300))
        .subscribe((val) => {
          this.getBooks(val);
        })
    );
  }

  private getBooks(bookName?: string): void {
    this.isLoading = true;
    this.librarianService.getBooks(bookName).subscribe((val) => {
      this.books = val;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
