import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-borrow',
  templateUrl: './edit-borrow.component.html',
})
export class EditBorrowComponent {
  public isLoading = false;
  public form: UntypedFormGroup = this.fb.group({
    borrowID: ['', [Validators.required, Validators.maxLength(256)]],
    borrowDate: [null, [Validators.required, Validators.maxLength(64)]],
    returnDate: [null, [Validators.required, Validators.maxLength(64)]],
    penalty: [null, [Validators.required, Validators.maxLength(64)]],
    copyID: [null, [Validators.required]],
    userID: [null, [Validators.required]],
    borrowStatusID: [null, [Validators.required]],
  });
  constructor(
    public router: Router,
    private librarianService: LibrarianService,
    private fb: UntypedFormBuilder,
    public constsService: ConstsService,
    private toast: HotToastService,
    public route: ActivatedRoute
  ) {}

  public publishersOptions!: IConstOption[];
  public authorsOptions!: IConstOption[];

  ngOnInit() {
    this.getBorrow();
  }

  public getBorrow(): void {
    this.librarianService
      .getBorrow(this.route.snapshot.params['id'])
      .subscribe((val) => {
        console.log(val);
        this.form.patchValue(val);
        console.log(this.form.value);
      });
  }

  public updateBorrow(): void {
    console.log(this.form.value);

    this.librarianService.addBook(this.form.value).subscribe((val) => {
      console.log(val);
      this.toast.success('Successfully added a book');
      this.router.navigate(['/librarian/books']);
    });
  }
}
