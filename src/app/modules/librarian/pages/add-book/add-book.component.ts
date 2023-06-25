import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from '../../store/service';
import { IBook } from '../../store/types';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { email } from 'src/app/utils/validators';
import { ConstsService } from 'src/app/core/services/const.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent {
  public form: UntypedFormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(256)]],
    releaseYear: [null, [Validators.required, Validators.maxLength(64)]],
    publisher: [1, [Validators.required, Validators.maxLength(64)]],
    numberOfCopies: [null, [Validators.required, Validators.maxLength(64)]],
    author: [2, [Validators.required]],
  });
  constructor(
    public router: Router,
    private librarianService: LibrarianService,
    private fb: UntypedFormBuilder,
    public constsService: ConstsService,
    private toast: HotToastService
  ) {}

  ngOnInit() {}

  public addBook(): void {
    console.log(this.form.value);

    this.librarianService.addBook(this.form.value).subscribe((val) => {
      console.log(val);
      this.toast.success('Successfully added a book');
      this.router.navigate(['/librarian/books']);
    });
  }
}
