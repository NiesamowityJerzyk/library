import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from '../../store/service';
import { IAuthor, IBook, IPublisher } from '../../store/types';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  ConstsService,
  IConstOption,
} from 'src/app/core/services/const.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription, finalize, forkJoin } from 'rxjs';
import { UserService } from 'src/app/modules/user/store/service';
import { IBookCopy } from 'src/app/modules/user/store/types';
import { AdminService } from 'src/app/modules/admin/store/service';
import { IUser } from 'src/app/modules/auth/store/types';

@Component({
  selector: 'app-add-borrow',
  templateUrl: './add-borrow.component.html',
  styleUrls: ['./add-borrow.component.scss'],
})
export class AddBorrowComponent {
  public isLoading = false;
  public form: UntypedFormGroup = this.fb.group({
    copyID: [null, [Validators.required, Validators.maxLength(256)]],
    userID: [null, [Validators.required, Validators.maxLength(64)]],
    borrowStatusID: [null, [Validators.required, Validators.maxLength(64)]],
  });

  public formBook: UntypedFormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(256)]],
  });
  constructor(
    public router: Router,
    private librarianService: LibrarianService,
    private fb: UntypedFormBuilder,
    public constsService: ConstsService,
    private toast: HotToastService,
    private userService: UserService,
    private adminService: AdminService
  ) {}

  public userOptions!: IConstOption[];
  public booksOptions!: IConstOption[];
  private subscription$: Subscription = new Subscription();
  ngOnInit() {
    this.getUsers();
    this.librarianService.getBooks().subscribe((val) => {
      this.booksOptions = val.map((el: any) => ({
        title: el.title,
        value: el.bookID,
      }));
    });

    this.subscription$.add(
      this.formBook.get('title')?.valueChanges.subscribe((bookId: number) => {
        this.userService.getBookCopiesByBookId(bookId).subscribe((val) => {
          let bookCopyOptions = val
            .filter((el: IBookCopy) => el.copyStatusName === 'Available')
            .map((el: IBookCopy) => ({
              title: el.title,
              value: el.copyID,
            }));

          console.log(bookCopyOptions);

          if (bookCopyOptions[0]?.value) {
            this.form.get('copyID')?.patchValue(bookCopyOptions[0].value);
          } else {
            this.form.get('copyID')?.patchValue(null);
          }
        });
      })
    );
  }

  private getUsers(): void {
    this.adminService.getUsers().subscribe((val) => {
      console.log(val);

      this.userOptions = val
        .filter((el: any) => el.roleName === 'Reader')
        .map((el: IUser) => ({
          title: el.firstName + ' ' + el.lastName,
          value: el.userID,
        }));
    });
  }

  public addBorrow(): void {
    this.librarianService.addBorrow(this.form.value).subscribe((val) => {
      let statusLoanedId = this.constsService.copyStatusOptions.find(
        (el: IConstOption) => el.title === 'Loaned'
      )?.value;
      this.userService
        .updateBookCopy({
          copyID: this.form.value.copyID,
          copyStatusId: statusLoanedId,
          bookId: this.formBook.value.title,
        })
        .subscribe();

      this.toast.success('Successfully added a borrow');
      this.router.navigate(['/librarian/borrows']);
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
