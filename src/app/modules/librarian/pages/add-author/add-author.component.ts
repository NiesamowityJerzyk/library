import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from '../../store/service';
import { IBook, IPublisher } from '../../store/types';
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

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss'],
})
export class AddAuthorComponent {
  public form: UntypedFormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(256)]],
    lastName: ['', [Validators.required, Validators.maxLength(64)]],
    yearOfBirth: [null, [Validators.required, Validators.maxLength(64)]],
  });
  constructor(
    public router: Router,
    private librarianService: LibrarianService,
    private fb: UntypedFormBuilder,
    public constsService: ConstsService,
    private toast: HotToastService
  ) {}

  public publishersOptions!: IConstOption[];

  ngOnInit() {
    this.librarianService.getPublishers().subscribe((val) => {
      this.publishersOptions = val.map((el: IPublisher) => ({
        title: el.publisherName,
        value: el.publisherID,
      }));
    });
  }

  public addAuthor(): void {
    this.librarianService.addAuthor(this.form.value).subscribe((val) => {
      this.toast.success('Successfully added an author');
      this.router.navigate(['/librarian/authors']);
    });
  }
}
