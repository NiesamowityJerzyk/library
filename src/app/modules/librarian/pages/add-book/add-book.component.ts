import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from '../../store/service';
import { IAuthor, IBook, IPublisher } from '../../store/types';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { email } from 'src/app/utils/validators';
import {
  ConstsService,
  IConstOption,
} from 'src/app/core/services/const.service';
import { HotToastService } from '@ngneat/hot-toast';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent {
  public isLoading = false;
  public form: UntypedFormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(256)]],
    releaseYear: [null, [Validators.required, Validators.maxLength(64)]],
    publisher: [null, [Validators.required, Validators.maxLength(64)]],
    numberOfCopies: [null, [Validators.required, Validators.maxLength(64)]],
    author: [null, [Validators.required]],
  });
  constructor(
    public router: Router,
    private librarianService: LibrarianService,
    private fb: UntypedFormBuilder,
    public constsService: ConstsService,
    private toast: HotToastService
  ) {}

  public publishersOptions!: IConstOption[];
  public authorsOptions!: IConstOption[];

  ngOnInit() {
    this.isLoading = true;
    forkJoin([
      this.librarianService.getPublishers(),
      this.librarianService.getAuthors(),
    ])
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(([publishers, authors]) => {
        this.publishersOptions = publishers.map((el: IPublisher) => ({
          title: el.publisherName,
          value: el.publisherID,
        }));
        console.log(this.publishersOptions);

        this.authorsOptions = authors.map((el: IAuthor) => ({
          title: el.firstName + ' ' + el.lastName,
          value: el.authorID,
        }));
        console.log(this.authorsOptions);
      });
  }

  public addBook(): void {
    console.log(this.form.value);

    this.librarianService.addBook(this.form.value).subscribe((val) => {
      console.log(val);
      this.toast.success('Successfully added a book');
      this.router.navigate(['/librarian/books']);
    });
  }
}
