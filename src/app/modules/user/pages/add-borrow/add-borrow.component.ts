import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
import { UserService } from '../../store/service';

@Component({
  selector: 'app-add-borrow',
  templateUrl: './add-borrow.component.html',
  styleUrls: ['./add-borrow.component.scss'],
})
export class AddBorrowComponent {
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
    private userService: UserService,
    private fb: UntypedFormBuilder,
    public constsService: ConstsService,
    private toast: HotToastService
  ) {}

  public publishersOptions!: IConstOption[];
  public authorsOptions!: IConstOption[];

  ngOnInit() {}

  public createBorrow(): void {
    this.userService.createBorrow().subscribe();
  }
}
