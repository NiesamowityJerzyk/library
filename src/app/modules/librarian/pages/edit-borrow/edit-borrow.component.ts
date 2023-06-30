import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrarianService } from '../../store/service';
import { IAuthor, IBook, IBorrow, IPublisher } from '../../store/types';
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
import { UserService } from 'src/app/modules/user/store/service';
import { getBorrowStatusInPolish } from 'src/app/utils/utils';

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
    public route: ActivatedRoute,
    private userService: UserService
  ) {}

  public borrowsOptions!: IConstOption[];
  public publishersOptions!: IConstOption[];
  public authorsOptions!: IConstOption[];

  ngOnInit() {
    this.getBorrow();
    this.getBorrowStatuses();
  }

  // public getBorrowStatusInPolish(status: string): string {
  //   if (status === 'On borrow') {
  //     return 'Wypożyczona';
  //   }
  //   if (status === 'Returned') {
  //     return 'Zwrócona';
  //   }
  //   if (status === 'On borrow') {
  //     return 'Przetrzymana';
  //   }
  //   if (status === 'On borrow') {
  //     return 'Zarezerwowana';
  //   }
  //   return '';
  // }

  private getBorrowStatuses(): void {
    this.userService.getBorrowStatuses().subscribe((val) => {
      this.borrowsOptions = val.map((el: any) => ({
        title: getBorrowStatusInPolish(el.borrowStatusName),
        value: el.borrowStatusID,
      }));
    });
  }

  public getBorrow(): void {
    this.librarianService
      .getBorrow(this.route.snapshot.params['id'])
      .subscribe((val) => {
        this.form.patchValue(val);
      });
  }

  public updateBorrow(): void {
    let form = this.form.value;
    let borrowDate = form.borrowDate;
    let returnDate = form.returnDate;
    if (borrowDate instanceof Date) {
      const offset = borrowDate.getTimezoneOffset();
      borrowDate = new Date(borrowDate.getTime() - offset * 60 * 1000);
      form.borrowDate = borrowDate.toISOString().split('T')[0];
    }
    if (returnDate instanceof Date) {
      const offset = returnDate.getTimezoneOffset();
      returnDate = new Date(returnDate.getTime() - offset * 60 * 1000);
      form.returnDate = returnDate.toISOString().split('T')[0];
    }

    this.librarianService.updateBorrow(form).subscribe((val) => {
      this.toast.success('Zapisano wypożyczenie');
      this.router.navigate(['/librarian/borrows']);
    });
  }
}
